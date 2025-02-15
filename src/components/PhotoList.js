import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // برای استفاده از روتینگ

const PhotoList = ({ photos, onDelete, onUpload }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();  // برای هدایت به صفحه جزئیات

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // بعد از آپلود عکس، لیست را بروزرسانی می‌کنیم
      onUpload(response.data);
      setFile(null); // پاک کردن فیلدهای فرم بعد از آپلود
      setDescription('');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handlePhotoClick = (id) => {
    navigate(`/photos/${id}`);  // هدایت به صفحه جزئیات
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <button type="submit">Upload</button>
      </form>

      <div>
        {photos.map((photo) => (
          <div key={photo.id} style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src={`http://localhost:5000/uploads/${photo.path}`}
              alt={photo.description}
              onClick={() => handlePhotoClick(photo.id)}  // کلیک برای رفتن به صفحه جزئیات
              style={{ width: '100px', height: '100px', margin: '10px' }}
            />
            <button
              onClick={() => onDelete(photo.id)}
              style={{ position: 'absolute', top: '0', right: '0' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoList;
