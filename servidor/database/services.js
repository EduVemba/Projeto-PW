
import { pool } from "./connect";
import { Orchid } from "../../www/scripts/classes/orchid"


class DatabaseServices {

    constructor() {
        this.pool = pool;
    }


    async GetTODOS() {
        const [rows] = await this.pool.query(
            'SELECT * FROM orchid'
        );
        //TODO: tratamento de erro para quando da erros.
        return rows;
    }

    async AddOrchid(orchid) {
        //TODO: adicnionar 
    }

    async EditOrchid(id,orchid) {
        //TODO: Editar
    }

    async RemoveOrchid(id) {
        //TODO: remover
    }

    async GetOrchidImage(id) {
        //TODO: pegar imagem.
    }
}


export default new DatabaseServices();