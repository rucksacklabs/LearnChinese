// Var definition
var currentQuestionNo = -1;
var questionList, currentQuestion;

$('#questionRows').hide();
$('#progress').hide();
$('#container').spin('large');

$.getJSON("/questions/getQuestionSet", function(data,status,xhr) {
	console.log('ajax call callback');
	if(status == 'error' | status == 'timeout', status == 'parseerror'){
		// error occured, do something
	} else { // success or notmodified
		// start questioning
		$('#container').spin(false);
		$('#questionRows').show();
		questionList = data;
		loadNextQuestion();
	}
});

/*
 * Check the given input if it is correct
 */
$("#checkButton").click(function() {
	var input = $("#userInput"), button = $("#checkButton");

	// did we already checked
	if(button.hasClass("btn-success") | button.hasClass("btn-info")) {
		// var progressBar = $('#progressBar');
		resetLayout();
		loadNextQuestion();
	} else {
		// if not check the input for correctness
		if (isCorrect()) {
			input.addClass("success");
			$("#container").css("background-color", "#c8e09f");
		} else {
			input.addClass("danger");
			$("#container").css("background-color", "#fad5d5");
		}
		button.removeClass("btn-primary").addClass("btn-info");
		button.html('Proceed');
	}
});

$('#speakerButton').click(function(){
	playAudio('chw3.mp3');
});
var audioElement;
var playAudio = function(audioFile) {
		if(typeof audioElement != 'undefined') {
			audioElement.play();
		} else {

        audioElement = document.createElement('audio');
        audioElement.setAttribute('src', audioFile);
        audioElement.setAttribute('autoplay', 'autoplay');
        //audioElement.load()
        $.get();
        audioElement.addEventListener("load", function() {
                audioElement.play();
        }, true);
		}
}
var isCorrect = function() {
	var userInput = $('#userInput').val();
	var pinyin = replaceSoundSigns(currentQuestion.value.pinyin);
	if(userInput == currentQuestion.value.pinyin | userInput == pinyin) {
		return true;
	} else {
		return false;
	}
}

var resetLayout= function() {
	$("#container").css("background-color", "#eee");
	$("#checkButton").removeClass("btn-info").addClass("btn-primary");
	$("#checkButton").html('Check');
	$("#userInput").val('');
}

var loadNextQuestion = function() {
	currentQuestionNo++;
	currentQuestion = questionList[currentQuestionNo];

	$('#description').html('<h5>Give the pinyin for that character.</h5>');
	$('#question').html('<h4>' + currentQuestion.value.character + '</h4>');
}