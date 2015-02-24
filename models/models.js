var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
	name: String,
	totalCost: Number,
	ingredients: [{ type: Schema.ObjectId, ref: 'Ingredient' }]
});

var IngredientSchema = new Schema({
    _creator : { type: Schema.ObjectId, ref: 'Order' },
    title: String,
	price: Number,
	outOfStock: Boolean
});


module.exports.order = mongoose.model("Order", OrderSchema);
module.exports.ingredient = mongoose.model("Ingredient", IngredientSchema);
