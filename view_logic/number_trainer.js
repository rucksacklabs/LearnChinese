var question_no = 1;
var answers_correct = 0;
var current_number = 0;
var numbers_cn = ["ling", "yi", "er", "san", "si", "wu", "liu", "qi", "ba", "jiu", "shi"];
var current_state = 0;

states = {
    NUMBER_TO_PYNIN : 0,
    CHAR_TO_NUMBER : 1,
}

var check = function(){

	var user_input = $("#userInput").val();

	switch(current_state) {
		case states.NUMBER_TO_PYNIN:
			var correct_result = toPynin(current_number);
			break;
		case states.CHAR_TO_NUMBER:
			var correct_result = current_number;
			break;
	}

	if(user_input.trim() == correct_result) {
		correct();
	} else {
		wrong();
	}
	if(question_no == 10) {
		$('#finishedDialog').modal('show');
	}else {
		nextQuestion();
	}
}

var correct = function(){
	$("#progress").append("<div class='bar bar-success' style='width: 10%;''></div>");
	answers_correct++;
}

var wrong = function(){
	$("#progress").append("<div class='bar bar-danger' style='width: 10%;''></div>");
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
	generateNumber();
}

var generateNumber = function(){
	current_number = Math.floor(Math.random()*99);
	$("#number").html("<h3>" + current_number + "</h3>");
}

var toCharacter = function(number) {

}

var toPynin = function(number) {
	if(number <= 19 ) {
		if(number > 10) {
			return "shi " + numbers_cn[number%10];
		} else {
			return numbers_cn[number];
		}
	} else {
		var num = number%10;
		var result = numbers_cn[Math.floor(number/10)] + " shi";
		if(num > 0) {
			result = result + " " + numbers_cn[num];
		}
		return result;
	}
}
generateNumber();
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