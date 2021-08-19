var express = require('express');
var app = express();
var router = require('./router.js');

var PORT = 3000;

app.use(express.json());
app.use(router);

app.use(express.static('./client/dist/'));


app.listen(PORT, () => {
  console.log(`server listening on Port: ${PORT}`);
})








