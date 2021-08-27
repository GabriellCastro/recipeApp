import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';
import MainProvider from './context/MainProvider';
import LSProvider from './context/LSProvider';

function App() {
  return (
    <BrowserRouter>
      <LSProvider>
        <MainProvider>
          <Routes />
        </MainProvider>
      </LSProvider>
    </BrowserRouter>
  );
}

export default App;
