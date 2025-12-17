


const OrchidServices = require("../services/orchidServices.js");


/**
 * 
 */
class OrchidHandler {

    constructor(){
        this.orchServices = new OrchidServices();
    }

    
    async handleGetAll(req, res) {
        try{
            const orchids = await this.orchServices.getOrchids();
            return res.status(200).json({
                succes: true,
                data: orchids
            });
        }catch(error){
            //TODO: Verificar o porque deu erro
            return res.status(500).json({
                succes: false,
                message: 'Erro na busca de todas as Orquideas',
                error: error.message
            })
        }
    }

    async handleGetByID(req,res) {
        try{

        }catch(error){

        }
    }

    async handleCreate(req,res) {
        try{

        }catch(error){

        }
    }

    async handleUpdate(req,res) {
        try{

        }catch(error){

        }
    }

    async handleDelete(req,res) {
        try{

        }catch(error){

        }
    }

    async handleFilter(req,res) {
        try{

        }catch(error){

        }
    }
}

module.exports = OrchidHandler;