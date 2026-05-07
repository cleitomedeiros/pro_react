import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, t }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t(
          'Buscar servicios, vehiculos, productos...',
          'Search services, vehicles, products...'
        )}
      />
      <button>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;