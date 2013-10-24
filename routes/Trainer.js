exports.route = function(req, resp) {
	console.log("type:" + req.params.trainerType)
	console.log("mode:" + req.param('mode'))

	switch(req.params.trainerType) {
		case 'Numbers': resp.render('numberTrainer', { title: 'Number Trainer', mode: req.param('mode')});
			break;
		case 'Directions': resp.render('directionsTrainer', { title: 'Directions Trainer', mode: req.param('mode')});
			break;
		case 'Colors': resp.render('colorTrainer', { title: 'Color Trainer', mode: req.param('mode')}); 
			break;
		default: resp.render('trainer_index', { title: 'Trainer Overview'});
	}
}