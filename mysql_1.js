var express   =    require("express");
var mysql     =    require('mysql2');
var app       =    express();

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '2197',
    database : 'ilaudomysql',
    debug    :  false
});

function handle_database(req,res) {
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("select idcliente,nome from clientes order by idcliente",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);

		for (var i = 0; i < rows.length; i++) {
		    var nome = rows[i];
		    console.log(nome);
		}

            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

app.get("/",function(req,res){
        handle_database(req,res);
});

app.listen(8888);
console.log('Servidor iniciado em localhost:8888. Ctrl+C para encerrar!');
