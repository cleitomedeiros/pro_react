import React, { useState } from 'react';
import api from '../services/api';

const ImageUploader = ({ productId, onImageUploaded, t }) => {
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState([]);

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        setUploading(true);

        for (const file of files) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await api.post(`/products/${productId}/images`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setImages(prev => [...prev, response.data.imageUrl]);
                if (onImageUploaded) onImageUploaded(response.data.imageUrl);
            } catch (error) {
                console.error('Erro ao fazer upload:', error);
                alert(t('Erro ao fazer upload da imagem', 'Error uploading image'));
            }
        }
        setUploading(false);
        e.target.value = '';
    };

    return (
        <div className="image-uploader">
            <label className="upload-btn">
                <i className="fas fa-cloud-upload-alt"></i>
                {uploading ? t('Subiendo...', 'Uploading...') : t('Subir Imagen', 'Upload Image')}
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={uploading}
                    style={{ display: 'none' }}
                />
            </label>
            {images.length > 0 && (
                <div className="image-preview">
                    {images.map((img, idx) => (
                        <div key={idx} className="preview-item">
                            <img src={`http://localhost:5000${img}`} alt={`Preview ${idx}`} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;