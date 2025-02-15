import React from 'react';
import { useParams } from 'react-router-dom';

const PhotoDetail = ({ photos }) => {
  const { id } = useParams(); // استفاده از useParams برای دریافت id
  const photoId = parseInt(id);
  const photo = photos.find((p) => p.id === photoId);

  if (!photo) {
    return <div>Photo not found</div>;
  }

  return (
    <div>
      <img src={`http://localhost:5000/uploads/${photo.path}`} alt={photo.description} />
      <p>{photo.description}</p>
    </div>
  );
};

export default PhotoDetail;
