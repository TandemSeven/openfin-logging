import React, { Component } from "react";

class Notification extends Component {
  constructor(props) {
    super(props);

    window.onNotificationMessage = this.onNotificationMessage.bind(this);

    this.state = {
      message: ""
    };
  }

  onNotificationMessage(obj) {
    this.setState({
      message: obj.value
    });
  }

  sendMessage() {
    const notification = window.fin.desktop.Notification.getCurrent();
    notification.sendMessageToApplication({
      message: "message from notification to application"
    });
  }

  close() {
    const notification = window.fin.desktop.Notification.getCurrent();
    notification.close();
  }

  render() {
    return (
      <div>
        {this.state.message}
        <button onClick={this.sendMessage}>Send Message</button>
        <button onClick={this.close}>Close</button>
      </div>
    );
  }
}

export default Notification;
