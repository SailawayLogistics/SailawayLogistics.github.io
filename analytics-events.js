(() => {
  const sendEvent = (eventName, parameters = {}) => {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", eventName, {
      page_location: window.location.href,
      page_title: document.title,
      ...parameters
    });
  };

  const cleanText = (value) => value.replace(/\s+/g, " ").trim().slice(0, 120);

  const linkType = (href) => {
    if (!href) return "";
    if (href.startsWith("mailto:")) return "email";
    if (href.startsWith("tel:")) return "phone";
    if (href.includes("wa.me") || href.includes("whatsapp")) return "whatsapp";
    if (href.includes("request-quote.html")) return "quote_page";
    return "";
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
      } else if (type === "whatsapp") {
        sendEvent("whatsapp_click", { link_text: label, link_url: href });
      } else if (type === "quote_page") {
        sendEvent("quote_page_click", { link_text: label, link_url: href });
      }
    }
  });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;

    let leadType = "contact_form";
    if (form.classList.contains("quote-form")) leadType = "transport_quote";
    if (form.classList.contains("freight-mini-form")) leadType = "freight_popup_request";

    sendEvent("generate_lead", {
      lead_type: leadType,
      form_action: form.getAttribute("action") || "",
      form_page: window.location.pathname
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
})();
