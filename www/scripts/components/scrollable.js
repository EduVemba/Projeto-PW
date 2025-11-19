"use strict";

import { OrchidsCollection  } from "../classes/orchidsCollection.js";
import { createOrchidForm } from "./formOrchids.js"


// no card fazer on click para fazer 
export const scrollabeDiv = (header, type) => {
    const page = document.createElement('div');
    page.classList.add('scrollable-container');

    const createBtn = document.createElement('span');

    createBtn.textContent = "+ Create Orchid";
    createBtn.classList.add('create-btn');

    createBtn.addEventListener('click', () => {
        const form = createOrchidForm();
        
        const mainContent = document.querySelector('.main-content')
        
        while(mainContent.firstChild){
            mainContent.removeChild(mainContent.firstChild);    
        }

        mainContent.appendChild(form);
    })

    const inner = document.createElement('ul');

    const data = new OrchidsCollection();
    
    if (type === "TODOS") {
        data.getTodos.forEach(orchid => {
            const hr = document.createElement('hr');
            hr.className = "ul-hr"

            const li = document.createElement('li');
            li.classList.add('orchid');

            const textSpan = document.createElement('span');
            textSpan.textContent = `${orchid.getId()} - ${orchid.getDescription()}`;

            const liMenu = document.createElement('span');
            liMenu.classList.add('orchid-menu');
            liMenu.textContent = ":";

            li.appendChild(textSpan);
            li.appendChild(liMenu);

            inner.appendChild(hr)
            inner.appendChild(li);
        });
    }

    inner.classList.add('scrollable-content');

    page.appendChild(createBtn);
    page.appendChild(inner);

    window.location.hash = `#card-${encodeURIComponent(header)}`;

    return page;
}