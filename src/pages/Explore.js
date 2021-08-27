import React from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

const Explore = () => (
  <>
    <Header title="Explorar" />
    <div className="explore-div">
      <Link to="/explorar/comidas">
        <button
          type="button"
          data-testid="explore-food"
          className="explore-btn"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          type="button"
          data-testid="explore-drinks"
          className="explore-btn"
        >
          Explorar Bebidas
        </button>
      </Link>
    </div>
    <FooterMenu />
  </>
);

export default Explore;
