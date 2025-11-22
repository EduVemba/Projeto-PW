"use strict";
// O body será onde ficará o conteúdo principal da aplicação.
// Agora exportamos funções para criar e atualizar o main, evitando efeitos colaterais
// que executam durante a importação do módulo.
import { createCard } from "./card.js";
import { scrollabeDiv } from "./scrollable.js";
import { clearMainContent } from "../utils/windowUtils.js";

const getCurrentWindowLocation = () => window.location.hash;

// Cria o header interno do main com base no hash atual
const mainHeader = () => {
    const head = document.createElement('header');
    const text = document.createElement('h2');
    head.classList.add('main-header');

    const location = getCurrentWindowLocation();

    if (location.startsWith('#card-')) {
        const encoded   = location.replace('#card-', '');
        const cardName  = decodeURIComponent(encoded);

        text.textContent = cardName;
        head.appendChild(text);
        return head;
    }

    if(location === "#nova"){
        text.textContent = "Nova Orquídea";
        head.appendChild(text);
        return head;
    }

    if(location.startsWith("#editar-")){
        text.textContent = "Editar Orquídea";
        head.appendChild(text);
        return head;
    }

    if(location === "#about"){
        text.textContent = "Sobre";
        head.appendChild(text);
        return head;
    }

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
            text.textContent = 'Géneros';
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

    if (hash.startsWith("#card-")) {
    const cardName = decodeURIComponent(hash.replace("#card-", ""));
    let type = cardName === "Todas" ? "TODOS" : "";
    const page = scrollabeDiv(cardName, type);
    
    clearMainContent();

    mainContent.appendChild(page);
    return;
}


    const routes = {
        "#tipos": () => [
            createCard("Tipo Híbrido","characteristics", "type-hybrid"),
            createCard("Tipo Especie","characteristics", "type-species")
        ],

        "#orchids": () => [
            createCard("bulbophyllum","icons","bulbophyllum"),
            createCard("cattleya","icons","cattleya"),
            createCard("cymbidium","icons","cymbidium"),
            createCard("paphiopedilum","icons","paphiopedilum"),
            createCard("phalaenopsis","icons","phalaenopsis")
        ],

        "#luminosidades": () => [
            createCard("Sombra Total","characteristics", "luminosity-full-shade"),
            createCard("Luz Sombreada","characteristics", "luminosity-shaded-light"),
            createCard("Luz Filtrada","characteristics", "luminosity-filtered-light"),
            createCard("Luz Forte","characteristics", "luminosity-strong-light")
        ],

        "#todas": () => scrollabeDiv("Todas","TODOS"),

        "#tamanhos": () => [
            createCard("Miniatura","characteristics", "size-miniature"),
            createCard("Pequeno","characteristics", "size-small"),
            createCard("Médio","characteristics", "size-medium"),
            createCard("Grande","characteristics", "size-big")
        ],

        "#humidades": () => [
            createCard(">40%","characteristics", "humidity-lt40"),
            createCard("40-60%","characteristics", "humidity-40-60"),
            createCard("60-80%","characteristics", "humidity-60-80"),
            createCard("<80%","characteristics", "humidity-gt80")
        ],

        "#temperaturas": () => [
            createCard("Frio","characteristics", "temperature-cold"),
            createCard("Temperado","characteristics", "temperature-seasoned"),
            createCard("Quente","characteristics", "temperature-hot"),
            createCard("Muito Quente","characteristics", "temperature-very-hot"),
        ],

        "#about": () => {
            import("../pages/about.js").then(module => module.renderAboutPage(mainContent));
        }
    };

    
    clearMainContent();

    const renderer = routes[hash];

    if (renderer) {
    const result = renderer();

    if (result instanceof HTMLElement) {
        mainContent.appendChild(result);
    } else if (Array.isArray(result)) {
        result.forEach(el => mainContent.appendChild(el));
    } else if (typeof result === "string") {
        mainContent.textContent = result;
    }
    } else {
        mainContent.textContent = "";
    }

    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.appendChild(mainContent);
}

window.addEventListener('hashchange', updateMainContent);

window.addEventListener('DOMContentLoaded', () => {
    updateMainContent();
})