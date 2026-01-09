"use strict";

import { Orchid } from "../classes/orchid.js";

async function GetOrchidByIdFetch(id) {
    const res = await fetch(`http://localhost:3000/orquideas/orquidea/${id}`, {
        method: 'GET'
    }).catch(err => {
        console.error("Fetch error:", err);
        throw new Error("Erro de conexão: " + err.message);
    });

    if (!res.ok) {
        const errText = await res.text();
        console.error("Server error response:", errText);
        throw new Error(`Erro ao obter orquídea: ${res.status} - ${errText}`);
    }

    const json = await res.json();
    const item = json.data ?? json;

    if (!item) {
        return null;
    }
    
    // Convert plain object to Orchid instance
    return new Orchid(
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
    );
}

async function GetOrchidByNameFetch(name) {
    const res = await fetch(`http://localhost:3000/orquideas/orquidea/${encodeURIComponent(name)}`, {
        method: 'GET'
    }).catch(err => {
        console.error("Fetch error:", err);
        throw new Error("Erro de conexão: " + err.message);
    });

    if (!res.ok) {
        const errText = await res.text();
        console.error("Server error response:", errText);
        throw new Error(`Erro ao obter orquídea: ${res.status} - ${errText}`);
    }
    const json = await res.json();
    const item = json.data ?? json;

    return new Orchid(
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
    );

    
}

async function GetOptionsFromAPI() {
    const res = await fetch(`http://localhost:3000/orquideas/options`, {
        method: 'GET'
    });

    if (!res.ok) {
        throw new Error(`Erro ao obter opções: ${res.status}`);
    }

    const json = await res.json();
    return json.data ?? json;
}

export { GetOrchidByIdFetch, GetOptionsFromAPI, GetOrchidByNameFetch };
