import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getDrinkDetail } from '../services/theCockTailAPI';
import { saveInProgressDrinkRecipes,
  saveDoneRecipes } from '../helpers/handleLocalStorage';
import MainContext from '../context/MainContext';
import LSContext from '../context/LSContext';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import listIngredients from '../helpers/listIngredients';
import DrinkLoader from '../components/DrinkLoader';

function DrinkRecipeInProgress({ match: { params: { id } } }) {
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
      saveInProgressDrinkRecipes(id, updatedUsedIngredients, setInProgressRecipes);
    } else {
      const remainingIngredients = usedIngredients
        .filter((ingredient) => ingredient !== target.value);
      setUsedIngredients(remainingIngredients);
      saveInProgressDrinkRecipes(id, remainingIngredients, setInProgressRecipes);
    }
  }

  useEffect(() => {
    setLoading(true);
    getDrinkDetail(id)
      .then((result) => {
        setRecipe(...result);
        setLoading(false);
      });
  }, [setRecipe, setLoading, id]);

  useEffect(() => {
    const drinksIngredients = inProgressRecipes.cocktails
      ? inProgressRecipes.cocktails[id] || []
      : [];
    setUsedIngredients(drinksIngredients);
  }, [id, inProgressRecipes]);

  const { strDrinkThumb, strDrink, strCategory, strInstructions, strAlcoholic } = recipe;

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
    type: 'bebida',
    area: '',
    category: '',
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
    doneDate: GetDate(),
    tags: [],
  };

  return (
    loading ? <DrinkLoader /> : (
      <div className="progress-page">
        <img
          src={ strDrinkThumb }
          data-testid="recipe-photo"
          alt={ strDrink }
          className="detail-img"
        />
        <div className="drink-detail">
          <div className="detail-header-info">
            <h3 data-testid="recipe-title">{ strDrink }</h3>
            <p data-testid="recipe-category">{ strCategory }</p>
            <p>{ strAlcoholic }</p>
          </div>
          <div className="detail-header-btn">
            <ShareButton link={ window.location.href.slice(0, SLICE_NUMBER) } />
            <FavoriteButton recipeData={ recipe } type="bebida" />
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
                  key={ index }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    value={ ingredient }
                    checked={ usedIngredients.includes(ingredient) }
                    type="checkbox"
                    id={ index }
                    className="progress-checklist"
                    name="ingredients"
                    onClick={ lineThroughUsedIngredients }
                  />
                  { `${ingredient}` }
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
              className="finish-drink-btn"
            >
              Finalizar Receita
            </button>
          </Link>
        </div>
      </div>
    )
  );
}

DrinkRecipeInProgress.propTypes = {
  match: PropTypes.shape(PropTypes.any).isRequired,
};
export default DrinkRecipeInProgress;
