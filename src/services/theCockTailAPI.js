export function searchBarFetchCockTail(search, type) {
  switch (type) {
  case 'ingredient':
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`)
      .then((result) => result.json())
      .then(({ drinks }) => drinks);

  case 'name':
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
      .then((result) => result.json())
      .then(({ drinks }) => drinks);

  case 'firstLetter':
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`)
      .then((result) => result.json())
      .then(({ drinks }) => drinks)
      .catch(() => 'Sua busca deve conter somente 1 (um) caracter');

  default:
    break;
  }
}

export function getDrinkDetail(id) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((result) => result.json())
    .then(({ drinks }) => drinks);
}

export function getInitialDrinksRecipes() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((result) => result.json())
    .then(({ drinks }) => drinks);
}

export function getDrinksCategoryList() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((result) => result.json())
    .then(({ drinks }) => drinks);
}

export function getDrinksByCategory(categoryName) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    .then((result) => result.json())
    .then(({ drinks }) => drinks);
}

export function getDrinkRecomendations() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((results) => results.json())
    .then(({ drinks }) => drinks);
}

export function getRandomDrink() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((results) => results.json())
    .then(({ drinks }) => drinks[0].idDrink);
}

export function getDrinksIngredients() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((results) => results.json())
    .then(({ drinks }) => drinks);
}
