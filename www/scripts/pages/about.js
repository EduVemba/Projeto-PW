"use strict"

import { clearMainContent } from "../utils/windowUtils.js";
import { createCardAbout } from "../components/card.js";

/**
 * Refazer o main-content para carregar o about page
 */
export function renderAboutPage(){

    const mainContent = document.querySelector(".main-content");
    clearMainContent();

    const aboutContainer = document.createElement("div");
    aboutContainer.className = "about-container";

     aboutContainer.appendChild(createCardAbout(
        "João Freitas",
        "2024151451",
        "Rugby e Programação",
        "https://www.instagram.com/j_diniss/?next=%2F", 
        "mailto:2024151451@estudantes.ips.pt"        
    ));

    aboutContainer.appendChild(createCardAbout(
        "Eduardo Vemba",
        "202300364",
        "Futebol e Programação",
        "#", 
        "mailto:202300364@estudantes.ips.pt"        
    ));

    mainContent.appendChild(aboutContainer);

}

