const connection = require('../core/connection');
const express = require('express');
const router = express.Router();
var response = {};

const AllArticles = require('../model/AllArticles');
const OneArticle = require('../model/OneArticle');
const lasrArticle = require('../model/lastArticle');

router.get('/',function(req,res)
	{	
		 AllArticles(req,res);	
	}
);

router.get('/:id',function(req,res)
	{		
		const id = req.params.id;
		OneArticle(req,res,id);
	}
);

router.get('/last/insert',function(req,res)
	{	
		lasrArticle(req,res);	
	}
);


router.post('/',function(req,res)
	{
			const row = {
				title: req.body.title,
				content: req.body.content,
				extract: req.body.extract,
				author_name: req.body.author_name,
				author_email: req.body.author_email,
				created_at : req.body.created_at
			} 
		
		var sql;
		sql =  "INSERT INTO articles "
		sql += "(id,title,content,extract,author_name,author_email,created_at) values "
		sql += "(null,?,?,?,?,?,CURRENT_TIMESTAMP)"

		const params = [row.title,row.content,row.extract,row.author_name,row.author_email];
			
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


router.put('/:id',function(req,res)
	{
		const row = {
			title: req.body.title,
			content: req.body.content,
			extract: req.body.extract,
			author_name: req.body.author_name,
			author_email: req.body.author_email,
			created_at : req.body.created_at
		} 

		const id = req.params.id;

		sql = "update articles set "
		sql+= "title=?,content=?,extract=?,author_name=?,author_email=? "
		sql+= "where id=?"
		
	  const params = [row.title,row.content,row.extract,row.author_name,row.author_email,id];
		
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
								//recuperar el id
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


router.delete('/:id',function(req,res)
	{
		const id = req.params.id;
		sql = "delete from articles where id=?";
		
		connection.query(sql,[id],function(error,result)
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
									//OneArticle(req,res,id);
									response = { status:"success",message: "record deleted" };
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

