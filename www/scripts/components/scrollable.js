"use strict";


// no card fazer on click para fazer 
export const scrollabeDiv = (header, type) => {
    const page = document.createElement('div');
    page.classList.add('scrollable-container');

    const createBtn = document.createElement('span');
    createBtn.textContent = "+ Create Orchid";
    createBtn.classList.add('create-btn');

    const inner = document.createElement('li');
    inner.classList.add('scrollable-content');

    page.appendChild(createBtn);
    page.appendChild(inner);

    window.location.hash = `#card-${encodeURIComponent(header)}`;

    return page;
}