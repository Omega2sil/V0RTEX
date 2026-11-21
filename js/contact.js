/*
 * V0RTEX — Copyright (c) 2026 [TITULAIRE DES DROITS]
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("customForm");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const fields = ["name", "email", "type", "budget", "description"];

    const body = fields.map(key =>
      `${key.toUpperCase()} : ${data.get(key)}`
    ).join("\n\n");

    const subject = encodeURIComponent("Demande personnalisée V0RTEX");
    const message = encodeURIComponent(
      `Bonjour V0RTEX,\n\nVoici ma demande :\n\n${body}`
    );

    window.location.href =
      `mailto:omega.professional.team@proton.me?subject=${subject}&body=${message}`;
  });
});
