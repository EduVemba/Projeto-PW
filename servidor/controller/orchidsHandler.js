


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
            return res.status(500).json({
                succes: false,
                message: 'Erro na busca de todas as Orquideas',
                error: error.message
            })
        }
    }

    async handleGetByID(req,res) {
        try{
            const id = parseInt(req.params.id);
            const orchid = await this.orchServices.fetchOrchid(id);

            return res.status(200).json({
                succes: true,
                data: orchid
            })

        }catch(error){
            const statusCode = error.message.includes('não encontrada') ? 404 : 400;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    async handleGetByName(req,res) {

        try{
            const name = req.params.name;
            const orchid = await this.orchServices.fetchOrchidByName(name);
            return res.status(200).json({
                succes: true,
                data: orchid
            });

        }catch(error){
            const statusCode = error.message.includes('não encontrada') ? 404 : 400;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    async handleCreate(req,res) {
        try{
            const orchidData = req.body;
            const result = await this.orchServices.addOrchid(orchidData);
            
            return res.status(201).json({
                success: true,
                message: 'Orquídea adicionada com sucesso',
                data: result
            });
        }catch(error){
            const statusCode = error.message.includes('já existe') ? 409 : 400;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    async handleUpdate(req,res) {
        try{
            const id = parseInt(req.params.id);
            const orchidData = req.body;
            
            const result = await this.orchServices.editOrchid(id, orchidData);
            
            return res.status(200).json({
                success: true,
                message: 'Orquídea atualizada com sucesso',
                data: result
            });
        }catch(error){
            const statusCode = error.message.includes('não encontrada') ? 404 : 400;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    async handleDelete(req,res) {
        try{
            const id = parseInt(req.params.id);
            await this.orchServices.removeOrchid(id);
            
            return res.status(200).json({
                success: true,
                message: 'Orquídea removida com sucesso'
            });
        }catch(error){
            const statusCode = error.message.includes('não encontrada') ? 404 : 400;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    async handleFilter(req,res) {
        try{
            const { category, type } = req.query;
            const typeInt = parseInt(type);
                        
            const orchids = await this.orchServices.filterOrchids(category, typeInt);
                        
            return res.status(200).json({
                success: true,
                data: orchids
            });
        }catch(error){
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = OrchidHandler;