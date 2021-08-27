export default function listIngredients(recipeData) {
  const MAX_INGREDIENTS = 20;
  const list = [];
  if (recipeData) {
    for (let index = 1; index <= MAX_INGREDIENTS; index += 1) {
      if (recipeData[`strIngredient${index}`]) {
        list.push(
          `${recipeData[`strIngredient${index}`]} - ${recipeData[`strMeasure${index}`]}`,
        );
      }
    }
  }
  return list;
}
