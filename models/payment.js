var mongoose = require("mongoose");
var Schema = require("mongoose").Schema;
var PaymentSchema = new Schema({
  fullName: { type: String, required: true, unique: false },
  accountNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  bic: { type: String, required: true, unique: false },
  tin: { type: String, required: true, unique: false },
  amount: { type: Number, required: true, unique: false },
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model("Payment", PaymentSchema);
