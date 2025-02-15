import React from 'react';

const PhotoList = ({ photos, onDelete, onPhotoClick }) => {
  return (
    <div>
      {photos.map((photo) => (
        <div key={photo.id} style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src={`http://localhost:5000/uploads/${photo.path}`}
            alt={photo.description}
            onClick={() => onPhotoClick(photo.id)}
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
  );
};

export default PhotoList;