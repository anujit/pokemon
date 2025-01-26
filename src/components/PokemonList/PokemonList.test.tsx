import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonList } from './PokemonList';
import { MemoryRouter } from 'react-router-dom';
import { useGetPokemons } from '../../hooks/useGetPokemons';

jest.mock('../../hooks/useGetPokemons');

const mockPokemons = [
  {
    id: 1,
    name: 'Bulbasaur',
    number: '001',
    types: ['Grass', 'Poison'],
    image: 'bulbasaur.png',
  },
  {
    id: 2,
    name: 'Charmander',
    number: '004',
    types: ['Fire'],
    image: 'charmander.png',
  },
];

describe('PokemonList', () => {
  beforeEach(() => {
    (useGetPokemons as jest.Mock).mockReturnValue({
      pokemons: mockPokemons,
      loading: false,
    });
  });

  test('renders PokemonList component', async () => {
    render(
      <MemoryRouter>
        <PokemonList />
      </MemoryRouter>
    );
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  test('filters pokemons based on search term', () => {
    render(
      <MemoryRouter>
        <PokemonList />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Bulbasaur' } });
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
  });

  test('shows all pokemons when search term is cleared', () => {
    render(
      <MemoryRouter>
        <PokemonList />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Bulbasaur' } });
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
});
