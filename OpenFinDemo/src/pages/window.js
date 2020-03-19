import React, { Component } from "react";

class Window extends Component {
  constructor(props) {
    super(props);

    const successCallback = () => {
      console.log("Success");
    };

    const errorCallback = error => {
      console.log("Error: ", error);
    };

    window.fin.desktop.InterApplicationBus.subscribe(
      "*",
      "testTopic",
      this.onSubscriptionReceived.bind(this),
      successCallback,
      errorCallback
    );

    this.state = {
      message: "initial message"
    };
  }

  onSubscriptionReceived(message, uuid) {
    this.setState({
      message: message.message
    });
  }

  render() {
    return <div>{this.state.message}</div>;
  }
}

export default Window;
