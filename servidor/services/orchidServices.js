
const DatabaseServices = require("../database/databaseServices.js");

class OrchidServices {

    constructor(){
        this.dbService = new DatabaseServices();
    }

    /**
     * 
     * @param {Orchid} orchid 
     * @returns 
     */
    async addOrchid(orchid) {

        VerifyOrchid(orchid);


        const id = await this.dbService.GetOrchidID(orchid);
        const exists = id !== null;

        if (exists){
            const result = await this.dbService.EditOrchid(id, orchid);
            return result;
        }

        const result = await this.dbService.AddOrchid(orchid);

        return result;
    }

    /**
     * 
     * @param {Number} id 
     * @param {Orchid} orchid 
     * @returns 
     */
    async editOrchid(id,orchid) {

        VerifyOrchid(orchid);

        if (!id || !Number.isInteger(id)) {
            throw new Error('ID inválido');
        }

        const exists = this.#orchidExists(id);
        
        if(!exists){
            throw new Error('Orchid does not exists.');
        }

        const result = await this.dbService.EditOrchid(id, orchid);

        return result;
    }

    /**
     * 
     * @param {Number} id 
     * @returns 
     */
    async removeOrchid(id) {

        if (!id || !Number.isInteger(id)) {
            throw new Error('ID inválido');
        }

        const existing = await this.dbService.GetById(id);
        if (!existing) {
            throw new Error('Orquídea não encontrada');
        }

        const result = await this.dbService.RemoveOrchid(id);
        return result;
    }

    /**
     * 
     * @returns 
     */
    async getOrchids() {
        const result = await this.dbService.GetTODOS();
        return result
    }

    /**
     * 
     * @param {String} category 
     * @param {Number} type 
     * @returns 
     */
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

    /**
     * 
     * @param {Number} id 
     * @returns 
     */
    async fetchOrchid(id) {

        if (!id || !Number.isInteger(id)) {
            throw new Error('ID inválido');
        }

        const result = await this.dbService.GetById(id);
        
        if (!result) {
            throw new Error('Orquídea não encontrada');
        }

        return result;
    }

    /**
     * 
     * @param {Number || String} type 
     * @returns 
     */
    async #orchidExists(type) {
        if (typeof type === 'number'){
            const result = await this.dbService.GetById(type);
            return result === null ? false : true;
        }else if(type instanceof String){
            const result = await this.dbService.GetByName(type);
            return result === null ? false : true;
        }else{
            throw new Error('Orchid search parameter wrong');
        }
    }

}

/**
* @brief função utilizado para verificar se o tipo a ser passado é da classe Orquidea
* @param {Orchid} orchid 
*/
function VerifyOrchid(orchid) {
    const requiredFields = ['description', 'genus', 'type', 'luminosity', 'temperature', 'humidity', 'size'];
    
    for (const field of requiredFields) {
        if (orchid[field] === undefined || orchid[field] === null) {
            throw new Error(`Campo obrigatório '${field}' em falta`);
        }
    }
    
    if (typeof orchid.description !== 'string') {
        throw new TypeError('description deve ser string');
    }
    
    const numericFields = ['genus', 'type', 'luminosity', 'temperature', 'humidity', 'size'];
    for (const field of numericFields) {
        if (typeof orchid[field] !== 'number') {
            throw new TypeError(`${field} deve ser número`);
        }
    }
}


module.exports = OrchidServices;