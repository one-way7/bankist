'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const btnCloseModal = document.querySelector('.btn--close-modal');
    const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
    const btnScrollTo = document.querySelector('.btn--scroll-to');
    const section1 = document.querySelector('#section--1');
    const navLinks = document.querySelector('.nav__links');
    const tabsContainer = document.querySelector('.operations__tab-container');
    const tabsOperations = document.querySelectorAll('.operations__tab');
    const contentsOperations = document.querySelectorAll(
        '.operations__content',
    );
    const nav = document.querySelector('.nav');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('.section');
    const imgTargets = document.querySelectorAll('img[data-src]');

    const openModal = e => {
        e.preventDefault();

        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    };

    const closeModal = () => {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    };

    const handleHover = (e, opacityValue) => {
        if (e.target.classList.contains('nav__link')) {
            const link = e.target;
            const siblings = link
                .closest('.nav')
                .querySelectorAll('.nav__link');
            const img = link.closest('.nav').querySelector('img');

            siblings.forEach(elem => {
                if (elem !== link) elem.style.opacity = opacityValue;
            });
            img.style.opacity = opacityValue;
        }
    };

    const stickyNav = entries => {
        const [entry] = entries;

        if (!entry.isIntersecting) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    };

    const navHeight = nav.getBoundingClientRect().height;

    const headerObserver = new IntersectionObserver(stickyNav, {
        root: null,
        threshold: 0,
        rootMargin: `-${navHeight}px`,
    });

    headerObserver.observe(header);

    const revealSection = (entries, observer) => {
        const [entry] = entries;

        if (!entry.isIntersecting) return;

        entry.target.classList.remove('section--hidden');

        observer.unobserve(entry.target);
    };

    const sectionsObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sections.forEach(section => {
        section.classList.add('section--hidden');
        sectionsObserver.observe(section);
    });

    const loadImg = (entries, observe) => {
        const [entry] = entries;
        const img = entry.target;

        if (!entry.isIntersecting) return;

        img.src = img.dataset.src;
        img.addEventListener('load', () => img.classList.remove('lazy-img'));

        observe.unobserve(img);
    };

    const imgObserver = new IntersectionObserver(loadImg, {
        root: null,
        threshold: 0,
        rootMargin: '200px',
    });

    imgTargets.forEach(img => imgObserver.observe(img));

    btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

    btnCloseModal.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    btnScrollTo.addEventListener('click', () => {
        section1.scrollIntoView({ behavior: 'smooth' });
    });

    navLinks.addEventListener('click', e => {
        e.preventDefault();
        if (e.target.classList.contains('nav__link')) {
            const id = e.target.getAttribute('href');
            document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
        }
    });

    tabsContainer.addEventListener('click', e => {
        const tab = e.target.closest('.operations__tab');

        if (!tab) return;

        tabsOperations.forEach(tab =>
            tab.classList.remove('operations__tab--active'),
        );
        tab.classList.add('operations__tab--active');

        contentsOperations.forEach(content =>
            content.classList.remove('operations__content--active'),
        );
        console.log(tab.dataset.tab);
        document
            .querySelector(`.operations__content--${tab.dataset.tab}`)
            .classList.add('operations__content--active');
    });

    nav.addEventListener('mouseover', e => handleHover(e, 0.5));
    nav.addEventListener('mouseout', e => handleHover(e, 1));
});
