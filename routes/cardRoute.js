var express = require("express");
var router = express.Router();
var cardRouter = require("./cardRoute.js");
var paymentRouter = require("./paymentRoute.js");
var control = require("../controller/card-controller");
const url = "mongodb://localhost:27017/acme";
const validate = require("express-validation");
const PORT = 3000;

router.post("/makePayment", validate(cardValidator.addPayment), (req, res) => {
  control.makePayment(req, res);
});

//getPayment, this will take a query variable by which it will sort the payments
router.get(
  "/getPayments:field",
  validate(cardValidator.getPayments),
  (req, res) => {
    control.getPayments(req, res);
  }
);
router.put("/v");
