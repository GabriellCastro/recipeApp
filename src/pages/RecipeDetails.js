import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainContext from '../context/MainContext';
import { getDrinkDetail, getDrinkRecomendations } from '../services/theCockTailAPI';
import { getMealDetail, getMealRecomendations } from '../services/theMealAPI';
import Recommendations from '../components/Recommendations';
import selectDetailClass from '../helpers/detailClass';
import VerifyStart from '../components/VerifyStart';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import RecipeDetailsCategory from '../components/RecipeDetailsCategory';
import RecipeDetailsIframe from '../components/RecipeDetailsIframe';
import DrinkLoader from '../components/DrinkLoader';
import FoodLoader from '../components/FoodLoader';
import listIngredients from '../helpers/listIngredients';

function RecipeDetails({ match: { params: { id } } }) {
  const [recipeData, setRecipeData] = useState({ strYoutube: '' });
  const [recomendedRecipe, setRecomendedRecipe] = useState([]);
  const MAX_RESULTS = 6;
  const { pathname } = useLocation();
  const recipeType = pathname.includes('comidas') ? 'comida' : 'bebida';
  const {
    strDrink,
    strMeal,
    strDrinkThumb,
    strMealThumb,
    strCategory,
    strInstructions,
    strAlcoholic,
    strYoutube,
  } = recipeData;
  const thumb = strDrinkThumb || strMealThumb;
  const title = strDrink || strMeal;
  const { loading, setLoading } = useContext(MainContext);

  useEffect(() => {
    setLoading(true);
    if (recipeType === 'bebida') {
      const getDataDrinkDetail = async () => {
        const data = await getDrinkDetail(id);
        setRecipeData(...data);
      };
      getDataDrinkDetail();
    } else {
      const getFoodDetail = async () => {
        const data = await getMealDetail(id);
        setRecipeData(...data);
      };
      getFoodDetail();
    }
  }, [id, recipeType, setLoading]);

  useEffect(() => {
    if (recipeType === 'bebida') {
      const fetchRecomended = async () => {
        const recomendedArray = await getMealRecomendations();
        setRecomendedRecipe(recomendedArray);
        setLoading(false);
      };
      fetchRecomended();
    } else {
      const fetchRecomended = async () => {
        const recomendedArray = await getDrinkRecomendations();
        setRecomendedRecipe(recomendedArray);
        setLoading(false);
      };
      fetchRecomended();
    }
  }, [recipeType, setLoading]);

  function loader() {
    return recipeType === 'bebida'
      ? <DrinkLoader /> : <FoodLoader />;
  }

  function renderDetails() {
    return (
      <section className="detail-page">
        <img
          data-testid="recipe-photo"
          src={ thumb }
          alt={ title }
          className="detail-img"
        />
        <div className={ selectDetailClass(strMeal) }>
          <div className="detail-header-info">
            <h2 data-testid="recipe-title">{ title }</h2>
            <RecipeDetailsCategory
              strAlcoholic={ strAlcoholic }
              strCategory={ strCategory }
            />
          </div>
          <div className="detail-header-btn">
            <ShareButton link={ window.location.href } />
            <FavoriteButton recipeData={ recipeData } type={ recipeType } />
          </div>
        </div>
        <div className="detail-infos">
          <h3>Ingredientes</h3>
          <ul className="detail-ingredients">
            {
              listIngredients(recipeData).map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { `${ingredient}` }
                </li>
              ))
            }
          </ul>
          <h3>Instruções</h3>
          <p
            data-testid="instructions"
            className="detail-description"
          >
            {strInstructions}
          </p>
        </div>
        <RecipeDetailsIframe recipeType={ recipeType } strYoutube={ strYoutube } />
        <Recommendations recommendations={ recomendedRecipe.slice(0, MAX_RESULTS) } />
        <VerifyStart id={ id } />
      </section>
    );
  }

  return (
    loading
      ? loader() : <div>{ recipeData && renderDetails() }</div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape(PropTypes.any).isRequired,
};

export default RecipeDetails;
