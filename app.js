//GYNMOBILE
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('First Node.js by Fabio Brandespim');
}).listen(8888);
console.log('Servidor iniciado em localhost:8888. Ctrl+C para encerrar!');
