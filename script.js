/* =========================================================
   LUMIÈRE — Product Data
   ========================================================= */
const WA_NUMBER = "916374948067";

const PRODUCTS = [
  // Kanjivaram Silk Sarees — the heart of the house, woven in Kanchipuram tradition
  { id: "sr1", category: "saree", label: "Kanjivaram", name: "Sunflower Yellow Kanjivaram Saree", price: 16500, img: "https://images.unsplash.com/photo-1610189013429-a703f4b245cf", desc: "Pure mulberry silk Kanjivaram in sunflower yellow, woven with a contrast zari border using the traditional Korvai technique." },
  { id: "sr2", category: "saree", label: "Temple Border", name: "Emerald Green Temple Border Saree", price: 18200, img: "https://images.unsplash.com/photo-1679006831648-7c9ea12e5807", desc: "Rich emerald silk saree with a gold temple-motif border, finished with matching heirloom-style jewellery drape." },
  { id: "sr3", category: "saree", label: "Silk Cotton", name: "Ivory & Black Silk Cotton Saree", price: 6800, img: "https://images.unsplash.com/photo-1572470176170-98fa8abcb741", desc: "Lightweight silk cotton saree in classic ivory and black, woven for everyday elegance and easy draping." },
  { id: "sr4", category: "saree", label: "Kanjivaram", name: "Crimson & Ivory Silk Saree", price: 15400, img: "https://images.unsplash.com/photo-1729101143873-d80050bae219", desc: "Crimson body with an ivory pallu, hand-loomed in fine silk with a woven zari border." },
  { id: "sr5", category: "saree", label: "Chettinad Cotton", name: "Coral Chettinad Cotton Saree", price: 4200, img: "https://images.unsplash.com/photo-1619516388835-2b60acc4049e", desc: "Handwoven coral Chettinad cotton saree with checked weave and a contrast temple border — breathable daily-wear silk-cotton." },

  // Bridal Silk Collection — heavy Kanjivarams for weddings and muhurtham
  { id: "br1", category: "bridal", label: "Bridal Silk", name: "Ruby Red Bridal Kanjivaram", price: 42000, img: "https://images.unsplash.com/photo-1646979200020-941e1deb2670", desc: "Our signature bridal red Kanjivaram, dense with gold zari work, woven for the muhurtham moment." },
  { id: "br2", category: "bridal", label: "Bridal Silk", name: "Regal Blue & Red Bridal Saree", price: 38500, img: "https://images.unsplash.com/photo-1609748513078-9ff6232781c5", desc: "A striking blue-and-red bridal silk with a wide contrast border, styled with traditional temple jewellery." },
  { id: "br3", category: "bridal", label: "Bridal Silk", name: "Green & Gold Zari Bridal Saree", price: 46000, img: "https://images.unsplash.com/flagged/photo-1551854716-8b811be39e7e", desc: "Emerald green bridal silk with dense gold zari, a classic South Indian wedding trousseau piece." },
  { id: "br4", category: "bridal", label: "Bridal Look", name: "Bridal Trousseau Special Saree", price: 52000, img: "https://images.unsplash.com/photo-1716504628105-bd76d91e85f2", desc: "Our most opulent trousseau piece — full bridal drape styled with matching jewellery and traditional bridal makeup finish." },

  // Half-Sarees & Pattu Pavadai — festive wear for young women and pre-wedding functions
  { id: "hs1", category: "halfsaree", label: "Half Saree", name: "Sunset Pink & Orange Half Saree", price: 9500, img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb", desc: "Pattu pavadai-style half saree in sunset pink and orange silk, draped with gold jewellery for festive functions." },
  { id: "hs2", category: "halfsaree", label: "Half Saree", name: "Lavender Floral Half Saree", price: 8200, img: "https://images.unsplash.com/photo-1610189026297-df356264479c", desc: "Soft lavender half saree with woven floral motifs — a popular choice for Aadi and Navaratri functions." },
  { id: "hs3", category: "halfsaree", label: "Festive Set", name: "Trio Festive Half Saree Set", price: 8800, img: "https://images.unsplash.com/photo-1610189026205-27510cfc52f8", desc: "Coordinated purple and pink half sarees, perfect for sisters or a bridal party dressing together." },

  // Salwar & Anarkali Sets
  { id: "sa1", category: "salwar", label: "Anarkali", name: "Sky Blue Floral Anarkali Set", price: 6200, img: "https://images.unsplash.com/photo-1610189025857-f42fe6e8dd91", desc: "Flowing sky blue Anarkali with floral print, paired with matching dupatta and churidar." },
  { id: "sa2", category: "salwar", label: "Anarkali", name: "Golden Yellow Anarkali Set", price: 6800, img: "https://images.unsplash.com/photo-1610189012906-4c0aa9b9781e", desc: "Bright golden yellow Anarkali set with a fitted yoke and gently flared skirt, ideal for daytime functions." },

  // Fusion Wear — indo-western pieces for the modern South Indian wardrobe
  { id: "fw1", category: "fusion", label: "Fusion Wear", name: "Blush Pink Floral Fusion Dress", price: 4500, img: "https://images.unsplash.com/photo-1609748340878-c690e3e4706b", desc: "Contemporary floral fusion dress with a South Indian print sensibility — light, breathable, and easy to style." },
];

function imgUrl(base, w) { return `${base}?w=${w}&q=80&auto=format&fit=crop`; }
function formatPrice(n) { return "₹" + n.toLocaleString("en-IN"); }

/* =========================================================
   CART (persisted to localStorage)
   ========================================================= */
const Cart = {
  key: "lumiere_cart_v1",
  items: {}, // { productId: qty }

  load() {
    try { this.items = JSON.parse(localStorage.getItem(this.key)) || {}; }
    catch (e) { this.items = {}; }
  },
  save() {
    try { localStorage.setItem(this.key, JSON.stringify(this.items)); } catch (e) {}
  },
  add(id, qty = 1) {
    this.items[id] = (this.items[id] || 0) + qty;
    this.save(); this.render(); this.bump();
  },
  setQty(id, qty) {
    if (qty <= 0) { delete this.items[id]; }
    else { this.items[id] = qty; }
    this.save(); this.render();
  },
  remove(id) { delete this.items[id]; this.save(); this.render(); },
  clear() { this.items = {}; this.save(); this.render(); },
  count() { return Object.values(this.items).reduce((a, b) => a + b, 0); },
  subtotal() {
    return Object.entries(this.items).reduce((sum, [id, qty]) => {
      const p = PRODUCTS.find(p => p.id === id);
      return sum + (p ? p.price * qty : 0);
    }, 0);
  },
  bump() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;
    badge.style.transform = "scale(1.4)";
    setTimeout(() => badge.style.transform = "scale(1)", 200);
  },
  render() {
    const countEl = document.getElementById("cart-count");
    const total = this.count();
    if (countEl) { countEl.textContent = total; countEl.style.display = total > 0 ? "flex" : "none"; }

    const itemsEl = document.getElementById("cart-items");
    const footerEl = document.getElementById("cart-footer");
    if (!itemsEl) return;

    const entries = Object.entries(this.items);
    if (entries.length === 0) {
      itemsEl.innerHTML = `
        <div class="cart-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a08060" stroke-width="1"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <p>Your bag is empty</p>
        </div>`;
      footerEl.style.display = "none";
      return;
    }
    footerEl.style.display = "block";
    itemsEl.innerHTML = entries.map(([id, qty]) => {
      const p = PRODUCTS.find(p => p.id === id);
      if (!p) return "";
      return `
        <div class="cart-item">
          <img class="cart-item-img" src="${imgUrl(p.img, 200)}" alt="${p.name}">
          <div class="cart-item-info">
            <div class="cart-item-cat">${p.label}</div>
            <div class="cart-item-name">${p.name}</div>
            <div class="cart-item-bottom">
              <div class="qty-stepper">
                <button onclick="Cart.setQty('${id}', ${qty - 1})" aria-label="Decrease quantity">−</button>
                <span>${qty}</span>
                <button onclick="Cart.setQty('${id}', ${qty + 1})" aria-label="Increase quantity">+</button>
              </div>
              <div class="cart-item-price">${formatPrice(p.price * qty)}</div>
            </div>
            <button class="cart-item-remove" onclick="Cart.remove('${id}')">Remove</button>
          </div>
        </div>`;
    }).join("");

    document.getElementById("cart-subtotal").textContent = formatPrice(this.subtotal());
  }
};

/* =========================================================
   RENDER PRODUCT GRID
   ========================================================= */
let currentCategory = "all";
let currentSort = "featured";
let currentSearch = "";

function renderGrid() {
  const grid = document.getElementById("product-grid");
  let list = PRODUCTS.filter(p => currentCategory === "all" || p.category === currentCategory);
  if (currentSearch.trim()) {
    const q = currentSearch.trim().toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.label.toLowerCase().includes(q));
  }
  if (currentSort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (currentSort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (currentSort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

  document.getElementById("result-count").textContent =
    `${list.length} piece${list.length !== 1 ? "s" : ""}`;

  if (list.length === 0) {
    grid.innerHTML = `<div class="no-results">No pieces match your search — try a different filter.</div>`;
    return;
  }

  grid.innerHTML = list.map((p, i) => {
    const waText = encodeURIComponent(`I am interested in ${p.name} (${formatPrice(p.price)})`);
    return `
    <div class="collection-card reveal" data-id="${p.id}" style="transition-delay:${(i % 4) * 0.08}s">
      <div class="card-inner" onclick="openQuickView('${p.id}')">
        <img class="card-img" src="${imgUrl(p.img, 600)}" alt="${p.name}" loading="lazy">
        <div class="card-overlay"></div>
        <button class="card-quick-add" onclick="event.stopPropagation(); Cart.add('${p.id}'); showToast('Added to bag');" aria-label="Add to cart" title="Add to cart">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        </button>
        <div class="card-info">
          <div class="card-label">${p.label}</div>
          <div class="card-name">${p.name}</div>
          <div class="card-price-row">
            <span class="card-price">From ${formatPrice(p.price)}</span>
            <a href="https://wa.me/${WA_NUMBER}?text=${waText}" target="_blank" rel="noopener" class="card-wa-link" onclick="event.stopPropagation()">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Enquire
            </a>
          </div>
        </div>
      </div>
    </div>`;
  }).join("");

  initReveal();
  initTilt();
}

function setCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderGrid();
}

/* =========================================================
   QUICK VIEW MODAL
   ========================================================= */
let qvProductId = null;
let qvQty = 1;

function openQuickView(id) {
  const p = PRODUCTS.find(p => p.id === id);
  if (!p) return;
  qvProductId = id;
  qvQty = 1;
  document.getElementById("qv-img").src = imgUrl(p.img, 800);
  document.getElementById("qv-img").alt = p.name;
  document.getElementById("qv-label").textContent = p.label;
  document.getElementById("qv-name").textContent = p.name;
  document.getElementById("qv-price").textContent = formatPrice(p.price);
  document.getElementById("qv-desc").textContent = p.desc;
  document.getElementById("qv-qty").textContent = qvQty;
  const waText = encodeURIComponent(`I am interested in ${p.name} (${formatPrice(p.price)})`);
  document.getElementById("qv-wa-link").href = `https://wa.me/${WA_NUMBER}?text=${waText}`;
  openModal("quickview-modal");
}
function qvChangeQty(delta) {
  qvQty = Math.max(1, qvQty + delta);
  document.getElementById("qv-qty").textContent = qvQty;
}
function qvAddToCart() {
  if (!qvProductId) return;
  Cart.add(qvProductId, qvQty);
  closeModal("quickview-modal");
  showToast("Added to bag");
}

/* =========================================================
   MODAL / DRAWER HELPERS
   ========================================================= */
function openModal(id) {
  document.getElementById("overlay").classList.add("active");
  document.getElementById(id).classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeModal(id) {
  document.getElementById(id).classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
  document.getElementById("cart-drawer").classList.remove("active");
  document.body.style.overflow = "";
}
function openCart() {
  document.getElementById("overlay").classList.add("active");
  document.getElementById("cart-drawer").classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cart-drawer").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
  document.body.style.overflow = "";
}
function closeAllOverlays() {
  document.querySelectorAll(".modal-box").forEach(m => m.classList.remove("active"));
  document.getElementById("cart-drawer").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
  document.body.style.overflow = "";
}

/* =========================================================
   CHECKOUT
   ========================================================= */
function openCheckout() {
  if (Cart.count() === 0) { showToast("Your bag is empty"); return; }
  const summary = document.getElementById("checkout-summary");
  const lines = Object.entries(Cart.items).map(([id, qty]) => {
    const p = PRODUCTS.find(p => p.id === id);
    return p ? `<div class="checkout-summary-row"><span>${p.name} × ${qty}</span><span>${formatPrice(p.price * qty)}</span></div>` : "";
  }).join("");
  summary.innerHTML = lines + `<div class="checkout-summary-total"><span>Total</span><span>${formatPrice(Cart.subtotal())}</span></div>`;
  closeCart();
  openModal("checkout-modal");
}

function submitCheckout(e) {
  e.preventDefault();
  const name = document.getElementById("chk-name").value.trim();
  const phone = document.getElementById("chk-phone").value.trim();
  const address = document.getElementById("chk-address").value.trim();
  if (!name || !phone) { showToast("Please enter your name and phone number"); return; }

  const itemLines = Object.entries(Cart.items).map(([id, qty]) => {
    const p = PRODUCTS.find(p => p.id === id);
    return p ? `• ${p.name} (x${qty}) — ${formatPrice(p.price * qty)}` : "";
  }).join("\n");

  const message =
`Hi LUMIÈRE! I would like to place an order.

${itemLines}

Total: ${formatPrice(Cart.subtotal())}

Name: ${name}
Phone: ${phone}${address ? `\nDelivery Address: ${address}` : ""}`;

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
  closeModal("checkout-modal");
  showToast("Redirecting to WhatsApp…");
}

/* =========================================================
   TOAST
   ========================================================= */
let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("active");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("active"), 2200);
}

/* =========================================================
   CURSOR
   ========================================================= */
function initCursor() {
  const cur = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cur || !ring || window.matchMedia("(hover: none)").matches) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px'; });
  (function animRing() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();
  document.body.addEventListener('mouseenter', (e) => {
    const el = e.target.closest && e.target.closest('a, button, .collection-card, .process-card');
    if (!el) return;
  }, true);
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .collection-card, .process-card')) {
      cur.style.width = '6px'; cur.style.height = '6px'; ring.style.width = '54px'; ring.style.height = '54px';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .collection-card, .process-card')) {
      cur.style.width = '10px'; cur.style.height = '10px'; ring.style.width = '36px'; ring.style.height = '36px';
    }
  });
}

/* =========================================================
   HERO CANVAS (WebGL shimmer)
   ========================================================= */
function initHeroScene() {
  const canvas = document.getElementById('scene');
  if (!canvas) return;
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; gl.viewport(0, 0, canvas.width, canvas.height); };
  window.addEventListener('resize', resize); resize();

  const vsrc = `attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0., 1.); }`;
  const fsrc = `
    precision highp float;
    uniform vec2 u_res;
    uniform float u_time;
    uniform vec2 u_mouse;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p); vec2 f = fract(p);
      vec2 u = f*f*(3.-2.*f);
      return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
                 mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
    }
    float fbm(vec2 p) {
      float v = 0.; float a = 0.5;
      for(int i=0;i<5;i++){v+=a*noise(p);p*=2.01;a*=0.5;}
      return v;
    }
    void main() {
      vec2 uv = gl_FragCoord.xy / u_res;
      vec2 mouse = u_mouse / u_res;
      float t = u_time * 0.09;
      float f = fbm(uv * 2.0 + fbm(uv * 1.8 + t * 0.7));
      vec3 base1 = vec3(0.99, 0.97, 0.93);
      vec3 base2 = vec3(0.97, 0.93, 0.85);
      vec3 gold  = vec3(0.93, 0.80, 0.50);
      vec3 silk  = vec3(0.96, 0.88, 0.72);
      vec3 col = mix(base1, base2, smoothstep(0.3, 0.6, f));
      col = mix(col, silk, smoothstep(0.52, 0.72, f) * 0.6);
      col = mix(col, gold, smoothstep(0.68, 0.85, f) * 0.35);
      float mdist = length(uv - mouse);
      col += vec3(0.95, 0.85, 0.55) * smoothstep(0.35, 0., mdist) * 0.08;
      float band = sin(uv.x * 3.0 - uv.y * 1.5 + t * 0.5) * 0.5 + 0.5;
      col += vec3(0.9, 0.8, 0.5) * band * 0.04;
      vec2 vig_uv = uv - 0.5;
      float vig = 1. - dot(vig_uv, vig_uv) * 0.8;
      col *= vig;
      gl_FragColor = vec4(col, 1.);
    }
  `;
  function compile(type, src) { const sh = gl.createShader(type); gl.shaderSource(sh, src); gl.compileShader(sh); return sh; }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsrc));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsrc));
  gl.linkProgram(prog); gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(prog, 'u_res');
  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uMouse = gl.getUniformLocation(prog, 'u_mouse');
  let mouseX = canvas.width / 2, mouseY = canvas.height / 2;
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
  let start = null;
  (function render(ts) {
    if (!start) start = ts;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, (ts - start) / 1000);
    gl.uniform2f(uMouse, mouseX, canvas.height - mouseY);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  })(0);
}

/* =========================================================
   SCROLL REVEAL
   ========================================================= */
let revealObserver;
function initReveal() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}

/* =========================================================
   TESTIMONIALS
   ========================================================= */
function initTestimonials() {
  let currentT = 0;
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.t-dot');
  function showTestimonial(idx) {
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    testimonials[idx].classList.add('active');
    dots[idx].classList.add('active');
    currentT = idx;
  }
  dots.forEach(d => d.addEventListener('click', () => showTestimonial(+d.dataset.idx)));
  setInterval(() => showTestimonial((currentT + 1) % testimonials.length), 5000);
}

/* =========================================================
   TILT ON CARDS
   ========================================================= */
function initTilt() {
  document.querySelectorAll('.collection-card').forEach(card => {
    if (card.dataset.tiltInit) return;
    card.dataset.tiltInit = "1";
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x*10}deg) rotateX(${-y*7}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
      card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    });
    card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
  });
}

/* =========================================================
   LIGHT PARTICLE AMBIENCE
   ========================================================= */
function initParticles() {
  const c = document.createElement('canvas');
  c.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0.35';
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
  window.addEventListener('resize', resize); resize();
  const pts = Array.from({length: 45}, () => ({
    x: Math.random() * c.width, y: Math.random() * c.height,
    vx: (Math.random() - 0.5) * 0.25, vy: -Math.random() * 0.35 - 0.08,
    size: Math.random() * 2 + 0.3, alpha: Math.random() * 0.3 + 0.08, life: Math.random()
  }));
  (function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.life += 0.0015;
      if (p.y < 0 || p.life > 1) { p.x = Math.random() * c.width; p.y = c.height + 10; p.life = 0; }
      const a = Math.sin(p.life * Math.PI) * p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(184,145,58,${a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
}

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  Cart.load();
  Cart.render();
  renderGrid();

  document.getElementById("cart-btn").addEventListener("click", openCart);
  document.getElementById("cart-close").addEventListener("click", closeCart);
  document.getElementById("checkout-btn").addEventListener("click", openCheckout);
  document.getElementById("clear-cart-btn").addEventListener("click", () => { Cart.clear(); showToast("Bag cleared"); });
  document.getElementById("overlay").addEventListener("click", closeAllOverlays);
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => closeModal(btn.dataset.closeModal));
  });
  document.getElementById("qv-add-cart").addEventListener("click", qvAddToCart);
  document.getElementById("qv-qty-minus").addEventListener("click", () => qvChangeQty(-1));
  document.getElementById("qv-qty-plus").addEventListener("click", () => qvChangeQty(1));
  document.getElementById("checkout-form").addEventListener("submit", submitCheckout);

  document.getElementById("search-input").addEventListener("input", (e) => {
    currentSearch = e.target.value; renderGrid();
  });
  document.getElementById("sort-select").addEventListener("change", (e) => {
    currentSort = e.target.value; renderGrid();
  });

  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAllOverlays(); });

  initCursor();
  initHeroScene();
  initReveal();
  initTestimonials();
  initParticles();
});
