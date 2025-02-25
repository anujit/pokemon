import React from 'react';
import { createUseStyles } from 'react-jss';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LayoutProvider } from '../contexts';
import { Nav } from '../components';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import { ListPage, Home } from '../screens';
import { PokemonDetails } from '../components/PokemonDetails';

function App() {
  const classes = useStyles();

  const location = useLocation();
  const state = location.state;

  return (
    <ApolloProvider client={client}>
      <LayoutProvider>
        <div className={classes.root}>
          <Nav />
          <div className={classes.content}>
            <div className={classes.scrollableArea}>
              <Routes location={state?.backgroundLocation || location}>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon" element={<ListPage />} />
              </Routes>
            </div>
          </div>
          {state?.backgroundLocation && (
            <Routes>
              <Route path="/pokemon/:id" element={<PokemonDetails />} />
            </Routes>
          )}
        </div>
      </LayoutProvider>
    </ApolloProvider>
  );
}

const useStyles = createUseStyles(
  {
    root: {
      background: '#171E2b',
      minHeight: '100vh',
      minWidth: '100vw',
      height: '100%',
      width: '100%',
      display: 'flex',
    },
    content: {
      flex: '1',
      overflow: 'hidden',
      position: 'relative',
    },
    scrollableArea: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto',
    },
  },
  { name: 'App' }
);

export default App;
