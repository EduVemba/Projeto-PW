import { orchidsCollection } from "../index.js";
import { data } from "../data/data.js";

export function createOrchidForm(orchid = null){
    const form = document.createElement("form");
    form.className = "orchid-form";

    const title = document.createElement("h2");
    title.textContent = orchid ? "Editar Orquídea" : "Nova Orquídea";
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

    form.appendChild(createInput("Nome:", "description", orchid?.description || ""));
    
    form.appendChild(createSelect("Género:", "genus", data.genus, orchid?.genus));
    form.appendChild(createSelect("Tipo:", "type", data.type, orchid?.type));
    form.appendChild(createSelect("Luminosidade:", "luminosity", data.luminosity, orchid?.luminosity));
    form.appendChild(createSelect("Temperatura:", "temperature", data.temperature, orchid?.temperature));
    form.appendChild(createSelect("Humidade:", "humidity", data.humidity, orchid?.humidity));
    form.appendChild(createSelect("Tamanho:", "size", data.size, orchid?.size));

    form.appendChild(createInput("Imagem (src):", "image_src", orchid?.image_src || ""));

    const button = document.createElement("button");
    button.textContent = orchid ? "Guardar Alterações" : "Criar Orquídea";
    button.type = "submit";
    form.appendChild(button);

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
            if (orchid) {
                orchidsCollection.editOrchid(orchid.id, novaOrquidea);
            } else {
                orchidsCollection.createOrchid(novaOrquidea);
            }

            document.dispatchEvent(new Event("navigate-home"));

        } catch (error) {
            alert(error.message);
        }
    });

    return form;
}
