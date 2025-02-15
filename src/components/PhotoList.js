import React from 'react';
import { Link } from 'react-router-dom';
import PhotoUploader from './PhotoUploader';

const PhotoList = ({ photos, onDelete }) => {
  return (
    <div>
      <h2>Upload New Photo</h2>
      <PhotoUploader onUpload={(newPhoto) => {}} /> {/* بخش آپلود فایل */}
      
      <h3>Gallery</h3>
      {photos.map((photo) => (
        <div key={photo.id} style={{ position: 'relative', display: 'inline-block' }}>
          <Link to={`/photos/${photo.id}`}>
            <img
              src={`http://localhost:5000/uploads/${photo.path}`}
              alt={photo.description}
              style={{ width: '100px', height: '100px', margin: '10px' }}
            />
          </Link>
          <button
            onClick={() => onDelete(photo.id)}
            style={{ position: 'absolute', top: '0', right: '0' }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default PhotoList;
