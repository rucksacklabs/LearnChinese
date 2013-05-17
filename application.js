$("#checkButton").click(function() {
	var input = $("#userInput"), button = $("#checkButton");

	// did we already checked
	if(button.hasClass("btn-success") | button.hasClass("btn-info")) {
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
	if($('#userInput').val().length > 0) {
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
	$('#description').html('<h5>Do something else</h5>');
	$('#question').html('<h5>Another Question</h5>');
}