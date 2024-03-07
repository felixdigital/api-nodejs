function lastInsertId(req,res)
{
	const connection = require('../core/connection');
		
		var sql = "select * from vw_articles where id = LAST_INSERT_ID()";
		var sql = "select max(id) from vw_articles";
		connection.query(sql,function(error,result)
				{
					if(error)
						{
							response = { status:"error",message: error.code };
							res.status(500).json(response);
						}
					else
						{
							res.status(200).json(result);
						}	
				}
		);

}
module.exports=lastInsertId;



