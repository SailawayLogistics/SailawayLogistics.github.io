const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "analytics-events.js"), "utf8");
const formUrl = "https://tally.so/r/kdMR1M";

function setup({ widgetLoads = true } = {}) {
  const listeners = {};
  const events = [];
  const scripts = [];
  const opened = [];
  const redirects = [];

  class HTMLAnchorElement {
    getAttribute(name) {
      return name === "href" ? formUrl : null;
    }
  }

  const window = {
    location: {
      href: "https://sailawaylogistics.eu/?utm_source=instagram",
      search: "?utm_source=instagram",
      pathname: "/",
      assign: (url) => redirects.push(url)
    },
    gtag: (...args) => events.push(args)
  };
  const document = {
    title: "Sailaway Logistics",
    referrer: "",
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: (name, handler) => { listeners[name] = handler; },
    createElement: () => ({}),
    head: {
      appendChild: (script) => {
        scripts.push(script);
        if (widgetLoads) {
          window.Tally = { openPopup: (id, options) => opened.push({ id, options }) };
          script.onload();
        } else {
          script.onerror();
        }
      }
    }
  };

  vm.runInNewContext(source, { window, document, HTMLAnchorElement, URLSearchParams });

  const link = new HTMLAnchorElement();
  link.textContent = "Enviar detalles de una carga";
  link.closest = () => null;
  link.matches = () => false;
  link.getAttribute = (name) => name === "href" ? formUrl : null;
  const click = (options = {}) => {
    const event = {
      button: 0,
      target: { closest: () => link },
      preventDefault() { this.defaultPrevented = true; },
      ...options
    };
    listeners.click(event);
    return event;
  };

  return { click, events, opened, redirects, scripts };
}

test("opens the existing form in one click and tracks only a real submission as a lead", async () => {
  const state = setup();
  const click = state.click();
  await Promise.resolve();

  assert.equal(click.defaultPrevented, true);
  assert.equal(state.scripts.length, 1);
  assert.equal(state.opened.length, 1);
  assert.equal(state.opened[0].id, "kdMR1M");
  assert.equal(state.events.some(([, name]) => name === "transport_quote_submitted"), false);

  state.opened[0].options.onOpen();
  state.opened[0].options.onSubmit();
  assert.equal(state.events.some(([, name]) => name === "transport_form_loaded"), true);
  assert.equal(state.events.some(([, name]) => name === "transport_quote_submitted"), true);
});

test("keeps modified clicks available for opening the original Tally link", () => {
  const state = setup();
  const click = state.click({ metaKey: true });
  assert.equal(click.defaultPrevented, undefined);
  assert.equal(state.scripts.length, 0);
});

test("falls back to the original form URL if the widget fails", async () => {
  const state = setup({ widgetLoads: false });
  state.click();
  await Promise.resolve();
  await Promise.resolve();
  assert.deepEqual(state.redirects, [formUrl]);
});
