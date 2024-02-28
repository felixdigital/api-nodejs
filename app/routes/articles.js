const connection = require('../connection');
const express = require('express');
const router = express.Router();

router.get('/',function(req,res)
	{	
		const sql = "select * from articles"
		connection.query(sql,function(error,result)
						{
							if(error)
									res.status(500).json(error);
							else
								res.status(200).json(result);
						}
			);
	}
);

router.get('/:id',function(req,res)
	{		
		const id = req.params.id;
		const sql = "select * from articles where id=?";
		connection.query(sql,[id],function(error,result)
						{
							if(error)
									res.status(500).json(error);
							else
								if( result[0] )
									{
										res.status(200).json(result[0]);
									}	
							else
								{
									res.status(404).json({status:"not found"});
								}
						}
			);
	}
);

router.get('/add/new',function(req,res)
	{
			/* 	const row = {
			title: req.body.title,
			content: req.body.content,
			extract: req.body.extract,
			author_name: req.body.author_name,
			author_email: req.body.author_email,
			created_at : req.body.created_at
		} */
		
		  const row = {
				title: "test50",
				content:  "test50",
				extract:  "test50",
				author_name:  "test50",
				author_email:  "test50"
			}
		
			var sql;
			sql =  "INSERT INTO articles "
			sql += "(id,title,content,extract,author_name,author_email,created_at) values "
			sql += "(null,?,?,?,?,?,CURRENT_TIMESTAMP)"

			const params = [row.title,row.content,row.extract,row.author_name,row.author_email];
			
			connection.query(sql,params,function(error,result)
				{
				if(error)
					res.status(400).json(error);
				else
					res.status(201).json(result);
				}
			);
	}
);

router.get('/edit/:id',function(req,res)
	{
		const row = {
			title: "test_edit",
			content:  "test_edit",
			extract:  "test_edit",
			author_name:  "test_edit",
			author_email:  "test_edit"
		}
		
		const id = req.params.id;
    var sql = "select count(*) as items from articles where id=?";
		connection.query(sql,[id],function(error,result)
						{
							if(error)
									res.status(500).json(error);
							else
								{	
									if(result[0].items==1)
										{
											 sql = "update articles set "
											 sql+= "title=?,content=?,extract=?,author_name=?,author_email=? "
											 sql+= "where id=?"
											 
											const params = [row.title,row.content,row.extract,row.author_name,row.author_email,id];
											

											connection.query(sql,params,function(error,result)
													{
														if(error)
															res.status(500).json(error);
														else
															{
																res.status(200).json(result);	
															}	
													}
											);		
										}
								 else
									 {
										res.status(404).json(result[0]);
									 }	
								
							  }
						}
		);
	}	
);

router.get('/delete/:id',function(req,res)
	{
		const id = req.params.id;
    var sql = "select count(*) as items from articles where id=?";
		connection.query(sql,[id],function(error,result)
						{
							if(error)
									res.status(500).json(error);
							else
								{	
									if(result[0].items==1)
										{
											sql = "delete from articles where id=?";
											connection.query(sql,[id],function(error,result)
													{
														if(error)
															res.status(500).json(error);
														else
															{
																res.status(200).json(result);	
															}	
													}
											);		
										}
								 else
									 {
										res.status(404).json(result[0]);
									 }	
								
							  }
						}
		);
	}
);

// ruta: articles/5/comments	todos los comentarios del articulo 5
router.get('/:id/comments',function(req,res)
	{	
		const id = req.params.id;
		var sql = "select * from comments where article=?";
		
		connection.query(sql,[id],function(error,result)
			{
			 	if(error)
					res.status(500).json(error);
				else
					{	
						if( result.length > 0 )
									{
										res.status(200).json(result);
									}	
							else
								{
									res.status(404).json({status:"not found"});
								}
					} 
			}
		);
   
	}
);

// ruta: articles/5/add/comment	añadir comentario al articulo 5
router.get('/:id/add/comment',function(req,res)
	{	
		const id = req.params.id;

		const row = {
			content:  "content50",
			author_name:  "autor50",
			author_email:  "mail50"
		}

		var sql;
		sql =  "INSERT INTO comments ";
		sql += "(id,content,author_name,author_email,created_at,article) values ";
		sql += "(null,?,?,?,CURRENT_TIMESTAMP,?)";

		const params = [row.content,row.author_name,row.author_email,id];

		connection.query(sql,params,function(error,result)
			{
			if(error)
				res.status(400).json(error);
			else
				res.status(201).json(result);
			}
		);
			
	}
);

// ruta: articles/5/delete/comment/2	eliminar el comentario 2 del articulo 5
router.get('/:id/delete/comment/:idComment',function(req,res)
	{	
		const id = req.params.id;
		const idComment = req.params.idComment;
		var sql = "delete from comments where id=? and article=?";
		const params = [idComment,id];

		connection.query(sql,params,function(error,result)
			{
					if(error)
						res.status(500).json(error);
					else
						{
							if( result.affectedRows>0 )
								{
									res.status(200).json({message:"comment deleted"});	
								}
							else
								{
									res.status(404).json({message:"record not found"});	
								}
						}	
					
			}
		);
		
	}
);

// ruta: articles/5/edit/comment/2	editar el comentario 2 del articulo 5
router.get('/:id/edit/comment/:idComment',function(req,res)
	{	

		const row = {
			content:  "content50kk",
			author_name:  "autor50kk",
			author_email:  "mail50kk"
		}

		const id = req.params.id;
		const idComment = req.params.idComment;
		var sql;

		sql = "update comments set "
		sql += "content=?,author_name=?,author_email=? "
		sql += "where id=? and article=?"
		//var sql = "select * from comments where id=? and article=?";
		
		const params = [row.content,row.author_name,row.author_email,idComment,id];

		connection.query(sql,params,function(error,result)
			{
				if(error)
					res.status(500).json(error);
				else
					{
						if(result.affectedRows > 0)
							{
								res.status(500).json(result);
							}
						else
							{
								res.status(500).json({message:"not found"});
							}
					}
			}
		);


	}
);

module.exports = router;

