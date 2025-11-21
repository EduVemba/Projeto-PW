import { orchidsCollection } from "../state/orchidsInstance.js";
import { data } from "../data/data.js";
import { createFooter } from "./footer.js";

//FIXME: quando pega um do mesmo nome tem que atualizar.
function validateAndCreateOrchid(formData) {
    const genusId = Number(formData.get("genus"));
    const genusDescription = data.genus.find(g => g.id === genusId)?.description
    
    const description = `${genusDescription} ${(formData.get("description") || "").toString().trim()}`;
    if (!description) throw new Error("Nome (description) é obrigatório.");

    const toNum = (key) => {
        const v = formData.get(key);
        if (v === null || v === "") throw new Error(`${key} é obrigatório.`);
        const n = Number(v);
        if (Number.isNaN(n)) throw new Error(`${key} deve ser número válido.`);
        return n;
    };

    const novaOrquidea = {
        description,
        genus: genusId,
        type: toNum("type"),
        luminosity: toNum("luminosity"),
        temperature: toNum("temperature"),
        humidity: toNum("humidity"),
        size: toNum("size"),
        image_src: (formData.get("image_src") || "").toString().trim()
    };

    const created = orchidsCollection.createOrchid(novaOrquidea);
    return created;
}

export function createOrchidForm(){
    const formContainer     = document.createElement('div');
    formContainer.className = "form-container";

    const form      = document.createElement("form");
    form.className  = "orchid-form";

    const title         = document.createElement("h1");
    title.textContent   = "Nova Orquídea";
    form.appendChild(title);

    const createInput = (labelText, name, value = "") => {
        const div = document.createElement("div");

        const label         = document.createElement("label");
        label.textContent   = labelText;
        label.htmlFor       = name;

        const input         = document.createElement("input");
        input.type          = "text";
        input.name          = name;
        input.id            = name;
        input.value         = value;

        div.appendChild(label);
        div.appendChild(input);
        return div;
    };

    const createSelect = (labelText, name, options, selectedValue = null) => {
        const div = document.createElement("div");

        const label = document.createElement("label");
        label.textContent = labelText;
        label.htmlFor = name;

        const select = document.createElement("select");
        select.name = name;
        select.id = name;

        options.forEach(opt => {
            const option = document.createElement("option");
            option.value = opt.id;
            option.textContent = opt.description;

            if (opt.id === selectedValue) option.selected = true;

            select.appendChild(option);
        });

        div.appendChild(label);
        div.appendChild(select);
        return div;
    };

    form.appendChild(createInput("Nome:", "description", ""));
    
    form.appendChild(createSelect("Género:", "genus", data.genus, null));
    form.appendChild(createSelect("Tipo:", "type", data.type, null));
    form.appendChild(createSelect("Luminosidade:", "luminosity", data.luminosity, null));
    form.appendChild(createSelect("Temperatura:", "temperature", data.temperature, null));
    form.appendChild(createSelect("Humidade:", "humidity", data.humidity, null));
    form.appendChild(createSelect("Tamanho:", "size", data.size, null));

    form.appendChild(createInput("Imagem (src):", "image_src", ""));

    const button = document.createElement("button");
    button.textContent = "Criar Orquídea";
    button.type = "submit";

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        try {
            const formData = new FormData(form);
            const created = validateAndCreateOrchid(formData);
            
            console.log("Orquídea criada com sucesso:", created);

            form.reset();

            window.location.hash = "#card-Todas";

        } catch (error) {
            alert("Erro: " + error.message);
        }
    });

    const footer = createFooter("","form-footer");
    footer.appendChild(button);
    form.appendChild(footer);

    formContainer.appendChild(form);

    return formContainer;
}