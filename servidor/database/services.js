
import { pool } from "./connect";
import { Orchid } from "../../www/scripts/classes/orchid"


/**
 * @notice {result[0]} pois ele devolve para alem dos elementos encontrados a metadata que fica na posição [1].
 */
class DatabaseServices {

    constructor() {
        this.pool = pool;
    }


    async GetTODOS() {
        const [result] = await this.pool.query(
            'SELECT * FROM orchid'
        );

        return result;
    }

    async GetFilteredContent(type,type_id) {

        const allowedTypes = [
        'genus',
        'type',
        'luminosity',
        'temperature',
        'humidity',
        'size'
        ];

        if (!Number.isInteger(type_id)) {
            throw new Error('Invalid filter id');
        }


        if (!allowedTypes.includes(type)) {
            throw new Error('Invalid filter type');
        }


        const [result] = await this.pool.query(
        'CALL filter_content(?,?)',[type,type_id]
        )
        return result[0];
    }

    async AddOrchid(orchid) {

        if (!(orchid instanceof Orchid)) {
            throw new Error('O tipo é invalido.');
        }

        const orchidType = OrchidType[orchid.getGenus()];
        if (!orchidType){
            throw new Error("Genus inválido.")
        }


        const [
        result
    ] = await this.pool.query(
        'CALL add_orchid(?,?,?,?,?,?,?,?)',
        [
            orchidType,
            orchid.getDescription(),
            orchid.getGenus(),
            orchid.getType(),
            orchid.getLuminosity(),
            orchid.getTemperature(),
            orchid.getHumidity(),
            orchid.getSize()
        ]
    );

    /*
    return {
        success: result.affectedRows === 1,
        insertedID: result.insertId || null
    }*/
    }

    async EditOrchid(id,orchid) {

        if (!Number.isInteger(id)) {
            throw new Error("ID inválido.");
        }
        
        if (!(orchid instanceof Orchid)){
            throw new Error("Tipo invalido.")
        }

        const orchidType = OrchidType[orchid.getGenus()];
        if (!orchidType){
            throw new Error("Genus inválido.")
        }


        const [result] = await this.pool.query(
            'CALL edit_orchid(?,?,?,?,?,?,?,?,?)',
            [
                id,
                orchidType,
                orchid.getDescription(),
                orchid.getGenus(),
                orchid.getType(),
                orchid.getLuminosity(),
                orchid.getTemperature(),
                orchid.getHumidity(),
                orchid.getSize()
            ]
        );

        return result.affectedRows === 1;
    }

    async RemoveOrchid(id) {
        
        if (!Number.isInteger(id)) {
            throw new Error("ID inválido.");
        }

        const [result] = await this.pool.query(
            'DELETE FROM orchid WHERE id = ?',[id]
        )

        return result.affectedRows === 1;
    }

    //TODO: rever sobre a imagem na Base de Dados.
    async GetOrchidImage(id) {
        //TODO: pegar imagem.
    }

    async GetOrchidID(orchid) {

        if (!(orchid instanceof Orchid)){
            throw new Error("Tipo invalido.")
        }

        const orchidType = OrchidType[orchid.getGenus()];
        if (!orchidType){
            throw new Error("Genus inválido.")
        }


        const [result] = await this.pool.query(
            'CALL findID(?,?,?,?,?,?,?,?)',
            [
                orchidType,
                orchid.getDescription(),
                orchid.getGenus(),
                orchid.getType(),
                orchid.getLuminosity(),
                orchid.getTemperature(),
                orchid.getHumidity(),
                orchid.getSize()
            ]
        )

        return result[0][0]?.id ?? null;
    }
}


const OrchidType = {
    1: 'Bulbophyllum',
    2: 'Cattleya',
    3: 'Cymbidium',
    4: 'Paphiopedilum',
    5: 'Phalaenopsis'
}


export  { DatabaseServices };