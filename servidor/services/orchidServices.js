
import { DatabaseServices } from "../database/services"
import { Orchid } from "../../www/scripts/classes/orchid";

class OrchidServices {

    constructor(){
        this.dbService = new DatabaseServices();
    }

    //TODO implementar os metodos do service
    async addOrchid(orchid) {
        this.#verifyOrchid(orchid);
    }

    async editOrchid(orchid) {
        this.#verifyOrchid(orchid);
    }

    async removeOrchid(orchid) {
        this.#verifyOrchid(orchid);
    }

    async getOrchids() {}

    async filterOrchids() {}

    async fetchOrchid(orchid) {
        this.#verifyOrchid(orchid);
    }

    /**
     * @brief Método utilizado para verificar se o tipo a ser passado é da classe Orquidea
     * @param {Orchid} orchid 
     */
    #verifyOrchid (orchid) {
        if (!(orchid instanceof Orchid)){
            throw new Error('Valor invalido')
        }
    }

}


export {OrchidServices};