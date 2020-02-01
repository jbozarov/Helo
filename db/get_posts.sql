select posts.id, title, img, content, users.username from posts
join users
on users.id = posts.user_id; 