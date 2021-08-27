import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { saveTokensAndEmail } from '../helpers/handleLocalStorage';
import LSContext from '../context/LSContext';
import logo from '../images/logo.svg';

function Login() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const { LSFunctions: { setEmail: setLSEmail } } = useContext(LSContext);

  function validateLogin() {
    const formLogin = document.querySelector('.form-login');
    setIsButtonDisabled(!formLogin.checkValidity());
  }

  return (
    <div className="login-page">
      <img src={ logo } alt="Logo Pesadelo dos Restaurantes" className="login-logo" />
      <form className="form-login" onChange={ validateLogin }>
        <label htmlFor="email-input" className="login-email">
          <input
            type="text"
            data-testid="email-input"
            placeholder="Email"
            id="email-input"
            required
            pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
            onChange={ ({ target: { value } }) => (setEmail(value)) }
          />
        </label>
        <label htmlFor="password-input" className="login-password">
          <input
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            id="password-input"
            required
            pattern=".{7,}"
          />
        </label>
        <Link to="/comidas">
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ isButtonDisabled }
            onClick={ () => saveTokensAndEmail(email, setLSEmail) }
            className="login-btn"
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>

  );
}
export default Login;
