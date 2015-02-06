//require my modules
var path = require("path");
var Order = require(path.join(__dirname,"../models/models")).order;
var Ingredient = require(path.join(__dirname,"../models/models")).ingredient;


var ingredients = {};

//gets list of available ingredients
ingredients.list = function(req, res) {
	Ingredient.find().exec(function (err, ingredients) {
		if (err) {
			return console.log ("Something broke");
		}
		else {
			res.render("ingredients", {
				ingredients: ingredients
			})
		}
	})
};

//adding an ingredient to list
ingredients.add = function(req, res) {

	//retrieving data from the form and making a new Ingredient
	var title = req.body.ingredientName;
	var price = req.body.ingredientPrice;
	ingredientObj = new Ingredient ({
		title: title,
		price: price
	});

	//saving ingredient to database
	ingredientObj.save(function (err) {
    	if (err) {
    		console.log("Err: " + err);
    	}
    	else {
    		res.render("ingredients", {
    			ingredients: ingredients
    		});
    	}
	});
};


module.exports = ingredients;
