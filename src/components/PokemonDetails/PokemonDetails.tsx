import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetPokemon } from '../../hooks/useGetPokemon';

export const PokemonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();

  const { pokemon } = location.state;

  const { pokemonFeatures } = useGetPokemon({
    id: id,
    name: pokemon.name,
  });

  console.log('pokemonFeatures', pokemonFeatures);

  return (
    <Dialog
      onClose={() => {
        navigate(-1);
      }}
      open={true}
    >
      <DialogTitle className={classes.dialogContent}>
        {pokemon.number} {pokemon.name}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {!pokemonFeatures ? (
          <div>Loading...</div>
        ) : (
          <>
            <p>{pokemonFeatures.classification}</p>
            <div>
              <h2>RESISTANT</h2>
              <p>{pokemonFeatures.resistant.join(', ')}</p>
            </div>
            <div>
              <h2>WEAKNESSES</h2>
              <p>{pokemonFeatures.weaknesses.join(', ')}</p>
            </div>
            <div>
              <h2>HEIGHT</h2>
              <p>
                <span>Minimum </span>
                <span>{pokemonFeatures.height.minimum}</span>
                <span> Maximum </span>
                <span>{pokemonFeatures.height.maximum}</span>
              </p>
            </div>
            <div>
              <h2>TYPES</h2>
              <p>{pokemonFeatures.types.join(', ')}</p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const useStyles = createUseStyles(
  {
    dialogContent: {
      background: '#171E2b',
    },
  },
  {
    name: 'pokemon-details',
  }
);
