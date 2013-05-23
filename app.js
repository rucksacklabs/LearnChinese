// credentials for database
var host = 'devkitchen.cloudant.com', 
    dbport = 5984, 
    username = 'dsheyawfutedortasingthem', 
    password = 'ToidPXLpxVqSw6rJrOqBnYU0', 
    database = 'http://'+ username +':' + password + '@' + host + ':' + dbport;


/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , questions =  require('./routes/Questions')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'view_logic')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/Questions', questions.start);
app.get('/Questions/getQuestionSet', questions.getQuestionSet);
app.get('/Questions/getAllQuestions', questions.getAllQuestions);
app.get('/AllQuestions', questions.AllQuestions);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
