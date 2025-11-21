import { createHeader } from './components/header.js';
import { createFooter } from './components/footer.js';
import { createMain, updateMainContent } from './components/body.js';


const body = document.body;

const header = createHeader();
const main = createMain();
const footer = createFooter("© 2025 Orchids Inc. || Eduardo Vemba & João Freitas.", "site-footer");

body.appendChild(header);
body.appendChild(main);
body.appendChild(footer);

if (!window.location.hash) {
    window.location.hash = "#orchids";
}

updateMainContent();