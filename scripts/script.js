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

    const openModal = function (e) {
        e.preventDefault();

        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    };

    const closeModal = function () {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    };

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
});
