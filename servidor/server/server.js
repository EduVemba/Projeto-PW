/**
 * @brief Ficheiro de servidor para fazer Network rotting.
*/

const express = require('express');
const app = express();
const router = require('./routes.js');
const port = 3000;

app.use(express.json());

// simple CORS for local dev
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use('/orquideas', router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
