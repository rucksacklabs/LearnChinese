var database = 'http://localhost:5984';
var nano = require('nano')(database);

exports.start = function(req, res){
	questions(req, res);
};

exports.index = function(req, res){
	questions(req, res);
};

exports.getQuestionSet = function(req, res){
	var db = nano.db.use('cards');

	db.view('cards_selection', 'cards_by_no', function(err, body){
	    if(!err){
	    	console.log("Found " + body.total_rows + " entries");
	 		res.writeHead(200, { 'Content-Type': 'application/json' });

			var questionStack =JSON.stringify(body.rows);
	 		res.write(questionStack);
	    } else {
	      res.writeHead(500);
	      console.log(err);
	    }
	 	res.end();
  	});
};

exports.getAllQuestions = function(req, res){
	var db = nano.db.use('cards');

	db.view('cards_selection', 'cards_by_no', function(err, body){
	    if(!err){
	    	console.log("Found " + body.total_rows + " entries");
	 		res.writeHead(200, { 'Content-Type': 'application/json' });

			var questionStack =JSON.stringify(body.rows);
	 		res.write(questionStack);
	    } else {
	      res.writeHead(500);
	      console.log(err);
	    }
	 	res.end();
  	});
};

exports.saveProgress = function(req, res) {
	res.end();
}

exports.AllQuestions = function(req, res){
	res.render('allQuestions', { title: 'All Questions'});
}

exports.LearningMap = function(req, res){
	res.render('learningMap', { title: 'Learning Map'});
}

var questions = function(req, res){
	res.render('questions', { title: 'Learn Chinese'});
};