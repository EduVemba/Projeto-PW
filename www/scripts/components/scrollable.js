"use strict";


// no card fazer on click para fazer 
export const scrollabeDiv = (header, type) => {
    const page = document.createElement('div');
    page.classList.add('scrollable-container')

    const inner = document.createElement('li');
    inner.classList.add('scrollable-content');

    page.appendChild(inner);

    window.location.hash = `#card-${encodeURIComponent(header)}`;

    return page;
}