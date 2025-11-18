import { Orchid } from './orchid.js';
import { data } from '../data/data.js';
//TODO: Todo tipo de orquideas criados devem ser armazenados aqui
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


    get getTodos(){
        return this.#orchids;
    }

    //get LowLuminosity(){}
}