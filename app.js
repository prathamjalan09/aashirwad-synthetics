(function () {
  "use strict";

  const site = window.AASHIRWAD_SITE;
  if (!site || !site.business) return;

  const b = site.business;
  const tel = `tel:${b.phone}`;
  const email = `mailto:${b.email}`;
  const whatsappBase = `https://wa.me/${b.whatsapp}`;
  const whatsapp = `${whatsappBase}?text=${encodeURIComponent(b.whatsappMessage)}`;

  const icons = {
    phone: '<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z"/></svg>',
    "message-circle": '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8Z"/></svg>',
    "map-pin": '<svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    camera: '<svg viewBox="0 0 24 24"><path d="M14.5 4 16 6h3a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h3l1.5-2Z"/><circle cx="12" cy="13" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    download: '<svg viewBox="0 0 24 24"><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14"/></svg>',
    share: '<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.5m-7.6 6.9 7.6 4.5"/></svg>',
    "arrow-up-right": '<svg viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24"><path d="m12 3-1 3.5L7.5 8 11 9.5 12 13l1.5-3.5L17 8l-3.5-1.5ZM5 14l-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7ZM19 13l-.7 2.3L16 16l2.3.7L19 19l.7-2.3L22 16l-2.3-.7Z"/></svg>'
  };

  const icon = (name) => `<i class="svg-icon" aria-hidden="true">${icons[name] || ""}</i>`;
  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  document.querySelectorAll("[data-business]").forEach((element) => {
    element.textContent = b[element.dataset.business] || "";
  });

  document.querySelectorAll("[data-icon]").forEach((element) => {
    element.outerHTML = icon(element.dataset.icon);
  });

  const actions = [
    ["Call", tel, "phone", false],
    ["WhatsApp", whatsapp, "message-circle", true],
    ["Direction", b.mapsUrl, "map-pin", true],
    ["Email", email, "mail", false],
    ["Instagram", b.instagramUrl, "camera", true]
  ];
  document.getElementById("primary-actions").innerHTML = actions.map(([label, href, iconName, external]) => `
    <a class="action-link" href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noreferrer"' : ""}>
      <span class="action-icon">${icon(iconName)}</span><span>${escapeHtml(label)}</span>
    </a>
  `).join("");

  document.getElementById("about-copy").textContent = site.about || "";
  document.getElementById("values-row").innerHTML = (site.values || [])
    .map((value) => `<span>${escapeHtml(value)}</span>`).join("");

  document.getElementById("product-grid").innerHTML = (site.products || []).map((product, index) => {
    const enquiry = `${whatsappBase}?text=${encodeURIComponent(`Hello Aashirwad Synthetics, I would like to enquire about ${product.name}.`)}`;
    return `
      <article class="product-card">
        <div class="product-visual visual-${(index % 4) + 1}">
          <span>${String(index + 1).padStart(2, "0")}</span><small>AASHIRWAD QUALITY</small>
        </div>
        <div class="product-content">
          <p class="product-type">${escapeHtml(product.type)}</p>
          <h3>${escapeHtml(product.name)}</h3>
          <p>${escapeHtml(product.details)}</p>
          <a href="${escapeHtml(enquiry)}" target="_blank" rel="noreferrer">
            Enquire on WhatsApp ${icon("arrow-up-right")}
          </a>
        </div>
      </article>`;
  }).join("");

  document.getElementById("catalogue-link").href = b.catalogueUrl;
  document.getElementById("instagram-banner").href = b.instagramUrl;
  document.getElementById("whatsapp-float").href = whatsapp;

  document.getElementById("contact-list").innerHTML = `
    <a href="${escapeHtml(tel)}"><span class="contact-icon">${icon("phone")}</span><span><small>Call / WhatsApp</small>${escapeHtml(b.phoneDisplay)}</span>${icon("arrow-up-right")}</a>
    <a href="${escapeHtml(email)}"><span class="contact-icon">${icon("mail")}</span><span><small>Email</small>${escapeHtml(b.email)}</span>${icon("arrow-up-right")}</a>
    <a href="${escapeHtml(b.mapsUrl)}" target="_blank" rel="noreferrer"><span class="contact-icon">${icon("map-pin")}</span><span><small>Address</small>${escapeHtml(b.address)}</span>${icon("arrow-up-right")}</a>
    <div class="contact-row-static"><span class="contact-icon">${icon("clock")}</span><span><small>Business hours</small>${escapeHtml(b.hours)}</span></div>
  `;

  document.getElementById("share-button").addEventListener("click", async () => {
    const shareData = {
      title: "Aashirwad Synthetics",
      text: "Aashirwad Synthetics — textile fabrics from Surat.",
      url: window.location.href
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (_) { /* user cancelled */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      window.alert("Card link copied.");
    } catch (_) {
      window.prompt("Copy this website link:", window.location.href);
    }
  });
})();
