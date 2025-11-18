"use strict";

import { OrchidsCollection  } from "../classes/orchidsCollection.js";
import { Orchid } from "../classes/orchid.js";


// no card fazer on click para fazer 
export const scrollabeDiv = (header, type) => {
    const page = document.createElement('div');
    page.classList.add('scrollable-container');

    const createBtn = document.createElement('span');
    createBtn.textContent = "+ Create Orchid";
    createBtn.classList.add('create-btn');

    const inner = document.createElement('ul');

    const data = new OrchidsCollection();
    
    if (type === "TODOS") {
        data.getTodos.forEach(orchid => {
            const li = document.createElement('li');
            li.classList.add('orchid');

            // Cria um span para o texto (ID + nome)
            const textSpan = document.createElement('span');
            textSpan.textContent = `${orchid.getId()} - ${orchid.getDescription()}`;

            // Cria o menu span
            const liMenu = document.createElement('span');
            liMenu.classList.add('orchid-menu');
            liMenu.textContent = ":";

            // Adiciona ambos ao li (ordem: texto primeiro, menu depois)
            li.appendChild(textSpan);
            li.appendChild(liMenu);

            inner.appendChild(li);
        });
    }

    inner.classList.add('scrollable-content');

    page.appendChild(createBtn);
    page.appendChild(inner);

    window.location.hash = `#card-${encodeURIComponent(header)}`;

    return page;
}