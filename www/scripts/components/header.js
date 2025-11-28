"use strict";

import { createMenuButton } from './menu.js';

export function createHeader() {
    const header = document.createElement('header');

    // LOGO + TITLE
    const logo = document.createElement('img');
    logo.src = './images/logo/image.png';
    logo.className = 'site-logo';
    logo.alt = 'Orchids Logo';

    const title = document.createElement('div');
    title.className = 'site-title';

    const titleText = document.createElement('span');
    titleText.textContent = 'The Orchids Site';

    title.appendChild(logo);
    title.appendChild(titleText);

    const menu = document.createElement('div');
    menu.className = 'menu-reference';

    menu.appendChild(createMenuButton('Géneros', '#genus'));
    menu.appendChild(createMenuButton('Tipos', '#type'));
    menu.appendChild(createMenuButton('Luminosidades', '#luminosity'));
    menu.appendChild(createMenuButton('Temperaturas', '#temperature'));
    menu.appendChild(createMenuButton('Humidades', '#humidity'));
    menu.appendChild(createMenuButton('Tamanhos', '#size'));
    menu.appendChild(createMenuButton('Todas', '#todas'));
    menu.appendChild(createMenuButton('Sobre', '#about'));

    const burger = document.createElement('div');
    burger.className = 'burger';
    burger.innerText = '☰';

    burger.addEventListener('click', () => {
        menu.classList.toggle('menu-open');
    });

    header.className = 'site-header';
    header.appendChild(title);
    header.appendChild(menu);
    header.appendChild(burger);

    return header;
}
