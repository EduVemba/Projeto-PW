"use strict";

export function createCard(...content){
    const card = document.createElement('div');
    card.classList.add('card');

    content.forEach(item => {
       if (typeof item === 'string') {
            const textEl = document.createElement('p');
            textEl.textContent = item;
            card.appendChild(textEl);
        } else {
            card.appendChild(item);
        }
    });

    return card;
}