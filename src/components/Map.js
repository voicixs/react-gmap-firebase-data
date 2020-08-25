import React from "react";
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

const MapComponent = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: "100vh", width: "100%" }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) => {
    const { places } = props;
    return (
        <GoogleMap defaultZoom={11} defaultCenter={{ lat: 56.51, lng: 21.01 }}>
            {places && places.map((place) => (
                <Marker key={place.iemi}
                    position={{ lat: place.latitude, lng: place.longitude }}
                />
            ))}
        </GoogleMap>
    );
});

export default MapComponent;
