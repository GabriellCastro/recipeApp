import React from 'react';
import PropTypes from 'prop-types';

function RecipeDetailsCategory({ strAlcoholic, strCategory }) {
  if (strAlcoholic !== '') {
    return (
      <h4 data-testid="recipe-category">{ `${strCategory} | ${strAlcoholic}` }</h4>
    );
  }
  return (
    <h4 data-testid="recipe-category">{ strCategory }</h4>
  );
}

RecipeDetailsCategory.propTypes = {
  strAlcoholic: PropTypes.string,
  strCategory: PropTypes.string,
};

RecipeDetailsCategory.defaultProps = {
  strAlcoholic: '',
  strCategory: '',
};

export default RecipeDetailsCategory;
