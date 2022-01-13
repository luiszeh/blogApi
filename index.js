const express = require('express');
const User = require('./controllers/user');
const errorMiddleware = require('./middlewares/Error');
const ValidationJWT = require('./middlewares/ValidationJWT');
const Category = require('./controllers/category');
const BlogPost = require('./controllers/blogpost');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// POSTS

app.post('/user', User.createUser);
app.post('/login', User.userLogin);
app.post('/categories', ValidationJWT.validateToken, Category.createCat);
app.post('/post', ValidationJWT.validateToken, BlogPost.createPost);

// GETS

app.get('/user', ValidationJWT.validateToken, User.getAllUsers);
app.get('/user/:id', ValidationJWT.validateToken, User.getUserById);
app.get('/categories', ValidationJWT.validateToken, Category.getAllCats);
app.get('/post', ValidationJWT.validateToken, BlogPost.getAllPosts);
app.get('/post/:id', ValidationJWT.validateToken, BlogPost.getPostById);

app.use(errorMiddleware);
