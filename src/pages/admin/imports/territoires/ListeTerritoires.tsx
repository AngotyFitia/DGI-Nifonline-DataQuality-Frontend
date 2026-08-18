import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

export default function ListeTerritoires() {
  const [niveau, setNiveau] = useState<"province"|"region"|"district"|"commune">("province");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let file = "";
    if (niveau === "province") file = "/data/geoBoundaries-MDG-ADM1.geojson";
    else if (niveau === "region") file = "/data/geoBoundaries-MDG-ADM2.geojson";
    else if (niveau === "district") file = "/data/geoBoundaries-MDG-ADM3.geojson";
    else file = "/data/geoBoundaries-MDG-ADM4.geojson";

    fetch(file)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Erreur chargement GeoJSON:", err));
  }, [niveau]);

  const handleClick = (_feature: any, layer: any) => {
    layer.on({
      click: () => {
        if (niveau === "province") setNiveau("region");
        else if (niveau === "region") setNiveau("district");
        else if (niveau === "district") setNiveau("commune");
      }
    });
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={[-18.9, 47.5]} zoom={6} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data && <GeoJSON data={data} onEachFeature={handleClick} />}
      </MapContainer>
    </div>
  );
}
