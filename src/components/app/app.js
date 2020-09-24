import React from 'react';
import './app.scss';
import Products from '../products/products';

const App = () => {
  return (
    <div className="App">
      <h2>Williams-Sonoma Coding Challenge</h2>
      <div className="container">
        <Products />
      </div>
    </div>
  );
}

export default App;
