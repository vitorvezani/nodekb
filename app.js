const express = require('express');
const path = require('path');

// Init app
const app = express();

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// index route
app.get('/', function(req, res) {
  let articles = [{
    id: 1,
    title: 'Article One',
    author: 'Vitor Vezani',
    body: 'This is article one!'
  }, {
    id: 2,
    title: 'Article Two',
    author: 'Ronaldo da Silva',
    body: 'This is article two!'
  }, {
    id: 3,
    title: 'Article Three',
    author: 'Bezerra da Silva',
    body: 'This is article three!'
  }];
  res.render('index', {
    title: 'Articles!',
    articles: articles
  });
});

// add article route
app.get('/articles/add', function(req, res) {
  res.render('add', {
    title: 'Add Articles'
  });
});

// Init server
app.listen(3000, function() {
  console.log('Server started on port 3000...');
});
