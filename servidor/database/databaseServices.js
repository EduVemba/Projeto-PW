
const execute = require("./connect");


/**
 * @notice {result[0]} pois ele devolve para alem dos elementos encontrados a metadata que fica na posição [1].
 */
class DatabaseServices {

    async GetTODOS() {
        const result = await execute(
            'SELECT * FROM orchid'
        );

        return result;
    }

    async GetFilteredContent(category,type_id) {
        const result = await execute(
            'CALL filter_content(?,?)',[category,type_id]
        );

        return result[0];
    }

    async AddOrchid(orchid) {

        const orchidType = OrchidType[orchid.getGenus()];
        if (!orchidType){
            throw new Error("Genus inválido.")
        }


        const result = await execute(
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
        

        const orchidType = OrchidType[orchid.getGenus()];
        if (!orchidType){
            throw new Error("Genus inválido.")
        }


        const result = await execute(
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

        const result = await execute(
            'DELETE FROM orchid WHERE id = ?',[id]
        );

        return result.affectedRows === 1;
    }

    //TODO: rever sobre a imagem na Base de Dados.
    async GetOrchidImage(id) {
        //TODO: pegar imagem.
    }

    async GetOrchidID(orchid) {

        const orchidType = OrchidType[orchid.getGenus()];
        if (!orchidType){
            throw new Error("Genus inválido.")
        }


        const result = await execute(
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
        );

        return result[0][0]?.id ?? null;
    }

    async GetByName(name) {

        if (!name || typeof name !== 'string'){
            throw new Error('GetByName instrance Error')
        }

        const result = await execute(
            'SELECT * FROM orchid WHERE description = ?', [name]
        );

        return result;
    }

    async GetById(id){

         if (!Number.isInteger(id)) {
            throw new Error("ID inválido.");
        }

        const result = await execute(
            'SELECT * FROM orchid WHERE id = ?',[id]
        );

        return result[0] ?? null;
    }
}


const OrchidType = {
    1: 'Bulbophyllum',
    2: 'Cattleya',
    3: 'Cymbidium',
    4: 'Paphiopedilum',
    5: 'Phalaenopsis'
}


module.exports = DatabaseServices ;