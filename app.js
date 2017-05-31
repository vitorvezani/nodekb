const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

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
