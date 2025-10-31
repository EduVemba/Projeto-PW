import { createMenuButton } from './menu.js';

export function createHeader() {
    const header = document.createElement('header');
    //TODO: Adicionar conteudo no cabeçalho (menu, logo, etc.)
    const title = document.createElement('div');
    title.textContent = 'The Orchids Site';
    title.className = 'site-title';
    
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