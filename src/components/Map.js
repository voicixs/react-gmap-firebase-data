import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
//https://react-google-maps-api-docs.netlify.app/

const containerStyle = {
    width: '100%',
    height: '100vh'
}

const defaultCenter = {
    lat: 56.51,
    lng: 21.01,
}

class MapComponent extends Component {
    render() {
        const { places } = this.props

        return (
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY} >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={defaultCenter}
                    zoom={11}
                >
                    {places && places.map((place) => (
                        <Marker key={place.iemi}
                            position={{ lat:place.latitude, lng:place.longitude }}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        )
    }
  }

export default MapComponent




//   // Return map bounds based on list of places
//   getMapBounds = (map, maps, places) => {
//     const bounds = new maps.LatLngBounds();

//     places.forEach((place) => {
//       bounds.extend(new maps.LatLng(place.latitude, place.longitude));
//     });
//     return bounds;
//   };

//   // Re-center map when resizing the window
//   bindResizeListener = (map, maps, bounds) => {
//     maps.event.addDomListenerOnce(map, "idle", () => {
//       maps.event.addDomListener(window, "resize", () => {
//         map.fitBounds(bounds);
//       });
//     });
//   };

//   // Fit map to its bounds after the api is loaded
//   apiIsLoaded = (map, maps, places) => {
//     if (places && places.length > 1) {
//       // Get bounds by our places
//       const bounds = this.getMapBounds(map, maps, places);
//       // Fit map to bounds
//       map.fitBounds(bounds);
//       // Bind the resize listener
//       this.bindResizeListener(map, maps, bounds);
//     }
//   };