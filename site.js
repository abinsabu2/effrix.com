// Shared site chrome for effrix.com: theme tokens, header/menu, footer,
// Amazon marketplace links and the image lightbox. Load after the Tailwind
// CDN and Lucide scripts in <head>.

// Material 3 dark tonal palette, seeded from Telegram blue
tailwind.config = {
    theme: {
        extend: {
            fontFamily: { sans: ['"Roboto Flex"', 'system-ui', 'sans-serif'] },
            colors: {
                md: {
                    primary: '#8ecdff',
                    'on-primary': '#00344e',
                    'primary-container': '#004b6f',
                    'on-primary-container': '#c9e6ff',
                    'secondary-container': '#344956',
                    'on-secondary-container': '#cfe5f5',
                    tertiary: '#ffb951',
                    'tertiary-container': '#5c4200',
                    'on-tertiary-container': '#ffdeac',
                    surface: '#0f1418',
                    'surface-lowest': '#0a0f12',
                    'surface-low': '#171c20',
                    'surface-container': '#1b2024',
                    'surface-high': '#252b2f',
                    'surface-highest': '#30363a',
                    'on-surface': '#dee3e8',
                    'on-surface-variant': '#c0c7cf',
                    outline: '#8a9199',
                    'outline-variant': '#40484f'
                },
                telegram: '#229ED9'
            },
            boxShadow: {
                e1: '0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15)',
                e2: '0 1px 2px rgba(0,0,0,.3), 0 2px 6px 2px rgba(0,0,0,.15)',
                e3: '0 4px 8px 3px rgba(0,0,0,.15), 0 1px 3px rgba(0,0,0,.3)'
            }
        }
    }
};

document.head.insertAdjacentHTML('beforeend', '<style>' +
    /* M3 state layer: hover/focus tint on interactive surfaces */
    '.state{position:relative;overflow:hidden;isolation:isolate}' +
    '.state::after{content:"";position:absolute;inset:0;background:currentColor;opacity:0;transition:opacity .2s;pointer-events:none;z-index:-1}' +
    '.state:hover::after{opacity:.08}.state:focus-visible::after,.state:active::after{opacity:.12}' +
    'section[id],article[id]{scroll-margin-top:4rem}' +
    '#lightbox{width:100vw;height:100dvh;max-width:none;max-height:none;margin:0;padding:0;border:0;background:rgba(5,8,10,.97);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);color:#dee3e8}' +
    '#lightbox::backdrop{background:transparent}' +
    'html.lb-open{overflow:hidden}' +
    '</style>');

(function () {
    var NAV = [
        ['/#features', 'Features'],
        ['/#screenshots', 'Screenshots'],
        ['/#login', 'How to log in'],
        ['/#download', 'Download APK'],
        ['/#open-source', 'Open source'],
        ['/books.html', 'Books']
    ];
    var GITHUB_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>';

    function isCurrent(href) {
        var path = location.pathname.replace(/index\.html$/, '');
        return href.indexOf('#') < 0 && href === path;
    }

    function links(cls) {
        return NAV.map(function (n) {
            var cur = isCurrent(n[0]);
            return '<a href="' + n[0] + '" class="' + cls + (cur ? ' text-md-primary' : '') + '"' + (cur ? ' aria-current="page"' : '') + '>' + n[1] + '</a>';
        }).join('');
    }

    function renderHeader() {
        document.body.insertAdjacentHTML('afterbegin',
            '<header class="fixed top-0 w-full bg-md-surface/85 backdrop-blur-xl z-50 border-b border-md-outline-variant/40">' +
                '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">' +
                    '<a href="/" class="flex items-center gap-3 shrink-0" aria-label="Effrix home">' +
                        '<img src="/logo.svg" alt="" class="h-9 w-9" width="36" height="36">' +
                        '<span class="font-semibold tracking-tight text-md-on-surface">gPlayer</span>' +
                    '</a>' +
                    '<nav aria-label="Main" class="hidden lg:flex items-center gap-1 text-sm font-medium text-md-on-surface-variant">' +
                        links('state px-4 py-2 rounded-full hover:text-md-on-surface') +
                    '</nav>' +
                    '<div class="flex items-center gap-2">' +
                        '<a href="https://www.amazon.com/dp/B0H85JCRT1" data-asin="B0H85JCRT1" target="_blank" rel="noopener" class="state bg-md-primary text-md-on-primary font-medium text-sm h-10 px-5 rounded-full flex items-center gap-2 shrink-0"><i data-lucide="tv" class="w-4 h-4"></i> Get gPlayer</a>' +
                        '<button type="button" id="menu-btn" class="state lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-md-on-surface" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><i data-lucide="menu" class="w-6 h-6"></i></button>' +
                    '</div>' +
                '</div>' +
                '<nav id="mobile-menu" aria-label="Main" hidden class="lg:hidden border-t border-md-outline-variant/40 bg-md-surface px-4 py-3">' +
                    '<div class="max-w-7xl mx-auto grid gap-1 text-base font-medium text-md-on-surface-variant">' +
                        links('state px-4 py-3 rounded-2xl hover:text-md-on-surface') +
                    '</div>' +
                '</nav>' +
            '</header>');

        var btn = document.getElementById('menu-btn'), menu = document.getElementById('mobile-menu');
        function setOpen(open) {
            menu.hidden = !open;
            btn.setAttribute('aria-expanded', open);
            btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            btn.innerHTML = '<i data-lucide="' + (open ? 'x' : 'menu') + '" class="w-6 h-6"></i>';
            lucide.createIcons();
        }
        btn.addEventListener('click', function () { setOpen(menu.hidden); });
        menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setOpen(false); btn.focus(); } });
    }

    function renderFooter() {
        document.body.insertAdjacentHTML('beforeend',
            '<footer class="py-8 bg-md-surface-lowest text-xs text-md-on-surface-variant">' +
                '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">' +
                    '<div class="flex items-center gap-3"><img src="/logo.svg" alt="" class="h-6 w-6" width="24" height="24"> &copy; ' + new Date().getFullYear() + ' Effrix (effrix.com). All rights reserved.</div>' +
                    '<nav aria-label="Footer" class="flex flex-wrap justify-center gap-x-6 gap-y-2">' +
                        '<a href="/privacy.html" class="hover:text-md-on-surface">Privacy Policy</a>' +
                        '<a href="/terms.html" class="hover:text-md-on-surface">Terms &amp; Conditions</a>' +
                        '<a href="/books.html" class="hover:text-md-on-surface">Books</a>' +
                        '<a href="https://github.com/abinsabu2/GrammPlayer" target="_blank" rel="noopener" class="hover:text-md-on-surface inline-flex items-center gap-1.5">' + GITHUB_SVG + ' GitHub</a>' +
                        '<a href="https://www.amazon.com/dp/B0H85JCRT1" data-asin="B0H85JCRT1" target="_blank" rel="noopener" class="hover:text-md-on-surface">Amazon Appstore</a>' +
                    '</nav>' +
                '</div>' +
            '</footer>');
    }

    // Amazon marketplace: rewrites a[data-asin] / a[data-search] to the visitor's store.
    // A form[data-marketplace] with a "marketplace" control (select or radios) lets them pick.
    function initMarketplace() {
        var domains = { US: 'amazon.com', UK: 'amazon.co.uk', GB: 'amazon.co.uk', DE: 'amazon.de', FR: 'amazon.fr', ES: 'amazon.es', IT: 'amazon.it', NL: 'amazon.nl', PL: 'amazon.pl', SE: 'amazon.se', BE: 'amazon.com.be', IE: 'amazon.ie', JP: 'amazon.co.jp', CA: 'amazon.ca', AU: 'amazon.com.au', MX: 'amazon.com.mx', BR: 'amazon.com.br', IN: 'amazon.in', SG: 'amazon.sg', AE: 'amazon.ae', SA: 'amazon.sa', TR: 'amazon.com.tr', EG: 'amazon.eg' };
        var tzMap = { 'Europe/London': 'UK', 'Europe/Berlin': 'DE', 'Europe/Paris': 'FR', 'Europe/Rome': 'IT', 'Europe/Madrid': 'ES', 'Europe/Amsterdam': 'NL', 'Europe/Warsaw': 'PL', 'Europe/Stockholm': 'SE', 'Europe/Brussels': 'BE', 'Europe/Dublin': 'IE', 'Asia/Tokyo': 'JP', 'America/Toronto': 'CA', 'America/Vancouver': 'CA', 'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU', 'America/Mexico_City': 'MX', 'America/Sao_Paulo': 'BR', 'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN', 'Asia/Singapore': 'SG', 'Asia/Dubai': 'AE', 'Asia/Riyadh': 'SA', 'Europe/Istanbul': 'TR', 'Africa/Cairo': 'EG' };
        var KEY = 'effrix_marketplace';
        var form = document.querySelector('form[data-marketplace]');

        function guess() {
            var ls = navigator.languages || [navigator.language || ''];
            for (var i = 0; i < ls.length; i++) {
                var m = (ls[i] || '').match(/-([a-zA-Z]{2})(?:-|$)/);
                if (m) { var cc = m[1].toUpperCase(); if (domains[cc]) return cc === 'GB' ? 'UK' : cc; }
            }
            try { var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; if (tzMap[tz]) return tzMap[tz]; } catch (e) {}
            return 'US';
        }
        function apply(code) {
            var d = domains[code] || 'amazon.com';
            document.querySelectorAll('[data-marketplace-label]').forEach(function (el) { el.textContent = code + ' · ' + d; });
            document.querySelectorAll('a[data-asin]').forEach(function (a) { a.href = 'https://www.' + d + '/dp/' + a.getAttribute('data-asin'); });
            document.querySelectorAll('a[data-search]').forEach(function (a) { a.href = 'https://www.' + d + '/s?k=' + encodeURIComponent(a.getAttribute('data-search')); });
            document.querySelectorAll('.marketplace-suffix').forEach(function (el) { el.textContent = '· ' + code; });
            if (form) {
                var c = form.elements.marketplace;
                if (c && form.querySelector('[value="' + code + '"]')) c.value = code;
            }
        }

        var initial = null;
        try { var p = new URLSearchParams(location.search).get('marketplace'); if (p) initial = p.toUpperCase(); } catch (e) {}
        if (!initial) try { initial = localStorage.getItem(KEY); } catch (e) {}
        if (!initial || !domains[initial]) initial = guess();
        apply(initial);

        if (form) form.addEventListener('change', function (e) {
            if (e.target.name !== 'marketplace') return;
            var c = e.target.value;
            try { localStorage.setItem(KEY, c); } catch (err) {}
            try { var u = new URL(location.href); u.searchParams.set('marketplace', c); history.replaceState(null, '', u); } catch (err) {}
            apply(c);
        });
    }

    // Lightbox: every a[data-lightbox] inside a [data-gallery] opens the gallery
    // in a native <dialog>. Links point at the full image, so no-JS still works.
    function initLightbox() {
        var dlg, img, cap, count, thumbs, items = [], idx = 0;

        function build() {
            document.body.insertAdjacentHTML('beforeend',
                '<dialog id="lightbox" aria-label="Image gallery">' +
                    '<div class="w-full h-full flex flex-col">' +
                        '<div class="flex items-center justify-between gap-4 px-4 sm:px-6 h-16 shrink-0">' +
                            '<p class="text-sm min-w-0"><span id="lb-count" class="font-medium text-md-primary"></span> <span id="lb-cap" class="text-md-on-surface-variant"></span></p>' +
                            '<button type="button" data-lb="close" class="state w-11 h-11 rounded-full flex items-center justify-center shrink-0" aria-label="Close gallery"><i data-lucide="x" class="w-6 h-6"></i></button>' +
                        '</div>' +
                        '<div id="lb-stage" class="flex-1 min-h-0 flex items-center justify-center gap-2 sm:gap-4 px-2 sm:px-6">' +
                            '<button type="button" data-lb="prev" class="state w-12 h-12 rounded-full bg-md-surface-high/80 flex items-center justify-center shrink-0" aria-label="Previous image"><i data-lucide="chevron-left" class="w-6 h-6"></i></button>' +
                            '<img id="lb-img" alt="" class="max-w-full max-h-full min-w-0 object-contain rounded-2xl shadow-e3 select-none">' +
                            '<button type="button" data-lb="next" class="state w-12 h-12 rounded-full bg-md-surface-high/80 flex items-center justify-center shrink-0" aria-label="Next image"><i data-lucide="chevron-right" class="w-6 h-6"></i></button>' +
                        '</div>' +
                        '<div id="lb-thumbs" class="shrink-0 flex gap-2 overflow-x-auto px-4 sm:px-6 py-4 justify-start sm:justify-center"></div>' +
                    '</div>' +
                '</dialog>');
            dlg = document.getElementById('lightbox');
            img = document.getElementById('lb-img');
            cap = document.getElementById('lb-cap');
            count = document.getElementById('lb-count');
            thumbs = document.getElementById('lb-thumbs');

            dlg.addEventListener('click', function (e) {
                var b = e.target.closest('[data-lb]');
                if (b) {
                    var a = b.getAttribute('data-lb');
                    if (a === 'close') dlg.close();
                    else if (a === 'prev') show(idx - 1);
                    else if (a === 'next') show(idx + 1);
                    else show(+a);
                } else if (e.target.id === 'lb-stage') dlg.close();
            });
            dlg.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowLeft') show(idx - 1);
                else if (e.key === 'ArrowRight') show(idx + 1);
            });
            var x0 = null;
            img.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
            img.addEventListener('pointerup', function (e) {
                if (x0 !== null && Math.abs(e.clientX - x0) > 40) show(idx + (e.clientX < x0 ? 1 : -1));
                x0 = null;
            });
            dlg.addEventListener('close', function () { document.documentElement.classList.remove('lb-open'); });
            lucide.createIcons();
        }

        function show(i) {
            idx = (i + items.length) % items.length;
            var it = items[idx];
            img.src = it.src;
            img.alt = it.alt;
            cap.textContent = it.caption;
            count.textContent = (idx + 1) + ' / ' + items.length;
            thumbs.querySelectorAll('button').forEach(function (b, j) {
                b.classList.toggle('ring-2', j === idx);
                b.classList.toggle('opacity-50', j !== idx);
                if (j === idx) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
            });
            var cur = thumbs.children[idx];
            if (cur) cur.scrollIntoView({ block: 'nearest', inline: 'center' });
        }

        document.addEventListener('click', function (e) {
            var a = e.target.closest('a[data-lightbox]');
            if (!a || e.ctrlKey || e.metaKey || e.shiftKey) return;
            e.preventDefault();
            if (!dlg) build();
            var links = Array.prototype.slice.call(a.closest('[data-gallery]').querySelectorAll('a[data-lightbox]'));
            items = links.map(function (l) {
                var t = l.querySelector('img'), f = l.closest('figure');
                var fc = f && f.querySelector('figcaption');
                return { src: l.href, thumb: t ? t.currentSrc || t.src : l.href, alt: t ? t.alt : '', caption: fc ? fc.textContent.trim() : (t ? t.alt : '') };
            });
            var single = items.length < 2;
            dlg.querySelectorAll('[data-lb="prev"],[data-lb="next"]').forEach(function (b) { b.hidden = single; });
            thumbs.hidden = single;
            thumbs.innerHTML = items.map(function (it, j) {
                return '<button type="button" data-lb="' + j + '" class="shrink-0 w-24 sm:w-28 aspect-video rounded-xl overflow-hidden ring-md-primary transition-opacity hover:opacity-100" aria-label="Show image ' + (j + 1) + '"><img src="' + it.thumb + '" alt="" class="w-full h-full object-cover"></button>';
            }).join('');
            document.documentElement.classList.add('lb-open');
            dlg.showModal();
            show(links.indexOf(a));
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        renderHeader();
        renderFooter();
        initMarketplace();
        initLightbox();
        lucide.createIcons();
    });
})();
