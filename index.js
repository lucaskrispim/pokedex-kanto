const express = require('express'); // módulo express para criar as rotas

app = express(); // instaciar o módulo express na variável app

//app.set('view engine','ejs');
app.use(express.static(__dirname + '/views')); // Engine de views

app.get('/',(req,res)=>{ // rota via get
  res.render('index'); // renderizar o html via get
});

app.listen(3004,function(req,res){ // escutar na porta 
	console.log('Servidor está rodando');
});