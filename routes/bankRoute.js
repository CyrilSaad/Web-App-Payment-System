var express = require("express");
var router = express.Router();
var cardRouter = require("./cardRoute.js");
var control = require("../controller/payment-controller");
var paymentValidator = require("../models/payment-validator");
const url = "mongodb://localhost:27017/acme";
const validate = require("express-validation");

router.post(
  // Add payment record in bank payments document of database
  "/addBankPayment",
  validate(paymentValidator.addPayment),
  (req, res) => {
    control.addBankPayment(req, res);
  }
);

//getPayment, this will take a query variable by which it will sort the payments
router.get(
  "/getPayments:field",
  validate(cardValidator.getPayments),
  (req, res) => {
    control.getPayments(req, res);
  }
);
router.put("/updatePayment");
