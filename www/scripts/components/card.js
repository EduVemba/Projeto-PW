"use strict";

//TODO: vai ir para a pagina de cada planta com uma lista que permite que possa ver elas individualmente
export function createCard(name, path,content) {
    const card              = document.createElement('div');
    const cardName          = document.createElement('p')
    cardName.textContent    = name;

    const image = document.createElement('img');
    image.src = `./images/${path}/${content}.png`
    image.classList.add('card-logo');

    card.appendChild(cardName);
    card.appendChild(image);
    card.classList.add('card');

    
    card.addEventListener('click', () => {
        window.location.hash = `#card-${encodeURIComponent(name)}`;
    });
    

    return card;
}

export function createCardAbout(name,num,description){
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

    card.appendChild(initialsDiv);
    card.appendChild(cardName);
    card.appendChild(number);
    card.appendChild(desc);
    

   
    card.addEventListener('click', () => {
        window.location.hash = `#card-${encodeURIComponent(name)}`;
    });
    

    return card;
}




