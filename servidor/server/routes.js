

const express = require('express');
const OrchidHandler = require('../controller/orchidsHandler.js');

const router = express.Router();
const orchidHandler = new OrchidHandler();

router.get('/todas', (req,res) => orchidHandler.handleGetAll(req, res));

router.get('/orquidea/:id', (req, res) => orchidHandler.handleGetByID(req, res));

router.get('/filtered', (req,res) => orchidHandler.handleFilter(req, res));

router.post('/create', (req, res) => orchidHandler.handleCreate(req, res));

router.put('update/:id', (req, res) => orchidHandler.handleUpdate(req, res));

router.delete('delete/:id', (req, res) => orchidHandler.handleDelete(req, res));


module.exports = router