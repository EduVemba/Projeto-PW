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
    //TODO melhorar
    header.className = 'site-header';
    header.appendChild(title);
    header.appendChild(createMenuButton('Géneros', '#genus'));
    header.appendChild(createMenuButton('Tipos', '#type'));
    header.appendChild(createMenuButton('Luminosidades', '#luminosity'));
    header.appendChild(createMenuButton('Temperaturas', '#temperature'));
    header.appendChild(createMenuButton('Humidades', '#humidity'));
    header.appendChild(createMenuButton('Tamanhos', '#size'));
    header.appendChild(createMenuButton('Todas', '#todas'));
    header.appendChild(createMenuButton('Sobre','#about'));

    return header;
}