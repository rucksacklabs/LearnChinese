$('#table').hide();
$('#container').spin('large');

$.getJSON("/Questions/getAllQuestions", function(data, status, xhr) {
	console.log('ajax call callback');
	if (status == 'error' | status == 'timeout', status == 'parseerror') {
		// error occured, do something
		$('#container').spin(false);
		$('#container').append("<h3> Error, while fetching datasets!</h3>");
	} else { // success or notmodified
		// start questioning
		var table = $('#table');

		$('#container').spin(false);
		table.show();

		 $.each(data, function(index, row){
	       if(typeof(row) !== 'undefined'){
	       		var tableRow = "<tr>" +
	       		"<td>" + row.value.no + "</td>" +
	       		"<td>" + row.value.character + "</td>" +
	       		"<td>" + row.value.pinyin + "</td>" +
	       		"<td>" + replaceSoundSigns(row.value.pinyin) + "</td>" +
	       		"<td>" + row.value.translation + "</td>" +
	       		"<td> <img src='speaker-dark.png' id='speakerButton' data-id='" + row.value.audio + "'/> </td>" +
	       		"<td>" + row.value.factor + "</td>" +
	       		"</tr>";
	       		table.append(tableRow)
	       }
    	});
	}
});

$('#speakerButton').click(function(){
  alert($(this).attr('data-id'));
});