export default function clearAndSetLsTests() {
  const mealsToken = 1;
  const cocktailsToken = 1;
  const user = { email: 'teste@teste.com' };
  const doneRecipes = [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  const favoriteRecipes = [];
  const inProgressRecipes = { cocktails: {}, meals: {} };
  localStorage.clear();
  localStorage.setItem('mealsToken', JSON.stringify(mealsToken));
  localStorage.setItem('cocktailsToken', JSON.stringify(cocktailsToken));
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  localStorage.setItem('user', JSON.stringify(user));
}
