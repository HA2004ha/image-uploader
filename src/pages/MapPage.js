/////g
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// function LocationMarker({ addMarker }) {
//   useMapEvents({
//     click(e) {
//       const newMarker = {
//         id: Date.now(),
//         lat: e.latlng.lat,
//         lng: e.latlng.lng,
//         info: `مکان جدید (${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)})`
//       };
//       addMarker(newMarker);
//     }
//   });
//   return null;
// }

// export default function MapPage() {
//   const navigate = useNavigate();
//   const [markers, setMarkers] = useState([
//     { id: 1, lat: 35.6892, lng: 51.3890, info: "تهران - میدان آزادی" },
//     { id: 2, lat: 35.7153, lng: 51.4221, info: "تهران - برج میلاد" }
//   ]);

//   const addMarker = (marker) => {
//     setMarkers([...markers, marker]);
//   };

//   return (
//     <div style={{ height: "100vh", width: "100vw" }}>
//       <MapContainer center={[35.6892, 51.3890]} zoom={12} style={{ height: "100%", width: "100%" }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {markers.map(marker => (
//           <Marker key={marker.id} position={[marker.lat, marker.lng]}>
//             <Popup>
//               <p>{marker.info}</p>
//               <button 
//                 className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
//                 onClick={() => navigate(`/location/${marker.id}`)}
//               >
//                 مشاهده جزئیات
//               </button>
//             </Popup>
//           </Marker>
//         ))}

//         <LocationMarker addMarker={addMarker} />
//       </MapContainer>
//     </div>
//   );
// }


///////////////////////////////// g

// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import axios from "axios";
// import "leaflet/dist/leaflet.css";

// export default function MapPage() {
//   const [places, setPlaces] = useState([]);

//   useEffect(() => {
//     const fetchPlaces = async () => {
//       try {
//         const query = `
//           [out:json];
//           node["amenity"="restaurant"](35.60,51.20,35.80,51.50); 
//           out;
//         `;
//         const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

//         const response = await axios.get(url);
//         const data = response.data.elements.map((place) => ({
//           id: place.id,
//           lat: place.lat,
//           lng: place.lon,
//           name: place.tags.name || "نام نامشخص",
//           type: place.tags.amenity || "نامشخص",
//         }));

//         setPlaces(data);
//       } catch (error) {
//         console.error("Error fetching places:", error);
//       }
//     };

//     fetchPlaces();
//   }, []);

//   return (
//     <div style={{ height: "100vh", width: "100vw" }}>
//       <MapContainer center={[35.6892, 51.3890]} zoom={12} style={{ height: "100%", width: "100%" }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {places.map((place) => (
//           <Marker key={place.id} position={[place.lat, place.lng]}>
//             <Popup>
//               <strong>{place.name}</strong>
//               <br />
//               نوع: {place.type}
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// }
//////////////////////////////////////ng
// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import axios from "axios";
// import "leaflet/dist/leaflet.css";

// export default function MapPage() {
//   const [places, setPlaces] = useState([]);

//   const fetchImage = async (placeName) => {
//     try {
//       const response = await axios.get(`http://localhost:5001/proxy`, {
//         params: {
//           url: `https://en.wikipedia.org/w/api.php?action=query&titles=${placeName}&prop=pageimages&piprop=original&format=json`,
//         },
//       });
  
//       const pages = response.data.query?.pages;
//       if (pages) {
//         const page = Object.values(pages)[0];
//         console.log("Image URL: ", page?.original?.source); // نمایش URL تصویر در کنسول
//         return page?.original?.source || null;
//       } else {
//         console.error("No pages found for:", placeName);
//         return null;
//       }
//     } catch (error) {
//       console.error("Error fetching image:", error);
//       return null;
//     }
//   };
  
  
//   useEffect(() => {
//     const fetchPlaces = async () => {
//       try {
//         const query = `
//           [out:json];
//           node["amenity"="restaurant"](35.60,51.20,35.80,51.50); 
//           out;
//         `;
//         const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

//         const response = await axios.get(url);
//         const data = await Promise.all(
//           response.data.elements.map(async (place) => {
//             const imageUrl = await fetchImage(place.tags.name);
//             return {
//               id: place.id,
//               lat: place.lat,
//               lng: place.lon,
//               name: place.tags.name || "نام نامشخص",
//               type: place.tags.amenity || "نامشخص",
//               imageUrl: imageUrl,
//             };
//           })
//         );
//         setPlaces(data);
//       } catch (error) {
//         console.error("Error fetching places:", error);
//       }
//     };

//     fetchPlaces();
//   }, []);

//   return (
//     <div style={{ height: "100vh", width: "100vw" }}>
//       <MapContainer
//         center={[35.6892, 51.3890]} // موقعیت مرکزی نقشه (تهران)
//         zoom={12} // بزرگنمایی پیش‌فرض
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {/* نمایش مکان‌ها و نشانگرها */}
//         {places.map((place) => (
//           <Marker key={place.id} position={[place.lat, place.lng]}>
//             <Popup>
//               <strong>{place.name}</strong>
//               <br />
//               نوع: {place.type}
//               <br />
//               {place.imageUrl && (
//                 <img
//                   src={place.imageUrl}
//                   alt={place.name}
//                   style={{ width: "100px", height: "auto" }}
//                 />
//               )}
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// }
//////////
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import L from "leaflet"; // برای استفاده از آیکون سفارشی
import "leaflet/dist/leaflet.css";

// آیکون سفارشی
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // آیکون پیش‌فرض
  iconSize: [25, 41], // سایز آیکون
  iconAnchor: [12, 41], // نقطه‌ای که آیکون از آن نقطه قرار می‌گیرد
  popupAnchor: [1, -34], // نقطه‌ای که popup باز می‌شود
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', // سایه آیکون
  shadowSize: [41, 41], // سایز سایه آیکون
});

export default function MapPage() {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate(); // تابع برای هدایت

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const query = `
          [out:json];
          node["amenity"="restaurant"](35.60,51.20,35.80,51.50); 
          out;
        `;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

        const response = await axios.get(url);
        const data = response.data.elements.map((place) => ({
          id: place.id,
          lat: place.lat,
          lng: place.lon,
          name: place.tags.name || "نام نامشخص",
          type: place.tags.amenity || "نامشخص",
        }));

        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  const handleMarkerClick = (place) => {
    // ارسال داده‌های مکان به صفحه جزئیات
    navigate(`/location/${place.id}`, { state: { place } });
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer center={[35.6892, 51.3890]} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* نمایش مکان‌ها و نشانگرها */}
        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={customIcon} // استفاده از آیکون سفارشی
            eventHandlers={{ click: () => handleMarkerClick(place) }}
          >
            <Popup>
              <strong>{place.name}</strong>
              <br />
              نوع: {place.type}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

