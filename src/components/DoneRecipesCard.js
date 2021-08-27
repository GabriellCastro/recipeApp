import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

function DoneRecipesCard({ recipe, index }) {
  const {
    image,
    area,
    category,
    id,
    name,
    tags,
    alcoholicOrNot,
    type,
    doneDate,
  } = recipe;
  const path = type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}`;
  const categoryOrArea = area ? `${area} - ${category}` : alcoholicOrNot;
  const sliceNumber = -16;
  const SliceLink = (window.location.href).slice(0, sliceNumber);
  const pathLink = SliceLink.concat(path);
  return (
    <section className="recipes-card-box">
      <div>
        <Link to={ path }>
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
            style={ { width: '100px' } }
            className="done-recipes-box-image"
          />
        </Link>
      </div>
      <div
        data-testid={ `${index}-recipe-card` }
        className="done-recipe-card"
      >

        <h5
          data-testid={ `${index}-horizontal-top-text` }
        >
          { categoryOrArea }
        </h5>
        <Link to={ path }>
          <h4
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </h4>
        </Link>

        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          {`Feita em ${doneDate}`}
        </p>
        <div className="done-recipe-div-tag">
          {tags.map((tag) => (
            <span
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
              className="done-recipe-tag"
            >
              { tag }
            </span>
          ))}
        </div>
      </div>
      <div className="done-share">
        <ShareButton link={ pathLink } index={ index } />
      </div>
    </section>

  );
}

export default DoneRecipesCard;

DoneRecipesCard.propTypes = {
  recipe: PropTypes.shape(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
