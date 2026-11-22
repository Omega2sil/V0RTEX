(() => {
  const candidates = [
    "assets/images/logo.png",
    "assets/images/logo.svg",
    "assets/images/logo.webp",
    "assets/images/logo.jpg"
  ];

  const fallbacks = [
    "assets/images/fallback/fallback-1.svg",
    "assets/images/fallback/fallback-2.svg",
    "assets/images/fallback/fallback-3.svg"
  ];

  function testImage(src) {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(src);
      image.onerror = () => resolve(null);
      image.src = src;
    });
  }

  async function initLogo() {
    let selected = null;

    for (const candidate of candidates) {
      selected = await testImage(candidate);
      if (selected) break;
    }

    if (!selected) {
      selected = fallbacks[
        Math.floor(Math.random() * fallbacks.length)
      ];
    }

    document.querySelectorAll("[data-logo-slot]").forEach(slot => {
      slot.src = selected;
    });
  }

  initLogo();
})();
