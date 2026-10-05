(() => {
    const header = document.querySelector('.header');
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    // Sombra na navbar ao rolar
    const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Menu mobile
    if (toggle && nav) {
        const set = (open) => {
            nav.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', String(open));
        };
        toggle.addEventListener('click', () => set(!nav.classList.contains('is-open')));
        nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
    }

    // Animação de entrada com leve escalonamento
    if (!('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll(
        '.section-tagline-wrapper, .section-title, .section-description, .card, .dual-card, .alert-box, ' +
        '.maturity-table-wrapper, .mock-ui, .btn-flow, .stats__grid, .subsection-title, .final-cta__form'
    );
    const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
            if (!en.isIntersecting) return;
            en.target.classList.add('is-visible');
            io.unobserve(en.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((el) => {
        const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('card') || c.classList.contains('dual-card') || c.classList.contains('btn-flow'));
        const i = siblings.indexOf(el);
        if (i > 0) el.style.transitionDelay = `${Math.min(i, 5) * 80}ms`;
        el.classList.add('reveal');
        io.observe(el);
    });
})();
