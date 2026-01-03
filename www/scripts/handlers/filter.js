"use strict";

import { Orchid } from "../classes/orchid.js";

async function GetAllFetch() {

    const res = await fetch('http://localhost:3000/orquideas/todas', {
        method: 'GET'
    });

    if (!res.ok) {
        throw new Error(`Erro ao obter orquídeas: ${res.status}`);
    }

    const json = await res.json();
    const data = json.data ?? json;

    return (data || []).map(item => 
        new Orchid(
            item.id,
            item.description,
            item.genus,
            item.type,
            item.luminosity,
            item.temperature,
            item.humidity,
            item.size,
            '',
            item.createdDate ? new Date(item.createdDate) : new Date()
        )
    );
}


async function GetFilteredFetch(category, type) {
    const res = await fetch(`http://localhost:3000/orquideas/filtrar?category=${category}&type=${type}`, {
        method: 'GET'
    });

    if (!res.ok) {
        throw new Error(`Erro ao obter orquídeas filtradas: ${res.status}`);
    }

    const json = await res.json();
    const data = json.data ?? json;

    // Convert plain objects to Orchid instances
    return (data || []).map(item => 
        new Orchid(
            item.id,
            item.description,
            item.genus,
            item.type,
            item.luminosity,
            item.temperature,
            item.humidity,
            item.size,
            '',
            item.createdDate ? new Date(item.createdDate) : new Date()
        )
    );
}


export { GetAllFetch, GetFilteredFetch };