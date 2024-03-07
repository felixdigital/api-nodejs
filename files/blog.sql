-- Estructura de las tablas
USE blog;

DROP TABLE IF EXISTS articles;

CREATE TABLE articles (
	id INT,
	title VARCHAR(120) NOT NULL,
	content TEXT (2000) NOT NULL,
	extract VARCHAR(250) NOT NULL,
	author_name VARCHAR(60) NOT NULL,
	author_email VARCHAR(80) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL  
)ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_spanish_ci;

ALTER TABLE articles
	ADD PRIMARY KEY(id),
	MODIFY id INT AUTO_INCREMENT,AUTO_INCREMENT=1;

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
	id INT,
  content TEXT (250) NOT NULL,
  author_name VARCHAR(60),
	author_email VARCHAR(80) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
	article INT  
)ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_spanish_ci;

ALTER TABLE comments
	ADD PRIMARY KEY(id),
	ADD KEY article_i (article),
	MODIFY id INT AUTO_INCREMENT,AUTO_INCREMENT=1;

ALTER TABLE comments
  ADD CONSTRAINT comments_article_fk FOREIGN KEY (article) REFERENCES articles(id) 
	ON DELETE NO ACTION ON UPDATE NO ACTION;



-- tabla articulos
INSERT INTO articles(id,title,content,extract,author_name,author_email,created_at) values
(null,'titulo 1','contenido 1','extracto 1','autor 1','mail1@server.com',CURRENT_TIMESTAMP),
(null,'titulo 2','contenido 2','extracto 2','autor 2','mail2@server.com',CURRENT_TIMESTAMP),
(null,'titulo 3','contenido 3','extracto 3','autor 3','mail3@server.com',CURRENT_TIMESTAMP),
(null,'titulo 4','contenido 4','extracto 4','autor 4','mail4@server.com',CURRENT_TIMESTAMP),
(null,'titulo 5','contenido 5','extracto 5','autor 5','mail5@server.com',CURRENT_TIMESTAMP);

--tabla comentarios
INSERT INTO comments(id,content,author_name,author_email,created_at,article) values
(null,'comentario 1','autor 1','mail1@server.com',CURRENT_TIMESTAMP,1),
(null,'comentario 2','autor 2','mail2@server.com',CURRENT_TIMESTAMP,1),
(null,'comentario 3','autor 3','mail3@server.com',CURRENT_TIMESTAMP,1),
(null,'comentario 4','autor 4','mail4@server.com',CURRENT_TIMESTAMP,1),
(null,'comentario 5','autor 5','mail5@server.com',CURRENT_TIMESTAMP,1);

INSERT INTO comments(id,content,author_name,author_email,created_at,article) values
(null,'comentario 1','autor 1','mail1@server.com',CURRENT_TIMESTAMP,2),
(null,'comentario 2','autor 2','mail2@server.com',CURRENT_TIMESTAMP,2),
(null,'comentario 3','autor 3','mail3@server.com',CURRENT_TIMESTAMP,2),
(null,'comentario 4','autor 4','mail4@server.com',CURRENT_TIMESTAMP,2),
(null,'comentario 5','autor 5','mail5@server.com',CURRENT_TIMESTAMP,2);

INSERT INTO comments(id,content,author_name,author_email,created_at,article) values
(null,'comentario 1','autor 1','mail1@server.com',CURRENT_TIMESTAMP,3),
(null,'comentario 2','autor 2','mail2@server.com',CURRENT_TIMESTAMP,3),
(null,'comentario 3','autor 3','mail3@server.com',CURRENT_TIMESTAMP,3),
(null,'comentario 4','autor 4','mail4@server.com',CURRENT_TIMESTAMP,3),
(null,'comentario 5','autor 5','mail5@server.com',CURRENT_TIMESTAMP,3);

INSERT INTO comments(id,content,author_name,author_email,created_at,article) values
(null,'comentario 1','autor 1','mail1@server.com',CURRENT_TIMESTAMP,4);












