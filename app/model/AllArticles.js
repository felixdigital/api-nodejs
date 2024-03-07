
function AllArticles(req,res)
{
	
 	const connection = require('../core/connection');
	
	const sql = "select * from vw_articles";
	connection.query(sql,function(error,result)
							{
								if(error)
									{
										response = { status:"error",message: error.code };
										res.status(500).json(response);
									}
								else
									{
										var reg = {};
										var array = [];

										for(var i in result)
											{
												reg =
													{
														"id":result[i].id,
														"title":result[i].title,
														"content":result[i].content,
														"extract":result[i].extract,
														"author_name":result[i].author_name,
														"author_email":result[i].author_email,
														"comments":result[i].comments
													} 
											
												if(reg.comments!=null)
													{
														reg.comments = result[i].comments.split(",");
													}
												else
													{
														reg.comments=null;
													}
												array.push(reg);
											}
											
											res.status(200).json(array);
												
									}
							}
				); 
}

module.exports = AllArticles;


