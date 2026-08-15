(() => {
  const header = document.querySelector("[data-header]");
  const burger = document.querySelector("[data-burger]");
  const nav = document.querySelector("[data-nav]");

  const setOpen = (open) => {
    header?.classList.toggle("is-open", open);
    burger?.setAttribute("aria-expanded", String(open));
  };

  if (burger && header) {
    burger.addEventListener("click", () => {
      setOpen(!header.classList.contains("is-open"));
    });
  }

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  const buy = document.querySelector("[data-sticky-buy]");
  const order = document.querySelector("#order");
  if (buy && order && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      ([entry]) => {
        buy.classList.toggle("is-away", entry.isIntersecting && entry.intersectionRatio > 0.2);
      },
      { threshold: [0.2, 0.4] }
    );
    io.observe(order);
  }

  const form = document.querySelector("[data-order-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();

    if (!name || !phone || !email) {
      form.classList.add("is-error");
      return;
    }

    form.classList.remove("is-error");
    // Prodamus подключится сюда: prodamusPay(1490, "rub")
    window.location.href = "spasibo.html";
  });
})();
