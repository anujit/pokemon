import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Pagination, PaginationItem } from '@mui/material';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { Pokemon } from '../Pokemon/Pokemon';
import { Link, useLocation } from 'react-router-dom';
import { Search } from '../Search';
import { Pokemon as PokemonType } from '../../hooks/useGetPokemon';
import { usePagination } from '../../hooks/usePagination';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPokemons, setFilteredPokemons] =
    useState<PokemonType[]>(pokemons);

  const { currentData, currentPage, maxPage, jump } = usePagination(
    filteredPokemons,
    10
  );

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
    // jump(1);
  }, [searchTerm, pokemons]);

  useEffect(() => {
    if (maxPage && currentPage > maxPage) {
      jump(maxPage);
    }
  }, [currentPage, maxPage]);

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
        {currentData().map((pkmn) => {
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
      {maxPage ? (
        <Pagination
          renderItem={(item) => {
            return <PaginationItem className={classes.pagination} {...item} />;
          }}
          className={classes.pagination}
          count={maxPage}
          page={currentPage}
          onChange={(_, page) => {
            jump(page);
          }}
        />
      ) : null}
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
      gap: '20px',
      flexDirection: 'column',
      alignItems: 'center',
    },
    cards: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
    },
    link: {
      textDecoration: 'none',
    },
    pagination: {
      '& .Mui-selected': {
        backgroundColor: 'red',
        color: '#19D5C6',
      },
      '& .MuiPaginationItem-page': {
        backgroundColor: 'transparent',
        color: '#ffffffeb',
      },
    },
  },
  { name: 'PokemonList' }
);
