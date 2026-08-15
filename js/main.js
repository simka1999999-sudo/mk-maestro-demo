(() => {
  const header = document.querySelector("[data-header]");
  const burger = document.querySelector("[data-burger]");
  const nav = document.querySelector("[data-nav]");

  const setOpen = (open) => {
    header?.classList.toggle("is-open", open);
    document.body.classList.toggle("is-nav-open", open);
    burger?.setAttribute("aria-expanded", String(open));
    burger?.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  };

  if (burger && header) {
    burger.addEventListener("click", () => {
      setOpen(!header.classList.contains("is-open"));
    });
  }

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  header?.querySelector(".header__logo")?.addEventListener("click", () => setOpen(false));
  header?.querySelector(".header__cta")?.addEventListener("click", () => setOpen(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  const onScroll = () => {
    header?.classList.toggle("is-solid", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const navLinks = [...(nav?.querySelectorAll(":scope > a") || [])];
  const navSections = navLinks
    .map((link) => {
      const href = link.getAttribute("href") || "";
      const el = href.startsWith("#") ? document.querySelector(href) : null;
      return el ? { link, el } : null;
    })
    .filter(Boolean);

  if (navSections.length && "IntersectionObserver" in window) {
    const visible = new Map();
    const ioNav = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target, entry.isIntersecting));
        let current = null;
        navSections.forEach(({ link, el }) => {
          if (visible.get(el)) current = link;
        });
        navLinks.forEach((link) => link.classList.toggle("is-active", link === current));
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    navSections.forEach(({ el }) => ioNav.observe(el));
  }

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
