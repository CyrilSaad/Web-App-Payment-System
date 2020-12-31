var mongoose = require("mongoose");
var Schema = require("mongoose").Schema;
var CardSchema = new Schema({
  cardHolder: { type: String, required: true, unique: false },
  cardNumber: { type: String, required: true, unique: true },
  expiryMonth: { type: Number, required: true, unique: false },
  expiryYear: { type: Number, required: true, unique: false },
  cvc: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  amount: { type: Number, required: true, unique: false },
  isSafe: boolean,
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model("Card", CardSchema);
