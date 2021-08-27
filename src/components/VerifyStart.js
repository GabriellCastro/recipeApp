import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LSContext from '../context/LSContext';

function VerifyStart({ id }) {
  const { LSValues: { inProgressRecipes, doneRecipes } } = useContext(LSContext);
  const cocktails = inProgressRecipes.cocktails || {};
  const meals = inProgressRecipes.meals || {};

  if (inProgressRecipes
    && ((Object.keys(cocktails)).includes(id)
      || (Object.keys(meals)).includes(id))) {
    return (
      <div className="div-start-btn">
        <Link
          to={ `${window.location.pathname}/in-progress` }
        >
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="continue-btn"
          >
            Continuar Receita
          </button>
        </Link>
      </div>
    );
  }
  if (doneRecipes.length === 0 || doneRecipes.find((recipe) => id !== recipe.id)) {
    return (
      <div className="div-start-btn">
        <Link
          to={ `${window.location.pathname}/in-progress` }
        >
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-btn"
          >
            Iniciar Receita
          </button>
        </Link>
      </div>
    );
  }
  return null;
}

VerifyStart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default VerifyStart;
