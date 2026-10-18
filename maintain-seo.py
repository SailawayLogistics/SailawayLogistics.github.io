"""Synchronize FAQ markup with visible content and keep site identity consistent."""
import json
import re
from datetime import date
from html import escape
from html.parser import HTMLParser
from pathlib import Path
import runpy
import xml.etree.ElementTree as ET

ROOT = Path(__file__).parent
DOMAIN = 'https://sailawaylogistics.eu/'
helpers = runpy.run_path(str(ROOT / 'seo.test.py'))
Page, nodes = helpers['Page'], helpers['schema_nodes']


class VisibleFAQ(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.depth = 0
        self.article = None
        self.field = None
        self.pairs = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'section':
            if 'faq-strip' in attrs.get('class', '').split() or self.depth:
                self.depth += 1
        if not self.depth:
            return
        if tag == 'article':
            self.article = {'h3': '', 'p': ''}
        if self.article is not None and tag in ('h3', 'p'):
            self.field = tag

    def handle_data(self, value):
        if self.article is not None and self.field:
            self.article[self.field] += value

    def handle_endtag(self, tag):
        if tag == 'section' and self.depth:
            self.depth -= 1
        if tag == self.field:
            self.field = None
        if tag == 'article' and self.article is not None:
            question = ' '.join(self.article['h3'].split())
            answer = ' '.join(self.article['p'].split())
            if question and answer:
                self.pairs.append({'@type': 'Question', 'name': question,
                    'acceptedAnswer': {'@type': 'Answer', 'text': answer}})
            self.article = None


def synchronize(source):
    pairs = VisibleFAQ(source).pairs

    def replace(match):
        data = json.loads(match.group(1))
        before = json.dumps(data, ensure_ascii=False)
        for node in nodes(data):
            if node.get('@type') == 'FAQPage':
                node['mainEntity'] = pairs
        if json.dumps(data, ensure_ascii=False) == before:
            return match.group(0)
        return '<script type="application/ld+json">' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + '</script>'

    return re.sub(r'<script type="application/ld\+json">(.*?)</script>', replace, source, flags=re.S)


changed = set()
for path in ROOT.glob('*.html'):
    original = source = path.read_text()
    page = Page(path)
    if page.select('meta', 'http-equiv', 'refresh'):
        continue
    faqs = [n for n in nodes(page.schema) if n.get('@type') == 'FAQPage']
    if faqs and not VisibleFAQ(source).pairs:
        # Expose existing service answers rather than keep invisible structured claims.
        questions = [q for faq in faqs for q in faq['mainEntity']]
        articles = ''.join('<article><h3>' + escape(q['name']) + '</h3><p>' +
            escape(q['acceptedAnswer']['text']) + '</p></article>' for q in questions)
        section = '\n      <section class="section compact faq-strip" aria-label="Preguntas frecuentes"><div class="section-heading"><h2>Preguntas antes de solicitar transporte</h2></div><div class="faq-grid">' + articles + '</div></section>\n'
        source = source.replace('    </main>', section + '    </main>')
    if path.name == 'fr.html' and not faqs:
        data = {'@context': 'https://schema.org', '@type': 'FAQPage',
            'mainEntity': VisibleFAQ(source).pairs}
        source = source.replace('  </head>', '    <script type="application/ld+json">' +
            json.dumps(data, ensure_ascii=False, separators=(',', ':')) + '</script>\n  </head>')
    source = synchronize(source)
    if path.name in ('index.html', 'en.html', 'fr.html'):
        def identity(match):
            data = json.loads(match.group(1))
            for node in nodes(data):
                types = node.get('@type', [])
                if isinstance(types, str):
                    types = [types]
                if 'Organization' in types and node.get('name') == 'Sailaway Logistics':
                    node['@id'] = DOMAIN + '#organization'
                    node['url'] = DOMAIN
            return '<script type="application/ld+json">' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + '</script>'
        source = re.sub(r'<script type="application/ld\+json">(.*?)</script>', identity, source, flags=re.S)
        if not any(n.get('@type') == 'WebSite' for n in nodes(page.schema)):
            website = {'@context': 'https://schema.org', '@type': 'WebSite',
                '@id': DOMAIN + '#website', 'url': DOMAIN, 'name': 'Sailaway Logistics',
                'inLanguage': ['es', 'en', 'fr'], 'publisher': {'@id': DOMAIN + '#organization'}}
            source = source.replace('  </head>', '    <script type="application/ld+json">' +
                json.dumps(website, separators=(',', ':')) + '</script>\n  </head>')
    if source != original:
        path.write_text(source)
        changed.add(DOMAIN + ('' if path.name == 'index.html' else path.name))
        print(path.name)

for filename in ('sitemap.xml', 'sitemap-core.xml'):
    path = ROOT / filename
    source = path.read_text()
    def update_date(match):
        entry = ET.fromstring(match.group(0))
        if entry.findtext('loc') in changed:
            return re.sub(r'<lastmod>.*?</lastmod>', '<lastmod>' + date.today().isoformat() + '</lastmod>', match.group(0))
        return match.group(0)
    path.write_text(re.sub(r'<url>.*?</url>', update_date, source, flags=re.S))
