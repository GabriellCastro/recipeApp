import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import { getRandomDrink } from '../services/theCockTailAPI';
import { getRandomMeal } from '../services/theMealAPI';

const RecipeExplore = () => {
  const { pathname } = useLocation();
  const [randomSurprise, setRandomSurprise] = useState('');
  const explorarComidas = '/explorar/comidas';
  const title = pathname.includes('comidas') ? 'Explorar Comidas' : 'Explorar Bebidas';

  useEffect(() => {
    if (pathname === explorarComidas) {
      getRandomMeal()
        .then((result) => setRandomSurprise(result));
    } else {
      getRandomDrink()
        .then((result) => setRandomSurprise(result));
    }
  }, [pathname]);
  return (
    <>
      <Header title={ title } />
      <div className="explore-div">
        <Link to={ `${pathname}/ingredientes` }>
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className="explore-btn"
          >
            Por Ingredientes
          </button>
        </Link>
        { (pathname === explorarComidas)
          ? (
            <Link to="/explorar/comidas/area">
              <button
                type="button"
                data-testid="explore-by-area"
                className="explore-btn"
              >
                Por Local de Origem
              </button>
            </Link>)
          : null}
        <Link
          to={
            pathname === explorarComidas
              ? `/comidas/${randomSurprise}` : `/bebidas/${randomSurprise}`
          }
        >
          <button
            data-testid="explore-surprise"
            type="button"
            className="explore-btn"
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <FooterMenu />
    </>
  );
};

export default RecipeExplore;
