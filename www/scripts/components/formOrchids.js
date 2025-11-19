import { OrchidsCollection } from "../classes/orchidsCollection.js";
import { data } from "../data/data.js";
import { createFooter } from "./footer.js";

// avoid circular import with index.js by using a local collection instance
const orchidsCollection = new OrchidsCollection();

export function createOrchidForm(){
    const formContainer = document.createElement('div');
    formContainer.className = "form-container";

    const form = document.createElement("form");
    form.className = "orchid-form";

    const title = document.createElement("h1");
    title.textContent = "Nova Orquídea";
    form.appendChild(title);

    const createInput = (labelText, name, value = "") => {
        const div = document.createElement("div");

        const label = document.createElement("label");
        label.textContent = labelText;
        label.htmlFor = name;

        const input = document.createElement("input");
        input.type = "text";
        input.name = name;
        input.id = name;
        input.value = value;

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

        const formData = new FormData(form);

        const novaOrquidea = {
            description: formData.get("description"),
            genus: Number(formData.get("genus")),
            type: Number(formData.get("type")),
            luminosity: Number(formData.get("luminosity")),
            temperature: Number(formData.get("temperature")),
            humidity: Number(formData.get("humidity")),
            size: Number(formData.get("size")),
            image_src: formData.get("image_src")
        };

        try {
            orchidsCollection.createOrchid(novaOrquidea);

            document.dispatchEvent(new Event("navigate-home"));

        } catch (error) {
            alert(error.message);
        }
    });

    const footer = createFooter("","form-footer");
    footer.appendChild(button);
    form.appendChild(footer);

    formContainer.appendChild(form);

    return formContainer;
}