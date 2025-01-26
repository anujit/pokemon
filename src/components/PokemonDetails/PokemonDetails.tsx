import { Modal } from '@mui/material';
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

  return (
    <Modal
      className={classes.modal}
      onClose={() => {
        navigate(-1);
      }}
      open={true}
    >
      <div className={classes.modalContent}>
        <div className={classes.header}>
          <h2>
            {pokemon.number} {pokemon.name}
          </h2>
          <Link to="/pokemon">Back</Link>
        </div>
        <div>
          {!pokemonFeatures ? (
            <div>Loading...</div>
          ) : (
            <>
              <p>{pokemonFeatures.classification}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2>RESISTANT</h2>
                  <p>{pokemonFeatures.resistant.join(', ')}</p>
                </div>
                <div>
                  <h2>WEAKNESSES</h2>
                  <p>{pokemonFeatures.weaknesses.join(', ')}</p>
                </div>
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
        </div>
      </div>
    </Modal>
  );
};

const useStyles = createUseStyles(
  {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modal: {
      width: '100%',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    modalContent: {
      background: '#171E2b',
      padding: '20px',
      width: '70%',
      borderRadius: '12px',
      minHeight: '400px',
    },
  },
  {
    name: 'pokemon-details',
  }
);
