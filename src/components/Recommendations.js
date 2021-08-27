import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';

function Recommendations({ recommendations }) {
  const recipeBox = (recipe, index) => {
    const {
      strMealThumb = null,
      strDrinkThumb = null,
      strMeal = null,
      strDrink = null,
      strCategory = null,
      strAlcoholic = null,
    } = recipe;
    return (
      <div
        key={ index }
        data-testid={ `${index}-recomendation-card` }
        className="recommended-box"
      >
        <div
          className="recommended-box-image"
          style={ { backgroundImage: `url(${strMealThumb || strDrinkThumb})` } }
        />
        <p
          className="recommended-box-category"
        >
          {strCategory || strAlcoholic}
        </p>
        <p
          className="recommended-box-name"
          data-testid={ `${index}-recomendation-title` }
        >
          {strMeal || strDrink}

        </p>
      </div>
    );
  };

  return (
    <div className="recommendations-box">
      {recommendations.map((recipe, index) => recipeBox(recipe, index))}
    </div>
  );
}

Recommendations.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Recommendations;
