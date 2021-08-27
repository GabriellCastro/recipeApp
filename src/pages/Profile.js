import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import LSContext from '../context/LSContext';

const Profile = () => {
  const { LSValues: { user: { email } } } = useContext(LSContext);
  const { LSFunctions: {
    setEmail,
    setDoneRecipes,
    setFavoriteRecipes,
    setInProgressRecipes } } = useContext(LSContext);

  const userEmail = typeof (email) === 'string' ? email : '';

  function resetContext() {
    localStorage.clear();
    setEmail('');
    setDoneRecipes([]);
    setFavoriteRecipes([]);
    setInProgressRecipes({ cocktails: {}, meals: {} });
  }

  return (
    <>
      <Header title="Perfil" />
      <section className="div-profile">
        <h3 data-testid="profile-email" className="profile-email">{ userEmail }</h3>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
            className="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            data-testid="profile-logout-btn"
            type="button"
            onClick={ () => resetContext() }
            className="profile-logout-btn"
          >
            Sair
          </button>
        </Link>
      </section>
      <FooterMenu />
    </>
  );
};

export default Profile;
