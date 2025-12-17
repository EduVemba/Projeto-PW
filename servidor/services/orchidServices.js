
import { DatabaseServices } from "../database/services"
import { VerifyOrchid } from "../utils/verification";

class OrchidServices {

    constructor(){
        this.dbService = new DatabaseServices();
    }

    //TODO implementar os metodos do service
    async addOrchid(orchid) {
        VerifyOrchid(orchid);

    }

    async editOrchid(orchid) {
        VerifyOrchid(orchid);
    }

    async removeOrchid(orchid) {
        VerifyOrchid(orchid);
    }

    async getOrchids() {
        const result = await this.dbService.GetTODOS();
        return result
    }

    async filterOrchids(category, type) {

        if (!Number.isInteger(type)) {
            throw new Error('Invalid filter id');
        }

        const allowedCategories = [
        'genus',
        'type',
        'luminosity',
        'temperature',
        'humidity',
        'size'
        ];

        if (!allowedCategories.includes(category)) {
            throw new Error('Invalid filter type');
        }

        const result = await this.dbService.GetFilteredContent(category,type)

        return result;
    }

    async fetchOrchid(orchid) {
        VerifyOrchid(orchid);
    }

}


export {OrchidServices};