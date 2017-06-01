const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// Check for db errors
db.once('open', function() {
  console.log('Connected to MongoDB');
})

// Check for db errors
db.on('error', function(err) {
  console.log(err);
})

// Init app
const app = express();

// Bring in Models
let Article = require('./models/article');

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Config bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// index route
app.get('/', function(req, res) {
  Article.find({}, function(err, articles){
    if(err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Articles!',
        articles: articles
      });
    }
  });
});

// new article route
app.get('/articles/add', function(req, res) {
  res.render('add', {
    title: 'Add Articles'
  });
});

// add article route
app.post('/articles/add', function(req, res) {
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

// Init server
app.listen(3000, function() {
  console.log('Server started on port 3000...');
});
