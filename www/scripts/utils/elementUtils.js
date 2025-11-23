"use strict";

/**
 * @notice função usada para criar novos elementos para não haver codigo repetido 
 * @notice talvez deixar para a segunda fase
 * @param {*} element 
 * @param {*} className 
 * @returns 
 */
export function createElement(element,className){
    
    const elem = document.createElement(element);
    elem.className = className;

    return elem;
}