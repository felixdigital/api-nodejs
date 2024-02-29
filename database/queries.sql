select content,author_name,author_email 
from comments
where article = 2

select 
	title,
	content,
	author_name,
	author_email,
    ( select group_concat(id) 
			from comments 
			where articles.id = comments.article 
			group by(article) )  
			as comentarios
from articles;

