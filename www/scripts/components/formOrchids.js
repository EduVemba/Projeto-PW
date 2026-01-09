import { createFooter } from "./footer.js";
import { clearMainContent } from "../utils/windowUtils.js";
import { CreateOrchidFetch } from "../handlers/create.js";
import { EditOrchidFetch } from "../handlers/edit.js";
import { GetOrchidByIdFetch, GetOptionsFromAPI } from "../handlers/get.js";

async function validateAndCreateOrchid(formData) {
    const options = await GetOptionsFromAPI();
    const genusId = Number(formData.get("genus"));
    const genusDescription = options.genus.find(g => g.id === genusId)?.description
    
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
        size: toNum("size")
    };

    return novaOrquidea;
}

export async function createOrchidForm(){
    const formContainer     = document.createElement('div');
    formContainer.className = "form-container";

    const form      = document.createElement("form");
    form.className  = "orchid-form";

    const title         = document.createElement("h1");
    title.textContent   = "Nova Orquídea";
    form.appendChild(title);

    const options = await GetOptionsFromAPI();

    form.appendChild(createInput("Nome:", "description", ""));
    
    form.appendChild(createSelect("Género:", "genus", options.genus, null));
    form.appendChild(createSelect("Tipo:", "type", options.type, null));
    form.appendChild(createSelect("Luminosidade:", "luminosity", options.luminosity, null));
    form.appendChild(createSelect("Temperatura:", "temperature", options.temperature, null));
    form.appendChild(createSelect("Humidade:", "humidity", options.humidity, null));
    form.appendChild(createSelect("Tamanho:", "size", options.size, null));

    form.appendChild(createInput("Imagem:", "image_src", "", "file"));

    const button = document.createElement("button");
    button.textContent = "Gravar";
    button.type = "submit";

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancelar";
    cancelButton.type = "button";

    cancelButton.addEventListener("click", () => {
        history.back();
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (button.disabled) return;
        button.disabled = true;
        button.textContent = "A gravar...";

        try {
            const formData = new FormData(form);
            const orchidData = await validateAndCreateOrchid(formData);
            
            // Obter o ficheiro de imagem
            const imageFile = formData.get("image_src");
            
            // Enviar para o servidor
            const result = await CreateOrchidFetch(orchidData, imageFile);
            console.log("Orquídea criada com sucesso:", result);
            form.reset();
            history.back();

        } catch (error) {
            alert("Erro: " + error.message);
            button.disabled = false;
            button.textContent = "Gravar";
        }
    });

    const footer = createFooter("","form-footer");
    footer.appendChild(button);
    footer.appendChild(cancelButton);
    form.appendChild(footer);

    formContainer.appendChild(form);

    return formContainer;
}

const editOrchidForm = async (id) => {
    const formContainer = document.createElement('div');
    formContainer.className = "form-container";

    const form = document.createElement("form");
    form.className = "orchid-form";

    const title = document.createElement("h1");
    title.textContent = "Editar Orquídea";
    form.appendChild(title);

    const orchid = await GetOrchidByIdFetch(id);
    const options = await GetOptionsFromAPI();

    const descriptionParts = orchid.getDescription().split(' ').slice(1).join(' ');
    
    form.appendChild(createInput("Nome:", "description", descriptionParts));
    form.appendChild(createSelect("Género:", "genus", options.genus, orchid.getGenus()));
    form.appendChild(createSelect("Tipo:", "type", options.type, orchid.getType()));
    form.appendChild(createSelect("Luminosidade:", "luminosity", options.luminosity, orchid.getLuminosity()));
    form.appendChild(createSelect("Temperatura:", "temperature", options.temperature, orchid.getTemperature()));
    form.appendChild(createSelect("Humidade:", "humidity", options.humidity, orchid.getHumidity()));
    form.appendChild(createSelect("Tamanho:", "size", options.size, orchid.getSize()));
    form.appendChild(createInput("Imagem:", "image_src", "", "file"));

    const button = document.createElement("button");
    button.textContent = "Gravar";
    button.type = "submit";

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancelar";
    cancelButton.type = "button";

    cancelButton.addEventListener("click", () => history.back());

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (button.disabled) return;
        button.disabled = true;
        button.textContent = "A gravar...";

        try {
            const formData = new FormData(form);
            const imageFile = formData.get("image_src");

            const updatedData = {
                description: `${options.genus.find(g => g.id === Number(formData.get("genus")))?.description} ${(formData.get("description") || "").toString().trim()}`,
                genus: Number(formData.get("genus")),
                type: Number(formData.get("type")),
                luminosity: Number(formData.get("luminosity")),
                temperature: Number(formData.get("temperature")),
                humidity: Number(formData.get("humidity")),
                size: Number(formData.get("size"))
            };

            await EditOrchidFetch(orchid.getId(), updatedData, imageFile);
            form.reset();
            history.back();
            
        } catch (error) {
            alert("Erro: " + error.message);
            button.disabled = false;
            button.textContent = "Gravar";
        }
    });

    const footer = createFooter("", "form-footer");
    footer.appendChild(button);
    footer.appendChild(cancelButton);
    form.appendChild(footer);

    formContainer.appendChild(form);

    return formContainer;
};

export const openEditOrchidForm = async (id) => {
    try {
        const main = document.querySelector(".main-content");
        clearMainContent();
        const editForm = await editOrchidForm(id);
        main.appendChild(editForm);
    } catch (error) {
        alert(`Erro ao carregar os dados da orquídea para edição: ${error.message}`);
    }
}

const createInput = (labelText, name, value = "", type = "") => {
    const div = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = labelText;
    label.htmlFor = name;

    const tp = type || "text";

    const input = document.createElement("input");
    input.type = tp;
    input.name = name;
    input.id = name;
    
    if (type === "file") {
        input.accept = "image/*"; // Aceitar apenas imagens
    } else {
        input.value = value;
    }

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