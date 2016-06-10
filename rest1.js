var express = require('express');
var mysql   = require('mysql2');
var app     = express();

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '2197',
    database : 'ilaudomysql',
    debug    :  false
});

//=================================
function lista_clientes(req,res) {
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("select idcliente,nome,telefone1,cidade,pais from clientes order by nome",function(err,rows){
            connection.release();
            if(!err) {
                //var str = JSON.stringify(rows, null, 2); // spacing level = 2
                //console.log(str);
                
                //MOSTRA SEM FORMATAR O JSON
                //res.json(rows);
                
                //MOSTRA FORMATANDO O JSON
                res.end(JSON.stringify(rows, null, 4));
                

                //MOSTRA CADA REGISTRO 
		//for (var i = 0; i < rows.length; i++) {
		//    var nome = rows[i];
		//    console.log(nome);
		//}
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

//=====================================
console.log("Registering endpoint: /");
app.get('/', function(req, res){
    res.send('hello ROOT world<br>'+ 
             'Registering endpoint: <br>'+   
             'Registering endpoint: /um<br>'+   
             'Registering endpoint: /dois<br>'+  
             'Registering endpoint: /treis<br>'+                
             'Registering endpoint: /clientes<br>'+  
             'Registering endpoint: /cliente/:id<br>');
});
//=======================================
console.log("Registering endpoint: /um");
app.get('/um', function(req, res){
    res.send('hello UM');
});
//=========================================
console.log("Registering endpoint: /dois");
app.get('/dois', function(req, res){
    res.send('hello DOIS');
});
//=========================================
console.log("Registering endpoint: /tres");
app.get('/tres', function(req, res){
    res.json({
        "nome" : "Fabio Brandespim", 
        "telefone" : "91909935", 
        "idade" : 40
    });
});
//=============================================
console.log("Registering endpoint: /clientes");
app.get("/clientes",function(req,res){
        lista_clientes(req,res);
});
//=======================================================
console.log("Registering endpoins: /cliente/:idcliente");
app.get('/cliente/:idcliente', function (req, res, next) {
        var query = 'Select * from clientes where idcliente = ' + req.params.idcliente;
        //console.log('Select * from clientes where idcliente = ' + req.params.idcliente);
        
        pool.getConnection(function(err,connection){
            if (err) {
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
            }   

            console.log('connected as id ' + connection.threadId);

            connection.query(query,function(err,rows){
                connection.release();
                if(!err) {
                    //res.json(rows);
                    res.end(JSON.stringify(rows, null, 4));

                    //for (var i = 0; i < rows.length; i++) {
                    //    var nome = rows[i];
                    //    console.log(nome);
                    //}
                }           
            });

            connection.on('error', function(err) {      
                  res.json({"code" : 100, "status" : "Error in connection database"});
                  return;     
            });
        });        
        
        //client.execute(query, function (err, result) {
        //if (err) return next (err);
        //var row = result.rows[0];
        //if (result.rows.length==0) {
        //        res.send('idcliente: ' + req.params.idcliente + ' not found. Not all data is loaded.');
        //} else {
        //    var row = result.rows[0];
                //Response
        //        res.json({idcliente: req.params.idcliente, accts: row.get('accts'), offers: row.get('offers')});
        //};
        //});
});

//app.listen(8888);
//console.log('Servidor iniciado em localhost:8888. Ctrl+C para encerrar!');

var server = app.listen(8888, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});