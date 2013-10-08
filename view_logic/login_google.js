 (function() {
 	var po = document.createElement('script');
 	po.type = 'text/javascript';
 	po.async = true;
 	po.src = 'https://apis.google.com/js/client:plusone.js';
 	var s = document.getElementsByTagName('script')[0];
 	s.parentNode.insertBefore(po, s);
 })();
 
 (function() {
 	var po = document.createElement('script');
 	po.type = 'text/javascript';
 	po.async = true;
 	po.src = 'https://apis.google.com/js/plusone.js';
 	var s = document.getElementsByTagName('script')[0];
 	s.parentNode.insertBefore(po, s);
 })();

 function signinCallback(authResult) {
	if (authResult['access_token']) {
		console.log("Successful login!");
		// Successfully authorized
		// Hide the sign-in button now that the user is authorized, for example:
		$('.signinButton').fadeOut(500, function(){
			$('#login').html('Welcome ' ).fadeIn(500);
		});

		var token = gapi.auth.getToken();
		// gapi.client.request({'https://www.googleapis.com/plus/v1//people/'}, function(request){

		// });
		// $.getJSON('https://www.googleapis.com/plus/v1//people/' + userId, function(data) {
			// var result = JSON.parse(data);
		// });		
		// document.getElementById('signinButton').setAttribute('style', 'display: none');
	} else if (authResult['error']) {
		// There was an error.
		// Possible error codes:
		//   "access_denied" - User denied access to your app
		//   "immediate_failed" - Could not automatically log in the user
		console.log('There was an error: ' + authResult['error']);
	}
}