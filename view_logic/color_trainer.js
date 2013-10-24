var question_no = 1;
var answers_correct = 0;
var current_number = 0;
var mode = 0;

modes = {
    COLOR_TO_PYNIN : 0,
    CHAR_TO_COLOR : 1,
}

var color = [{pinyin:'hei', color:'#000000'},
 {pinyin:'bai', color:'#FFFFFF'},
 {pinyin:'hong', color:'#FF0000'},
 {pinyin:'lu', color:'#008000'},
 {pinyin:'lan', color:'#0000FF'},
 {pinyin:'huang', color:'#FFFF00'},
 {pinyin:'zi', color:'#800080'},
 {pinyin:'fen', color:'#FFC0CB'},
 {pinyin:'hui', color:'#808080'},
 {pinyin:'zong', color:'#8B4513'},
 {pinyin:'cheng', color:'#FFA500'}];



var check = function(){

	var user_input = $("#userInput").val();

	switch(mode) {
		case modes.COLOR_TO_PYNIN:
			var correct_result = color[current_number].pinyin
			break;
		case states.CHAR_TO_COLOR:
			var correct_result = color[current_number].color;
			break;
	}

	if(user_input.trim() == correct_result) {
		correct();
	} else {
		wrong();
	}
	if(question_no == 10) {
		if(answers_correct > 5) {
			var message = "<h2>Great Job!<br><br>" + answers_correct + " out of 10</h2>"
		} else {
			var message = "<h2>I'm sure you can do better<br><br>" + answers_correct + " out of 10</h2>"
		}
		$('#dialog_message').empty();
		$('#dialog_message').html(message);
		$('#finishedDialog').modal('show');
	}else {
		nextQuestion();
	}
}

var correct = function(){
	$("#progress").append("<div class='bar bar-success' style='width: 10%;'></div>");
	answers_correct++;
}

var wrong = function(){
	$("#progress").append("<div class='bar bar-danger' style='width: 10%;'></div>");
}

var resetGame = function(){
	$("#progress").empty();
	question_no = 1;
	answers_correct = 0;
	nextQuestion();
	$('#finishedDialog').modal('hide');
}

var nextQuestion = function(){
	question_no++;
	$("#userInput").val('');
	generateColor();
}

var generateColor = function(){
	current_number = Math.floor(Math.random()*10);
	console.log(color[current_number]);
	$("#color-box").css('background-color', color[current_number].color)
}

generateColor();
$("#closeButton").click(function(){
	window.location.replace('/');
});
$('#finishedDialog').on('hidden.bs.modal', function () {
	resetGame();
});
$("#againButton").click(resetGame);
$("#checkButton").click(check);
$("#userInput").keypress(function(e) {
    if(e.which == 13) {
        check();
    }
});