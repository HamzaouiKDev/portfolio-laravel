(function () {
    const animatedNodes = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
    });

    animatedNodes.forEach((node) => observer.observe(node));

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach((card) => {
        const bounds = card.getBoundingClientRect();
        const strength = 12;

        const handleMove = (event) => {
            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;
            const rotateY = ((x / bounds.width) - 0.5) * strength;
            const rotateX = -((y / bounds.height) - 0.5) * strength;
            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        };

        const handleLeave = () => {
            card.style.transform = '';
        };

        card.addEventListener('mousemove', handleMove);
        card.addEventListener('mouseleave', handleLeave);
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

            if (navLinks?.classList.contains('is-open')) {
                navLinks.classList.remove('is-open');
                navToggle?.setAttribute('aria-expanded', 'false');
            }
        });
    });
})();
