

const express = require('express');
const OrchidHandler = require('../controller/orchidsHandler.js');

const router = express.Router();
const orchidHandler = new OrchidHandler();

router.get('/todas', (req,res) => orchidHandler.handleGetAll(req, res));

router.get('/orquidea/:id', (req, res) => orchidHandler.handleGetByID(req, res));

router.get('/filtrar', (req,res) => orchidHandler.handleFilter(req, res));

router.get('/filtered', (req,res) => orchidHandler.handleFilter(req, res));

router.post('/create', (req, res) => orchidHandler.handleCreate(req, res));

router.put('/update/:id', (req, res) => orchidHandler.handleUpdate(req, res));

router.delete('/delete/:id', (req, res) => orchidHandler.handleDelete(req, res));

router.get('/options', (req, res) => {
    const options = {
    "genus": [
        { "id": 1, "description": "Phalaenopsis" },
        { "id": 2, "description": "Cattleya" },
        { "id": 3, "description": "Dendrobium" }
    ],
    "type": [
        { "id": 1, "description": "Epífita" },
        { "id": 2, "description": "Terrestre" },
        { "id": 3, "description": "Litófita" }
    ],
    "luminosity": [
        { "id": 1, "description": "Baixa" },
        { "id": 2, "description": "Média" },
        { "id": 3, "description": "Alta" }
    ],
    "temperature": [
        { "id": 1, "description": "Fria (10-15°C)" },
        { "id": 2, "description": "Intermediária (15-25°C)" },
        { "id": 3, "description": "Quente (25-35°C)" }
    ],
    "humidity": [
        { "id": 1, "description": "Baixa (40-50%)" },
        { "id": 2, "description": "Média (50-70%)" },
        { "id": 3, "description": "Alta (70-90%)" }
    ],
    "size": [
        { "id": 1, "description": "Miniatura (<15cm)" },
        { "id": 2, "description": "Pequena (15-30cm)" },
        { "id": 3, "description": "Média (30-60cm)" },
        { "id": 4, "description": "Grande (>60cm)" }
    ]
  };
  res.json(options);
});


module.exports = router