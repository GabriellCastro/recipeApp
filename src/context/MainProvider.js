import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MainContext from './MainContext';

function ProviderFood({ children }) {
  const [searchBarShow, setSearchBarShow] = useState(false);
  const [data, setData] = useState(['', '']);
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');

  const contextValue = {
    searchBarShow,
    setSearchBarShow,
    data,
    setData,
    loading,
    setLoading,
    categoryList,
    setCategoryList,
    categorySelected,
    setCategorySelected,
  };

  return (
    <MainContext.Provider value={ contextValue }>
      {children}
    </MainContext.Provider>
  );
}

ProviderFood.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ProviderFood;
