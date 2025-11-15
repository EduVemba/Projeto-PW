"use strict";
// O body será onde ficará o conteúdo principal da aplicação.
// Agora exportamos funções para criar e atualizar o main, evitando efeitos colaterais
// que executam durante a importação do módulo.
import { createCard } from "./card.js";


const getCurrentWindowLocation = () => window.location.hash;

// Cria o header interno do main com base no hash atual
const mainHeader = () => {
    const head = document.createElement('header');
    const text = document.createElement('h2');
    head.classList.add('main-header');

    const location = getCurrentWindowLocation();

    switch (location) {
        case '#tipos':
            text.textContent = 'Tipos';
            break;
        case '#todas':
            text.textContent = 'Todas';
            break;
        case '#luminosidades':
            text.textContent = 'Luminosidades';
            break;
        case '#temperaturas':
            text.textContent = 'Temperaturas';
            break;
        case '#humidades':
            text.textContent = 'Humidades';
            break;
        case '#tamanhos':
            text.textContent = 'Tamanhos';
            break;
        default:
            text.textContent = 'Orquídeas';
    }

    head.appendChild(text);
    return head;
}



export function createMain() {
    const mainEl = document.createElement('main');
    mainEl.classList.add('main');

    //header
    const header = mainHeader();
    mainEl.appendChild(header);
    
    //main-content
    const mainContent = document.createElement('div');
    mainContent.classList.add('main-content');
    mainEl.appendChild(mainContent);

    return mainEl;
}

export function updateMainContent() {
    const newHeader = mainHeader();
    const oldHeader = document.querySelector('.main-header');
    if (oldHeader) oldHeader.replaceWith(newHeader);

    const mainContent = document.querySelector('.main-content');
    const hash = getCurrentWindowLocation();

    const routes = {
        "#tipos": () => [
            createCard("characteristics", "type-hybrid"),
            createCard("characteristics", "type-species")
        ],

        "#orchids": () => [
            createCard("icons","bulbophyllum"),
            createCard("icons","cattleya"),
            createCard("icons","cymbidium"),
            createCard("icons","paphiopedilum"),
            createCard("icons","phalaenopsis")
        ],

        "#luminosidades": () => [
            createCard("characteristics", "luminosity-full-shade"),
            createCard("characteristics", "luminosity-shaded-light"),
            createCard("characteristics", "luminosity-filtered-light"),
            createCard("characteristics", "luminosity-strong-light")
        ],

        "#todas": () => "TODO",

        "#tamanhos": () => [
            createCard("characteristics", "size-miniature"),
            createCard("characteristics", "size-small"),
            createCard("characteristics", "size-medium"),
            createCard("characteristics", "size-big")
        ],

        "#humidades": () => [
            createCard("characteristics", "humidity-lt40"),
            createCard("characteristics", "humidity-40-60"),
            createCard("characteristics", "humidity-60-80"),
            createCard("characteristics", "humidity-gt80")
        ],

        "#temperaturas": () => [
            createCard("characteristics", "temperature-cold"),
            createCard("characteristics", "temperature-seasoned"),
            createCard("characteristics", "temperature-hot"),
            createCard("characteristics", "temperature-very-hot"),
        ]
    };

    while(mainContent.firstChild) {
        mainContent.removeChild(mainContent.firstChild);
    }

    const renderer = routes[hash];

    if (renderer) {
        const result = renderer();

        if (typeof result === "string") {
            mainContent.textContent = result;
        } else if (Array.isArray(result)) {
            result.forEach(el => mainContent.appendChild(el));
        }

    } else {
        mainContent.textContent = "";
    }

    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.appendChild(mainContent);
}

window.addEventListener('hashchange', updateMainContent);