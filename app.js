import React, { Component } from "react";
import ChatScreen from "./ChatScreen/index.js";
export default class Nightr extends Component {

  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  render() {
    return <ChatScreen />;
  }
}
