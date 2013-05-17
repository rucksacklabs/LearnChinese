exports.index = function(req, res){
	var path = req.route.params.questionType;
	console.log(path);
	if(typeof path != 'speech') {
		questionsText(req, res);
	} else {
		questionsSpeech(req, res);
	}
}
var questionsSpeech = function(req, res){
  res.render('questions', { title: 'Learn Chinese' , questionType: 'speech'});
};
var questionsText = function(req, res){
  res.render('questions', { title: 'Learn Chinese' , questionType: 'text'});
};