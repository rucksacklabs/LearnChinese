$('#table').hide();
$('#container').spin('large');

$.getJSON("/questions/getAllQuestions", function(data, status, xhr) {
	console.log('ajax call callback');
	if (status == 'error' | status == 'timeout', status == 'parseerror') {
		// error occured, do something
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
	       		"<td>" + row.value.audio + "</td>" +
	       		"<td>" + row.value.factor + "</td>" +
	       		"</tr>";
	       		table.append(tableRow)
	       }
    	});
	}
});