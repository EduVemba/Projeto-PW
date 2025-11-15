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
        case '#orchids':
            text.textContent = 'Orquídeas';
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
            text.textContent = 'Todas';
    }

    head.appendChild(text);
    return head;
}

const createCardExample = () => {
    return createCard("Exemplo");
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

//TODO:refazer o updadeMainContent pois não pode tirar o main-content.
// Atualiza o conteúdo do <main> existente (substitui header e conteúdo)
export function updateMainContent() {
    const newHeader = mainHeader();
    const oldHeader = document.querySelector('.main-header');
    if (oldHeader) oldHeader.replaceWith(newHeader);

    const mainContent = document.querySelector('.main-content');

    const hash = getCurrentWindowLocation();
    switch (hash) {
        case '#tipos':
            mainContent.textContent = 'Conteúdo sobre Tipos de Orquídeas';
            break;
        case '#orchids':
            mainContent.textContent = 'Conteúdo sobre Géneros de Orquídeas';
            break;
        case '#luminosidades':
            mainContent.textContent = 'Conteúdo sobre Luminosidades ideais';
            break;
        case '#todas':
            mainContent.textContent = void 0;
            const card = createCardExample();
            const card2 = createCardExample();
            const card3 = createCardExample();
            const card4 = createCardExample();
            const card5 = createCardExample();

            mainContent.appendChild(card);
            mainContent.appendChild(card2);
            mainContent.appendChild(card3);
            mainContent.appendChild(card4);
            mainContent.appendChild(card5);
        break;

        default:
            mainContent.textContent = 'Todas as orquídeas e informações gerais.';
            break;
    }

    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.appendChild(mainContent);
}

window.addEventListener('hashchange', updateMainContent);