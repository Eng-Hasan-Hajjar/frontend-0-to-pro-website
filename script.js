/* ============================================================
   Front-End Master Book — script.js
   جميع التفاعلات المشتركة بين صفحات الموقع
   ============================================================ */
(function () {
  'use strict';

  /* ---------- بيانات الجلسات (تُستخدم في الشريط الجانبي والصفحة الرئيسية) ---------- */
  const SESSIONS = [
    { id: '01', emoji: '🌐', title: 'مقدمة إلى HTML وأدوات التطوير', href: 'lesson-01.html', ready: true },
    { id: '02', emoji: '🌐', title: 'HTML المتقدم', href: 'lesson-02.html', ready: true },
    { id: '03', emoji: '🎨', title: 'مقدمة إلى CSS', href: 'lesson-03.html', ready: true },
    { id: '04', emoji: '🧩', title: 'CSS Flexbox', href: 'lesson-04.html', ready: true },
    { id: '05', emoji: '🗂️', title: 'CSS Grid', href: 'lesson-05.html', ready: true },
    { id: '06', emoji: '📱', title: 'التصميم المتجاوب', href: 'lesson-06.html', ready: true },
    { id: '07', emoji: '🎬', title: 'CSS Animations', href: 'lesson-07.html', ready: true },
    { id: '08', emoji: '🏆', title: 'المشروع الشامل', href: 'lesson-08.html', ready: true },
    { id: '09', emoji: '⚡', title: 'مقدمة إلى JavaScript', href: 'lesson-09.html', ready: true },
    { id: '10', emoji: '🌳', title: 'JavaScript والـ DOM', href: 'lesson-10.html', ready: true },
    { id: '11', emoji: '🔢', title: 'المصفوفات والكائنات المتقدمة', href: 'lesson-11.html', ready: true },
    { id: '12', emoji: '⏳', title: 'البرمجة غير المتزامنة', href: 'lesson-12.html', ready: true },
    { id: '13', emoji: '💾', title: 'التخزين المحلي في المتصفح', href: 'lesson-13.html', ready: true },
    { id: '14', emoji: '🏛️', title: 'البرمجة الكائنية OOP', href: 'lesson-14.html', ready: true },
    { id: '15', emoji: '🔧', title: 'JavaScript المتقدم', href: 'lesson-15.html', ready: true },
    { id: '16', emoji: '🏆', title: 'مراجعة JavaScript الشاملة والمشروع النهائي', href: 'lesson-16.html', ready: true },
    { id: '17', emoji: '⚛️', title: 'مقدمة إلى React', href: 'lesson-17.html', ready: true },
    { id: '18', emoji: '🎣', title: 'React State وuseState Hook', href: 'lesson-18.html', ready: true },
    { id: '19', emoji: '🌊', title: 'useEffect Hook والتعامل مع Side Effects', href: 'lesson-19.html', ready: true },
    { id: '20', emoji: '🧩', title: 'useRef وCustom Hooks', href: 'lesson-20.html', ready: true },
    { id: '21', emoji: '🌳', title: 'useContext وإدارة الحالة المشتركة', href: 'lesson-21.html', ready: true },
    { id: '22', emoji: '🧭', title: 'React Router — التنقل بين الصفحات', href: 'lesson-22.html', ready: true },
    { id: '23', emoji: '🪆', title: 'Nested Routes وLayouts في React Router', href: 'lesson-23.html', ready: true },
    { id: '24', emoji: '⚡', title: 'الأداء في React — memo وuseMemo وuseCallback', href: 'lesson-24.html', ready: true },
    { id: '25', emoji: '🎛️', title: 'useReducer — إدارة حالة معقدة بمنطق مركزي', href: 'lesson-25.html', ready: true },
    { id: '26', emoji: '▲', title: 'مقدمة إلى Next.js', href: 'lesson-26.html', ready: true },
    { id: '27', emoji: '🔌', title: 'Next.js المتقدم — Data Fetching وAPI Routes', href: 'lesson-27.html', ready: true },
    { id: '28', emoji: '🚀', title: 'النشر على Vercel ومراجعة شاملة لمرحلة React وNext.js', href: 'lesson-28.html', ready: true },
    { id: '29', emoji: '🔷', title: 'مقدمة إلى TypeScript', href: 'lesson-29.html', ready: true },
    { id: '30', emoji: '🧬', title: 'TypeScript المتقدم — Generics وUtility Types', href: 'lesson-30.html', ready: true },
    { id: '31', emoji: '🎓', title: 'مشروع التخرّج الشامل — React وNext.js وTypeScript معاً', href: 'lesson-31.html', ready: true },
    { id: '32', emoji: '🧪', title: 'اختبار الكود — Jest وReact Testing Library', href: 'lesson-32.html', ready: true },
  ];
  window.FEMB_SESSIONS = SESSIONS;

  const PHASES = [
    {
      id: 'html-css', icon: '🌐', num: 1, title: 'HTML &amp; CSS', range: '01–08', hours: 24,
      outcome: 'بناء صفحات ويب احترافية متجاوبة من الصفر',
      sessions: ['01', '02', '03', '04', '05', '06', '07', '08'],
    },
    {
      id: 'javascript', icon: '⚡', num: 2, title: 'JavaScript', range: '09–16', hours: 24,
      outcome: 'برمجة منطق تفاعلي كامل والتعامل مع DOM وواجهات برمجية خارجية',
      sessions: ['09', '10', '11', '12', '13', '14', '15', '16'],
    },
    {
      id: 'react-next', icon: '⚛️', num: 3, title: 'React &amp; Next.js', range: '17–28', hours: 36,
      outcome: 'بناء ونشر تطبيقات ويب حديثة كاملة على الإنترنت فعلياً',
      sessions: ['17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'],
    },
    {
      id: 'typescript', icon: '🔷', num: 4, title: 'TypeScript', range: '29–30', hours: 6,
      outcome: 'كتابة كود أكثر أماناً وثقة بنظام أنواع صارم',
      sessions: ['29', '30'],
    },
    {
      id: 'graduation', icon: '🎓', num: 5, title: 'التخرّج والاختبار', range: '31–32', hours: 6,
      outcome: 'مشروع متكامل منشور فعلياً، مع أساس اختبار كود احترافي',
      sessions: ['31', '32'],
    },
  ];
  window.FEMB_PHASES = PHASES;

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
      const lang = block.getAttribute('data-lang') || 'html';
      const raw = codeEl.textContent;
      if (lang === 'html') {
        codeEl.innerHTML = highlightHTML(raw);
      } else if (lang === 'css') {
        codeEl.innerHTML = highlightCSS(raw);
      } else if (lang === 'javascript' || lang === 'jsx' || lang === 'react' || lang === 'typescript') {
        codeEl.innerHTML = highlightJS(raw);
      } else {
        codeEl.innerHTML = escapeHtml(raw);
      }

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
    initPreviewButtons();
  }

  /* ---------- تشغيل الكود في بيئة معزولة (Console وهمية) — لجلسات JavaScript ---------- */
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

  /* ---------- تلوين CSS (بدون مكتبات خارجية) ---------- */
  function highlightCSS(code) {
    let out = escapeHtml(code);
    out = out.replace(/\/\*[\s\S]*?\*\//g, m => `<span class="tok-com">${m}</span>`);
    out = out.replace(/(&quot;(?:\\.|[^&"\\])*&quot;|&#39;(?:\\.|[^&'\\])*&#39;)/g, m => `<span class="tok-str">${m}</span>`);
    out = out.replace(/#[0-9a-fA-F]{3,8}\b/g, m => `<span class="tok-num">${m}</span>`);
    out = out.replace(/@[a-zA-Z-]+/g, m => `<span class="tok-kw">${m}</span>`);
    out = out.replace(/([a-zA-Z-]+)(\s*:)(?!:)/g, (m, p1, p2) => `<span class="tok-fn">${p1}</span>${p2}`);
    out = out.replace(/([.#]?[a-zA-Z_][\w-]*(?:\s*[,>+~]?\s*[.#:]?[a-zA-Z_][\w-]*)*)(\s*\{)/g, (m, p1, p2) => {
      if (/<span/.test(p1)) return m;
      return `<span class="tok-kw">${p1}</span>${p2}`;
    });
    out = out.replace(/\b(\d+\.?\d*)(px|em|rem|%|vh|vw|fr|deg|s|ms|vmin|vmax)?\b/g, (m, num, unit) => `<span class="tok-num">${num}${unit || ''}</span>`);
    return out;
  }

  /* ---------- المعاينة الحيّة لـ HTML/CSS ---------- */
  function buildPreviewDoc(htmlCode, cssCode) {
    const hasDoc = /<!DOCTYPE/i.test(htmlCode) || /<html[\s>]/i.test(htmlCode);
    if (hasDoc) {
      if (cssCode && /<\/head>/i.test(htmlCode)) return htmlCode.replace(/<\/head>/i, `<style>${cssCode}</style></head>`);
      if (cssCode) return `<style>${cssCode}</style>` + htmlCode;
      return htmlCode;
    }
    return `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">
      <style>body{font-family:'IBM Plex Sans Arabic',sans-serif;margin:16px;color:#1a1a1a;line-height:1.7;}
      ${cssCode || ''}</style></head><body>${htmlCode}</body></html>`;
  }

  function initPreviewButtons() {
    document.querySelectorAll('.preview-group').forEach(group => {
      const btn = group.querySelector('.preview-btn');
      const wrap = group.querySelector('.live-preview-wrap');
      const frame = group.querySelector('.live-preview-frame');
      const closeBtn = group.querySelector('.live-preview-close');
      if (!btn || !wrap || !frame) return;
      btn.addEventListener('click', () => {
        const htmlCode = group.querySelector('[data-role="html-code"]')?.textContent || '';
        const cssCode = group.querySelector('[data-role="css-code"]')?.textContent || '';
        frame.srcdoc = buildPreviewDoc(htmlCode, cssCode);
        wrap.classList.add('show');
        wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
      if (closeBtn) closeBtn.addEventListener('click', () => wrap.classList.remove('show'));
    });
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
    const frame = document.querySelector('[data-hero-frame]');
    if (!el) return;
    const htmlLines = [
      '<div class="card">',
      '  <span class="badge">✨ أول مشروع</span>',
      '  <h3>مرحباً أيها المطوّر!</h3>',
      '  <p>من هنا تبدأ رحلتك في تطوير الويب</p>',
      '  <div class="tags">',
      '    <span>HTML</span>',
      '    <span>CSS</span>',
      '    <span>JS</span>',
      '  </div>',
      '</div>',
    ];
    const cssLines = [
      '.card {',
      '  text-align: center;',
      '  padding: 32px 28px;',
      '  border-radius: 18px;',
      '  background: linear-gradient(135deg,#eef4ff,#fff);',
      '  box-shadow: 0 10px 30px rgba(20,40,80,.12);',
      '}',
      '.badge {',
      '  display: inline-block;',
      '  background: #fef3e2; color: #b45309;',
      '  font-size: 12px; font-weight: 700;',
      '  padding: 5px 12px; border-radius: 100px;',
      '}',
      '.tags { display: flex; gap: 8px; justify-content: center; }',
      '.tags span {',
      '  background: #eef2ff; color: #4338ca;',
      '  font-size: 12px; font-weight: 700;',
      '  padding: 4px 10px; border-radius: 8px;',
      '}',
    ];
    const full = htmlLines.join('\n') + '\n\n' + cssLines.join('\n');
    const cssOnly = cssLines.join('\n');
    const htmlOnly = htmlLines.join('\n');
    let i = 0;
    const cursor = '<span class="terminal-cursor"></span>';

    function tick() {
      if (i <= full.length) {
        el.innerHTML = highlightHTML(full.slice(0, Math.min(i, htmlOnly.length))) +
          (i > htmlOnly.length ? '\n\n' + highlightCSS(full.slice(htmlOnly.length + 2, i)) : '') + cursor;
        if (el.parentElement) el.parentElement.scrollTop = el.parentElement.scrollHeight;
        i += 3;
        setTimeout(tick, 16);
      } else {
        if (frame) {
          frame.srcdoc = `<!DOCTYPE html><html dir="rtl"><head><meta charset="UTF-8"><style>
            body{display:flex;align-items:center;justify-content:center;height:100vh;margin:0;
            font-family:'IBM Plex Sans Arabic',sans-serif;background:#fafcff;}
            .card h3{margin:14px 0 6px;color:#101826;font-size:19px;}
            .card p{color:#6b7280;font-size:13px;margin:0 0 16px;}
            ${cssOnly}</style></head><body>${htmlOnly}</body></html>`;
        }
        setTimeout(() => { i = 0; tick(); }, 3200);
      }
    }
    tick();
  }

  /* ---------- بناء شبكة الدروس في الصفحة الرئيسية ---------- */
  /* ---------- خريطة المسار (Roadmap) ---------- */
  function initRoadmap() {
    const container = document.querySelector('[data-roadmap]');
    if (!container) return;
    const progress = getProgress();

    function phaseDone(phase) {
      return phase.sessions.every(id => !!progress[id]);
    }

    const parts = [];
    PHASES.forEach((phase, i) => {
      const done = phaseDone(phase);
      parts.push(`
        <a href="#phase-${phase.id}" class="roadmap-node${done ? ' done' : ''}">
          <span class="node-circle">${phase.icon}<span class="node-num">${phase.num}</span></span>
          <span class="node-title">${phase.title}</span>
          <span class="node-range">${phase.range} · ${phase.hours} س</span>
        </a>`);
      if (i < PHASES.length - 1) {
        parts.push(`<div class="roadmap-line${done ? ' done' : ''}"></div>`);
      }
    });
    container.innerHTML = parts.join('');
  }

  /* ---------- ملخص التقدّم العام ---------- */
  function initOverviewProgress() {
    const el = document.querySelector('[data-overview-progress]');
    if (!el) return;
    const progress = getProgress();
    const doneCount = SESSIONS.filter(s => !!progress[s.id]).length;
    const pct = Math.round((doneCount / SESSIONS.length) * 100);
    const track = el.querySelector('.fill');
    const label = el.querySelector('span');
    if (track) track.style.width = pct + '%';
    if (label) label.textContent = doneCount === 0
      ? `${SESSIONS.length} جلسة أمامك — ابدأ رحلتك الآن`
      : `أكملت ${doneCount} من ${SESSIONS.length} جلسة (${pct}%)`;
  }

  /* ---------- شبكة الجلسات مُقسَّمة حسب المرحلة ---------- */
  function initLessonsGrid() {
    const container = document.querySelector('[data-lessons-grid]');
    if (!container) return;
    const progress = getProgress();
    const topics = {
      '01': 'كيف يعمل الويب • أدوات VS Code • أول صفحة HTML • العناصر الأساسية',
      '02': 'الجداول • النماذج • Semantic HTML • الوسائط',
      '03': 'المحددات • الألوان • الخطوط • نموذج الصندوق (Box Model)',
      '04': 'المحاور • justify-content • align-items • أنماط تخطيط شائعة',
      '05': 'الأعمدة والصفوف • fr وrepeat وminmax • grid-template-areas',
      '06': 'Media Queries • Mobile-First • الوحدات المرنة',
      '07': 'Transitions • Keyframes • Transform',
      '08': 'مشروع شامل يجمع HTML وCSS معاً + Git وGitHub Pages',
      '09': 'المتغيرات • أنواع البيانات • العمليات • التحكم بالتدفق • الدوال',
      '10': 'تحديد العناصر • التعديل • الإنشاء • الأحداث • To-Do List',
      '11': 'map • filter • reduce • Destructuring • Spread • Optional Chaining',
      '12': 'Callbacks • Promises • async/await • Fetch API',
      '13': 'localStorage • sessionStorage • Cookies • IndexedDB',
      '14': 'Classes • Encapsulation • Inheritance • Polymorphism',
      '15': 'ES Modules • Map & Set • Symbol • Iterators • Generators',
      '16': 'مراجعة شاملة • ES2023/2024 • المشروع النهائي',
      '17': 'JSX • Components • Props • Vite • Virtual DOM',
      '18': 'useState • State مقابل Props • Immutability • Controlled Inputs • Lifting State Up',
      '19': 'useEffect • Dependency Array • Cleanup Function • جلب البيانات (Fetch)',
      '20': 'useRef • useState مقابل useRef • Custom Hooks • useFetch • useLocalStorage',
      '21': 'Prop Drilling • Context API • Provider • useContext • نظام Theme',
      '22': 'react-router-dom • Routes/Route • Link/NavLink • Route Parameters • useNavigate',
      '23': 'Nested Routes • Outlet • Layout Route • Index Route • Protected Routes',
      '24': 'React.memo • useMemo • useCallback • Shallow Comparison • متى نُحسِّن فعلاً',
      '25': 'useReducer • state/dispatch/reducer • Actions • useReducer + Context',
      '26': 'File-based Routing • Server Components • Client Components • SSR/SSG',
      '27': 'Data Fetching • Caching/Revalidation • API Routes • GET/POST',
      '28': 'Vercel Deployment • Environment Variables • مراجعة شاملة • مشروع التخرّج',
      '29': 'لماذا TypeScript • الأنواع الأساسية • Interfaces • TypeScript مع React',
      '30': 'Generics • Union/Intersection Types • Partial/Pick/Omit/Record • Hooks مخصَّصة',
      '31': 'مشروع تخرّج شامل • أنواع مشتركة • Context+useReducer • API Routes • نشر نهائي',
      '32': 'Jest • React Testing Library • fireEvent • jest.fn() • Unit/Integration Tests',
    };

    function renderCard(s) {
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
    }

    container.innerHTML = PHASES.map(phase => {
      const phaseSessions = phase.sessions
        .map(id => SESSIONS.find(s => s.id === id))
        .filter(Boolean);
      const cardsHtml = phaseSessions.map(renderCard).join('');
      return `
      <section id="phase-${phase.id}" class="phase-section">
        <div class="phase-header">
          <span class="phase-icon">${phase.icon}</span>
          <div class="phase-header-text">
            <span class="phase-eyebrow">المرحلة ${phase.num} · الجلسات ${phase.range} · ${phase.hours} ساعة</span>
            <h3>${phase.title}</h3>
            <p class="phase-outcome"><span class="check">✅</span> ستكون قادراً على: ${phase.outcome}</p>
          </div>
        </div>
        <div class="lessons-grid">${cardsHtml}</div>
      </section>`;
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
    initRoadmap();
    initOverviewProgress();
    initLessonsGrid();
    markActiveNav();

    /* أزرار السابق/التالي المعطّلة لا تتفاعل */
    document.querySelectorAll('.nav-arrow.is-disabled').forEach(a => a.addEventListener('click', e => e.preventDefault()));
  });
})();