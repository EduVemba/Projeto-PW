

const express = require('express');
const OrchidHandler = require('../controller/orchidsHandler.js');
const path = require('path');

const upload = require('../utils/multerConfig.js');

const router = express.Router();
const orchidHandler = new OrchidHandler();

router.get('/todas', (req,res) => orchidHandler.handleGetAll(req, res));

router.get('/orquidea/:id', (req, res) => orchidHandler.handleGetByID(req, res));

router.get('/orquidea/:nome', (req, res) => orchidHandler.handleGetByName(req, res));

router.get('/filtrar', (req,res) => orchidHandler.handleFilter(req, res));

router.get('/filtered', (req,res) => orchidHandler.handleFilter(req, res));

router.post('/create', upload.single('image'),(req, res) => orchidHandler.handleCreate(req, res));

router.put('/update/:id', upload.single('image'), (req, res) => orchidHandler.handleUpdate(req, res));

router.delete('/delete/:id', (req, res) => orchidHandler.handleDelete(req, res));

router.get('/options', (req, res) => {
    const options = {
    "genus": [
        { "id": 1, "description": "Bulbophyllum" },
        { "id": 2, "description": "Cattleya" },
        { "id": 3, "description": "Cymbidium" },
        { "id": 4, "description": "Paphiopedilum" },
        { "id": 5, "description": "Phalaenopsis" },
    ],
    "type": [
        { "id": 1, "description": "Espécie" },
        { "id": 2, "description": "Híbrido" }
    ],
    "luminosity": [
        { "id": 1, "description": "Sombra total" },
        { "id": 2, "description": "Luz sombreada" },
        { "id": 3, "description": "Luz filtrada" },
        { "id": 4, "description": "Luz forte" }
    ],
    "temperature": [
        { "id": 1, "description": "Frio" },
        { "id": 2, "description": "Temperado" },
        { "id": 3, "description": "Quente" },
        { "id": 4, "description": "Muito quente" }
    ],
    "humidity": [
        { "id": 1, "description": "\u226440%" },
        { "id": 2, "description": "40% a 60%" },
        { "id": 3, "description": "60% a 80%" },
        { "id": 4, "description": "\u226580%" }
    ],
    "size": [
        { "id": 1, "description": "Miniatura" },
        { "id": 2, "description": "Pequeno" },
        { "id": 3, "description": "Médio" },
        { "id": 4, "description": "Grande" }
    ]
  };
  res.json(options);
});


module.exports = router