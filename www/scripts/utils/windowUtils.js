"use strict";


export const clearMainContent = () => {
    const mainContent = document.querySelector('.main-content');
    while(mainContent.firstChild){
        mainContent.removeChild(mainContent.firstChild);
    }
}

