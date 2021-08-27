import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MainContext from '../context/MainContext';
import RecipeCard from './RecipeCard';

function RecipesCardsContainer({ test }) {
  const [showCards, setShowCards] = useState(false);
  const { data, loading } = useContext(MainContext);
  const maxCardLength = 11;

  useEffect(() => {
    if (!loading) {
      if (data.length === 0) {
      // eslint-disable-next-line no-alert
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        setShowCards(true);
      }
    }
  }, [data, loading]);

  const renderCards = (recipe, index) => (
    index > maxCardLength
      ? null
      : <RecipeCard test={ test } index={ index } recipe={ recipe } />
  );

  return (
    <section className="main-recipes-box">
      { showCards ? data.map((recipe, index) => renderCards(recipe, index)) : null }
    </section>
  );
}

RecipesCardsContainer.propTypes = {
  test: PropTypes.string.isRequired,
};

export default RecipesCardsContainer;
