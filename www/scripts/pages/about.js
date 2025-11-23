"use strict"

import { clearMainContent } from "../utils/windowUtils.js";

/**
 * Refazer o main-content para carregar o about page
 */
export function renderAboutPage(){

    const mainContent = document.querySelector(".main-content");

    clearMainContent();

    /*TODO : João Freitas

      deixar oo visual mais apelativo no css
    */

    mainContent.appendChild(cards("Eduardo Vemba"))
    mainContent.appendChild(cards("João Freitas"))
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