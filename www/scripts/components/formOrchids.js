import { orchidsCollection } from "../state/orchidsInstance.js";
import { data } from "../data/data.js";
import { createFooter } from "./footer.js";
import { clearMainContent } from "../utils/windowUtils.js";
import { CreateOrchidFetch } from "../handlers/create.js";

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

    return novaOrquidea;
}

export function createOrchidForm(){
    const formContainer     = document.createElement('div');
    formContainer.className = "form-container";

    const form      = document.createElement("form");
    form.className  = "orchid-form";

    const title         = document.createElement("h1");
    title.textContent   = "Nova Orquídea";
    form.appendChild(title);

    form.appendChild(createInput("Nome:", "description", ""));
    
    form.appendChild(createSelect("Género:", "genus", data.genus, null));
    form.appendChild(createSelect("Tipo:", "type", data.type, null));
    form.appendChild(createSelect("Luminosidade:", "luminosity", data.luminosity, null));
    form.appendChild(createSelect("Temperatura:", "temperature", data.temperature, null));
    form.appendChild(createSelect("Humidade:", "humidity", data.humidity, null));
    form.appendChild(createSelect("Tamanho:", "size", data.size, null));

    form.appendChild(createInput("Imagem (src):", "image_src", "","file"));

    const button = document.createElement("button");
    button.textContent = "Gravar";
    button.type = "submit";

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancelar";
    cancelButton.type = "button";

    cancelButton.addEventListener("click", () => {
        history.back();
    });


    form.addEventListener("submit", (event) => {
        event.preventDefault();

        try {
            const formData = new FormData(form);
            const orchidData = validateAndCreateOrchid(formData);
            
            // Call the server to create the orchid
            CreateOrchidFetch(orchidData).then(result => {
                console.log("Orquídea criada com sucesso:", result);
                form.reset();
                history.back();
            }).catch(error => {
                alert("Erro ao criar orquídea: " + error.message);
            });

        } catch (error) {
            alert("Erro: " + error.message);
        }
    });

    const footer = createFooter("","form-footer");
    footer.appendChild(button);
    footer.appendChild(cancelButton);
    form.appendChild(footer);

    formContainer.appendChild(form);

    return formContainer;
}

const editOrchidForm = (orchid, orchidsCollection) => {
    if (!orchid) throw new Error("Orquídea não encontrada.");

    const formContainer = document.createElement('div');
    formContainer.className = "form-container";

    const form = document.createElement("form");
    form.className = "orchid-form";

    const title = document.createElement("h1");
    title.textContent = "Editar Orquídea";
    form.appendChild(title);

    // Preenche com dados existentes
    form.appendChild(createInput("Nome:", "description", orchid.getDescription()));
    form.appendChild(createSelect("Género:", "genus", data.genus, orchid.getGenus()));
    form.appendChild(createSelect("Tipo:", "type", data.type, orchid.getType()));
    form.appendChild(createSelect("Luminosidade:", "luminosity", data.luminosity, orchid.getLuminosity()));
    form.appendChild(createSelect("Temperatura:", "temperature", data.temperature, orchid.getTemperature()));
    form.appendChild(createSelect("Humidade:", "humidity", data.humidity, orchid.getHumidity()));
    form.appendChild(createSelect("Tamanho:", "size", data.size, orchid.getSize()));
    form.appendChild(createInput("Imagem (src):", "image_src", "","file"));

    const button = document.createElement("button");
    button.textContent = "Gravar";
    button.type = "submit";

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancelar";
    cancelButton.type = "button";

    cancelButton.addEventListener("click", () => history.back());

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        try {
            const formData = new FormData(form);

            const updatedData = {
                description: `${data.genus.find(g => g.id === Number(formData.get("genus")))?.description} ${(formData.get("description") || "").toString().trim()}`,
                genus: Number(formData.get("genus")),
                type: Number(formData.get("type")),
                luminosity: Number(formData.get("luminosity")),
                temperature: Number(formData.get("temperature")),
                humidity: Number(formData.get("humidity")),
                size: Number(formData.get("size")),
                image_src: (formData.get("image_src") || "").toString().trim()
            };

            orchidsCollection.editOrchid(orchid.getId(), updatedData);
            console.log("Orquídea atualizada com sucesso:", orchid);

            window.location.hash = "#card-Todas";
        } catch (error) {
            alert("Erro: " + error.message);
        }
    });

    const footer = createFooter("", "form-footer");
    footer.appendChild(button);
    footer.appendChild(cancelButton);
    form.appendChild(footer);

    formContainer.appendChild(form);

    return formContainer;
};


export const openEditOrchidForm = (id, orchidsCollection) => {
    const orchid = orchidsCollection.findById(id);

    const main = document.querySelector(".main-content");

    clearMainContent();

    main.appendChild(editOrchidForm(orchid, orchidsCollection));
}


const createInput = (labelText, name, value = "", type = "") => {
        const div = document.createElement("div");

        const label         = document.createElement("label");
        label.textContent   = labelText;
        label.htmlFor       = name;

        const tp = type || "text";

        const input         = document.createElement("input");
        input.type          = tp;
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