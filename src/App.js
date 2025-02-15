import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import PhotoUploader from './components/PhotoUploader';
import PhotoList from './components/PhotoList';
import PhotoDetail from './components/PhotoDetail';
import axios from 'axios';
import './styles.css'; // مسیر صحیح فایل را وارد کنید

const App = () => {
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/photos');
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleUpload = (newPhoto) => {
    setPhotos([...photos, newPhoto]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/photos/${id}`);
      setPhotos(photos.filter((photo) => photo.id !== id));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handlePhotoClick = (id) => {
    navigate(`/photo/${id}`);
  };

  return (
    <div>
      <PhotoUploader onUpload={handleUpload} />
      <PhotoList photos={photos} onDelete={handleDelete} onPhotoClick={handlePhotoClick} />
      <Routes>
        <Route path="/photo/:id" element={<PhotoDetail photos={photos} />} />
      </Routes>
    </div>
  );
};

// اختصاص تابع به یک متغیر
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

// Export متغیر
export default AppWrapper;