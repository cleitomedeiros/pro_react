import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import ImageUploader from '../../components/ImageUploader';

const CreateListing = ({ currentLang, t }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title_es: '',
        title_en: '',
        description_es: '',
        description_en: '',
        category_es: '',
        category_en: '',
        price: '',
        price_unit_es: '',
        price_unit_en: '',
        location: '',
        type: 'service',
        stock: 1
    });

    const categories = [
        { id: 'health', es: 'Salud', en: 'Health' },
        { id: 'vehicles', es: 'Vehículos', en: 'Vehicles' },
        { id: 'services', es: 'Servicios', en: 'Services' },
        { id: 'beauty', es: 'Belleza', en: 'Beauty' },
        { id: 'home', es: 'Hogar', en: 'Home' },
        { id: 'tech', es: 'Tecnología', en: 'Technology' }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/products', formData);
            alert(t('Anuncio creado con éxito', 'Listing created successfully'));
            navigate('/dashboard/mis-anuncios');
        } catch (error) {
            console.error('Erro ao criar:', error);
            alert(t('Error al crear el anuncio', 'Error creating listing'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-listing">
            <h2>{t('Crear Nuevo Anuncio', 'Create New Listing')}</h2>
            
            <form onSubmit={handleSubmit} className="listing-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>{t('Título (Español)', 'Title (Spanish)')} *</label>
                        <input
                            type="text"
                            name="title_es"
                            value={formData.title_es}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('Título (Inglés)', 'Title (English)')} *</label>
                        <input
                            type="text"
                            name="title_en"
                            value={formData.title_en}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>{t('Descripción (Español)', 'Description (Spanish)')}</label>
                        <textarea
                            name="description_es"
                            value={formData.description_es}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('Descripción (Inglés)', 'Description (English)')}</label>
                        <textarea
                            name="description_en"
                            value={formData.description_en}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>{t('Categoría', 'Category')} *</label>
                        <select name="category_es" onChange={handleChange} required>
                            <option value="">{t('Seleccionar', 'Select')}</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.es}>
                                    {currentLang === 'es' ? cat.es : cat.en}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>{t('Tipo', 'Type')} *</label>
                        <select name="type" onChange={handleChange} required>
                            <option value="service">{t('Servicio', 'Service')}</option>
                            <option value="escrow">{t('Producto', 'Product')}</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>{t('Precio (CRC)', 'Price (CRC)')} *</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('Unidad', 'Unit')}</label>
                        <input
                            type="text"
                            name="price_unit_es"
                            value={formData.price_unit_es}
                            onChange={handleChange}
                            placeholder={t('ej: /sesion, /hora', 'ex: /session, /hour')}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>{t('Ubicación', 'Location')} *</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder={t('Ciudad, Provincia', 'City, Province')}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('Stock', 'Stock')}</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            min="1"
                        />
                    </div>
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? t('Creando...', 'Creating...') : t('Publicar Anuncio', 'Publish Listing')}
                </button>
            </form>
        </div>
    );
};

export default CreateListing;