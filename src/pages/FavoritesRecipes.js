import React, { useContext, useState, useEffect } from 'react';
import LSContext from '../context/LSContext';
import Header from '../components/Header';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';

const FavoritesRecipes = () => {
  const { LSValues: { favoriteRecipes } } = useContext(LSContext);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    setFilteredRecipes(favoriteRecipes);
  }, [setFilteredRecipes, favoriteRecipes]);

  function filterRecipes(string) {
    if (favoriteRecipes.length > 0) {
      switch (string) {
      case 'comida': {
        const filteredFood = favoriteRecipes
          .filter((recipeFood) => recipeFood.type === 'comida');
        setFilteredRecipes(filteredFood);
        break;
      }
      case 'bebida': {
        const filteredDrink = favoriteRecipes
          .filter((recipeDrink) => recipeDrink.type === 'bebida');
        setFilteredRecipes(filteredDrink);
        break;
      }

      default:
        setFilteredRecipes(favoriteRecipes);
      }
    }
  }
  return (
    <>
      <Header title="Receitas Favoritas" />
      <section className="doneFilters">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('all') }
          className="filter-by-all-btn"

        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => filterRecipes('comida') }
          className="filter-by-food-btn"

        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => filterRecipes('bebida') }
          className="filter-by-drink-btn"

        >
          Drinks
        </button>
      </section>
      { filteredRecipes
        .map((recipe, index) => (<FavoriteRecipesCard
          recipe={ recipe }
          key={ index }
          index={ index }
        />))}
    </>
  );
};

export default FavoritesRecipes;
