import React, { useRef, useState, useEffect } from 'react';
import { FiUser, FiUpload } from 'react-icons/fi';

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (image) {
      const preview = URL.createObjectURL(image);
      setPreviewUrl(preview);
      return () => URL.revokeObjectURL(preview);
    }
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    inputRef.current.value = null;
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />

      <div
        className="relative group w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center cursor-pointer"
        onClick={() => inputRef.current.click()}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <FiUser className="text-purple-600 text-3xl" />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <FiUpload className="text-white text-xl" />
        </div>

        {/* Remove button */}
        {previewUrl && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // prevent opening file picker
              handleRemoveImage();
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
