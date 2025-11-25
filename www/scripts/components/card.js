"use strict";

import { scrollabeDiv } from "./scrollable.js";
import { clearMainContent } from "../utils/windowUtils.js";


export function createCard(name, path,content, category = "", type = 0) {
    const card              = document.createElement('div');
    const cardName          = document.createElement('p')
    cardName.textContent    = name;

    const image = document.createElement('img');
    image.src = `./images/${path}/${content}.png`
    image.classList.add('card-logo');

    card.appendChild(cardName);
    card.appendChild(image);
    card.classList.add('card');

    card.dataset.category = category;
    card.dataset.type = type;

    
    card.addEventListener('click', () => {

        const mainContent = document.querySelector('.main-content');

        const cat = card.dataset.category || "";
        const typ = Number(card.dataset.type || 0);

        window.location.hash = `#card-${encodeURIComponent(name)}`;

        clearMainContent();
        mainContent.appendChild(scrollabeDiv(name, cat, typ));
    });
    

    return card;
}

export function createCardAbout(name,num,description, instagramUrl, outlookUrl){
    const card = document.createElement('div');
     card.classList.add('card','about-card');

    const initialsDiv = document.createElement('div');
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    initialsDiv.textContent = initials;
    initialsDiv.classList.add('card-initials');
    
    const cardName = document.createElement('p');
    cardName.textContent = name;

    const number = document.createElement('p');
    number.textContent = num;

    const desc = document.createElement('p');
    desc.textContent = description;

    const iconsDiv = document.createElement('div');
    iconsDiv.classList.add('social-icons');

    if(instagramUrl) {
        const instaLink = document.createElement('a');
        instaLink.href = instagramUrl;
        instaLink.target = "_blank";
        const instaIcon = document.createElement('i');
        instaIcon.classList.add('fab', 'fa-instagram'); 
        instaLink.appendChild(instaIcon);
        iconsDiv.appendChild(instaLink);
    }

    if(outlookUrl) {
        const outlookLink = document.createElement('a');
        outlookLink.href = outlookUrl;
        outlookLink.target = "_blank";
        const outlookIcon = document.createElement('i');
        outlookIcon.classList.add('fas', 'fa-envelope'); 
        outlookLink.appendChild(outlookIcon);
        iconsDiv.appendChild(outlookLink);
    }

    card.appendChild(initialsDiv);
    card.appendChild(cardName);
    card.appendChild(number);
    card.appendChild(desc);
    card.appendChild(iconsDiv);
    

    return card;
}




