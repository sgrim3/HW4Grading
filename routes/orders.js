var path = require("path");
var Order = require(path.join(__dirname,"../models/models")).order;
var Ingredient = require(path.join(__dirname,"../models/models")).ingredient;


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

//create new order
orders.createOrder = function (req, res) {
	var name = "Person";
	var totalCost = 10;
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

	//save ingredients
	var title= "Tomato";
	var price = 10;
	var ingredientObj = new Ingredient({
    	title: title,
    	price: price,
    	_creator: orderObj._id
	});

	ingredientObj.save(function (err) {
    	if (err) {
    		console.log("Err: " +err);
    	}
	});

	//Populate order with ingredients
	//TODO- find requested ingredients
	Ingredient
		.findOne({title: "Tomato"})
		.populate('_creator') // <--
		.exec(function (err, ingredient) {
 		if (err) {
 			console.log(err);
 		}
 		res.send("New order was placed")
 		//console.log(ingredient);
  		console.log('The creator is %s', ingredient._creator.name);
	})
};

module.exports = orders;

