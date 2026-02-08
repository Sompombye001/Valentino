/* =============================
   CART STORAGE
============================= */
const CART_KEY = "valentina_cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

/* =============================
   ADD TO CART
============================= */
window.addToCart = function (name, price, image) {
  const cart = getCart();
  const item = cart.find(i => i.name === name);

  if (item) item.qty++;
  else cart.push({ name, price, image, qty: 1 });

  saveCart(cart);
};

/* =============================
   CART BADGE
============================= */
function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;

  const count = getCart().reduce((s, i) => s + i.qty, 0);
  badge.textContent = count;
}

/* =============================
   RENDER CART (ICON ONLY)
============================= */
function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const emptyEl = document.getElementById("empty-cart");
  const summaryEl = document.getElementById("cart-summary");

  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  if (!cart.length) {
    emptyEl?.classList.remove("hidden");
    summaryEl && (summaryEl.style.display = "none");
    totalEl && (totalEl.textContent = "0.00");
    spawnHearts();
    return;
  }

  emptyEl?.classList.add("hidden");
  summaryEl && (summaryEl.style.display = "flex");

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-info">
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)}</p>
      </div>
      <div class="cart-actions">
        <button class="icon-btn" onclick="changeQty(${index}, -1)">
          <i data-lucide="minus"></i>
        </button>
        <span class="qty">${item.qty}</span>
        <button class="icon-btn" onclick="changeQty(${index}, 1)">
          <i data-lucide="plus"></i>
        </button>
        <button class="icon-btn danger" onclick="removeItem(${index})">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `;

    enableSwipe(div, index);
    container.appendChild(div);
  });

  totalEl.textContent = total.toFixed(2);
  lucide.createIcons();
}

/* =============================
   CART ACTIONS
============================= */
window.changeQty = function (index, delta) {
  const cart = getCart();
  if (!cart[index]) return;

  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);

  saveCart(cart);
  renderCart();
};

window.removeItem = function (index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
};

/* =============================
   CHECKOUT MODAL
============================= */
window.openCheckout = function () {
  const modal = document.getElementById("checkoutModal");
  const itemsEl = document.getElementById("modal-items");
  const totalEl = document.getElementById("modal-total");
  const cart = getCart();

  if (!modal) return;

  itemsEl.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    itemsEl.innerHTML += `
      <div class="modal-item">
        <img src="${item.image}">
        <div>
          <h4>${item.name}</h4>
          <p>${item.qty} × $${item.price.toFixed(2)}</p>
        </div>
      </div>
    `;
  });

  totalEl.textContent = total.toFixed(2);
  modal.classList.add("active");
};

window.closeCheckout = function () {
  document.getElementById("checkoutModal")?.classList.remove("active");
};

/* =============================
   SWIPE TO REMOVE
============================= */
function enableSwipe(el, index) {
  let startX = 0;

  el.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  el.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff < -80) {
      el.classList.add("removing");
      setTimeout(() => removeItem(index), 300);
    }
  });
}

/* =============================
   HEART PARTICLES
============================= */
function spawnHearts(count = 12) {
  const container = document.getElementById("heart-particles");
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 14 + Math.random() * 18 + "px";
    heart.style.animationDuration = 2 + Math.random() * 1.5 + "s";

    container.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }
}


/* =============================
   INIT
============================= */
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderCart();
  lucide.createIcons();
});

/* ================= SCROLL REVEAL ================= */
const scrollElements = document.querySelectorAll(".animate-on-scroll");

const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
  );
};

const displayScrollElement = (element) => {
  element.style.opacity = "1";
  element.style.transform = "translateY(0)";
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 100)) {
      displayScrollElement(el);
    }
  });
};

window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation);


/* ================= PARTICLE BACKGROUND ================= */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let particlesArray;

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particlesArray = [];
  const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
  
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`
    });
  }
}
initCanvas();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    // wrap around edges
    if (p.x > canvas.width) p.x = 0;
    if (p.x < 0) p.x = canvas.width;
    if (p.y > canvas.height) p.y = 0;
    if (p.y < 0) p.y = canvas.height;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener("resize", initCanvas);
