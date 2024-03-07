function OneArticle(req,res,id)
	{
		const connection = require('../core/connection');
		
		const sql = "select * from vw_articles where id=?";
		connection.query(sql,[id],function(error,result)
								{
									if(error)
										{
											response = { status:"error",message: error.code };
											res.status(500).json(response);
										}
									else
										{
											if( result.length>0 )
													{		
													
													reg = {
															"id":result[0].id,
															"title":result[0].title,
															"content":result[0].content,
															"extract":result[0].extract,
															"author_name":result[0].author_name,
															"author_email":result[0].author_email,
															"comments":result[0].comments
														} 
														
														if( reg.comments != null)
															{
																reg.comments = result[0].comments.split(",");
															}
														else
															{
																reg.comments = null;
															}
														
														res.status(200).json(reg);
													}	
												else
													{
														response = { status:"warning",message: "article not found" };
														res.status(404).json(response);
													}
										
										
																		
										}
								}
					);

	}

	module.exports = OneArticle;