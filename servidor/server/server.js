/**
 * @brief Ficheiro de servidor para fazer Network rotting.
*/

const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes.js');
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', '..', 'www')));

app.use('/orquideas', router);

//app.get('/image/:id', require('./imageRoute'));

app.use((req, res, next) => {
  if (path.extname(req.path)) return next();
  res.sendFile(path.join(__dirname, '..', '..','www', 'index.html'));
});



app.listen(port, () => {
  console.log(`App on url http://localhost:${port}/orquideas`)
})
