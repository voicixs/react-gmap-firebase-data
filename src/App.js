import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { database } from "./database";

const Marker = ({ text, key, onClick }) => (
  <div className={"marker-wrapper"} />
)

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

  // Return map bounds based on list of places
  getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();

    places.forEach((place) => {
      bounds.extend(new maps.LatLng(place.latitude, place.longitude));
    });
    return bounds;
  };

  // Re-center map when resizing the window
  bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, "idle", () => {
      maps.event.addDomListener(window, "resize", () => {
        map.fitBounds(bounds);
      });
    });
  };

  // Fit map to its bounds after the api is loaded
  apiIsLoaded = (map, maps, places) => {
    if (places && places.length > 1) {
      // Get bounds by our places
      const bounds = this.getMapBounds(map, maps, places);
      // Fit map to bounds
      map.fitBounds(bounds);
      // Bind the resize listener
      this.bindResizeListener(map, maps, bounds);
    }
  };

  render() {
    const { places } = this.state;
    if (!places || places.length === 0) return "";

    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
          defaultCenter={{
            lat: 56.51,
            lng: 21.01,
          }}
          defaultZoom={13}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) =>
            this.apiIsLoaded(map, maps, places)
          }
        >
          {places.map((place) => (
            <Marker
              key={place.iemi}
              text={place.iemi}
              lat={place.latitude}
              lng={place.longitude}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default App;
