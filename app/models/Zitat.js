var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ZitatSchema   = new Schema({
	name: String,
	datum: Date,
	zitat: String
});

module.exports = mongoose.model('Zitat', ZitatSchema);
