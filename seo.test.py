"""Static SEO regression checks. Run with Python's standard library only."""
import json
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import unittest
import xml.etree.ElementTree as ET

ROOT = Path(__file__).parent
DOMAIN = 'https://sailawaylogistics.eu/'

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.tags, self.schema, self.visible = [], [], []
        self.script, self.in_script = None, False
        self.feed(path.read_text())

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.tags.append((tag,a))
        if tag == 'script':
            self.in_script = True
            if a.get('type') == 'application/ld+json': self.script = ''

    def handle_data(self, data):
        if self.script is not None: self.script += data
        if not self.in_script: self.visible.append(data)

    def handle_endtag(self, tag):
        if tag == 'script':
            if self.script is not None:
                self.schema.append(json.loads(self.script))
                self.script = None
            self.in_script = False

    def select(self, tag, key=None, value=None):
        return [a for t,a in self.tags if t==tag and (key is None or a.get(key)==value)]

def schema_nodes(value):
    if isinstance(value,dict):
        yield value
        for child in value.values(): yield from schema_nodes(child)
    elif isinstance(value,list):
        for child in value: yield from schema_nodes(child)

class SEOTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.all_pages = {p.name: Page(p) for p in ROOT.glob('*.html')}
        cls.pages = {name:p for name,p in cls.all_pages.items() if not p.select('meta','http-equiv','refresh')}

    def test_canonical_metadata_and_h1(self):
        for name,p in self.pages.items():
            with self.subTest(page=name):
                expected = DOMAIN+('' if name=='index.html' else name)
                self.assertEqual([a['href'] for a in p.select('link','rel','canonical')],[expected])
                self.assertEqual(len(p.select('h1')),1)
                self.assertEqual(len(p.select('title')),1)
                self.assertTrue(p.select('meta','name','description')[0]['content'])
                self.assertEqual(p.select('meta','property','og:url')[0]['content'],expected)
                self.assertTrue(p.select('meta','name','twitter:card'))
                self.assertTrue(p.select('script','src','analytics-events.js'))

    def test_local_links_images_and_language_reciprocity(self):
        for name,p in self.pages.items():
            for tag,a in p.tags:
                with self.subTest(page=name,tag=tag):
                    value = a.get('href') if tag in ['a','link'] else a.get('src')
                    if not value: continue
                    u = urlparse(value)
                    if not u.scheme and not u.netloc and u.path:
                        self.assertTrue((ROOT/unquote(u.path)).exists(),value)
                    if tag == 'img':
                        self.assertTrue(a.get('alt'))
                        self.assertGreater(int(a['width']),0)
                        self.assertGreater(int(a['height']),0)
                    if tag=='link' and a.get('hreflang'):
                        other_name=u.path.lstrip('/') or 'index.html'
                        other=self.pages[other_name]
                        self.assertIn(a,other.select('link','rel','alternate'))

    def test_sitemap_only_lists_canonical_pages(self):
        for filename in ['sitemap.xml','sitemap-core.xml']:
            urls=[n.text for n in ET.parse(ROOT/filename).findall('.//{*}loc')]
            self.assertEqual(len(urls),len(set(urls)))
            for url in urls:
                self.assertTrue(url.startswith(DOMAIN))
                self.assertIn(urlparse(url).path.lstrip('/') or 'index.html',self.pages)
            for key in ['index.html','en.html','fr.html','freight-forwarding-espana.html','freight-forwarding-europa.html','eu-freight-forwarding.html']:
                self.assertIn(DOMAIN+('' if key=='index.html' else key),urls)

    def test_all_service_pages_are_reachable_from_homepage(self):
        reached, pending = set(), ['index.html']
        while pending:
            name = pending.pop()
            if name in reached:
                continue
            reached.add(name)
            for anchor in self.pages[name].select('a'):
                url = urlparse(anchor.get('href', ''))
                if url.scheme not in ('', 'https', 'http'):
                    continue
                if url.netloc and url.netloc != urlparse(DOMAIN).netloc:
                    continue
                target = unquote(url.path).lstrip('/') or 'index.html'
                if target in self.pages and target not in reached:
                    pending.append(target)
        self.assertEqual(set(self.pages) - reached, set(), 'Unlinked canonical pages')

    def test_indexable_pages_and_sitemap_formats_agree(self):
        expected = {DOMAIN + ('' if name == 'index.html' else name) for name in self.pages}
        xml_urls = {n.text for n in ET.parse(ROOT/'sitemap.xml').findall('.//{*}loc')}
        text_urls = set((ROOT/'sitemap.txt').read_text().splitlines())
        self.assertEqual(xml_urls, expected)
        self.assertEqual(text_urls, xml_urls)
        for name, page in self.pages.items():
            with self.subTest(page=name):
                for meta in page.select('meta', 'name', 'robots'):
                    directives = {value.strip().lower() for value in meta.get('content', '').split(',')}
                    self.assertFalse({'noindex', 'none'} & directives)
        robots = (ROOT/'robots.txt').read_text()
        self.assertIn('Sitemap: ' + DOMAIN + 'sitemap.xml', robots)

    def test_every_structured_faq_is_visible(self):
        for name,p in self.pages.items():
            visible=' '.join(' '.join(p.visible).split())
            for node in schema_nodes(p.schema):
                if node.get('@type')=='Question':
                    with self.subTest(page=name,question=node['name']):
                        self.assertIn(' '.join(node['name'].split()),visible)
                        self.assertIn(' '.join(node['acceptedAnswer']['text'].split()),visible)

    def test_homepage_site_identity(self):
        for name in ['index.html','en.html','fr.html']:
            nodes=list(schema_nodes(self.pages[name].schema))
            site=[n for n in nodes if n.get('@type')=='WebSite']
            self.assertEqual(len(site),1,name)
            self.assertEqual(site[0]['url'],DOMAIN)
            self.assertEqual(site[0]['name'],'Sailaway Logistics')
            self.assertEqual(site[0]['publisher']['@id'],DOMAIN+'#organization')
            organizations=[n for n in nodes if n.get('@id')==DOMAIN+'#organization' and 'name' in n]
            self.assertTrue(organizations,name)
            self.assertEqual(organizations[0]['url'],DOMAIN)

if __name__=='__main__': unittest.main()
