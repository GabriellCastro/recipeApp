import React from 'react';
import './FoodLoader.css';

// Loader retirado de https://codepen.io/inanikolina/pen/PVvryX

export default function FoodLoader() {
  function pizza() {
    const ONE = 1;
    const TWO = 2;
    const TRHEE = 3;
    const FOUR = 4;
    const FIVE = 5;
    const pizzaSlices = [ONE, TWO, TRHEE, FOUR, FIVE];
    return (
      pizzaSlices.map((index) => (
        <div key={ index } className={ `pizza-slice slice-${index}` }>
          <div className="border">
            <div className="crust" />
            <div className="cheese">
              <div className="peperoni p-1" />
              <div className="peperoni p-2" />
              <div className="peperoni p-3" />
              <div className="olive o-1" />
              <div className="olive o-3" />
              <div className="olive o-4" />
              <div className="olive o-6" />
              <div className="olive o-7" />
            </div>
          </div>
        </div>
      ))
    );
  }

  return (
    <div className="pizza-div">
      <div className="box">
        { pizza() }
      </div>
    </div>
  );
}
