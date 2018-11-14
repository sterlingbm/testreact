import React, { Component } from "react";
import ChatScreen from "./ChatScreen/index.js";
import MapFilters from "./ChatScreen/MapFilters.js";
export default class Nightr extends Component {

  constructor() {
    super();
    this.state = {
      isReady: false,
      mapRange: 50,
    };
  }

  myCallback = (dataFromChild) => {
    this.setState({ listDataFromChild: dataFromChild}); 
  }


  render() {

    return( 

    <ChatScreen mapFilterRange={this.state.mapRange} />

    );}
}
