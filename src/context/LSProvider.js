import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LSContext from './LSContext';

function LSProvider({ children }) {
  const [email, setEmail] = useState({ email: '' });
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [
    inProgressRecipes,
    setInProgressRecipes,
  ] = useState({ cocktails: {}, meals: {} });

  const getLSItem = (item) => JSON.parse(localStorage.getItem(item));

  useEffect(() => {
    const userLS = getLSItem('user') || { email: '' };
    const emailLS = userLS.email;
    const doneRecipesLS = getLSItem('doneRecipes') || [];
    const favoriteRecipesLS = getLSItem('favoriteRecipes') || [];
    const inProgressRecipesLS = getLSItem('inProgressRecipes')
      || { cocktails: {}, meals: {} };
    setEmail(emailLS);
    setDoneRecipes(doneRecipesLS);
    setFavoriteRecipes(favoriteRecipesLS);
    setInProgressRecipes(inProgressRecipesLS);
  }, []);

  const contextValue = {
    LSValues: {
      mealsToken: 1,
      cocktailsToken: 1,
      user: { email },
      doneRecipes,
      favoriteRecipes,
      inProgressRecipes,
    },
    LSFunctions: {
      setEmail,
      setDoneRecipes,
      setFavoriteRecipes,
      setInProgressRecipes,
    },
  };

  return (
    <LSContext.Provider value={ contextValue }>
      {children}
    </LSContext.Provider>
  );
}

LSProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default LSProvider;
