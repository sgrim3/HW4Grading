//requiring modules
var path = require("path");
var Order = require(path.join(__dirname,"../models/models")).order;
var Ingredient = require(path.join(__dirname,"../models/models")).ingredient;
var ingredients = require(path.join(__dirname,"ingredients"));

var orders = {};

//Showing orders in the kitchen
orders.show = function(req, res) {
	Order.find().exec(function (err, orders) {
		if (err) {
			return console.log ("Something broke");
		}
		else if (!orders.length) {
			res.send("There are no orders");
		}
		else {
			res.send(orders);
			//TODO- res.render()
		}
	})
};

//sets up order form for orders route
orders.orderForm = function (req, res) {
		res.render ("orders.handlebars", {
		ingredients: ingredients
	});
}

//create new order- is called in post request
orders.add = function (req, res) {
	var name = req.body.orderName;
	var totalCost = 0;
	//TODO- this cost should probs be in jquery bc it needs to dynamically update
	for (var i=0;i<req.body.checkedIngredients.length;i++ ) {
		totalCost += req.body.checkedIngredients[i].price;
	}
	var orderObj = new Order({
    	name: name,
    	totalCost: totalCost,
	});

	//save new order to databse
	orderObj.save(function (err) {
		if (err) {
			console.log("Err: " +err);
		}
	})

	//save checked ingredients
	for (var i =0; i<req.body.checkedIngredients.length; i++) {
		for (var j =0; j<ingredients.length; j++) {
			if (ingredients[j]===req.body.checkedIngredients[i]) {
				var title= ingredients[j].title;
				var price= ingredients[j].price;
			}
		}
		
	}
	var ingredientObj = new Ingredient({
    	title: title,
    	price: price,
    	_creator: orderObj._id
	});

	//saves ingredients
	ingredientObj.save(function (err) {
    	if (err) {
    		console.log("Err: " +err);
    	}
	});

	//Populate order with ingredients
	Ingredient
		.find(req.body.checkedIngredients)
		.populate('_creator') // <--
		.exec(function (err, ingredient) {
 		if (err) {
 			console.log(err);
 		}
 		res.send("New order was placed")
	})
};

module.exports = orders;

