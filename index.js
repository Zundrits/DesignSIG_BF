	var express = require('express'); 
	var router = express.Router();
	
	var mongoose = require('mongoose');
	var Schema = moongoose.Schema;
	
	// Mongoose connection to MongoDB
	mongoose.connect('mongodb://localhost:27017/BF_WebGIS', function (error) {
		if (error) {
			console.log(error);
		}
	});
	
	varJsonSchema = new Schema({
		name: String, 
		type: Schema.Types.Mixed
		});
	
	var Json = mongoose.model('JString', JsonSchema, 'layercollection');
	
	var obs = newSchma({
		name: String,
		comment: String, 
		added: String, 
		image: String, 
		geometry : {
			type: {type: String},
			coordinates: []
		}
	});
	var observation = mongoose.model('observation', obs, 'observations'); 
	
	
	
	/* GET home page. */
	router.get('/',function(req,res,next) {
		res.render('index', {title: 'Express' });
		});
		
		

// Added 27.11 
		
	// GET GeoJSON data. 
	
	router.get('mapjson/:name', function (req,res) {
		if (req.params.name) {
			Json.findOne({ name: req.params.name },{}, function(err, docs){
				res.json(docs);
			});
		}
	});
	
	router.get('/form', function(req,res) {
		observation.find({}, function(err,docs){
			res.send(docs);
		});
	});
	
	router.post('/form', function(req, res) {
		console.log(req.body);
		var newObs = new observation(req.body);
		newObs.save(function(err,newobj) {
			if(err) {
				res.sed(err.message);
			}
			else {
				res.send(newobj);
			};
		});
	});

// End Added 27.11 

module.exports = router; 