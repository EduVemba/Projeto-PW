

const fs = require('fs');
const path = require('path');
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

async handleCreate(req, res) {
    try {
        const orchidData = JSON.parse(req.body.data);
        
        const result = await this.orchServices.addOrchid(orchidData);
        const orchidId = result.insertedID;
        
        if (req.file) {
            try {
                const genusName = orchidData.description.split(' ')[0].toLowerCase();
                
                const imagePath = await this.#processImage(req.file, genusName, orchidId);
                
                await this.orchServices.editOrchid(orchidId, {
                    ...orchidData,
                    image_src: imagePath
                });
                
                result.image_src = imagePath;
            } catch (imgError) {
                console.error('Erro ao processar imagem:', imgError);
            }
        }
        
        return res.status(201).json({
            success: true,
            message: 'Orquídea adicionada com sucesso',
            data: result
        });
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        const statusCode = error.message.includes('já existe') ? 409 : 400;
        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
}

async handleUpdate(req, res) {
    try {
        const id = parseInt(req.params.id);
        const orchidData = JSON.parse(req.body.data);
        
        if (req.file) {
            try {
                const oldOrchid = await this.orchServices.getOrchidById(id);
                
                if (oldOrchid && oldOrchid.image_src) {
                    const oldImagePath = path.join(__dirname, '..', '..', 'www', oldOrchid.image_src);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                
                const genusName = orchidData.description.split(' ')[0].toLowerCase();
                
                const imagePath = await this.#processImage(req.file, genusName, id);
                orchidData.image_src = imagePath;
            } catch (imgError) {
                console.error('Erro ao processar imagem:', imgError);
            }
        }
        
        const result = await this.orchServices.editOrchid(id, orchidData);
        
        return res.status(200).json({
            success: true,
            message: 'Orquídea atualizada com sucesso',
            data: result
        });
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        const statusCode = error.message.includes('não encontrada') ? 404 : 400;
        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
}

    async #processImage(file, genusName, orchidId) {
        const extension = path.extname(file.originalname);
        const newFilename = `${orchidId}${extension}`;
    
        const targetDir = path.join(__dirname, '..', '..', 'www', 'images', 'orchids', genusName);
        const targetPath = path.join(targetDir, newFilename);
    
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
    
        fs.renameSync(file.path, targetPath);
    
    return `/images/orchids/${genusName}/${newFilename}`;
    
    }

async handleDelete(req, res) {
    try {
        const id = parseInt(req.params.id);

       const possibleDirs = ['bulbophyllum','cattleya','cymbidium','paphiopedilum','phalaenopsis'];
        for (const genus of possibleDirs) {
            const imagePath = path.join(__dirname, '..', '..', 'www', 'images', 'orchids', genus, `${id}.jpg`);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                break;
            }
        }

        await this.orchServices.removeOrchid(id);

        return res.status(200).json({
            success: true,
            message: 'Orquídea removida com sucesso'
        });

    } catch (error) {
        return res.status(400).json({
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