export function searchBarFetchMeal(search, type) {
  switch (type) {
  case 'ingredient':
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`)
      .then((result) => result.json())
      .then(({ meals }) => meals);

  case 'name':
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((result) => result.json())
      .then(({ meals }) => meals);

  case 'firstLetter':
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)
      .then((result) => result.json())
      .then(({ meals }) => meals)
      .catch(() => 'Sua busca deve conter somente 1 (um) caracter');

  default:
    break;
  }
}

export function getMealDetail(id) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((result) => result.json())
    .then(({ meals }) => meals);
}

export function getInitialMealsRecipes() {
  return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=pie')
    .then((result) => result.json())
    .then(({ meals }) => meals);
}

export function getMealsCategoryList() {
  return fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((result) => result.json())
    .then(({ meals }) => meals);
}

export function getMealsByCategory(categoryName) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    .then((result) => result.json())
    .then(({ meals }) => meals);
}

export function getMealRecomendations() {
  return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((results) => results.json())
    .then(({ meals }) => meals);
}

export function getRandomMeal() {
  return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((results) => results.json())
    .then(({ meals }) => meals[0].idMeal);
}

export function getMealsIngredients() {
  return fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((results) => results.json())
    .then(({ meals }) => meals);
}

export function getMealsArea() {
  return fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((results) => results.json())
    .then(({ meals }) => meals);
}

export function getMealsByArea(area) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    .then((results) => results.json())
    .then(({ meals }) => meals);
}
