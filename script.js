/* ============================================================
   Front-End Master Book — script.js
   جميع التفاعلات المشتركة بين صفحات الموقع
   ============================================================ */
(function () {
  'use strict';

  /* ---------- بيانات الجلسات (تُستخدم في الشريط الجانبي والصفحة الرئيسية) ---------- */
  const SESSIONS = [
    { id: '09', emoji: '⚡', title: 'مقدمة إلى JavaScript', href: 'lesson-09.html', ready: true },
    { id: '10', emoji: '🌳', title: 'JavaScript والـ DOM', href: 'lesson-10.html', ready: true },
    { id: '11', emoji: '🔢', title: 'المصفوفات والكائنات المتقدمة', href: 'lesson-11.html', ready: true },
    { id: '12', emoji: '⏳', title: 'البرمجة غير المتزامنة', href: 'lesson-12.html', ready: true },
    { id: '13', emoji: '💾', title: 'التخزين المحلي في المتصفح', href: 'lesson-13.html', ready: true },
    { id: '14', emoji: '🏛️', title: 'البرمجة الكائنية OOP', href: 'lesson-14.html', ready: true },
  ];
  window.FEMB_SESSIONS = SESSIONS;

  const STORE_KEY = 'femb_progress_v1';
  const THEME_KEY = 'femb_theme';

  function getProgress() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function setDone(id, val) {
    const p = getProgress();
    if (val) p[id] = true; else delete p[id];
    try { localStorage.setItem(STORE_KEY, JSON.stringify(p)); } catch (e) {}
  }
  window.FEMB_PROGRESS = { get: getProgress, setDone };

  /* ---------- الوضع الليلي / النهاري ---------- */
  function initTheme() {
    let theme = 'light';
    try { theme = localStorage.getItem(THEME_KEY) || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); } catch (e) {}
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme');
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
      });
    });
  }

  /* ---------- قائمة الجوال ---------- */
  function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.mobile-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  }

  /* ---------- الشريط الجانبي (صفحات الدروس) ---------- */
  function initSidebar() {
    const toggleBtn = document.querySelector('.sidebar-toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
    }
    const list = document.querySelector('[data-sidebar-list]');
    if (!list) return;
    const currentId = document.body.getAttribute('data-lesson-id');
    const progress = getProgress();
    let doneCount = 0;
    list.innerHTML = SESSIONS.map(s => {
      const isActive = s.id === currentId;
      const isDone = !!progress[s.id];
      if (isDone) doneCount++;
      const classes = ['side-item'];
      if (isActive) classes.push('active');
      if (!s.ready) classes.push('side-locked');
      if (isDone) classes.push('side-done');
      const inner = `
        <span class="side-emoji">${s.emoji}</span>
        <span class="side-txt"><b>الجلسة ${s.id}</b><small>${s.title}</small></span>
        ${!s.ready ? '<span class="side-lock">🔒</span>' : ''}`;
      return s.ready
        ? `<a class="${classes.join(' ')}" href="${s.href}">${inner}</a>`
        : `<div class="${classes.join(' ')}" title="قريباً">${inner}</div>`;
    }).join('');

    const track = document.querySelector('.sidebar-progress .fill');
    const label = document.querySelector('.sidebar-progress span');
    if (track && label) {
      const pct = Math.round((doneCount / SESSIONS.length) * 100);
      track.style.width = pct + '%';
      label.textContent = `أكملت ${doneCount} من ${SESSIONS.length} جلسات (${pct}%)`;
    }
  }

  /* ---------- زر "أكملت هذا الدرس" ---------- */
  function initCompleteButton() {
    const btn = document.querySelector('[data-complete-btn]');
    if (!btn) return;
    const id = document.body.getAttribute('data-lesson-id');
    const progress = getProgress();
    const render = () => {
      const done = !!getProgress()[id];
      btn.textContent = done ? '✓ تم إكمال هذا الدرس' : 'أكملت هذا الدرس';
      btn.classList.toggle('btn-primary', !done);
      btn.classList.toggle('btn-ghost', done);
    };
    render();
    btn.addEventListener('click', () => {
      const done = !!getProgress()[id];
      setDone(id, !done);
      render();
      initSidebar();
    });
  }

  /* ---------- مُلوِّن الأكواد (Syntax Highlighter) — بدون مكتبات خارجية ---------- */
  const JS_KEYWORDS = new Set(['const','let','var','function','return','if','else','for','while','do','switch','case','break','continue','class','extends','super','new','this','typeof','instanceof','in','of','true','false','null','undefined','async','await','try','catch','finally','throw','import','export','default','static','get','set','delete','void','yield','from','as']);

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function highlightJS(code) {
    const tokenRe = /(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)|(`(?:\\.|[^`\\])*`)|('(?:\\.|[^'\\])*')|("(?:\\.|[^"\\])*")|(\b\d+(?:_\d+)*\.?\d*n?\b)|([A-Za-z_$][\w$]*)/g;
    let out = '';
    let last = 0;
    let m;
    while ((m = tokenRe.exec(code)) !== null) {
      out += escapeHtml(code.slice(last, m.index));
      const [full, comment1, comment2, template, single, double, number, word] = m;
      if (comment1 || comment2) {
        out += `<span class="tok-com">${escapeHtml(full)}</span>`;
      } else if (template || single || double) {
        out += `<span class="tok-str">${escapeHtml(full)}</span>`;
      } else if (number) {
        out += `<span class="tok-num">${escapeHtml(full)}</span>`;
      } else if (word) {
        if (JS_KEYWORDS.has(word)) {
          out += `<span class="tok-kw">${escapeHtml(full)}</span>`;
        } else {
          const nextCh = code.slice(tokenRe.lastIndex, tokenRe.lastIndex + 1);
          out += (nextCh === '(') ? `<span class="tok-fn">${escapeHtml(full)}</span>` : escapeHtml(full);
        }
      } else {
        out += escapeHtml(full);
      }
      last = tokenRe.lastIndex;
    }
    out += escapeHtml(code.slice(last));
    return out;
  }

  function highlightHTML(code) {
    // تلوين مبسّط لِـ HTML: الوسوم بلون الكلمات المفتاحية، والنصوص بين علامات الاقتباس كسلاسل
    return escapeHtml(code).replace(/(&lt;\/?[a-zA-Z0-9!-]+)/g, '<span class="tok-kw">$1</span>')
      .replace(/(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;)/g, '<span class="tok-str">$1</span>')
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="tok-com">$1</span>');
  }

  function initCodeBlocks() {
    document.querySelectorAll('.code-block').forEach(block => {
      const codeEl = block.querySelector('code');
      if (!codeEl) return;
      const lang = block.getAttribute('data-lang') || 'javascript';
      const raw = codeEl.textContent;
      codeEl.innerHTML = lang === 'html' ? highlightHTML(raw) : highlightJS(raw);

      const copyBtn = block.querySelector('.copy-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(raw).then(() => {
            const original = copyBtn.innerHTML;
            copyBtn.innerHTML = '✓ تم النسخ';
            copyBtn.classList.add('copied');
            showToast('تم نسخ الكود إلى الحافظة');
            setTimeout(() => { copyBtn.innerHTML = original; copyBtn.classList.remove('copied'); }, 1800);
          }).catch(() => showToast('تعذّر النسخ — انسخ يدوياً'));
        });
      }

      const runBtn = block.querySelector('.run-btn');
      if (runBtn) {
        runBtn.addEventListener('click', () => runSandboxed(raw, block));
      }
    });
  }

  /* ---------- تشغيل الكود في بيئة معزولة (Console وهمية) ---------- */
  function fmtArg(a) {
    if (typeof a === 'string') return a;
    if (a === undefined) return 'undefined';
    try { return JSON.stringify(a, null, 0); } catch (e) { return String(a); }
  }

  function runSandboxed(code, block) {
    const outBox = block.querySelector('.output-box');
    if (!outBox) return;
    outBox.innerHTML = '<span class="out-label">▍ نتيجة التنفيذ</span>';
    outBox.classList.add('show');

    const lines = [];
    const fakeConsole = {
      log: (...a) => lines.push({ t: 'log', m: a.map(fmtArg).join(' ') }),
      warn: (...a) => lines.push({ t: 'warn', m: '⚠ ' + a.map(fmtArg).join(' ') }),
      error: (...a) => lines.push({ t: 'error', m: '✖ ' + a.map(fmtArg).join(' ') }),
      table: (data) => lines.push({ t: 'log', m: JSON.stringify(data) }),
      info: (...a) => lines.push({ t: 'log', m: a.map(fmtArg).join(' ') }),
    };

    try {
      const fn = new Function('console', '"use strict";\n' + code);
      fn(fakeConsole);
      if (lines.length === 0) {
        lines.push({ t: 'ok', m: '✓ تم تنفيذ الكود بنجاح (لا يوجد ناتج مطبوع عبر console)' });
      }
    } catch (err) {
      lines.push({ t: 'error', m: '✖ خطأ أثناء التنفيذ: ' + err.message });
    }

    lines.forEach(l => {
      const div = document.createElement('div');
      div.className = 'output-line ' + l.t;
      div.textContent = l.m;
      outBox.appendChild(div);
    });
    outBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ---------- شارة "تم النسخ" ---------- */
  let toastTimer = null;
  function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  /* ---------- طرفية البطل المتحركة (Hero Terminal) ---------- */
  function initHeroTerminal() {
    const el = document.querySelector('[data-hero-code]');
    const outEl = document.querySelector('[data-hero-out]');
    if (!el) return;
    const codeLines = [
      "const student = {",
      "  name: 'ريم حسن',",
      "  score: 95",
      "};",
      "",
      "function getGrade({ score }) {",
      "  if (score >= 90) return 'ممتاز 🏆';",
      "  if (score >= 60) return 'ناجح ✅';",
      "  return 'راسب ❌';",
      "}",
      "",
      "console.log(getGrade(student));"
    ];
    const full = codeLines.join('\n');
    let i = 0;
    const cursor = '<span class="terminal-cursor"></span>';

    function tick() {
      if (i <= full.length) {
        el.innerHTML = highlightJS(full.slice(0, i)) + cursor;
        i += 2;
        setTimeout(tick, 18);
      } else {
        if (outEl) outEl.textContent = '› ممتاز 🏆';
        setTimeout(() => { i = 0; if (outEl) outEl.textContent = ''; tick(); }, 2600);
      }
    }
    tick();
  }

  /* ---------- بناء شبكة الدروس في الصفحة الرئيسية ---------- */
  function initLessonsGrid() {
    const grid = document.querySelector('[data-lessons-grid]');
    if (!grid) return;
    const progress = getProgress();
    const topics = {
      '09': 'المتغيرات • أنواع البيانات • العمليات • التحكم بالتدفق • الدوال',
      '10': 'تحديد العناصر • التعديل • الإنشاء • الأحداث • To-Do List',
      '11': 'map • filter • reduce • Destructuring • Spread • Optional Chaining',
      '12': 'Callbacks • Promises • async/await • Fetch API',
      '13': 'localStorage • sessionStorage • Cookies • IndexedDB',
      '14': 'Classes • Encapsulation • Inheritance • Polymorphism',
    };
    grid.innerHTML = SESSIONS.map(s => {
      const done = !!progress[s.id];
      const classes = ['lesson-card'];
      if (!s.ready) classes.push('locked');
      if (done) classes.push('done');
      const statusBadge = s.ready
        ? (done ? '<span class="badge-live">تم الإكمال ✓</span>' : '<span class="badge-live">متاح الآن</span>')
        : '<span class="badge-soon">قريباً</span>';
      const cta = s.ready
        ? `<a href="${s.href}" class="btn btn-ghost btn-sm">${done ? 'مراجعة الدرس' : 'ابدأ الدرس'} ←</a>`
        : `<span class="btn btn-ghost btn-sm is-disabled">قريباً</span>`;
      const wrapTag = s.ready ? 'a' : 'div';
      const hrefAttr = s.ready ? `href="${s.href}"` : '';
      return `
      <div class="${classes.join(' ')}">
        <span class="lesson-check">✓</span>
        <div class="lesson-card-top">
          <span class="lesson-emoji">${s.emoji}</span>
          <span class="lesson-num">SESSION ${s.id}</span>
        </div>
        <h3>${s.title}</h3>
        <p class="lesson-tags">${topics[s.id] || ''}</p>
        <div class="lesson-meta">
          <span class="lesson-duration">⏱ 3 ساعات</span>
          ${statusBadge}
        </div>
        ${cta}
      </div>`;
    }).join('');
  }

  /* ---------- تفعيل رابط التنقل النشط ---------- */
  function markActiveNav() {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path) a.classList.add('active');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initSidebar();
    initCompleteButton();
    initCodeBlocks();
    initHeroTerminal();
    initLessonsGrid();
    markActiveNav();

    /* أزرار السابق/التالي المعطّلة لا تتفاعل */
    document.querySelectorAll('.nav-arrow.is-disabled').forEach(a => a.addEventListener('click', e => e.preventDefault()));
  });
})();