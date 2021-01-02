import React, { useEffect, useState, Component } from "react";

import "./App.css";
import Cleave from "cleave.js/react";
import axios from "axios";
import { number, string } from "joi";
// Validate Card Number Field Input
const normalizeCardNumber = (value) => {
  if (/^[0-9]*/.test(value) && value.length <= 19) {
    return value
      .replace(/[^\d]/g, "")
      .replace(/(.{4})(?!$)/g, "$1 ")
      .substr(0, 19);
  }
  //if the number is valid, change the card number in our state
  else if (/^[0-9]*/.test(value) && value.length == 19) {
    this.setState({
      cardNumber: value,
    });
  } else return "";
};
// Validate Card Number Field Input for request Payment
const normalizeAccountNumber = (value) => {
  if (/^[0-9]*/.test(value) && value.length <= 20) {
    return value.replace(/[^\d]/g, "").substr(0, 20);
  } else if (/^[0-9]*/.test(value) && value.length == 20) {
    this.setState({
      accountNumber: value,
    });
  } else return "";
};
// Validate CVC Number Field Input for Card Payment
const normalizeCVC = (value) => {
  if (/^\d+$/.test(value)) return value.substr(0, 3) || "";
  else if (/^\d+$/.test(value) && value.length == 3) {
    this.setState({
      cvc: value,
    });
  } else return "";
};
const normalizeBic = (value) => {
  if (/^\d+$/.test(value)) return value.substr(0, 9) || "";
  else if (/^\d+$/.test(value) && value.length == 9) {
    this.setState({
      bic: value,
    });
  } else return "";
};
const normalizeTin = (value) => {
  if (/^\d+$/.test(value)) return value.substr(0, 12) || "";
  else if (/^\d+$/.test(value) && value.length == 12) {
    this.setState({
      tin: value,
    });
  } else return "";
};
// Validate If the amount sent is valid
const normalizeAmount = (value) => {
  if (value < 1000) return 1000;
  else if (value > 75000) {
    return 75000;
  } else {
    return value;
  }
};
// Validate the full name of the sender
const normalizeCardHolder = (value) => {
  if (/^[a-zA-Z]+[a-zA-Z ]*$/.test(value)) {
    return value;
  } else return "";
};
//Validate credit card expiry month
const normalizeExpiryDate = (value) => {
  if (value < 1 || value > 12) {
    return 1;
  } else {
    return value;
  }
};

//Validate credit card year expiry
const normalizeExpiryDateYear = (value) => {
  if (value < 2020 || value > 2035) return 2020;
  return value;
};

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: "card",
      cardHolder: "",
      cardNumber: "",
      accountNumber: "",
      tin: "",
      bic: "",
      month: "",
      year: "",
      cvc: "",
      email: "",
      amount: 0,
      isCard: true,
      isFormReady: false,
    };
    this.cardHolderChange = this.cardHolderChange.bind(this);
    this.cardNumberChange = this.cardNumberChange.bind(this);
    this.cvcChange = this.cvcChange.bind(this);
    this.amountChange = this.amountChange.bind(this);
    this.tinChange = this.tinChange.bind(this);
    this.bicChange = this.bicChange.bind(this);
    this.monthChange = this.monthChange.bind(this);
    this.yearChange = this.yearChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
  }

  //Activates button when all fields are filled in card payment
  isFormValid = () => {
    const {
      paymentMethod,
      cardHolder,
      accountNumber,
      tin,
      bic,
      cardNumber,
      month,
      year,
      cvc,
      email,
      amount,
    } = this.state;
    if (paymentMethod === "card") {
      if (
        cardHolder.length > 0 &&
        cardNumber.trim().length === 19 &&
        month.length > 0 &&
        year.length > 0 &&
        cvc.length === 3 &&
        email.length > 0 &&
        amount >= 999 &&
        amount <= 75000
      ) {
        this.setState({
          isFormReady: true,
        });
      }
    }
    if (paymentMethod === "bank") {
      if (
        cardHolder.length > 0 &&
        accountNumber.trim().length == 20 &&
        (tin.length === 10 || tin.length === 12) &&
        bic.length === 9 &&
        email.length > 0 &&
        amount >= 1000 &&
        amount <= 75000
      ) {
        this.setState({
          isFormReady: true,
        });
      }
    }
  };
  cardHolderChange(e) {
    this.setState({
      cardHolder: e.target.value,
    });
  }
  cardNumberChange(e) {
    this.setState({
      cardNumber: e.target.value,
    });
  }

  cardHolderChange(e) {
    this.setState({
      cardHolder: e.target.value,
    });
  }

  cvcChange(e) {
    this.setState({
      cvc: e.target.value,
    });
  }

  amountChange(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  tinChange(e) {
    this.setState({
      tin: e.target.value,
    });
  }
  bicChange(e) {
    this.setState({
      bic: e.target.value,
    });
  }

  monthChange(e) {
    this.setState({
      month: e.target.value,
    });
  }

  yearChange(e) {
    this.setState({
      year: e.target.value,
    });
  }

  emailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }
  setPaymentCard(event) {
    if (event.id == "cardPayment") {
      this.setState({
        isCard: true,
        paymentMethod: "card",
      });
    } else if (event.id == "bankPayment") {
      this.setState({
        isCard: false,
        paymentMethod: "bank",
      });
    }
  }

  //Send api request to backend to process the payment
  submitPayment() {
    if (this.state.paymentMethod === "card") {
      //send a request to cardPayment route in backend to add payment to database
      axios
        .post("/addCardPayment", {
          cardHolder: this.state.cardHolder,
          cardNumber: this.state.cardNumber,
          month: this.state.month,
          year: this.state.year,
          cvc: this.state.cvc,
          email: this.state.email,
          amount: this.state.amount,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    if (this.state.paymentMethod === "bank") {
      //send a request to bankRoute route in backend to add payment to database
      axios
        .post("/addBankPayment", {
          fullName: this.state.cardHolder,
          accountNumber: this.state.cardNumber,
          tin: this.state.tin,
          bic: this.state.bic,
          email: this.state.email,
          amount: this.state.amount,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    //Underlines the tab which the user is using(pay by card or bank)
    let btn_class1 =
      this.state.paymentMethod == "card"
        ? "active-payment-method"
        : "switch-payment-method";
    let btn_class2 =
      this.state.paymentMethod == "bank"
        ? "active-payment-method"
        : "switch-payment-method";
    if (this.state.paymentMethod == "card") {
      // Shows form for a credit card payment
      return (
        <div className="wrapper">
          <div className="form-wrapper">
            <div style={{ display: "flex" }}>
              <button
                type="button"
                id="cardPayment"
                disabled={this.state.isCard}
                onClick={(event) => {
                  this.setPaymentCard(event.target);
                }}
                className={btn_class1}
              >
                Pay With Card
              </button>
              <button
                type="button"
                id="bankPayment"
                disabled={!this.state.isCard}
                onClick={(event) => {
                  this.setPaymentCard(event.target);
                }}
                className={btn_class2}
              >
                Request Payment
              </button>
            </div>
            <h1> URFU Payment </h1>
            <form onSubmit={this.submitPayment} onChange={this.isFormValid}>
              <div className="CardHolder">
                <label htmlFor="Card Holder"> Card Holder</label>
                <input
                  type="text"
                  className=""
                  placeholder="Charles Semaan"
                  type="text"
                  name="cardName"
                  onChange={this.cardHolderChange}
                  onChange={(event) => {
                    const { value } = event.target;
                    event.target.value = normalizeCardHolder(value);
                    this.setState({
                      cardHolder: value,
                    });
                  }}
                />
              </div>
              <div className="CardNumber">
                <label htmlFor="Card Number"> Card Number</label>
                <input
                  type="tel"
                  className=""
                  placeholder="0000 0000 0000 0000"
                  maxLength="19"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  name="cardNumber"
                  onChange={this.cardNumberChange}
                  onChange={(event) => {
                    const { value } = event.target;
                    event.target.value = normalizeCardNumber(value);
                    this.setState({
                      cardNumber: value,
                    });
                  }}
                />
              </div>
              <div className="ExpiryDate">
                <label htmlFor="Expiry Date">Expiry Date</label>
                <input
                  className=""
                  type="number"
                  min="1"
                  max="12"
                  placeholder="01"
                  noValidate
                  onChange={this.monthChange}
                  onChange={(event) => {
                    const { value } = event.target;
                    event.target.value = normalizeExpiryDate(value);
                    this.setState({
                      month: value,
                    });
                  }}
                />
              </div>
              <div className="ExpiryDate">
                <input
                  type="number"
                  className=""
                  placeholder="2020"
                  min="2020"
                  max="2035"
                  noValidate
                  onChange={this.yearChange}
                  onChange={(event) => {
                    const { value } = event.target;
                    event.target.value = normalizeExpiryDateYear(value);
                    this.setState({
                      year: value,
                    });
                  }}
                />
              </div>
              <div className="CVC">
                <label htmlFor="CVC">CVC</label>
                <input
                  type="text"
                  className=""
                  placeholder="123"
                  type="text"
                  name="CVC"
                  noValidate
                  onChange={this.cvcChange}
                  onChange={(event) => {
                    const { value } = event.target;
                    event.target.value = normalizeCVC(value);
                    this.setState({
                      cvc: value,
                    });
                  }}
                />
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className=""
                  placeholder="c.semaan@urfu.ru"
                  type="email"
                  name="email"
                  noValidate
                  onChange={(event) => {
                    const { value } = event.target;
                    this.setState({
                      email: value,
                    });
                  }}
                />
              </div>
              <div className="amount">
                <label htmlFor="amount">Amount</label>
                <input
                  input
                  type="number"
                  className=""
                  min="1000"
                  max="75000"
                  placeholder="1000₽"
                  name="amount"
                  onChange={(event) => {
                    const { value } = event.target;
                    event.target.value = normalizeAmount(value);
                    this.setState({
                      amount: value,
                    });
                  }}
                />
              </div>
              <div className="payButton">
                <button
                  type="submit"
                  onClick={this.submitPayment}
                  disabled={!this.state.isFormReady}
                >
                  Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    if (this.state.paymentMethod == "bank") {
      // Shows form for a payment request
      return (
        <div className="wrapper">
          <div className="form-wrapper">
            <div style={{ display: "flex" }}>
              <button
                type="button"
                id="cardPayment"
                onClick={(event) => {
                  this.setPaymentCard(event.target);
                }}
                disabled={this.state.isCard}
                className={btn_class1}
              >
                Pay With Card
              </button>
              <button
                type="button"
                id="bankPayment"
                onClick={(event) => {
                  this.setPaymentCard(event.target);
                }}
                //disables the button until the form is filled
                disabled={!this.state.isCard}
                className={btn_class2}
              >
                Request Payment
              </button>
            </div>
            <h1> URFU Payment </h1>
            <form onSubmit={this.submitPayment} onChange={this.isFormValid}>
              <div className="CardHolder">
                <label htmlFor="Card Holder"> Full Name</label>
                <input
                  type="text"
                  className=""
                  placeholder="Charles Semaan"
                  type="text"
                  name="cardName"
                  onChange={this.cardHolderChange}
                  onChange={(event) => {
                    const { value } = event.target;
                    event.target.value = normalizeCardHolder(value);
                    this.setState({
                      cardHolder: value,
                    });
                  }}
                />
              </div>
              <div className="CardNumber">
                <label htmlFor="accountNumber"> Account Number</label>
                <input
                  type="tel"
                  className=""
                  placeholder="00000000000000000000"
                  maxLength="20"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  name="accountNumber"
                  onChange={(event) => {
                    const { value } = event.target;
                    event.target.value = normalizeAccountNumber(value);
                    this.setState({
                      accountNumber: value,
                    });
                  }}
                />
              </div>
              <div className="CVC">
                <label htmlFor="TIN">TIN</label>
                <input
                  type="text"
                  className=""
                  maxLength="12"
                  placeholder="0000000000"
                  type="text"
                  name="TIN"
                  noValidate
                  onChange={this.tinChange}
                  onChange={(event) => {
                    const { value } = event.target;
                    event.target.value = normalizeTin(value);
                    this.setState({
                      tin: value,
                    });
                  }}
                />
              </div>
              <div className="CVC">
                <label htmlFor="BIC">BIC</label>
                <input
                  type="text"
                  className=""
                  maxLength="9"
                  placeholder="123456789"
                  type="text"
                  name="BIC"
                  noValidate
                  onChange={this.bicChange}
                  onChange={(event) => {
                    const { value } = event.target;
                    event.target.value = normalizeBic(value);
                    this.setState({
                      bic: value,
                    });
                  }}
                />
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className=""
                  placeholder="c.semaan@urfu.ru"
                  type="email"
                  name="email"
                  noValidate
                  onChange={(event) => {
                    const { value } = event.target;
                    this.setState({
                      email: value,
                    });
                  }}
                />
              </div>
              <div className="amount">
                <label htmlFor="amount">Amount</label>
                <input
                  input
                  type="number"
                  className=""
                  min="1000"
                  max="75000"
                  placeholder="1000₽"
                  name="amount"
                  onChange={(event) => {
                    const { value } = event.target;
                    event.target.value = normalizeAmount(value);
                    this.setState({
                      amount: value,
                    });
                  }}
                />
              </div>
              <div className="payButton">
                <button
                  type="submit"
                  onClick={this.submitPayment}
                  disabled={!this.state.isFormReady}
                >
                  Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default App;
