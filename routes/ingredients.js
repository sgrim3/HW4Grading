var path = require("path");
var Order = require(path.join(__dirname,"../models/models"));
var Ingredient = require(path.join(__dirname,"../models/models"));


var ingredients = {};

ingredients.list = function(req, res) {
	Ingredient.find().exec(function (err, ingredients) {
		if (err) {
			return console.log ("Something broke");
		}
		else if (!ingredients.length) {
			res.send("There are no ingredients");
		}
		else {
			res.send(ingredients);
			//TODO- res.render()
		}
	})
};

ingredients.add = function(req, res) {
	var title = "Tomato";
	var price = 1;
	ingredientObj = new Ingredient ({
		title: title,
		price: price
	});
	ingredientObj.save(function (err) {
    	if (err) {
    		console.log("Something broke!");
    	}
    	else {
    		res.send(ingredients);
    	}
	});
};


module.exports = ingredients;
