"use strict";



//TODO: Implementar as funções de fetch para obter imagens e thumbnails de orquídeas

async function GetImageFetch(id) {
    const res = await fetch(`http://localhost:3000/orquideas/imagem/${id}`, {
        method: 'GET'
    }).catch(err => {
        console.error("Fetch error:", err);
        throw new Error("Erro de conexão: " + err.message);
    });
}

async function GetThumbnailFetch(id) {
    const res = await fetch(`http://localhost:3000/orquideas/thumbnail/${id}`, {
        method: 'GET'
    }).catch(err => {
        console.error("Fetch error:", err);
        throw new Error("Erro de conexão: " + err.message);
    });
}