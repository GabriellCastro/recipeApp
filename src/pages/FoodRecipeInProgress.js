import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getMealDetail } from '../services/theMealAPI';
import { saveInProgressFoodRecipes,
  saveDoneRecipes } from '../helpers/handleLocalStorage';
import MainContext from '../context/MainContext';
import LSContext from '../context/LSContext';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import FoodLoader from '../components/FoodLoader';
import listIngredients from '../helpers/listIngredients';

function FoodRecipeInProgress({ match: { params: { id } } }) {
  const { LSValues: { inProgressRecipes } } = useContext(LSContext);
  const { LSFunctions: { setInProgressRecipes, setDoneRecipes } } = useContext(LSContext);
  const [recipe, setRecipe] = useState({});
  const [usedIngredients, setUsedIngredients] = useState([]);
  const { loading, setLoading } = useContext(MainContext);
  const SLICE_NUMBER = -12;

  function lineThroughUsedIngredients({ target }) {
    if (target.checked) {
      const updatedUsedIngredients = [...usedIngredients, target.value];
      setUsedIngredients(updatedUsedIngredients);
      saveInProgressFoodRecipes(id, updatedUsedIngredients, setInProgressRecipes);
    } else {
      const remainingIngredients = usedIngredients
        .filter((ingredient) => ingredient !== target.value);
      setUsedIngredients(remainingIngredients);
      saveInProgressFoodRecipes(id, remainingIngredients, setInProgressRecipes);
    }
  }

  useEffect(() => {
    setLoading(true);
    getMealDetail(id)
      .then((result) => {
        setRecipe(...result);
        setLoading(false);
      });
  }, [setRecipe, setLoading, id]);

  useEffect(() => {
    const mealsIngredients = inProgressRecipes.meals
      ? inProgressRecipes.meals[id] || []
      : [];
    setUsedIngredients(mealsIngredients);
  }, [id, inProgressRecipes]);

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strArea,
    strTags,
  } = recipe;

  function GetDate() {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;
    return dataAtual;
  }

  const saveDone = {
    id,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
    doneDate: GetDate(),
    tags: strTags ? strTags.split(',') : [],
  };

  return (
    loading ? <FoodLoader /> : (
      <div className="progress-page">
        <img
          src={ strMealThumb }
          data-testid="recipe-photo"
          alt={ strMeal }
          className="detail-img"
        />
        <div className="food-detail">
          <div className="detail-header-info">
            <h3 data-testid="recipe-title">{ strMeal }</h3>
            <p data-testid="recipe-category">{ strCategory }</p>
          </div>
          <div className="detail-header-btn">
            <ShareButton link={ window.location.href.slice(0, SLICE_NUMBER) } />
            <FavoriteButton recipeData={ recipe } type="comida" />
          </div>
        </div>
        <div className="detail-infos">
          <form>
            <h3>CheckList de Ingredientes</h3>
            {
              listIngredients(recipe).map((ingredient, index) => (
                <label
                  className={
                    usedIngredients.includes(ingredient) ? 'ingredient-checked' : ''
                  }
                  htmlFor={ index }
                  data-testid={ `${index}-ingredient-step` }
                  key={ index }
                >
                  <input
                    checked={ usedIngredients.includes(ingredient) }
                    value={ ingredient }
                    type="checkbox"
                    id={ index }
                    className="progress-checklist"
                    name="ingredients"
                    onClick={ lineThroughUsedIngredients }
                  />
                  { ingredient }

                </label>
              ))
            }
          </form>
          <h3 className="progress-instructions">Instruções</h3>
          <p data-testid="instructions">{ strInstructions }</p>

        </div>
        <div className="div-start-btn">
          <Link to="/receitas-feitas">
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ listIngredients(recipe).length !== usedIngredients.length }
              onClick={ () => saveDoneRecipes(saveDone, setDoneRecipes) }
              className="finish-food-btn"
            >
              Finalizar Receita
            </button>
          </Link>
        </div>
      </div>
    )
  );
}

FoodRecipeInProgress.propTypes = {
  match: PropTypes.shape(PropTypes.any).isRequired,
};

export default FoodRecipeInProgress;
