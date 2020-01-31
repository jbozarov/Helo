create table users (
    id serial primary key,
    username varchar(200), 
    password varchar(200), 
    profile_pic text
)


create table posts (
    id serial primary key,
    title varchar(45),
    img text,
    content text,
    user_id int references users(id)
)