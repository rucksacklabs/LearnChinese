// Var definition
var currentQuestionNo = -1;
var questionList, currentQuestion, audioElement, checked;

$('#questionRows').hide();
// $('#progress').hide();
$('#card').hide();
$('#container').spin('large');
// $('#userInput').tooltip(
// 	{
// 		"placement": "right",
// 		"trigger": "focus",
// 		"title": "some tooltip"
// 	});


$.getJSON("/Questions/getQuestionSet", function(data,status,xhr) {
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
var check = function() {
	var input = $("#userInput"), button = $("#checkButton");

	// did we already checked
	if(checked == true) {
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
		checked = true;
		showAnswer();
		showCard();
		button.removeClass("btn-primary").addClass("btn-info");
		button.html('Proceed');
	}
};

var saveProgress = function() {
	
	var data = "{}";
	var errorHandler = function() {

	}
	
	var successHandler = function() {

	}

	$.ajax({
		type: "POST",
		url: "/Questions/saveProgress",
		data: data,
		success: successHandler,
		error: errorHandler,
		dataType: "JSON"
	});
}

var playAudio = function(){
	playAudio('chw3.mp3');
};

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
	checked = false;
}

var loadNextQuestion = function() {
	currentQuestionNo++;
	currentQuestion = questionList[currentQuestionNo];

	$('#description').html('<h5>Give the pinyin for that character.</h5>');
	$('#question').html('<h4>' + currentQuestion.value.character + '</h4>');
}

function insertAtCaret(text) {
    var txtarea = document.getElementById("userInput");
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
    	"ff" : (document.selection ? "ie" : false ) );
    if (br == "ie") { 
    	txtarea.focus();
    	var range = document.selection.createRange();
    	range.moveStart ('character', -txtarea.value.length);
    	strPos = range.text.length;
    }
    else if (br == "ff") strPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0,strPos);  
    var back = (txtarea.value).substring(strPos,txtarea.value.length); 
    txtarea.value=front+text+back;
    strPos = strPos + text.length;
    if (br == "ie") { 
    	txtarea.focus();
    	var range = document.selection.createRange();
    	range.moveStart ('character', -txtarea.value.length);
    	range.moveStart ('character', strPos);
    	range.moveEnd ('character', 0);
    	range.select();
    }
    else if (br == "ff") {
    	txtarea.selectionStart = strPos;
    	txtarea.selectionEnd = strPos;
    	txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
}

$("#checkButton").click(check);
$('#speakerButton').click(playAudio);
$("#userInput").keypress(function(e) {
    if(e.which == 13) {
        check();
    }
});
