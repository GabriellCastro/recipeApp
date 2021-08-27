import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import shareIconB from '../images/black/shareIcon.svg';
import shareIconW from '../images/white/shareIcon.svg';

function ShareButton({ link, index }) {
  const [copy, setCopy] = useState(false);

  function shareLink() {
    setCopy(true);
    return navigator.clipboard.writeText(link);
  }

  const { pathname } = useLocation();
  const shareIcon = pathname.includes('receitas') ? shareIconB : shareIconW;

  return (
    <button
      type="button"
      data-testid="share-btn"
      onClick={ () => shareLink() }
      className="share-btn-btn"
    >
      {copy ? (
        <span
          data-testid="link-copied"
          className={ pathname.includes('receitas')
            ? 'link-black' : 'link-white' }
        >
          Link copiado!
        </span>
      ) : (<img
        src={ shareIcon }
        alt="Compartilhar"
        data-testid={ `${index}-horizontal-share-btn` }
        className="share-btn"
      />)}
    </button>
  );
}

ShareButton.propTypes = {
  link: PropTypes.string.isRequired,
  index: PropTypes.number,
};

ShareButton.defaultProps = {
  index: 0,
};

export default ShareButton;
