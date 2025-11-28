"use strict";

import { orchidsCollection } from "../state/orchidsInstance.js";
import { scrollabeDiv } from "./scrollable.js";
import { openEditOrchidForm } from "./formOrchids.js";


export const openModal = (id, target, headerGlobal, categoryGlobal, typeGlobal) => {
    // Se já existir menu aberto, remove:
    const oldMenu = document.querySelector(".orchid-context-menu");
    if (oldMenu) oldMenu.remove();

    const menu = document.createElement("div");
    menu.className = "orchid-context-menu";

    const editBtn  = document.createElement("button");
    const deletBtn = document.createElement("button");

    editBtn.textContent  = "✎ Edit";
    deletBtn.textContent = "🗑 Delete";

    editBtn.style.color  = "green";
    deletBtn.style.color = "red";

    deletBtn.addEventListener("click", () => {
        orchidsCollection.deleteOrchid(id);
        menu.remove();
        const container = document.querySelector('.scrollable-container');
        container.replaceWith(scrollabeDiv(headerGlobal, categoryGlobal, typeGlobal));
    });

    editBtn.addEventListener("click", () => {
        openEditOrchidForm(id, orchidsCollection);
        menu.remove();
    });

    menu.appendChild(editBtn);
    menu.appendChild(deletBtn);

    document.body.appendChild(menu);

    const rect = target.getBoundingClientRect();
    menu.style.top  = `${rect.bottom + window.scrollY}px`;
    menu.style.left = `${rect.left + window.scrollX}px`;

    const close = (e) => {
        if (!menu.contains(e.target)) {
            menu.remove();
            document.removeEventListener("click", close);
        }
    };
    //FIXME: acho que não posso usar setTimeout
    setTimeout(() => document.addEventListener("click", close), 0);
};