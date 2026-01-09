"use strict";

async function EditOrchidFetch(id, orchidData, imageFile) {
    console.log("Editando orquídea:", id, orchidData);

    const formData = new FormData();
    
    formData.append('data', JSON.stringify(orchidData));
    
    if (imageFile && imageFile.size > 0) {
        formData.append('image', imageFile);
    }

    const res = await fetch(`http://localhost:3000/orquideas/edit/${id}`, {
        method: 'PUT',
        body: formData
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