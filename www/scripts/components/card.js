"use strict";

//TODO: vai ir para a pagina de cada planta com uma lista que permite que possa ver elas individualmente
export function createCard(path,content /*windowContent*/) {
    const card = document.createElement('div');

    const image = document.createElement('img');
    image.src = `./images/${path}/${content}.png`
    image.classList.add('card-logo');

    card.appendChild(image);
    card.classList.add('card');

    return card;
}