"use strict";

import { createMenuButton } from './menu.js';

export function createHeader() {
    const header = document.createElement('header');
    const logo = document.createElement('img');
    logo.src = './images/logo/image.png';
    logo.className = 'site-logo';
    logo.alt = 'Orchids Logo';
    
    const title = document.createElement('div');
    const titleText = document.createElement('span');
    titleText.textContent = 'The Orchids Site';
    title.className = 'site-title';
    
    title.appendChild(logo);
    title.appendChild(titleText);
    
    header.className = 'site-header';
    header.appendChild(title);
    header.appendChild(createMenuButton('Géneros', '#orchids'));
    header.appendChild(createMenuButton('Tipos', '#tipos'));
    header.appendChild(createMenuButton('Luminosidades', '#luminosidades'));
    header.appendChild(createMenuButton('Temperaturas', '#temperaturas'));
    header.appendChild(createMenuButton('Humidades', '#humidades'));
    header.appendChild(createMenuButton('Tamanhos', '#tamanhos'));
    header.appendChild(createMenuButton('Todas', '#todas'));
    header.appendChild(createMenuButton('Sobre','#about'));

    return header;
}