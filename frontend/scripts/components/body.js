"use strict";
// O body será onde ficará o conteúdo principal da aplicação.
// Agora exportamos funções para criar e atualizar o main, evitando efeitos colaterais
// que executam durante a importação do módulo.

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

export function createMain() {
    const mainEl = document.createElement('main');
    const header = mainHeader();
    mainEl.appendChild(header);
    return mainEl;
}

// Atualiza o conteúdo do <main> existente (substitui header e conteúdo)
export function updateMainContent() {
    const newHeader = mainHeader();
    const oldHeader = document.querySelector('.main-header');
    if (oldHeader) oldHeader.replaceWith(newHeader);

    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.remove();

    const newContent = document.createElement('div');
    newContent.classList.add('main-content');

    const hash = getCurrentWindowLocation();
    switch (hash) {
        case '#tipos':
            newContent.textContent = 'Conteúdo sobre Tipos de Orquídeas';
            break;
        case '#orchids':
            newContent.textContent = 'Conteúdo sobre Géneros de Orquídeas';
            break;
        case '#luminosidades':
            newContent.textContent = 'Conteúdo sobre Luminosidades ideais';
            break;
        default:
            newContent.textContent = 'Todas as orquídeas e informações gerais.';
            break;
    }

    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.appendChild(newContent);
}

window.addEventListener('hashchange', updateMainContent);