require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const ctrl = require('./controller'); 
const cors = require('cors'); 
const app = express();


app.use(cors()); 
app.use(express.json());


app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie: { maxAge: 1000*60*60*24*200 }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('Database is connected');
});

//ENDPOINTS 
app.post('/api/auth/login', ctrl.login);
app.post('/api/auth/register', ctrl.register); 
app.post('/api/post/:id', ctrl.newPost); 
app.get('/api/posts', ctrl.getPosts); 



app.listen(SERVER_PORT, () => {
  console.log(`Listening on port: ${SERVER_PORT}`);
});