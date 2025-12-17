/**
 * @brief Ficheiro de servidor para fazer Network rotting.
*/

const OrchidHandler = require('../controller/orchidsHandler.js');

const express = require('express');
const app = express();
const port = 3000;

const orchidHandler = new OrchidHandler();


app.get('/', (req, res) => {
  res.send('Esse é o Projeto!')
})

app.get('/todas', (req,res) => orchidHandler.handleGetAll(req,res));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
