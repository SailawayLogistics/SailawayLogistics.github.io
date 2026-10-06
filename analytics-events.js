(() => {
  if (typeof window.gtag !== "function") {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", "G-F2PL5XNK4D");

    const tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=G-F2PL5XNK4D";
    document.head.appendChild(tag);
  }

  const attributionKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term"
  ];

  const sendEvent = (eventName, parameters = {}) => {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", eventName, {
      page_location: window.location.href,
      page_title: document.title,
      ...parameters
    });
  };

  const cleanText = (value) => value.replace(/\s+/g, " ").trim().slice(0, 120);

  const getAttribution = () => {
    const params = new URLSearchParams(window.location.search);
    const attribution = {
      landing_page: window.location.href,
      referrer: document.referrer || "direct"
    };

    attributionKeys.forEach((key) => {
      const value = params.get(key);
      if (value) attribution[key] = value.slice(0, 160);
    });

    return attribution;
  };

  const addHiddenField = (form, name, value) => {
    if (!value || form.querySelector(`input[name="${name}"]`)) return;

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };

  const addFormAttribution = () => {
    const attribution = getAttribution();

    document.querySelectorAll("form").forEach((form) => {
      addHiddenField(form, "Website page", attribution.landing_page);
      addHiddenField(form, "Website referrer", attribution.referrer);

      attributionKeys.forEach((key) => {
        if (attribution[key]) addHiddenField(form, key.replace("utm_", "UTM "), attribution[key]);
      });
    });
  };

  const linkType = (href) => {
    if (!href) return "";
    if (href.startsWith("mailto:")) return "email";
    if (href.startsWith("tel:")) return "phone";
    if (href.startsWith("https://tally.so/r/kdMR1M")) return "transport_form";
    if (href.includes("europages.") && href.includes("sailaway-logistics")) return "europages";
    if (href.includes("request-quote.html")) return "quote_page";
    return "";
  };

  let tallyScriptPromise;
  const loadTallyWidget = () => {
    if (window.Tally?.openPopup) return Promise.resolve();
    if (!tallyScriptPromise) {
      tallyScriptPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://tally.so/widgets/embed.js";
        script.onload = () => window.Tally?.openPopup ? resolve() : reject(new Error("Tally widget unavailable"));
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    return tallyScriptPromise;
  };

  document.addEventListener("click", (event) => {
    const clickable = event.target.closest("a, button");
    if (!clickable) return;

    const label = cleanText(clickable.textContent || clickable.getAttribute("aria-label") || "");

    if (clickable.matches("[data-freight-open]")) {
      sendEvent("request_vehicle_click", {
        button_text: label || "Request Vehicle"
      });
      return;
    }

    if (clickable instanceof HTMLAnchorElement) {
      const href = clickable.getAttribute("href") || "";
      const type = linkType(href);

      if (type === "email") {
        sendEvent("email_click", { link_text: label, link_url: href });
      } else if (type === "phone") {
        sendEvent("phone_click", { link_text: label, link_url: href });
      } else if (type === "transport_form") {
        sendEvent("transport_form_open", { link_text: label, link_url: href });
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        event.preventDefault();
        loadTallyWidget().then(() => {
          window.Tally.openPopup("kdMR1M", {
            layout: "modal",
            width: 680,
            overlay: true,
            onOpen: () => sendEvent("transport_form_loaded", { form_id: "kdMR1M" }),
            onSubmit: () => sendEvent("transport_quote_submitted", { form_id: "kdMR1M" })
          });
        }).catch(() => {
          window.location.assign(href);
        });
      } else if (type === "europages") {
        sendEvent("europages_profile_click", { link_text: label, link_url: href });
      } else if (type === "quote_page") {
        sendEvent("quote_page_click", { link_text: label, link_url: href });
      } else if (clickable.closest(".seo-link-grid")) {
        sendEvent("service_directory_click", { link_text: label, link_url: href });
      }
    }
  });

  const trackedForms = new WeakSet();
  document.addEventListener("focusin", (event) => {
    const form = event.target.closest("form");
    if (!(form instanceof HTMLFormElement) || trackedForms.has(form)) return;

    trackedForms.add(form);
    sendEvent("form_start", {
      form_type: form.classList.contains("quote-form") ? "transport_quote" : "contact",
      form_page: window.location.pathname
    });
  });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;

    let leadType = "contact_form";
    if (form.classList.contains("quote-form")) leadType = "transport_quote";
    if (form.classList.contains("freight-mini-form")) leadType = "freight_popup_request";

    const channel = event.submitter?.dataset.contactChannel || "email";
    sendEvent("contact_handoff_started", {
      lead_type: leadType,
      contact_channel: channel,
      form_page: window.location.pathname,
      ...getAttribution()
    });
  });

  const freightModal = document.querySelector("[data-freight-modal]");
  if (freightModal) {
    let hasTrackedOpen = false;
    const observer = new MutationObserver(() => {
      if (freightModal.classList.contains("is-open") && !hasTrackedOpen) {
        hasTrackedOpen = true;
        sendEvent("freight_popup_open", {
          popup_name: "Request Vehicle"
        });
      }
    });

    observer.observe(freightModal, { attributes: true, attributeFilter: ["class"] });
  }

  addFormAttribution();
})();
