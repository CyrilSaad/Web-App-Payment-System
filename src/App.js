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
  // alert(value);
  if (/^\d+$/.test(value)) return value.substr(0, 3) || "";
  else if (/^\d+$/.test(value) && value.length == 3) {
    this.setState({
      cvc: value,
    });
    alert(this.state.cvc);
  } else return "";
};
// Validate If the amount sent is valid
const normalizeAmount = (value) => {
  if (value < 1000) return 1000;
  else if (value > 75000) {
    return 75000;
  } else {
    this.setState({
      amount: value,
    });
    return value;
  }
};
// Validate the full name of the sender
const normalizeCardHolder = (value) => {
  if (/^[a-zA-Z]+[a-zA-Z ]*$/.test(value)) {
    alert(value);
    this.setState({
      cardHolder: value,
    });
    return value;
  } else return "";
};
//Validate credit card expiry month
const normalizeExpiryDate = (value) => {
  if (value < 1 || value > 12) {
    return 1;
  } else {
    this.setState({
      month: value,
    });
    return value;
  }
};

//Validate credit card year expiry
const normalizeExpiryDateYear = (value) => {
  if (value < 2020 || value > 2035) return 2020;
  else {
    this.setState({
      year: value,
    });
    return value;
  }
};

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: "card",
      cardHolder: "",
      cardNumber: 0,
      accountNumber: "",
      month: 0,
      year: 0,
      cvc: 0,
      email: "",
      amount: 0,
      isCard: true,
    };
    this.cardHolderChange = this.cardHolderChange.bind(this);
    this.cardNumberChange = this.cardNumberChange.bind(this);
  }

  //Activates button when all fields are filled in card payment
  isCardFormValid = () => {
    const {
      cardHolder,
      cardNumber,
      month,
      year,
      cvc,
      email,
      amount,
    } = this.state;
    return cardHolder && cardNumber && month && year && cvc && email && amount;
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

  //Switches form depending on how the user wants to pay
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
    axios
      .post("/ports", this.state)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <form onSubmit={this.handleSubmit} noValidate>
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
                  onChange={this.handleChange}
                  onChange={(event) => {
                    const { value } = event.target;
                    event.target.value = normalizeExpiryDate(value);
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
                  onChange={this.handleChange}
                  onChange={(event) => {
                    const { value } = event.target;
                    event.target.value = normalizeExpiryDateYear(value);
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
                  onChange={(event) => {
                    const { value } = event.target;
                    event.target.value = normalizeCVC(value);
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
                  onChange={this.handleChange}
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
                  }}
                />
              </div>
              <div className="payButton">
                <button
                  type="submit"
                  onClick={this.submitPayment}
                  disabled={() => this.isCardFormValid}
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
            <form onSubmit={this.handleSubmit} noValidate>
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
                  onChange={this.handleChange}
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
                  }}
                />
              </div>
              <div className="payButton">
                <button
                  type="submit"
                  onClick={this.submitPayment}
                  disabled={!this.isFormValid}
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
