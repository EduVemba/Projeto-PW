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
    header.appendChild(createMenuButton('Generos', '#'));
    header.appendChild(createMenuButton('Tipos', '#tipos'));
    header.appendChild(createMenuButton('Luminosidades', '#orchids'));
    header.appendChild(createMenuButton('Temperaturas', '#contact'));
    header.appendChild(createMenuButton('Humidades', '#contact'));
    header.appendChild(createMenuButton('Tamanhos', '#contact'));
    header.appendChild(createMenuButton('Todas', '#contact'));
    return header;
}