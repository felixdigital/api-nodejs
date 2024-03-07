const connection = require('../core/connection');
const express = require('express');
const router = express.Router();
var response = {};

//const AllArticles = require('../model/AllArticles');
//const OneArticle = require('../model/OneArticle');
//const lasrArticle = require('../model/lastArticle');

// ruta: articles/id/comments	todos los comentarios del articulo 
router.get('/:id/comments',function(req,res)
	{	
		const id = req.params.id;
		var sql = "select * from comments where article=?";
		
		connection.query(sql,[id],function(error,result)
			{
				if(error)
				 	{
				 		response = { status:"error",message: error.code };
						res.status(500).json(error);
				 	}
				else
					{	
						if( result.length > 0 )
									{
										res.status(200).json(result);
									}	
							else
								{
									response = { status:"warning",message: "not found" };
									res.status(404).json(response);
								}
					} 
			}
		);
   
	}
);

// ruta: articles/id/add/comment	añadir comentario al articulo 
router.post('/:id/add/comment',function(req,res)
	{	
		const id = req.params.id;

		const row = {	
			content: req.body.content,
			author_name: req.body.author_name,
			author_email: req.body.author_email	
		} 

		var sql;
		sql =  "INSERT INTO comments ";
		sql += "(id,content,author_name,author_email,created_at,article) values ";
		sql += "(null,?,?,?,CURRENT_TIMESTAMP,?)";

		const params = [row.content,row.author_name,row.author_email,id];

		connection.query(sql,params,function(error,result)
			{
			if(error)
				{
					  response = { status:"error",message: error.code };
						res.status(500).json(response);
				}
			else
				{
					response = { status:"success",message: "record inserted" };
					res.status(201).json(response);
				}
			}
		);
			
	}
);


// ruta: articles/id/edit/comment/id	editar el comentario  del articulo 
router.put('/:id/edit/comment/:idComment',function(req,res)
	{	

		const row = {	
			content: req.body.content,
			author_name: req.body.author_name,
			author_email: req.body.author_email	
		} 

		const id = req.params.id;
		const idComment = req.params.idComment;
		var sql;

		sql = "update comments set "
		sql += "content=?,author_name=?,author_email=? "
		sql += "where id=? and article=?"
		
		const params = [row.content,row.author_name,row.author_email,idComment,id];

		connection.query(sql,params,function(error,result)
			{
				if(error)
					{
						response = { status:"error",message: error.code };
						res.status(500).json(response);
					}
				else
					{
						if(result.affectedRows > 0)
							{
								response = { status:"success",message: "record changed" };
								res.status(200).json(response);
							}
						else
							{
								response = { status:"warning",message: "not found" };
								res.status(404).json(response);
							}
					}
			}
		);


	}
);

// ruta: articles/id/delete/comment/id	eliminar el comentario del articulo
router.delete('/:id/delete/comment/:idComment',function(req,res)
	{	
		const id = req.params.id;
		const idComment = req.params.idComment;
		var sql = "delete from comments where id=? and article=?";
		const params = [idComment,id];

		connection.query(sql,params,function(error,result)
			{
					if(error)
						{
							response = { status:"error",message: error.code };
							res.status(500).json(response);
					  }
					else
						{
							if( result.affectedRows>0 )
								{
									response = { status:"success",message: "record inserted" };
									res.status(200).json(response);	
								}
							else
								{
									response = { status:"warning",message: "not found" };
									res.status(404).json(response);	
								}
						}	
					
			}
		);
		
	}
);

module.exports = router;