const env = require('./enviroment');
const mysql = require('mysql');

const connection = mysql.createConnection(
	{
		host:env.host,
		user: env.USER,
		password: env.PASSWORD,
		database: env.DATABASE
	}
);

module.exports = connection;