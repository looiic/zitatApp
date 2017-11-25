// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

// DATABASE SETUP
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db'); // connect to our database

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

// zitat models lives here
var Zitat     = require('./app/models/Zitat');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
  if(req.headers.apikey == 'passwort1234'){
    next();
  }else{
    res.json({ message: 'Nicht erlaubt' });
  }
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /zitats
// ----------------------------------------------------
router.route('/zitat')

	// create a zitat (accessed at POST http://localhost:8080/zitats)
	.post(function(req, res) {

		var zitat = new Zitat();		// create a new instance of the zitat model
		zitat.name = req.body.name;  // set the zitats name (comes from the request)
    zitat.datum = req.body.datum;
    zitat.zitat = req.body.zitat;

		zitat.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'zitat created!' });
		});


	})

	// get all the zitats (accessed at GET http://localhost:8080/api/zitats)
	.get(function(req, res) {
		Zitat.find(function(err, zitate) {
			if (err)
				res.send(err);

			res.json(zitate);
		});
	});

// on routes that end in /zitats/:zitat_id
// ----------------------------------------------------
router.route('/zitat/:zitat_id')

	// get the zitat with that id
	.get(function(req, res) {
		Zitat.findById(req.params.zitat_id, function(err, zitat) {
			if (err)
				res.send(err);
			res.json(zitat);
		});
	})

	// update the zitat with this id
	.put(function(req, res) {
		Zitat.findById(req.params.zitat_id, function(err, zitat) {

			if (err)
				res.send(err);

			zitat.name = req.body.name;
      zitat.datum = req.body.datum;
      zitat.zitat = req.body.zitat;
			zitat.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'zitat updated!' });
			});

		});
	})

	// delete the zitat with this id
	.delete(function(req, res) {
		Zitat.remove({
			_id: req.params.zitat_id
		}, function(err, zitat) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
