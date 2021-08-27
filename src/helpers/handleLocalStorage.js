// Seta as chaves pedidas no LS ao fazer Login
export function saveTokensAndEmail(email, updateLSContext) {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
  localStorage.setItem('user', JSON.stringify({ email }));
  updateLSContext(email);
}

export function saveInProgressFoodRecipes(id, usedIngredients, updateLSContext) {
  let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgressRecipes) {
    inProgressRecipes = {
      cocktails: {},
      meals: {
        [id]: usedIngredients,
      },
    };
  } else {
    inProgressRecipes.meals = {
      ...inProgressRecipes.meals,
      [id]: usedIngredients,
    };
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  updateLSContext(inProgressRecipes);
}

export function saveInProgressDrinkRecipes(id, usedIngredients, updateLSContext) {
  let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgressRecipes) {
    inProgressRecipes = {
      meals: {},
      cocktails: {
        [id]: usedIngredients,
      },
    };
  } else {
    inProgressRecipes.cocktails = {
      ...inProgressRecipes.cocktails,
      [id]: usedIngredients,
    };
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  updateLSContext(inProgressRecipes);
}

export function saveFavorites(recipe, updateLSContext) {
  let getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (getFavorites.some(
    (favorite) => favorite.id === recipe.id,
  )) {
    getFavorites = getFavorites.filter(
      (favorite) => favorite.id !== recipe.id,
    );
  } else {
    getFavorites.push(recipe);
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(getFavorites));
  updateLSContext(getFavorites);
}

export function saveDoneRecipes(recipe, updateLSContext) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  doneRecipes.push(recipe);
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  updateLSContext(doneRecipes);
}
