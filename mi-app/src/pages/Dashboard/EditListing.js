import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import ImageUploader from '../../components/ImageUploader';

const EditListing = ({ currentLang, t }) => {
    const { id } = useParams();
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
        stock: 1,
        status: 'active'
    });

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            const response = await api.get(`/products/${id}`);
            const product = response.data.product;
            setFormData({
                title_es: product.title_es,
                title_en: product.title_en,
                description_es: product.description_es || '',
                description_en: product.description_en || '',
                category_es: product.category_es,
                category_en: product.category_en,
                price: product.price,
                price_unit_es: product.price_unit_es || '',
                price_unit_en: product.price_unit_en || '',
                location: product.location,
                type: product.type,
                stock: product.stock,
                status: product.status
            });
        } catch (error) {
            console.error('Erro ao carregar produto:', error);
            alert(t('Error al cargar el producto', 'Error loading product'));
            navigate('/dashboard/mis-anuncios');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.put(`/products/${id}`, formData);
            alert(t('Anuncio actualizado', 'Listing updated'));
            navigate('/dashboard/mis-anuncios');
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            alert(t('Error al actualizar', 'Error updating'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-listing">
            <h2>{t('Editar Anuncio', 'Edit Listing')}</h2>
            
            <ImageUploader productId={id} t={t} />
            
            <form onSubmit={handleSubmit} className="listing-form">
                {/* Mesmo formulário do CreateListing */}
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
                        <label>{t('Estado', 'Status')}</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="active">{t('Activo', 'Active')}</option>
                            <option value="inactive">{t('Inactivo', 'Inactive')}</option>
                        </select>
                    </div>
                </div>

                {/* Resto do formulário igual ao CreateListing */}
                
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? t('Guardando...', 'Saving...') : t('Guardar Cambios', 'Save Changes')}
                </button>
            </form>
        </div>
    );
};

export default EditListing;