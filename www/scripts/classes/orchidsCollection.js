import { Orchid } from './orchid.js';
import { data } from '../data/data.js';

/**
 * @class OrchidsCollection
 * @description Classe que representa uma coleção de orquídeas e que gerencia pelas características das orquídeas.
 * 
 */

export class OrchidsCollection {
    #orchids = [];

    constructor() {
        this.#orchids = data.orchid.map(orchidData => 
            new Orchid(
                orchidData.id,
                orchidData.description,
                orchidData.genus,
                orchidData.type,
                orchidData.luminosity,
                orchidData.temperature,
                orchidData.humidity,
                orchidData.size,
                orchidData.src,
                new Date()
            )
        );
    }


    createOrchid(obj) {
        //const id = this.#orchids.length + 1;
        const maxId = Math.max(0, ...this.#orchids.map(o => o.getId()));
        const id = maxId + 1;
        const orchid = new Orchid(
            id,
            obj.description,
            obj.genus,
            obj.type,
            obj.luminosity,
            obj.temperature,
            obj.humidity,
            obj.size,
            obj.image_src || obj.src,
            new Date()
        );

        this.#orchids.push(orchid);
        return orchid;
    }

    get getTodos(){
        return this.#orchids;
    }

    getLowLuminosity() {
        return this.#orchids.filter(o => o.getLuminosity() === 1);
    }

    editOrchid(id, newData) {
        const orchid = this.#orchids.find(o => o.getId() === id);
        if (!orchid) throw new Error("Orquídea não encontrada!");

        if (newData.description)    orchid.setDescription(newData.description);
        if (newData.genus)          orchid.setGenus(newData.genus);
        if (newData.type)           orchid.setType(newData.type);
        if (newData.luminosity)     orchid.setLuminosity(newData.luminosity);
        if (newData.temperature)    orchid.setTemperature(newData.temperature);
        if (newData.humidity)       orchid.setHumidity(newData.humidity);
        if (newData.size)           orchid.setSize(newData.size);
        if (newData.image_src)      orchid.setImageSrc(newData.image_src);

        return orchid;
    }

    deleteOrchid(id) {
        const index = this.#orchids.findIndex(o => o.getId() === id);
        if (index === -1) return false;

        this.#orchids.splice(index, 1);
        return true;
    }

    findById(id) {
        return this.#orchids.find(o => o.getId() === id);
    }

    findByName(name){
        return this.#orchids.find(o => o.getDescription().toLowerCase() === name.toLowerCase());
    }
}