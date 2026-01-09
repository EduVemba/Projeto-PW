"use strict";



"use strict";

async function CreateOrchidFetch(orchidData, imageFile) {
    console.log("Enviando orquídea:", orchidData);

    const formData = new FormData();
    
    formData.append('data', JSON.stringify(orchidData));
    
    if (imageFile && imageFile.size > 0) {
        formData.append('image', imageFile);
    }

    const res = await fetch('http://localhost:3000/orquideas/create', {
        method: 'POST',
        body: formData
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