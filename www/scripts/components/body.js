"use strict";
// O body será onde ficará o conteúdo principal da aplicação.
// Agora exportamos funções para criar e atualizar o main, evitando efeitos colaterais
// que executam durante a importação do módulo.
import { createCard } from "./card.js";
import { scrollabeDiv } from "./scrollable.js";
import { clearMainContent } from "../utils/windowUtils.js";
import { renderAboutPage } from "../pages/about.js";

// programaçao funcional para switchs

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
        case '#type':
            text.textContent = 'Tipos';
            break;
        case '#todas':
            text.textContent = 'Todas';
            break;
        case '#luminosity':
            text.textContent = 'Luminosidades';
            break;
        case '#temperature':
            text.textContent = 'Temperaturas';
            break;
        case '#humidity':
            text.textContent = 'Humidades';
            break;
        case '#size':
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

let isRendering = false; // Flag para evitar múltiplas renderizações simultâneas

export function updateMainContent() {
    if (isRendering) return; // Sair se já está a renderizar
    isRendering = true;

    const newHeader = mainHeader();
    const oldHeader = document.querySelector('.main-header');
    if (oldHeader) oldHeader.replaceWith(newHeader);

    const mainContent = document.querySelector('.main-content');
    const hash = getCurrentWindowLocation();

    clearMainContent();

    // Mapa para hash #card-...
    const filterMap = {
        "Bulbophyllum": { category: "genus", type: 1 },
        "Cattleya":     { category: "genus", type: 2 },
        "Cymbidium":    { category: "genus", type: 3 },
        "Paphiopedilum":{ category: "genus", type: 4 },
        "Phalaenopsis": { category: "genus", type: 5 },
        "Tipo Híbrido": { category: "type", type: 2 },
        "Tipo Especie": { category: "type", type: 1 },
        "Sombra Total": { category: "luminosity", type: 1 },
        "Luz Sombreada":{ category: "luminosity", type: 2 },
        "Luz Filtrada": { category: "luminosity", type: 3 },
        "Luz Forte":    { category: "luminosity", type: 4 },
        "Miniatura":    { category: "size", type: 1 },
        "Pequeno":      { category: "size", type: 2 },
        "Médio":        { category: "size", type: 3 },
        "Grande":       { category: "size", type: 4 },
        ">40%":         { category: "humidity", type: 1 },
        "40-60%":       { category: "humidity", type: 2 },
        "60-80%":       { category: "humidity", type: 3 },
        "<80%":         { category: "humidity", type: 4 },
        "Frio":         { category: "temperature", type: 1 },
        "Temperado":    { category: "temperature", type: 2 },
        "Quente":       { category: "temperature", type: 3 },
        "Muito Quente": { category: "temperature", type: 4 },
    };

    (async () => {
        try {
            if (hash.startsWith("#card-")) {
                const cardName = decodeURIComponent(hash.replace("#card-", ""));
                const { category = "", type = 0 } = filterMap[cardName] || {};
                const page = await scrollabeDiv(cardName, category, type);
                mainContent.appendChild(page);
                return;
            }

            // Para os outros hash (tipo #type, #genus, #luminosity...)
            const routes = {
                "#type": () => [
                    createCard("Tipo Híbrido","characteristics", "type-hybrid","type",2),
                    createCard("Tipo Especie","characteristics", "type-species","type",1)
                ],

                "#genus": () => [
                    createCard("Bulbophyllum","icons","Bulbophyllum","genus",1),
                    createCard("Cattleya","icons","Cattleya","genus",2),
                    createCard("Cymbidium","icons","Cymbidium","genus",3),
                    createCard("Paphiopedilum","icons","Paphiopedilum","genus",4),
                    createCard("Phalaenopsis","icons","Phalaenopsis","genus",5)
                ],

                "#luminosity": () => [
                    createCard("Sombra Total","characteristics", "luminosity-full-shade","luminosity",1),
                    createCard("Luz Sombreada","characteristics", "luminosity-shaded-light","luminosity",2),
                    createCard("Luz Filtrada","characteristics", "luminosity-filtered-light","luminosity",3),
                    createCard("Luz Forte","characteristics", "luminosity-strong-light","luminosity",4)
                ],

                "#todas": () => scrollabeDiv("Todas", "", 0),

                "#size": () => [
                    createCard("Miniatura","characteristics", "size-miniature","size",1),
                    createCard("Pequeno","characteristics", "size-small", "size",2),
                    createCard("Médio","characteristics", "size-medium", "size",3),
                    createCard("Grande","characteristics", "size-big", "size",4)
                ],

                "#humidity": () => [
                    createCard(">40%","characteristics", "humidity-lt40", "humidity",1),
                    createCard("40-60%","characteristics", "humidity-40-60", "humidity",2),
                    createCard("60-80%","characteristics", "humidity-60-80", "humidity",3),
                    createCard("<80%","characteristics", "humidity-gt80", "humidity",4)
                ],

                "#temperature": () => [
                    createCard("Frio","characteristics", "temperature-cold", "temperature",1),
                    createCard("Temperado","characteristics", "temperature-seasoned", "temperature",2),
                    createCard("Quente","characteristics", "temperature-hot", "temperature",3),
                    createCard("Muito Quente","characteristics", "temperature-very-hot", "temperature",4)
                ],

                "#about": () => renderAboutPage(),
            };

            const renderer = routes[hash];

            if (renderer) {
                const result = await Promise.resolve(renderer());
                if (result instanceof HTMLElement) {
                    mainContent.appendChild(result);
                } else if (Array.isArray(result)) {
                    result.forEach(el => mainContent.appendChild(el));
                } else if (typeof result === "string") {
                    mainContent.textContent = result;
                }
            }
        } finally {
            isRendering = false; // Marcar renderização como concluída
        }
    })();
}


window.addEventListener('hashchange', updateMainContent);

window.addEventListener('DOMContentLoaded', () => {
    updateMainContent();
})