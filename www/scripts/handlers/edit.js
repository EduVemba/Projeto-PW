"use strict";

async function EditOrchidFetch(id, orchid) {
    console.log("Editando orquídea:", id, orchid);

    const res = await fetch(`http://localhost:3000/orquideas/update/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orchid)
    }).catch(err => {
        console.error("Fetch error:", err);
        throw new Error("Erro de conexão: " + err.message);
    });

    if (!res.ok) {
        const errText = await res.text();
        console.error("Server error response:", errText);
        throw new Error(`Erro ao editar orquídea: ${res.status} - ${errText}`);
    }

    const json = await res.json();
    return json.data;
}

async function DeleteOrchidFetch(id) {
    console.log("Deletando orquídea:", id);

    const res = await fetch(`http://localhost:3000/orquideas/delete/${id}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json'
        }
    }).catch(err => {
        console.error("Fetch error:", err);
        throw new Error("Erro de conexão: " + err.message);
    });

    if (!res.ok) {
        const errText = await res.text();
        console.error("Server error response:", errText);
        throw new Error(`Erro ao deletar orquídea: ${res.status} - ${errText}`);
    }

    const json = await res.json();
    return json.data;
}

export { EditOrchidFetch, DeleteOrchidFetch };