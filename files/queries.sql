--comentarios de un articulo
select content,author_name,author_email 
from comments
where article = 2;

--articulos y comentarios
create or replace view vw_articles as
	select articles.id,
	articles.title,
	articles.content,
	articles.author_name,
	articles.author_email,
	group_concat(comments.id) as comments  
	from articles left join comments
	on articles.id = comments.article
	group by articles.id,title,articles.content,articles.author_name,articles.author_email;

--vistas
select * from vw_articles;

--ultimo registro insertado
select LAST_INSERT_ID();







