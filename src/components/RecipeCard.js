import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainContext from '../context/MainContext';
import { searchBarFetchMeal } from '../services/theMealAPI';
import { searchBarFetchCockTail } from '../services/theCockTailAPI';

function RecipeCard({ recipe, index, test }) {
  const {
    strDrink,
    strDrinkThumb,
    strMeal,
    strMealThumb,
    idMeal,
    idDrink,
    strIngredient,
    strIngredient1,
  } = recipe;
  const { setData, setLoading } = useContext(MainContext);
  const title = strDrink || strMeal || strIngredient || strIngredient1;
  const thumb = strDrinkThumb || strMealThumb;
  const id = idMeal || idDrink;
  const path = idMeal ? `/comidas/${id}` : `/bebidas/${id}`;
  const ingredientThumb = strIngredient
    ? `https://www.themealdb.com/images/ingredients/${title}-Small.png`
    : `https://www.thecocktaildb.com/images/ingredients/${title}-Small.png`;
  const history = useHistory();

  function handleClick() {
    if (strIngredient) {
      setLoading(true);
      searchBarFetchMeal(title, 'ingredient')
        .then((result) => {
          setData(result);
          setLoading(false);
          history.push('/comidas', { from: 'explore' });
        });
    } else if (thumb) {
      history.push(path);
    } else {
      setLoading(true);
      searchBarFetchCockTail(title, 'ingredient')
        .then((result) => {
          setData(result);
          setLoading(false);
          history.push('/bebidas', { from: 'explore' });
        });
    }
  }

  function backgroundColorBox() {
    if (history.location.pathname.includes('explorar')) {
      return 'ingredient-recipes-card-box';
    }
    if (path.includes('comidas')) {
      return 'meals-recipes-card-box';
    } return 'drinks-recipes-card-box';
  }

  return (
    <div
      aria-hidden="true"
      data-testid={ `${index}-${test}-card` }
      onClick={ handleClick }
      className={
        backgroundColorBox()
      }
    >
      <img
        src={ thumb || ingredientThumb }
        alt={ title }
        data-testid={ `${index}-card-img` }
        className="main-recipes-box-image"
      />
      <div className="main-recipes-box-div-name">
        <h4
          data-testid={ `${index}-card-name` }
          className="main-recipes-box-name"
        >
          { title }
        </h4>
      </div>

    </div>
  );
}

export default RecipeCard;

RecipeCard.propTypes = {
  recipe: PropTypes.shape(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  test: PropTypes.string.isRequired,
};
