import React from "react";
import ReactDOM from "react-dom";
import "./Panel.css";
import axios from "axios";

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardData: [], bankData: [], isCard: true };
  }
  componentDidMount() {
    if (this.state.isCard) {
      axios.get("http://localhost:3001/getPayments").then((response) => {
        this.setState({ cardData: response.data });
        console.log(this.state.cardData);
      });
      console.log(document.getElementById("tab1").rows[0].cells[0]);
    }
    if (!this.state.isCard) {
      axios.get("http://localhost:3001/bank/getPayments").then((response) => {
        this.setState({ bankData: response.data });
        console.log(this.state.bankData);
      });
    }
  }

  componentDidUpdate() {
    if (this.state.isCard) {
      axios.get("http://localhost:3001/getPayments").then((response) => {
        this.setState({ cardData: response.data });
      });
    }
    if (!this.state.isCard) {
      axios.get("http://localhost:3001/bank/getPayments").then((response) => {
        this.setState({ bankData: response.data });
      });
    }
  }

  markUnsafe = (event) => {
    console.log(event);
    // axios.put("http://localhost:3001/markAsUnsafe").then((response) => {
    //   this.setState({ cardData: response.data });
    //   console.log(this.state.cardData);
    // });
  };
  render() {
    if (this.state.isCard) {
      return (
        <div>
          <button
            onClick={() => {
              this.setState({ isCard: false });
            }}
          >
            {this.state.isCard ? "Show Bank Payments" : "Show Card Payments"}{" "}
          </button>
          <table class="demo" id="tab1">
            <caption>Card Payments</caption>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Card Number&nbsp;</th>
                <th>Email</th>
                <th>Amount</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {this.state.cardData.map((key, i) => {
                return (
                  <tr id={i}>
                    <td>{key.cardHolder}</td>
                    <td>{key.cardNumber}</td>
                    <td>{key.email}</td>
                    <td>{key.amount}</td>
                    <td>
                      {" "}
                      <button onClick={this.markUnsafe}>
                        {" "}
                        Mark As Unsafe{" "}
                      </button>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    if (!this.state.isCard) {
      return (
        <div>
          <button
            onClick={() => {
              this.setState({ isCard: true });
            }}
          >
            {this.state.isCard ? "Show Bank Payments" : "Show Card Payments"}
          </button>
          <table class="demo">
            <caption>Bank Payments</caption>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Account Number&nbsp;</th>
                <th>Email</th>
                <th>Amount</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {this.state.bankData.map((key, i) => {
                return (
                  <tr id={i}>
                    <td>{key.fullName}</td>
                    <td>{key.accountNumber}</td>
                    <td>{key.email}</td>
                    <td>{key.amount}</td>
                    <td>
                      {" "}
                      <button onClick={this.markUnsafe}>
                        {" "}
                        Mark As Unsafe{" "}
                      </button>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
