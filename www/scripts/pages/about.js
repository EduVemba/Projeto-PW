"use strict"

import { createHeader } from "../components/header";
import { createFooter } from "../components/footer"; 



export function renderAboutPage(){
    const root = document.body;
    root.replaceChildren();

    const header = createHeader();
    root.appendChild(header);

    /*const aboutSection = document.createElement("section");
    aboutSection.className = "about-section";*/

    const aboutSection = createElement("section","about-section");

   /* const title = document.createElement("h1");
    title.textContent = "SOBRE";*/

    const title = createElement("h1","","SOBRE")

    aboutSection.append(title);
    root.appendChild(aboutSection);

   /* const container = document.createElement("div");
    container.className = "cards-container";
    */
    
    const container = createElement("div","cards-container");

    const card1 = document.createElement("div");
    card1.className = "card";
    card1.textContent = "Card 1";

    const card2 = document.createElement("div");
    card2.className = "card";
    card2.textContent = "Card 2";

    container.append(card1,card2);
    root.appendChild(container);

    const footer = createFooter(
        "© 2025 Orchids Inc. || Eduardo Vemba & João Freitas.",
        "site-footer"
    );

    root.appendChild(footer);


}

function createElement(element,className,text){
    const temp = document.createElement(element);
    temp.className = className;
    temp.textContent = text;

    return temp;
}