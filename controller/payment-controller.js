const mongoose = require("mongoose");
const Payment = require("../models/payment");

exports.addBankPayment = (req, res) => {
  let item = new Payment({
    fullName: req.body.fullName,
    accountNumber: req.body.accountNumber,
    bic: req.body.bic,
    tin: req.body.tin,
    email: req.body.email,
    amount: req.body.amount,
  });
  item.save();
  res.send("Bank payment added!");
  console.log(res.body);
};

export.getPayments = (req, res){
  let field = req.params.field;
  Payment.find({}).sort(field).then(payments => res.send(payments));
}


exports.markUnsafe = (req, res) => {
  let id = mongoose.Types.ObjectId(req.body.id);
  Payment.update({ _id: id }, { isSafe: false }, (err, data) => {
    if (err) console.log("An error has occured...", err);
    res.send("Marked as unsafe.");
  });
};
