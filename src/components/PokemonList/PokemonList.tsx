import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { Pokemon } from '../Pokemon/Pokemon';
import { Link, useLocation } from 'react-router-dom';
import { Search } from '../Search';
import { Pokemon as PokemonType } from '../../hooks/useGetPokemon';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] =
    useState<PokemonType[]>(pokemons);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredPokemons(pokemons);
      return;
    }

    const filtered = pokemons.filter((pkmn) => {
      return (
        pkmn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkmn.number.includes(searchTerm) ||
        pkmn.types.some((t) =>
          t.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });

    setFilteredPokemons(filtered);
  }, [searchTerm, pokemons]);

  const location = useLocation();

  return (
    <div className={classes.root}>
      <Search
        onType={(txt: any) => {
          setSearchTerm(txt);
        }}
      />
      {loading && <div data-testid="loader">Loading...</div>}
      <div className={classes.cards}>
        {filteredPokemons.map((pkmn) => {
          return (
            <Link
              className={classes.link}
              to={`/pokemon/${pkmn.id}`}
              state={{
                backgroundLocation: location,
                pokemon: pkmn,
              }}
              key={pkmn.id}
            >
              <Pokemon {...pkmn} />
            </Link>
          );
        })}
      </div>
      {searchTerm && filteredPokemons.length === 0 && (
        <div>No results found</div>
      )}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      padding: '32px',
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
    },
    cards: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
    },
    link: {
      textDecoration: 'none',
    },
  },
  { name: 'PokemonList' }
);
