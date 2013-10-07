
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};


exports.channel = function(req, res){
  res.render('channel', { title: 'Learn Chinese'});
};

exports.login = function(req, res){
  res.render('login', { title: 'Learn Chinese - Login'});
};