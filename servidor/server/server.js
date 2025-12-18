/**
 * @brief Ficheiro de servidor para fazer Network rotting.
*/

const express = require('express');
const app = express();

const router = require('./routes.js');
const port = 3000;

app.use('/orquideas',router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
