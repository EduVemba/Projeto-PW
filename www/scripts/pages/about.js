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

    aboutContainer.appendChild(createCardAbout("João Freitas ","2024151451","Rugby e Programação"));
    aboutContainer.appendChild(createCardAbout("Eduardo Vemba","202300364","Futebol e Programação"));
    mainContent.appendChild(aboutContainer);

}

/**
 * @notice criação de cards para o about 
 * @param {*} name 
 * @returns 
 */
  const cards = (name) => {

    const card = document.createElement("div");
    card.className = "about-card"
    card.textContent = name;

    return card;
}