"use strict";



async function CreateOrchidFetch(orchid) {
    console.log("Enviando orquídea:", orchid);

    const res = await fetch('http://localhost:3000/orquideas/create', {
        method: 'POST',
       
        body: JSON.stringify(orchid)
    }).catch(err => {
        console.error("Fetch error:", err);
        throw new Error("Erro de conexão: " + err.message);
    });

    if (!res.ok) {
        const errText = await res.text();
        console.error("Server error response:", errText);
        throw new Error(`Erro ao criar orquídea: ${res.status} - ${errText}`);
    }

    const json = await res.json();
    return json.data;
}

export { CreateOrchidFetch };