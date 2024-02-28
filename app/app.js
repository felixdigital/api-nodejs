const env = require('./enviroment');
const express = require('express');
const app = express();
const connection = require('./connection');
app.use( express.json() );

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

app.get('/',function(req,res)
		{
			const response = { message:"api blog" };
		  res.status(200).json(response);
		}
	); 

	app.listen (env.PORT,function()
		{
			console.log( "servidor arrancado en el puerto " + env.PORT );
		}
	); 

	//routes
	const articles = require('./routes/articles');
	app.use('/articles',articles);