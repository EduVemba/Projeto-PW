"use strict";

import { orchidsCollection } from "../state/orchidsInstance.js";
import { openOrchidEditForm } from "./formOrchids.js";

export const openModal = (id) => {
    const modal = document.createElement('div');
    modal.className = "list-modal";

    const editBtn  = document.createElement('button');
    const deletBtn = document.createElement('button');

    editBtn.className  = "modal-edit-btn";
    deletBtn.className = "modal-delete-btn";

    editBtn.textContent  = "✎ Edit";
    deletBtn.textContent = "🗑️ Delete";

    editBtn.addEventListener('click', () => {
        closeModal(modal);
        openOrchidEditForm(Number(id));
    });

    deletBtn.addEventListener('click', () => {
        orchidsCollection.deleteOrchid(Number(id));
        closeModal(modal);
        reloadSidebar();
    });

    modal.appendChild(editBtn);
    modal.appendChild(deletBtn);

    //TODO 
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal(modal);
    });
};

function closeModal(modal){
    if (modal && modal.remove) modal.remove();
}

function reloadSidebar(){
    const hash = window.location.hash.split("-")[1] || "Todas";
    window.location.hash = `#card-${hash}`; 
}
