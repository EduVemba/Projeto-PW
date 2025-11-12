import { Orchid } from './orchid.js';

//TODO: Todo tipo de orquideas criados devem ser armazenados aqui
/**
 * @class OrchidsCollection
 * @description Classe que representa uma coleção de orquídeas e que gerencia pelas características das orquídeas.
 * 
 */

const CHARACTERISTICS_MAP = {
    genus: { 1: 'Bulbophyllum', 2: 'Cattleya', 3: 'Cymbidium', 4: 'Paphiopedilum', 5: 'Phalaenopsis' },
    type: { 1: 'Espécie', 2: 'Híbrido' },
    luminosity: { 1: 'Sombra', 2: 'Luz fraca', 3: 'Luz filtrada', 4: 'Luz forte' },
    temperature: { 1: 'Frio', 2: 'Intermédia', 3: 'Quente', 4: 'Muito Quente' },
    humidity: { 1: '0% a 40%', 2: '40% a 60%', 3: '60% a 80%', 4: '80% a 100%' },
    size: { 1: 'Pequeno', 2: 'Médio', 3: 'Grande', 4: 'Miniatura' }
};


export class OrchidsCollection {
    #orchids = [];
    #nextId = 1;

    constructor(initialData = []) {
        this.init(initialData);
    }

    init(initialData) {
        if (!initialData || initialData.length === 0) return;

        this.#orchids = [];
        let maxId = 0;

        initialData.forEach(item => {
            const orchid = new Orchid(
                item.id,
                item.description,
                item.genus,
                item.type,
                item.luminosity,
                item.temperature,
                item.humidity,
                item.size,
                item.src
            );
            this.#orchids.push(orchid);

            if (item.id > maxId) {
                maxId = item.id;
            }
        });

        this.#nextId = maxId + 1;
    }

    listAll() {
        return [...this.#orchids];
    }

    createOrchid({ description, genus, type, luminosity, temperature, humidity, size, image_src }) {
        if (this.existsDescription(description)) {
            throw new Error("Já existe uma orquídea com esse nome!");
        }


        const novaOrquidea = new Orchid(
            this.#nextId,
            description,
            genus,
            type,
            luminosity,
            temperature,
            humidity,
            size,
            image_src
        );

        this.#orchids.push(novaOrquidea);
        this.#nextId++;

        return novaOrquidea;
    }

    editOrchid(id, newData) {
    const orquidea = this.#orchids.find(o => o.getId() === id);
    if (!orquidea) {
        throw new Error("Orquidea não encontrada!");
    }

    if (newData.description && newData.description.toLowerCase() !== orquidea.getDescription().toLowerCase()) {
        if (this.existsDescription(newData.description)) {
            throw new Error("Já existe uma outra orquídea com esse nome!");
        }
        orquidea.setDescription(newData.description);
    }

    // Atualiza outras características usando setters
    if (newData.genus) orquidea.setGenus(newData.genus);
    if (newData.type) orquidea.setType(newData.type);
    if (newData.luminosity) orquidea.setLuminosity(newData.luminosity);
    if (newData.temperature) orquidea.setTemperature(newData.temperature);
    if (newData.humidity) orquidea.setHumidity(newData.humidity);
    if (newData.size) orquidea.setSize(newData.size);
    if (newData.src) orquidea.setImageSrc(newData.src);

    return orquidea;
}


    deleteOrchid(id) {
        const tamanhoOriginal = this.#orchids.length;
        this.#orchids = this.#orchids.filter(o => o.getId() !== id);

        if (this.#orchids.length === tamanhoOriginal) {
            throw new Error("Não foi encontrada nenhuma orquidea com esse id;");
        }
    }

    existsDescription(description) {
        const desc = description.trim().toLowerCase();
        return this.#orchids.some(o => o.getDescription().toLowerCase() === desc);
    }


    filterByCharacteristic(characteristic, valueId) {
        return this.#orchids.filter(o => {
            const getterName = `get${characteristic[0].toUpperCase() + characteristic.slice(1)}`;
            if (typeof o[getterName] === 'function') {
                return o[getterName]() === valueId;
            }
            return false;
        });
    }


    createOrchidCard(orquidea) {
        const card = document.createElement('div');
        card.classList.add('orchid-card');
        card.dataset.id = orquidea.getId();

        const img = document.createElement("img");
        img.src = orquidea.getImageSrc();
        img.alt = orquidea.getDescription();

        const title = document.createElement("h3");
        title.textContent = orquidea.getDescription();

        const details = document.createElement("div");
        details.className = "orchid-details";

        const makeDetail = (label, category, value) => {
            const p = document.createElement("p");
            const strong = document.createElement("strong");
            strong.textContent = `${label}: `;
            p.appendChild(strong);
            p.appendChild(document.createTextNode(CHARACTERISTICS_MAP[category]?.[value] || "N/A"));
            return p;
        };

        details.append(
            makeDetail("Género", "genus", orquidea.getGenus()),
            makeDetail("Tipo", "type", orquidea.getType()),
            makeDetail("Luminosidade", "luminosity", orquidea.getLuminosity()),
            makeDetail("Temperatura", "temperature", orquidea.getTemperature()),
            makeDetail("Humidade", "humidity", orquidea.getHumidity()),
            makeDetail("Tamanho", "size", orquidea.getSize())
        );

        const actions = document.createElement("div");
        actions.className = "card-actions";

        const btnEdit = document.createElement("button");
        btnEdit.textContent = "Editar";
        btnEdit.classList.add("btn-edit");
        btnEdit.dataset.id = orquidea.getId();

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Apagar";
        btnDelete.classList.add("btn-delete");
        btnDelete.dataset.id = orquidea.getId();

        actions.append(btnEdit, btnDelete);
        card.append(img, title, details, actions);

        return card;
    }


    renderAll(container) {
        const fragment = document.createDocumentFragment();
        this.#orchids.forEach(o => fragment.appendChild(this.createOrchidCard(o)));
        container.replaceChildren(fragment);
    }

}