import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PhotoDetail = ({ photos }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // برای هدایت به صفحه قبلی
  const photo = photos.find((p) => p.id === parseInt(id));

  if (!photo) {
    return <div>Photo not found</div>;
  }

  const handleBack = () => {
    navigate(-1); // بازگشت به صفحه قبلی
  };

  return (
    <div className="photo-detail">
      <button onClick={handleBack} style={{ padding: '10px', marginBottom: '20px' }}>
        Back to Gallery
      </button>
      <div>
        <img
          src={`http://localhost:5000/uploads/${photo.path}`}
          alt={photo.description}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <p>{photo.description}</p>
      </div>
    </div>
  );
};

export default PhotoDetail;
