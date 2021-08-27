import React from 'react';
import './DrinkLoader.css';

// Loader retirado de https://codemyui.com/clinking-wine-glasses-loading-animation/

export default function DrinkLoader() {
  return (
    <div className="loader">
      <ul className="drink-loader-ul">
        <li />
        <li />
        <li />
      </ul>
      <div>
        <div className="wineglass left">
          <div className="top" />
        </div>
        <div className="wineglass right">
          <div className="top" />
        </div>
      </div>
    </div>
  );
}
