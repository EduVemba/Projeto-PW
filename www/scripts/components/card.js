"use strict";

import { scrollabeDiv } from "./scrollable.js";

//TODO: vai ir para a pagina de cada planta com uma lista que permite que possa ver elas individualmente
export function createCard(name, path,content) {
    const card = document.createElement('div');
    const cardName = document.createElement('p')
    cardName.textContent = name;

    const image = document.createElement('img');
    image.src = `./images/${path}/${content}.png`
    image.classList.add('card-logo');

    card.appendChild(cardName);
    card.appendChild(image);
    card.classList.add('card');

    
    card.addEventListener('click', () => {
        const page = scrollabeDiv(name, content);
        const mainContent = document.querySelector('.main-content');
        
        while(mainContent.firstChild) {
            mainContent.removeChild(mainContent.firstChild);
        };
        mainContent.appendChild(page); 
    });
    

    return card;
}