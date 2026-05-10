import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { authService } from '../../services/api';
import api from '../../services/api';

const SellerDashboard = ({ currentLang, t }) => {
    const [stats, setStats] = useState({ total_products: 0, active_products: 0, total_views: 0 });
    const location = useLocation();

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const response = await api.get('/products/stats/seller');
            setStats(response.data);
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
        }
    };

    const menuItems = [
        { path: '/dashboard', labelEs: 'Visión General', labelEn: 'Overview', icon: 'fa-chart-line' },
        { path: '/dashboard/mis-anuncios', labelEs: 'Mis Anuncios', labelEn: 'My Listings', icon: 'fa-store' },
        { path: '/dashboard/crear-anuncio', labelEs: 'Crear Anuncio', labelEn: 'Create Listing', icon: 'fa-plus-circle' },
    ];

    return (
        <div className="dashboard-container">
            <div className="container">
                <div className="dashboard-layout">
                    {/* Sidebar */}
                    <aside className="dashboard-sidebar">
                        <div className="seller-info">
                            <i className="fas fa-store"></i>
                            <h3>{t('Mi Tienda', 'My Store')}</h3>
                            <p>{authService.getCurrentUser()?.name}</p>
                        </div>
                        <nav className="dashboard-nav">
                            {menuItems.map(item => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`dashboard-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                                >
                                    <i className={`fas ${item.icon}`}></i>
                                    <span>{t(item.labelEs, item.labelEn)}</span>
                                </Link>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="dashboard-main">
                        {location.pathname === '/dashboard' && (
                            <>
                                <h1>{t('Bienvenido a tu Dashboard', 'Welcome to your Dashboard')}</h1>
                                
                                <div className="dashboard-stats">
                                    <div className="stat-card">
                                        <i className="fas fa-box"></i>
                                        <div>
                                            <h3>{stats.total_products}</h3>
                                            <p>{t('Total de Productos', 'Total Products')}</p>
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <i className="fas fa-eye"></i>
                                        <div>
                                            <h3>{stats.total_views}</h3>
                                            <p>{t('Visualizaciones', 'Views')}</p>
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <i className="fas fa-check-circle"></i>
                                        <div>
                                            <h3>{stats.active_products}</h3>
                                            <p>{t('Productos Activos', 'Active Products')}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;