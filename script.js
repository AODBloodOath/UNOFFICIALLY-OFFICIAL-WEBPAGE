/**
 * Unofficially Official website
 * Replace PAYMENT_URL with your real checkout link (Stripe/PayPal/etc.).
 * If you use Stripe Payment Links, paste the subscription link here.
 */
const PAYMENT_URL = "https://example.com/your-checkout-link";

const el = (id) => document.getElementById(id);

function nextResetDate(now = new Date()){
  // Resets on the 1st of every month.
  // If today is the 1st, next reset is the 1st of next month.
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-11
  const isFirst = now.getDate() === 1;
  const targetMonth = isFirst ? month + 1 : month + 1; // always next 1st
  const d = new Date(year, targetMonth, 1, 0, 0, 0);
  return d;
}

function fmt(dt){
  return dt.toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function openModal(){
  el("modal").setAttribute("aria-hidden", "false");
  el("checkoutBtn").setAttribute("href", PAYMENT_URL);
  el("modalSub").textContent = `Resets on the 1st of every month. Next reset: ${fmt(nextResetDate())}`;
}
function closeModal(){
  el("modal").setAttribute("aria-hidden", "true");
  el("copyStatus").textContent = "";
}

// Image lightbox
function openImg(src){
  const m = el("imgModal");
  el("imgFull").setAttribute("src", src);
  m.setAttribute("aria-hidden", "false");
}
function closeImg(){
  el("imgModal").setAttribute("aria-hidden", "true");
  el("imgFull").setAttribute("src", "");
}

function copyCheckout(){
  const url = PAYMENT_URL;
  navigator.clipboard.writeText(url).then(() => {
    el("copyStatus").textContent = "Checkout link copied.";
  }).catch(() => {
    el("copyStatus").textContent = "Couldn’t copy automatically — select and copy the link instead.";
  });
}

function init(){
  el("year").textContent = String(new Date().getFullYear());

  // Reset display
  el("resetText").textContent = `Next reset: ${fmt(nextResetDate())} (local time)`;

  // Modal actions

  // Gallery lightbox
  document.querySelectorAll(".shot").forEach(btn => {
    btn.addEventListener("click", () => openImg(btn.dataset.full));
  });
  const imgBg = el("imgModalBg");
  const closeImgBtn = el("closeImg");
  if (imgBg) imgBg.addEventListener("click", closeImg);
  if (closeImgBtn) closeImgBtn.addEventListener("click", closeImg);


  el("openPay").addEventListener("click", openModal);
  el("learnPay").addEventListener("click", openModal);
  el("closeModal").addEventListener("click", closeModal);
  el("modalBg").addEventListener("click", closeModal);
  el("copyLink").addEventListener("click", copyCheckout);

  // Esc to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeModal(); closeImg(); }
  });

  // Mobile menu
  const menuBtn = el("menuBtn");
  const mobileNav = el("mobileNav");
  menuBtn.addEventListener("click", () => {
    const open = mobileNav.getAttribute("aria-hidden") === "false";
    mobileNav.setAttribute("aria-hidden", open ? "true" : "false");
  });
  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => mobileNav.setAttribute("aria-hidden", "true"));
  });

  // Gallery lightbox
  document.querySelectorAll(".g-item").forEach((btn) => {
    btn.addEventListener("click", () => openLightbox(btn.dataset.full));
  });
  el("lightboxClose").addEventListener("click", closeLightbox);
  el("lightboxBg").addEventListener("click", closeLightbox);


}

init();
