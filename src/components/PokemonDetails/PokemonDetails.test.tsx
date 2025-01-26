import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonDetails } from './PokemonDetails';
import { MemoryRouter } from 'react-router-dom';
import { useGetPokemon } from '../../hooks/useGetPokemon';

jest.mock('../../hooks/useGetPokemon');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

const mockPokemon = {
  id: 1,
  name: 'Bulbasaur',
  number: '001',
  types: ['Grass', 'Poison'],
  height: { minimum: '0.61m', maximum: '0.79m' },
  classification: 'Seed Pokémon',
  weaknesses: ['Fire', 'Flying', 'Ice', 'Psychic'],
  resistant: ['Water', 'Electric', 'Grass', 'Fighting', 'Fairy'],
};

describe('PokemonDetails', () => {
  beforeEach(() => {
    (useGetPokemon as jest.Mock).mockReturnValue({
      pokemonFeatures: mockPokemon,
    });

    (
      jest.requireMock('react-router-dom').useParams as jest.Mock
    ).mockReturnValue({ id: '1' });
    (
      jest.requireMock('react-router-dom').useLocation as jest.Mock
    ).mockReturnValue({
      state: { pokemon: mockPokemon },
    });
  });
  test('renders PokemonDetails component', () => {
    render(
      <MemoryRouter>
        <PokemonDetails />
      </MemoryRouter>
    );

    expect(screen.getByText('BULBASAUR')).toBeInTheDocument();
    expect(screen.getByText('Seed Pokémon')).toBeInTheDocument();
    expect(
      screen.getByText('Minimum 0.61m, Maximum 0.79m')
    ).toBeInTheDocument();
    expect(screen.getByText('Fire, Flying, Ice, Psychic')).toBeInTheDocument();
    expect(
      screen.getByText('Water, Electric, Grass, Fighting, Fairy')
    ).toBeInTheDocument();
  });
});
