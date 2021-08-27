import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import LSProvider from '../../context/LSProvider';
import MainProvider from '../../context/MainProvider';
import Routes from '../../routes/Routes';

export default function renderWithRouterAndBothContext(route = '/') {
  let testLocation;
  return {
    ...render(
      <LSProvider>
        <MainProvider>
          <MemoryRouter initialEntries={ [route] }>
            <Routes />
            <Route
              path="*"
              render={ ({ location }) => {
                testLocation = location;
                return null;
              } }
            />
          </MemoryRouter>
        </MainProvider>
      </LSProvider>,
    ),
    pathname: () => testLocation.pathname,
  };
}
