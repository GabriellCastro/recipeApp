import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MainContext from '../context/MainContext';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';
import RecipesCardsContainer from '../components/RecipesCardsContainer';
import {
  getInitialMealsRecipes,
  getMealsCategoryList,
  getMealsByCategory,
}
  from '../services/theMealAPI';
import FoodLoader from '../components/FoodLoader';

function Foods() {
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
      getInitialMealsRecipes()
        .then((meals) => {
          setData(meals);
        });
    } else {
      getMealsByCategory(innerText)
        .then((meals) => {
          setData(meals);
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
            className="meal-btn-category"
          >
            {item.strCategory}
          </button>)
    ));
  }

  useEffect(() => {
    if (!state) {
      setLoading(true);
      getInitialMealsRecipes()
        .then((meals) => {
          setData(meals);
          getMealsCategoryList()
            .then((mealsCategory) => {
              setCategoryList(mealsCategory);
              setLoading(false);
            });
        });
    } return () => {
      setData(['', '']);
      setCategoryList([]);
    };
  }, [setData, setLoading, setCategoryList, state]);

  return (
    loading
      ? <FoodLoader />
      : (
        <div>
          <Header title="Comidas" isButtonVisible />
          <div className="meal-div-category">
            <button
              type="button"
              data-testid="All-category-filter"
              onClick={ filterByCategory }
              className="meal-btn-category"
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

export default Foods;
