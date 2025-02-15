import './styles.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PhotoList from './components/PhotoList';
import PhotoDetail from './components/PhotoDetail';
import axios from 'axios';

function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // بارگذاری عکس‌ها از سرور
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/photos/${id}`);
      setPhotos(photos.filter((photo) => photo.id !== id));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* صفحه گالری که لیست تصاویر و فرم آپلود را نمایش می‌دهد */}
          <Route
            path="/"
            element={<PhotoList photos={photos} onDelete={handleDelete} />}
          />

          {/* صفحه جزئیات که یک عکس خاص را نمایش می‌دهد */}
          <Route
            path="/photos/:id"
            element={<PhotoDetail photos={photos} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
