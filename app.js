const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola DevSecOps 01, ¡funcionando!\n');
});

server.listen(port, () => {
  console.log(`Cambio test 1`);
  console.log(`Servidor corriendo en puerto ${port}`);
});
