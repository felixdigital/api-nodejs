const env = require('./enviroment');
const express = require('express');
const app = express();
app.use( express.json() );
const connection = require('./core/connection');

connection.connect( function(error)
	{
		if(!error)
			{
				console.log("conectado a la base de datos "+env.DATABASE);
			}
		else
			{
				console.log(error);
			}
	});
	
app.listen (env.PORT,function()
		{
			console.log( "servidor arrancado en el puerto " + env.PORT );
		}
	); 

app.get('/',function(req,res)
		{
			const response = { status: "success",message:"api blog" };
		  res.status(200).json(response);
		}
	); 

//routes
const articles = require('./routes/articles');
app.use('/articles',articles);

const comments = require('./routes/comments');
app.use('/articles',comments);