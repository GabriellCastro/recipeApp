import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MainContext from '../context/MainContext';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';
import RecipesCardsContainer from '../components/RecipesCardsContainer';
import DrinkLoader from '../components/DrinkLoader';
import {
  getInitialDrinksRecipes,
  getDrinksCategoryList,
  getDrinksByCategory,
}
  from '../services/theCockTailAPI';

function Drinks() {
  const {
    setData,
    loading,
    setLoading,
    categoryList,
    setCategoryList,
    categorySelected,
    setCategorySelected,
  } = useContext(MainContext);
  const { location: { state } } = useHistory();
  function filterByCategory({ target: { innerText } }) {
    if (innerText === categorySelected || innerText === 'All') {
      getInitialDrinksRecipes()
        .then((drinks) => {
          setData(drinks);
        });
    } else {
      getDrinksByCategory(innerText)
        .then((drinks) => {
          setData(drinks);
        });
      setCategorySelected(innerText);
    }
  }

  function categoryButtons() {
    const maxCategoryNumber = 4;
    return categoryList.map((item, index) => (
      index > maxCategoryNumber ? null
        : (
          <button
            key={ index }
            type="button"
            data-testid={ `${item.strCategory}-category-filter` }
            onClick={ filterByCategory }
            className="drink-btn-category"
          >
            {item.strCategory}
          </button>)
    ));
  }

  useEffect(() => {
    if (!state) {
      setLoading(true);
      getInitialDrinksRecipes()
        .then((drinks) => {
          setData(drinks);
          getDrinksCategoryList()
            .then((drinksCategory) => {
              setCategoryList(drinksCategory);
              setLoading(false);
            });
        });
    } return () => {
      setData(['', '']);
      setCategoryList([]);
    };
  }, [setData, setLoading, setCategoryList, state]);

  return (
    loading ? <DrinkLoader /> : (
      <div>
        <Header title="Bebidas" isButtonVisible />
        <div className="drink-div-category">
          <button
            data-testid="All-category-filter"
            type="button"
            onClick={ filterByCategory }
            className="drink-btn-category"
          >
            All
          </button>
          {loading ? null : categoryButtons()}
        </div>
        <RecipesCardsContainer test="recipe" />
        <FooterMenu />
      </div>
    )
  );
}

export default Drinks;
