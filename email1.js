// Enviando e-mails usando o Node.js e o famoso nodemailer
var nodemailer = require('nodemailer');

// Vamos criar a conta que ir� mandar os e-mails
var conta = nodemailer.createTransport({
    service: 'Gmail', // Existem outros services, voc� pode procurar
                      // na documenta��o do nodemailer como utilizar
                      // os outros servi�os
    auth: {
        user: 'fabiobrandespim@gmail.com', // Seu usu�rio no Gmail
        pass: 'Fab21972197' // A senha da sua conta no Gmail :-)
    }
});

var email = {
    from: 'Fabio Brandespim <fabiobrandespim@gmail.com>', // Quem est� mandando
    to: 'Fabio Brandespim <fabiobrandespim@gmail.com>', // Para quem o e-mail deve chegar
    subject: 'Estou testando o envio de email com o Node', // O assunto
    html: '<strong>Oi Fabio!</strong><p>Estou testando o envio de e-mails!</p>', // O HTMl do nosso e-mail
    attachments: [{ // Basta incluir esta chave e listar os anexos
      filename: 'gynmobile.jpg', // O nome que aparecer� nos anexos
      path: '/node_fontes/gynmobile.jpg' // O arquivo ser� lido neste local ao ser enviado
    }]
};

conta.sendMail(email, function(err){
		      if(err)
		         throw err;

    console.log('E-mail enviado!');
});
