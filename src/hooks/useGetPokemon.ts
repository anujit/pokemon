import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  id: string;
  name: string;
  number: string;
  image?: string;
  types: string[];
  classification?: string;
  resistant?: string[];
  weaknesses?: string[];
  height?: {
    minimum: string;
    maximum: string;
  };
};

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemon = ({ id, name }: { id: string; name: string }) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON, {
    variables: {
      id,
      name,
    },
  });
  const pokemon: Pokemon = useMemo(() => data?.pokemon || undefined, [data]);

  return {
    pokemonFeatures: pokemon,
  };
};
