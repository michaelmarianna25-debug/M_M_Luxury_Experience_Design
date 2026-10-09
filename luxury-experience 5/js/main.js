/* Luxury Guest Experience Design — scroll-driven 3D experience (no dependencies) */
(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('js');
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = t => t * t * (3 - 2 * t);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const small = () => innerWidth < 820;

  /* ---------- hero headline: line-by-line mask reveal ---------- */
  $$('[data-split]').forEach(h => {
    const lines = h.innerHTML.split(/<br\s*\/?>/i);
    h.innerHTML = lines.map((l, i) => `<span class="ln"><span style="transition-delay:${0.25 + i * 0.18}s">${l}</span></span>`).join('<br>');
  });
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('loaded')));

  /* ---------- 3D world: camera flies through floating photos + gold rings ---------- */
  const world = $('#world');
  const floats = $$('.float', world).map(el => ({
    el, x: +el.dataset.x, y: +el.dataset.y, z: +el.dataset.z, ry: +el.dataset.ry, ph: Math.random() * 6.28
  }));
  $$('.ring', world).forEach(r => r.remove());
  const rings = [];
  for (let i = 0; i < 9; i++) {
    const r = document.createElement('div');
    r.className = 'ring';
    const s = [70, 90, 56][i % 3];
    r.style.cssText = `width:${s}vmin;height:${s}vmin;margin:${-s / 2}vmin 0 0 ${-s / 2}vmin`;
    world.appendChild(r);
    rings.push({ el: r, z: -300 - i * 750, rx: 70 + (i % 3) * 8, spin: (i % 2 ? 1 : -1) * (0.6 + (i % 3) * 0.3) });
  }
  const DEPTH = 6400;

  /* sky colours over the course of the page: dawn → golden sunset → night → gold dawn */
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const stops = [
    [0.00, '#14100d', '#2b1d12'],
    [0.22, '#1d1511', '#4a2a16'],
    [0.40, '#2a1a14', '#9a4f20'],   // sunset ritual
    [0.58, '#241420', '#7a3c24'],
    [0.76, '#0b0d1a', '#1d2236'],   // night (before/after, impact)
    [1.00, '#120c08', '#3a2814']
  ].map(s => ({ p: s[0], a: hex(s[1]), b: hex(s[2]) }));
  const skyEl = $('#sky');
  function paintSky(p) {
    let i = 0; while (i < stops.length - 2 && p > stops[i + 1].p) i++;
    const s0 = stops[i], s1 = stops[i + 1], t = clamp((p - s0.p) / (s1.p - s0.p));
    const mix = (x, y) => x.map((v, k) => Math.round(lerp(v, y[k], t))).join(',');
    skyEl.style.setProperty('--sky-top', `rgb(${mix(s0.a, s1.a)})`);
    skyEl.style.setProperty('--sky-bot', `rgb(${mix(s0.b, s1.b)})`);
  }

  /* ---------- state ---------- */
  let target = 0, cur = 0, vel = 0, mx = 0, my = 0, cmx = 0, cmy = 0, time = 0;
  const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - innerHeight);
  const onScroll = () => { target = clamp(scrollY / maxScroll()); };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  if (!coarse && !reduce) addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });

  /* ---------- floating dust (2D canvas, depth-parallax) ---------- */
  const cv = $('#dust'), cx = cv.getContext('2d');
  let W = 0, H = 0, DPR = 1, motes = [];
  function sizeCanvas() {
    DPR = Math.min(devicePixelRatio || 1, 1.5);
    W = cv.width = innerWidth * DPR; H = cv.height = innerHeight * DPR;
    const n = small() ? 36 : 90;
    motes = Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random(), z: Math.random() * .9 + .1, s: Math.random() * 6.28 }));
  }
  sizeCanvas(); addEventListener('resize', sizeCanvas);
  function drawDust(dt) {
    cx.clearRect(0, 0, W, H);
    cx.globalCompositeOperation = 'lighter';
    for (const m of motes) {
      m.y -= dt * 0.012 * m.z; m.x += Math.sin(time * .4 + m.s) * .0004;
      let y = m.y - cur * 2.2 * m.z;           // scroll parallax
      y = ((y % 1) + 1) % 1;
      if (m.y < -2) m.y += 3;
      const px = ((m.x % 1 + 1) % 1) * W, py = y * H, r = (1 + m.z * 2.8) * DPR;
      const g = cx.createRadialGradient(px, py, 0, px, py, r * 4);
      const a = .1 + m.z * .35 * (.6 + .4 * Math.sin(time * 1.3 + m.s));
      g.addColorStop(0, `rgba(240,214,150,${a})`); g.addColorStop(1, 'rgba(201,169,110,0)');
      cx.fillStyle = g; cx.beginPath(); cx.arc(px, py, r * 4, 0, 6.283); cx.fill();
    }
  }

  /* ---------- scrub helpers ---------- */
  const nav = $('#nav'), prog = $('#progress i'), rail = $('.phase-rail i'), phases = $('.phases');
  const ritualFigs = $$('.ritual figure'), ritual = $('#ritual');
  const baPin = $('#beforeafter'), ba = $('#ba'), handle = $('.ba-handle');
  const wB = $('.w-before'), wA = $('.w-after'), bdB = $('.badge.b'), bdA = $('.badge.a');
  const banner = $('.banner');
  let lastY = 0, dragging = false;

  function setPos(pct) {
    pct = clamp(pct, 0, 100);
    ba.style.setProperty('--pos', pct + '%');
    handle.setAttribute('aria-valuenow', Math.round(pct));
    wB.style.opacity = pct > 50 ? 1 : 0; wA.style.opacity = pct > 50 ? 0 : 1;
    bdB.style.opacity = pct < 18 ? 0 : 1; bdA.style.opacity = pct > 82 ? 0 : 1;
  }
  setPos(92);
  function scrubBA() {
    const r = baPin.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const t = clamp(-r.top / (r.height - innerHeight));
    if (!dragging) setPos(lerp(92, 6, smooth(clamp((t - .08) / .8))));
  }
  (function dragSetup() {
    const move = e => { const b = ba.getBoundingClientRect(); setPos(((e.clientX - b.left) / b.width) * 100); };
    ba.addEventListener('pointerdown', e => { dragging = true; ba.setPointerCapture(e.pointerId); move(e); });
    ba.addEventListener('pointermove', e => { if (dragging) move(e); });
    const end = () => { dragging = false; };
    ba.addEventListener('pointerup', end); ba.addEventListener('pointercancel', end);
    handle.addEventListener('keydown', e => {
      const v = +handle.getAttribute('aria-valuenow');
      if (e.key === 'ArrowLeft') { setPos(v - 5); e.preventDefault(); }
      if (e.key === 'ArrowRight') { setPos(v + 5); e.preventDefault(); }
    });
  })();

  /* ---------- main loop ---------- */
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now; time += dt;
    const k = reduce ? 1 : 1 - Math.pow(.0009, dt);     // frame-rate independent smoothing
    const prev = cur; cur = lerp(cur, target, k); vel = lerp(vel, (cur - prev) / Math.max(dt, .001), .1);
    cmx = lerp(cmx, mx, .05); cmy = lerp(cmy, my, .05);

    const camZ = cur * DEPTH;
    world.style.transform = `translate3d(${cmx * -60}px,${cmy * -40}px,${camZ}px) rotateX(${cmy * 3}deg) rotateY(${cmx * -5}deg)`;
    const maxO = small() ? .38 : .6;
    for (const f of floats) {
      const d = f.z + camZ;                                  // distance from camera plane
      const fadeIn = clamp((d + 2600) / 1500), fadeOut = clamp(1 - (d - 150) / 450);
      const bob = Math.sin(time * .6 + f.ph) * 10;
      f.el.style.opacity = (smooth(fadeIn) * smooth(fadeOut) * maxO).toFixed(3);
      const sx = small() ? f.x * 1.2 : f.x;
      f.el.style.transform = `translate3d(calc(-50% + ${sx}vw),calc(-50% + ${f.y}vh + ${bob}px),${f.z}px) rotateY(${f.ry + Math.sin(time * .3 + f.ph) * 3}deg) rotateX(${Math.cos(time * .25 + f.ph) * 2}deg)`;
    }
    for (const r of rings) {
      const d = r.z + camZ;
      const o = smooth(clamp((d + 2800) / 1800)) * smooth(clamp(1 - (d - 100) / 500));
      r.el.style.opacity = (o * .75).toFixed(3);
      r.el.style.transform = `translate3d(${Math.sin(r.z) * 30}px,0,${r.z}px) rotateX(${r.rx + Math.sin(time * .4) * 4}deg) rotateY(${time * 6 * r.spin}deg) rotateZ(${cur * 120 * r.spin}deg)`;
    }
    paintSky(cur);
    if (!reduce) drawDust(dt);

    // UI bound to scroll
    root.style.setProperty('--scroll', cur.toFixed(4));
    const sy = scrollY;
    nav.classList.toggle('solid', sy > 40);
    nav.classList.toggle('hide', sy > 500 && sy > lastY + 2);
    if (sy < lastY - 2) nav.classList.remove('hide');
    lastY = sy;

    if (phases) {
      const r = phases.getBoundingClientRect();
      root.style.setProperty('--rail', clamp((innerHeight * .6 - r.top) / r.height).toFixed(3));
    }
    if (ritual) {
      const r = ritual.getBoundingClientRect();
      const t = smooth(clamp(1 - (r.top - innerHeight * .15) / (innerHeight * .7)));
      const fan = [-26, -9, 9, 26];
      ritualFigs.forEach((f, i) => {
        f.style.setProperty('--ry', (fan[i] * (1 - t)).toFixed(1) + 'deg');
        f.style.setProperty('--tz', (-60 * (1 - t) + (i === 1 || i === 2 ? 20 : 0) * t).toFixed(0) + 'px');
      });
    }
    if (banner) {
      const r = banner.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        const t = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;      // -1..1 around the viewport centre
        banner.style.setProperty('--by', (t * -60).toFixed(1) + 'px');
        banner.style.setProperty('--bs', (1.04 + Math.abs(t) * .06).toFixed(3));
      }
    }
    scrubBA();
    requestAnimationFrame(frame);
  }
  onScroll(); cur = target;
  requestAnimationFrame(frame);

  /* ---------- reveal on view + counters ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target; io.unobserve(el);
    const sibs = [...el.parentElement.children].filter(c => c.matches('.reveal,.reveal-3d'));
    el.style.setProperty('--d', Math.min(sibs.indexOf(el), 5) * .1 + 's');
    el.classList.add('in');
    el.querySelectorAll('[data-count]').forEach(countUp);
    if (el.matches('[data-count]')) countUp(el);
    if (el.id === 'calc') startCalc();
  }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal,.reveal-3d').forEach(el => io.observe(el));
  function countUp(el) {
    if (el._done) return; el._done = 1;
    const to = +el.dataset.count, t0 = performance.now();
    (function step(n) { const t = clamp((n - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - t, 3))); if (t < 1) requestAnimationFrame(step); })(t0);
  }

  /* ---------- 3D tilt on cards (desktop pointers only) ---------- */
  if (!coarse && !reduce) {
    $$('.tilt').forEach(el => {
      el.addEventListener('pointermove', e => {
        if (!el.classList.contains('in')) return;
        const b = el.getBoundingClientRect(), x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
        el.classList.add('tilt-on');
        el.style.transform = `perspective(900px) rotateY(${(x - .5) * 14}deg) rotateX(${(.5 - y) * 12}deg) translateZ(24px)`;
        el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%'); el.style.setProperty('--glow', 1);
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; el.style.setProperty('--glow', 0); setTimeout(() => el.classList.remove('tilt-on'), 300); });
    });
  }

  /* ---------- turnover scenarios (from the deck) ---------- */
  const SC = [
    { g: 100, s: 300, f: 2, note: 'Βάση σύγκρισης' },
    { g: 110, s: 330, f: 2.2, note: '+33% τζίρος σε 1 χρόνο' },
    { g: 200, s: 600, f: 4, note: '×8 τζίρος σε 1 χρόνο (800% του αρχικού)' }
  ];
  let nf = new Intl.NumberFormat('el-GR', { maximumFractionDigits: 1 });
  const L = () => (window.I18N ? window.I18N.lang : 'el');
  const out = { g: $('#c-guests'), s: $('#c-spend'), f: $('#c-freq'), t: $('#c-total'), d: $('#c-delta') };
  let shown = { g: 100, s: 300, f: 2 }, tween = 0, auto = 0, userPicked = false, curSc = 0;
  function showScenario(i) {
    curSc = i; nf = new Intl.NumberFormat(L() === 'en' ? 'en-GB' : 'el-GR', { maximumFractionDigits: 1 });
    $$('.tabs button').forEach(b => b.classList.toggle('on', +b.dataset.s === i));
    const to = SC[i], from = { ...shown }, t0 = performance.now(); cancelAnimationFrame(tween);
    (function step(n) {
      const t = smooth(clamp((n - t0) / 1000));
      shown = { g: lerp(from.g, to.g, t), s: lerp(from.s, to.s, t), f: lerp(from.f, to.f, t) };
      out.g.textContent = nf.format(Math.round(shown.g));
      out.s.textContent = nf.format(Math.round(shown.s)) + '€';
      out.f.textContent = nf.format(Math.round(shown.f * 10) / 10);
      out.t.textContent = nf.format(Math.round(shown.g * shown.s * shown.f)) + '€';
      if (t < 1) tween = requestAnimationFrame(step);
    })(t0);
    out.d.textContent = window.I18N ? window.I18N.t('notes')[i] : to.note;
  }
  window.addEventListener('langchange', () => { shown = { ...SC[curSc] }; showScenario(curSc); });
  $$('.tabs button').forEach(b => b.addEventListener('click', () => { userPicked = true; clearInterval(auto); showScenario(+b.dataset.s); }));
  function startCalc() {
    if (reduce) return; let i = 0;
    auto = setInterval(() => { if (userPicked) return clearInterval(auto); i++; if (i > 2) return clearInterval(auto); showScenario(i); }, 3200);
  }

  /* ---------- contact form (FormSubmit.co → michaelmarianna25@gmail.com) ---------- */
  const form = $('#cform'), status = $('#fstatus');
  if (form) form.addEventListener('submit', async e => {
    e.preventDefault();
    const T = k => window.I18N.t(k), d = Object.fromEntries(new FormData(form));
    status.className = 'form-status';
    if (!d.name.trim() || !/^\S+@\S+\.\S+$/.test(d.email) || !d.message.trim()) { status.textContent = T('invalid'); status.classList.add('err'); return; }
    if (d._honey) return;                                   // spam trap
    const btn = form.querySelector('button'); btn.disabled = true; status.textContent = T('sending');
    try {
      const res = await fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(d) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || String(j.success) === 'false') throw new Error('send failed');
      status.textContent = T('ok'); status.classList.add('ok'); form.reset();
    } catch (err) {
      status.innerHTML = ''; status.append(T('fail'));
      const a = document.createElement('a'); a.href = 'mailto:michaelmarianna25@gmail.com'; a.textContent = 'michaelmarianna25@gmail.com'; status.append(a);
      status.classList.add('err');
    } finally { btn.disabled = false; }
  });

  /* ---------- smooth anchor links (account for fixed nav) ---------- */
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); if (id.length < 2) return;
    const el = $(id); if (!el) return; e.preventDefault();
    scrollTo({ top: el.getBoundingClientRect().top + scrollY - 10, behavior: reduce ? 'auto' : 'smooth' });
  }));
})();
