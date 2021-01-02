const Joi = require("@hapi/joi");
const joiObjectid = require("joi-objectid");
Joi.objectId = require("joi-objectid")(Joi);
const cardValidator = {
  addCardPayment: {
    body: {
      cardHolder: Joi.string().min(3).max(50).required(),
      cardNumber: Joi.string()
        .trim()
        .pattern(/^[0-9]+$/)
        .min(19)
        .max(19)
        .required(),
      expiryMonth: Joi.string().trim().min(1).max(2).required(),
      expiryYear: Joi.string().trim().min(2).max(4).required(),
      cvc: Joi.string().trim().min(3).max(3).required(),
      email: Joi.email().required(),
      amount: Joi.number().min(1000).max(75000).required(),
    },
  },
  markUnsafe: {
    body: {
      isUnsafe: boolean,
    },
  },
};
