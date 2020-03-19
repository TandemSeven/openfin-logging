import React, { Component } from "react";
// import { InitializeReactOpenfin, ReactOpenfin } from 'react-openfin';

class Home extends Component {
  constructor(props) {
    super(props);

    const app = window.fin.desktop.Application.getCurrent();
    this.state = {
      application: app,
      window: null,
      notification: null
    };

    this.launchWindow = this.launchWindow.bind(this);
    this.windowClosed = this.windowClosed.bind(this);
    this.sendMessageToWindow = this.sendMessageToWindow.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.notificationClosed = this.notificationClosed.bind(this);
    this.sendMessageToNotification = this.sendMessageToNotification.bind(this);
  }

  async launchWindow() {
    if (window.fin) {
      const childWindow = await window.fin.Window.create({
        name: "Open Fin Window",
        url: "http://localhost:3000/window",
        defaultWidth: 600,
        defaultHeight: 400,
        resizable: true,
        autoShow: true
      });

      this.state.application.getChildWindows(children => {
        console.log(children)
        children.map(window => {
          if (window.name === "Open Fin Window") {
            window.addEventListener("closing", this.windowClosed);
          }
        });
      });

      this.setState({
        window: childWindow
      });
    } else {
      console.log("No Open Fin window found");
    }
  }

  windowClosed() {
    this.setState({
      window: null
    });
  }

  sendMessageToWindow() {
    const successCallback = () => {
      console.log("Success");
    };

    const errorCallback = error => {
      console.log("Error: ", error);
    };

    if (window.fin) {
      window.fin.desktop.InterApplicationBus.send(
        this.state.window.identity.uuid,
        "testTopic",
        { message: "message from application to window" },
        successCallback,
        errorCallback
      );
    } else {
      console.log("No Open Fin window found");
    }
  }

  showNotification() {
    if (window.fin) {
      const notification = new window.fin.desktop.Notification({
        url: "http://localhost:3000/notification",
        message: { value: "inital message" },
        onClick: () => {
          console.log("clicked");
        },
        onClose: this.notificationClosed,
        onDismiss: this.notificationClosed,
        onError: reason => {
          console.log("error: " + reason);
        },
        onMessage: message => {
          console.log("message: ", message);
        },
        onShow: () => {
          console.log("notification shown :", notification);
        }
      });

      this.setState({
        notification
      });
    } else {
      console.log("No Open Fin window found");
    }
  }

  notificationClosed() {
    console.log("closed");
    this.setState({
      notification: null
    });
  }

  sendMessageToNotification() {
    this.state.notification.sendMessage({
      value: "message from application to notification"
    });
  }
  
  testLogging() {
    console.log('johncena test console.log');
    console.info('johncena test console.info');
    console.warn('johncena test console.warn');
    console.error('johncena test console.warn');
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.launchWindow}>New Window</button>
          {this.state.window && (
            <button onClick={this.sendMessageToWindow}>
              Send Message to Window
            </button>
          )}
        </div>
        <div>
          <button onClick={this.showNotification}>Show Notification</button>
          {this.state.notification && (
            <button onClick={this.sendMessageToNotification}>
              Send Message to Notification
            </button>
          )}
        </div>
        <div>
          <button onClick={this.testLogging}>Test Logging</button>
        </div>
      </div>
    );
  }
}

export default Home;
