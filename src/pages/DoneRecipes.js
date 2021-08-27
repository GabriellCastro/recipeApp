import React, { useContext, useState, useEffect } from 'react';
import LSContext from '../context/LSContext';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';

const DoneRecipes = () => {
  const { LSValues: { doneRecipes } } = useContext(LSContext);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    setFilteredRecipes(doneRecipes);
  }, [setFilteredRecipes, doneRecipes]);

  function filterRecipes(string) {
    if (doneRecipes.length > 0) {
      switch (string) {
      case 'comida': {
        const filteredFood = doneRecipes
          .filter((recipeFood) => recipeFood.type === 'comida');
        setFilteredRecipes(filteredFood);
        break;
      }
      case 'bebida': {
        const filteredDrink = doneRecipes
          .filter((recipeDrink) => recipeDrink.type === 'bebida');
        setFilteredRecipes(filteredDrink);
        break;
      }
      default:
        setFilteredRecipes(doneRecipes);
      }
    }
  }

  return (
    <>
      <Header title="Receitas Feitas" />
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
        .map((recipe, index) => (<DoneRecipesCard
          recipe={ recipe }
          key={ index }
          index={ index }
        />))}
    </>
  );
};

export default DoneRecipes;
