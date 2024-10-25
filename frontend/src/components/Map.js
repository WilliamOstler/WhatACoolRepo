// src/components/Map.js
import React from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const Map = () => {
  const mapStyles = {
    height: "400px",
    width: "75%"
  };

  const defaultCenter = {

    lat: 51.50763, // Replace with your library's latitude
    lng: -0.02449 // Replace with your library's longitude
  };

  return (
    <LoadScript googleMapsApiKey={'AIzaSyBCAtNlA19skAEWNUPSCp3oYNAVeykjZ24'}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
      >
        {/* Using default marker without custom icon */}
        <MarkerF 
          position={defaultCenter} 
          title="Your Library Location" 
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
