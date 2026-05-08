import React, { useState } from 'react';

const LocationPicker = ({ onLocationSelect, initialLocation, t, onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || {
    lat: 9.9281,
    lng: -84.0907,
    address: 'San Jose, Costa Rica'
  });
  const [loading, setLoading] = useState(false);

  const cities = [
    { name: 'San Jose, Costa Rica', lat: 9.9281, lng: -84.0907 },
    { name: 'Alajuela, Costa Rica', lat: 10.0163, lng: -84.2118 },
    { name: 'Cartago, Costa Rica', lat: 9.8644, lng: -83.9194 },
    { name: 'Heredia, Costa Rica', lat: 10.0024, lng: -84.1175 },
    { name: 'Guanacaste, Costa Rica', lat: 10.4376, lng: -85.4092 },
    { name: 'Puntarenas, Costa Rica', lat: 9.9764, lng: -84.8381 },
    { name: 'Limón, Costa Rica', lat: 9.9908, lng: -83.0361 },
    { name: 'Liberia, Costa Rica', lat: 10.6349, lng: -85.4468 },
    { name: 'Pérez Zeledón, Costa Rica', lat: 9.3535, lng: -83.6270 },
    { name: 'San Carlos, Costa Rica', lat: 10.4623, lng: -84.4399 },
    { name: 'Turrialba, Costa Rica', lat: 9.9047, lng: -83.6839 },
    { name: 'Nicoya, Costa Rica', lat: 10.1490, lng: -85.4521 }
  ];

  const getCurrentLocation = () => {
    setLoading(true);
    
    if (!navigator.geolocation) {
      alert(t('Seu navegador não suporta geolocalização', 'Your browser does not support geolocation'));
      setLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        let address = t('Localização atual', 'Current Location');
        
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
          const data = await response.json();
          if (data.address) {
            const city = data.address.city || data.address.town || data.address.village || data.address.state;
            const country = data.address.country;
            if (city) {
              address = `${city}, ${country || 'Costa Rica'}`;
            }
          }
        } catch (error) {
          console.error('Erro no reverse geocoding:', error);
        }
        
        const newLocation = { lat, lng, address };
        setSelectedLocation(newLocation);
        
        // 🔴 CHAMA A FUNÇÃO PARA FECHAR O MODAL APÓS SELECIONAR
        if (onLocationSelect) {
          onLocationSelect(newLocation);
        }
        
        setLoading(false);
      },
      (error) => {
        let errorMessage = t('Erro ao obter localização', 'Error getting location');
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = t('Permissão negada. Ative a localização.', 'Permission denied. Enable location.');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = t('Localização indisponível', 'Location unavailable');
        } else if (error.code === error.TIMEOUT) {
          errorMessage = t('Tempo limite excedido', 'Timeout exceeded');
        }
        alert(errorMessage);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleCitySelect = (city) => {
    const newLocation = {
      lat: city.lat,
      lng: city.lng,
      address: city.name
    };
    setSelectedLocation(newLocation);
    
    // 🔴 CHAMA A FUNÇÃO PARA FECHAR O MODAL APÓS SELECIONAR A CIDADE
    if (onLocationSelect) {
      onLocationSelect(newLocation);
    }
  };

  return (
    <div className="location-picker">
      <div className="location-info" style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button 
          onClick={getCurrentLocation} 
          disabled={loading}
          className="btn-locate"
          style={{
            background: '#dc2626',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            width: '100%'
          }}
        >
          <i className="fas fa-location-arrow"></i> {loading ? t('Obtendo...', 'Getting...') : t('Usar minha localização atual', 'Use my current location')}
        </button>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        marginBottom: '15px',
        color: '#666'
      }}>
        <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
        <span>{t('OU', 'OR')}</span>
        <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
      </div>

      <p style={{ marginBottom: '12px', fontWeight: 600, color: '#333' }}>
        {t('Selecione uma cidade:', 'Select a city:')}
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
        gap: '10px',
        maxHeight: '320px',
        overflowY: 'auto',
        padding: '5px'
      }}>
        {cities.map((city, index) => (
          <button
            key={index}
            onClick={() => handleCitySelect(city)}
            className="city-option"
            style={{
              padding: '12px',
              background: selectedLocation.address === city.name ? '#dc2626' : '#f8f9fa',
              color: selectedLocation.address === city.name ? 'white' : '#333',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.3s',
              fontSize: '13px'
            }}
          >
            <i className="fas fa-map-marker-alt" style={{ marginRight: '8px' }}></i>
            {city.name}
          </button>
        ))}
      </div>
      
      <p className="location-hint" style={{ marginTop: '15px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
        <i className="fas fa-info-circle"></i> {t('Selecione sua cidade para ver anúncios próximos', 'Select your city to see nearby listings')}
      </p>
    </div>
  );
};

export default LocationPicker;