// Var definition
var currentQuestionNo = -1;
var questionList, currentQuestion, audioElement;

$('#questionRows').hide();
$('#progress').hide();
$('#card').hide();
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
		showAnswer();
		showCard();
		button.removeClass("btn-primary").addClass("btn-info");
		button.html('Proceed');
	}
});

$('#speakerButton').click(function(){
	playAudio('chw3.mp3');
});

var showAnswer = function() {
	$("#question > h4").append("&nbsp; &nbsp; " + currentQuestion.value.pinyin + " (" + replaceSoundSigns(currentQuestion.value.pinyin) + ")");
}

var showCard = function() {
	$('#card_character').html("<h3>" + currentQuestion.value.character + "</h3>" + 
							"<h5>" + currentQuestion.value.pinyin + "</h5>");
	$('#card_translation').html("<h5>" + currentQuestion.value.translation + "</h5>");
	$('#card').fadeIn(500);
}

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
	$('#card').hide();
}

var loadNextQuestion = function() {
	currentQuestionNo++;
	currentQuestion = questionList[currentQuestionNo];

	$('#description').html('<h5>Give the pinyin for that character.</h5>');
	$('#question').html('<h4>' + currentQuestion.value.character + '</h4>');
}