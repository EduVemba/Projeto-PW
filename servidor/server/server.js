"use strict"

/**
 * @brief Ficheiro de servidor para fazer Network rotting.
*/

const express = require('express');
const app = express();
const port = 3000;



app.get('/', (req, res) => {
  res.send('Esse é o Projeto!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
