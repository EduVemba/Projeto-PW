"use strict";

import { orchidsCollection }    from "../state/orchidsInstance.js";
import { createOrchidForm }     from "./formOrchids.js"
import { orchidPage } from "./orchid.js";
import { clearMainContent } from "../utils/windowUtils.js";
import { filterBy } from "../utils/filter.js";


export const scrollabeDiv = (header,category = "", type = 0) => {
    const page = document.createElement('div');
    page.classList.add('scrollable-container');

    const createBtn = document.createElement('span');

    createBtn.textContent = "+ Create Orchid";
    createBtn.classList.add('create-btn');

    createBtn.addEventListener('click', () => {
        const form = createOrchidForm();
        
        const mainContent = document.querySelector('.main-content')
        
        clearMainContent();

        mainContent.appendChild(form);
    })

    const orchids = header === "Todas"
        ? orchidsCollection.getTodos
        : filterBy(category, type);

    const inner = document.createElement('ul');
    
    
        orchids.forEach(orchid => {
            const hr = document.createElement('hr');
            hr.className = "ul-hr"

            const li = document.createElement('li');
            li.classList.add('orchid');

            const textSpan = document.createElement('span');
            textSpan.textContent = `${orchid.getId()} - ${orchid.getDescription()}`;

            textSpan.className = 'orchid-elem';

            textSpan.addEventListener("click", () => {
                const mainContent = document.querySelector('.main-content');
                while (mainContent.firstChild){
                    mainContent.removeChild(mainContent.firstChild);
                }
                mainContent.appendChild(orchidPage(orchid));
            })

            const liMenu = document.createElement('span');
            liMenu.classList.add('orchid-menu');
            //TODO associação com ID para remoção e edição
            liMenu.textContent = ":";

            li.appendChild(textSpan);
            li.appendChild(liMenu);

            inner.appendChild(hr)
            inner.appendChild(li);
        });


    inner.classList.add('scrollable-content');

    page.appendChild(createBtn);
    page.appendChild(inner);

    window.location.hash = `#card-${encodeURIComponent(header)}`;

    return page;
}