import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainContext from '../context/MainContext';
import ProfileIcon from '../images/white/profileIcon.svg';
import SearchIcon from '../images/white/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, isButtonVisible }) {
  const {
    searchBarShow,
    setSearchBarShow,
  } = useContext(MainContext);

  useEffect(() => {
    const headerClass = document.querySelector('.header-div').style;
    if (title === 'Comidas') {
      headerClass.backgroundColor = '#E34F5E';
    }
    if (title === 'Bebidas') {
      headerClass.backgroundColor = '#FAC065';
    }
    if (title.includes('Explorar')) {
      headerClass.backgroundColor = '#8E66FF';
    }
    if (title === 'Receitas Favoritas') {
      headerClass.backgroundColor = '#BEE34F';
    }
    if (title === 'Perfil') {
      headerClass.backgroundColor = '#333333';
    }
    if (title === 'Receitas Feitas') {
      headerClass.backgroundColor = '#4DBB98';
    }
  }, [title]);

  function searchButton() {
    if (isButtonVisible) {
      return (
        <button
          type="button"
          onClick={ () => setSearchBarShow(!searchBarShow) }
          className="search-btn"
        >
          <img
            data-testid="search-top-btn"
            src={ SearchIcon }
            alt="search icon"
            className="search-icon"
          />
        </button>
      );
    } return (
      <div className="div-null" />
    );
  }

  return (
    <header className="header-app">
      <div className="header-div">
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ ProfileIcon }
            alt="user profile"
            className="profile-icon"
          />
        </Link>
        <h3 data-testid="page-title">{ title }</h3>
        { searchButton() }
      </div>
      { searchBarShow ? <SearchBar /> : null }
    </header>
  );
}

Header.defaultProps = {
  isButtonVisible: false,
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
  isButtonVisible: PropTypes.bool,
};

export default Header;
