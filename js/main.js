/*
 * V0RTEX — Copyright (c) 2026 [TITULAIRE DES DROITS]
 * All rights reserved. Proprietary and confidential.
 */

(() => {
  "use strict";

  const services = Array.isArray(window.VORTEX_SERVICES)
    ? window.VORTEX_SERVICES
    : [];

  const products = Array.isArray(window.VORTEX_PRODUCTS)
    ? window.VORTEX_PRODUCTS
    : [];

  const serviceGrid = document.getElementById("servicesGrid");
  const productGrid = document.getElementById("productsGrid");
  const serviceCount = document.getElementById("serviceCount");
  const productCount = document.getElementById("productCount");
  const productSearch = document.getElementById("productSearch");

  const formatPrice = (price) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR"
    }).format(Number(price) || 0);

  function createElement(tag, className, content) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content !== undefined) element.textContent = content;
    return element;
  }

  function createLink(text, href, className = "card-link") {
    const link = createElement("a", className, text);
    link.href = href;
    return link;
  }

  function renderServices(category = "all") {
    if (!serviceGrid) return;

    serviceGrid.replaceChildren();

    const filtered = services.filter((service) =>
      category === "all" || service.category === category
    );

    filtered.forEach((service) => {
      const card = createElement("article", "service-card");
      const code = createElement("span", "card-code", service.code || "V0RTEX");
      const title = createElement("h3", "card-title", service.name);
      const description = createElement("p", "card-description", service.description);
      const details = createElement("p", "card-details", service.details);
      const meta = createElement("div", "card-meta");
      const price = createElement("strong", "card-price", formatPrice(service.price));
      const delay = createElement("span", "card-delay", service.delay || "Sur demande");

      meta.append(price, delay);
      card.append(code, title, description, details, meta);
      card.append(
        createLink("Demander ce service", `pages/custom.html?service=${encodeURIComponent(service.id)}`)
      );

      serviceGrid.append(card);
    });

    if (serviceCount) {
      serviceCount.textContent = `${filtered.length} SERVICES`;
    }

    if (filtered.length === 0) {
      serviceGrid.append(
        createElement("p", "empty-state", "Aucun service dans cette catégorie.")
      );
    }
  }

  function renderProducts(searchTerm = "") {
    if (!productGrid) return;

    productGrid.replaceChildren();

    const query = searchTerm.trim().toLocaleLowerCase("fr");

    const filtered = products.filter((product) => {
      const searchable = [
        product.name,
        product.category,
        product.description,
        product.code
      ].join(" ").toLocaleLowerCase("fr");

      return searchable.includes(query);
    });

    filtered.forEach((product) => {
      const card = createElement("article", "product-card");
      const symbol = createElement("div", "product-symbol", product.symbol || "◈");
      const code = createElement("span", "card-code", product.code || "V0RTEX");
      const title = createElement("h3", "card-title", product.name);
      const category = createElement("span", "product-category", product.category || "Ressource");
      const description = createElement("p", "card-description", product.description);
      const meta = createElement("div", "card-meta");
      const price = createElement("strong", "card-price", formatPrice(product.price));
      const status = createElement("span", "product-status", product.availability || "APERÇU");

      meta.append(price, status);
      card.append(symbol, code, title, category, description, meta);
      card.append(
        createLink("Demander des informations", "pages/contact.html")
      );

      productGrid.append(card);
    });

    if (productCount) {
      productCount.textContent = `${filtered.length} PRODUITS`;
    }

    if (filtered.length === 0) {
      productGrid.append(
        createElement("p", "empty-state", "Aucun produit ne correspond à cette recherche.")
      );
    }
  }

  // Filtres des services
  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      renderServices(button.dataset.filter || "all");
    });
  });

  // Recherche des produits
  if (productSearch) {
    productSearch.addEventListener("input", () => {
      renderProducts(productSearch.value);
    });
  }

  // Menu mobile
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      navigation.classList.toggle("active", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        navigation.classList.remove("active");
      });
    });
  }

  // Année du pied de page
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Apparition progressive des éléments
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });
  }

  // Premier affichage
  renderServices();
  renderProducts();
})();
