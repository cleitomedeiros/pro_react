import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const MyListings = ({ currentLang, t }) => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadListings();
    }, []);

    const loadListings = async () => {
        try {
            const response = await api.get('/products/my-listings');
            setListings(response.data.products);
        } catch (error) {
            console.error('Erro ao carregar anúncios:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm(t('¿Eliminar este anuncio?', 'Delete this listing?'))) {
            try {
                await api.delete(`/products/${id}`);
                loadListings();
                alert(t('Anuncio eliminado', 'Listing deleted'));
            } catch (error) {
                console.error('Erro ao deletar:', error);
                alert(t('Error al eliminar', 'Error deleting'));
            }
        }
    };

    const getStatusBadge = (status) => {
        if (status === 'active') {
            return <span className="badge-active">{t('Activo', 'Active')}</span>;
        }
        return <span className="badge-inactive">{t('Inactivo', 'Inactive')}</span>;
    };

    if (loading) return <p>{t('Carregando...', 'Loading...')}</p>;

    return (
        <div className="my-listings">
            <div className="listings-header">
                <h2>{t('Mis Anuncios', 'My Listings')}</h2>
                <Link to="/dashboard/crear-anuncio" className="btn-primary">
                    <i className="fas fa-plus"></i> {t('Crear Anuncio', 'Create Listing')}
                </Link>
            </div>

            {listings.length === 0 ? (
                <div className="empty-state">
                    <i className="fas fa-store"></i>
                    <p>{t('No tienes anuncios aún', 'You have no listings yet')}</p>
                    <Link to="/dashboard/crear-anuncio" className="btn-primary">
                        {t('Crear tu primer anuncio', 'Create your first listing')}
                    </Link>
                </div>
            ) : (
                <div className="listings-table">
                    <table>
                        <thead>
                            <tr>
                                <th>{t('Producto', 'Product')}</th>
                                <th>{t('Precio', 'Price')}</th>
                                <th>{t('Estado', 'Status')}</th>
                                <th>{t('Visitas', 'Views')}</th>
                                <th>{t('Acciones', 'Actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listings.map(listing => (
                                <tr key={listing.id}>
                                    <td>
                                        <div className="product-info">
                                            <strong>{t(listing.title_es, listing.title_en)}</strong>
                                            <small>{listing.location}</small>
                                        </div>
                                    </td>
                                    <td>₡{listing.price.toLocaleString()}</td>
                                    <td>{getStatusBadge(listing.status)}</td>
                                    <td>{listing.views || 0}</td>
                                    <td className="actions">
                                        <Link to={`/dashboard/editar-anuncio/${listing.id}`} className="btn-edit">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button onClick={() => handleDelete(listing.id)} className="btn-delete">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                        <Link to={`/produto/${listing.id}`} className="btn-view" target="_blank">
                                            <i className="fas fa-eye"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyListings;