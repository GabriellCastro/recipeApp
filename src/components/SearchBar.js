import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { searchBarFetchMeal } from '../services/theMealAPI';
import MainContext from '../context/MainContext';
import { searchBarFetchCockTail } from '../services/theCockTailAPI';

function SearchBar() {
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('');
  const { pathname } = useLocation();
  const { data, setData } = useContext(MainContext);
  const history = useHistory();

  useEffect(() => {
    if (data.length === 1) {
      const { idMeal, idDrink } = data[0];
      const id = idMeal || idDrink;
      history.push(`${pathname}/${id}`);
    }
  }, [pathname, data, history]);

  useEffect(() => {
    const filterButton = document.querySelector('.filter-btn').style;
    if (pathname === '/comidas') {
      filterButton.backgroundColor = '#FAC065';
    }
    if (pathname === '/bebidas') {
      filterButton.backgroundColor = '#E34F5E';
    }
  }, [pathname]);

  async function searchButton() {
    if (pathname === '/comidas') {
      const newResults = await searchBarFetchMeal(search, radio) || [];
      if (typeof (newResults) === 'string') {
        // eslint-disable-next-line no-alert
        alert(newResults);
      } else {
        setData(newResults);
      }
    }
    if (pathname === '/bebidas') {
      const newResults = await searchBarFetchCockTail(search, radio) || [];
      if (typeof (newResults) === 'string') {
        // eslint-disable-next-line no-alert
        alert(newResults);
      } else {
        setData(newResults);
      }
    }
  }

  return (
    <form className="search-bar">
      <label htmlFor="search-input" className="search-input">
        <input
          data-testid="search-input"
          id="search-input"
          onChange={ ({ target: { value } }) => setSearch(value) }
          placeholder="Buscar Receita"
          type="text"
        />
      </label>
      <div className="search-radios">
        <label htmlFor="ingredient-search-radio">
          <input
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            name="search-radio"
            onClick={ ({ target: { value } }) => setRadio(value) }
            type="radio"
            value="ingredient"
          />
          Ingrediente
        </label>
        <label htmlFor="name-search-radio">
          <input
            data-testid="name-search-radio"
            id="name-search-radio"
            name="search-radio"
            onClick={ ({ target: { value } }) => setRadio(value) }
            type="radio"
            value="name"
          />
          Nome
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            name="search-radio"
            onClick={ ({ target: { value } }) => setRadio(value) }
            type="radio"
            value="firstLetter"
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchButton }
        className="filter-btn"
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
