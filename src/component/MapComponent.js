import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { showDataOnMap } from "../utils";
import leafletSpin, { map } from "leaflet-spin";

const useStyle = makeStyles((theme) => ({
  map: {
    height: "500px",
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "20px",
    marginTop: "16px",
  },
}));

function Map({ countries, casesType, center, zoom }) {
  const loading = useSelector((state) => state.countriesStreaming.loading);
  const classes = useStyle();

  // React.useEffect(() => {}, [loading]);
  function ChangeView({ center, zoom }) {
    const map = useMap();
    if (loading) map.spin(true, { lines: 13, length: 40 });
    else map.spin(false);

    map.setView(center, zoom);

    return null;
  }

  return (
    <MapContainer casesType={casesType} className={classes.map} center={center} zoom={zoom} scrollWheelZoom={false}>
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showDataOnMap(countries, casesType)}
    </MapContainer>
  );
}

export default Map;
