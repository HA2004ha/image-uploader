import './styles.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PhotoList from './components/PhotoList';
import PhotoDetail from './components/PhotoDetail';
import axios from 'axios';
import MapPage from "./pages/MapPage";
import LocationDetail from "./pages/LocationDetail";
function App() {
  const [photos, setPhotos] = useState([]);

  // بارگذاری عکس‌ها از سرور
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/photos');
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  // حذف عکس از سرور و لیست
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/photos/${id}`);
      setPhotos(photos.filter((photo) => photo.id !== id));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  // افزودن عکس جدید به لیست
  const handleUpload = (newPhoto) => {
    setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* صفحه گالری که لیست تصاویر و فرم آپلود را نمایش می‌دهد */}
          <Route
            path="/"
            element={<PhotoList photos={photos} onDelete={handleDelete} onUpload={handleUpload} />}
          />

          {/* صفحه جزئیات که یک عکس خاص را نمایش می‌دهد */}
          <Route
            path="/photos/:id"
            element={<PhotoDetail photos={photos} />}
          />
          <Route path="/map" element={<MapPage />} />
          <Route path="/location/:id" element={<LocationDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
