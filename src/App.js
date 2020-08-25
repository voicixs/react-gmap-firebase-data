import React, { Component } from "react";
import { database } from "./database";
import Map from './components/Map'

class App extends Component {
  constructor() {
    super();
    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    this.getLastPlaces();
  }

  getLastPlaces = () => {
    const devices = database.ref("devices");
    devices.on("value", (devices) => {
      let places = []
      devices.forEach((device) => {
        device
          .child("places")
          .ref.limitToLast(1)
          .on("child_added", (child) => {
            let lastPlace = child.toJSON();
            lastPlace.iemi = device.key
            if (lastPlace && lastPlace.timestamp)
              places.push(lastPlace)
          });
          this.setState({places})
      });
    });
  };

  render() {
    const { places } = this.state;
    if (!places || places.length === 0) return "";

    return <Map places={places} />
  }
}

export default App;
