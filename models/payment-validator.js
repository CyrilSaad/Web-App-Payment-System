const Joi = require("@hapi/joi");
const joiObjectid = require("joi-objectid");
Joi.objectId = require("joi-objectid")(Joi);
const bankValidator = {
  addBankPayment: {
    body: {
      fullName: Joi.string().min(3).max(50).required(),
      accountNumber: Joi.string()
        .trim()
        .pattern(/^[0-9]+$/)
        .min(16)
        .max(16)
        .required(),
      bic: Joi.string()
        .trim()
        .pattern(/^[0-9]+$/)
        .min(9)
        .max(9)
        .required(),
      tin: Joi.string()
        .trim()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(12)
        .required(),
      email: Joi.email().required(),
      amount: Joi.number().min(1000).max(75000).required(),
    },
  },
};
