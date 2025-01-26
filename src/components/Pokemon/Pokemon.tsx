import { createUseStyles } from 'react-jss';
import { Pokemon as PokemonProps } from '../../hooks/useGetPokemons';

export const Pokemon = (props: PokemonProps) => {
  const { id, name, number, types, image } = props;
  const classes = useStyles();
  return (
    <div className={classes.box} key={id}>
      <div className={classes.number}>{number}</div>
      <div className={classes.info}>
        <div className={classes.name}>{name}</div>
        <div className={classes.imageWrapper}>
          <img width="100%" className={classes.image} src={image} alt={name} />
        </div>
      </div>
      <div className={classes.types}>{types.join(', ').trim()}</div>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    box: {
      flex: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: '12px',
      width: '220px',
      height: '330px',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'transform .2s ease-in-out',
      gap: '20px',
      textDecoration: 'none',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0px 2px 0px',
      },
    },
    number: {
      fontSize: '24px',
      fontWeight: 600,
      padding: '5px',
      opacity: 0.5,
      justifySelf: 'start',
      textAlign: 'left',
      textDecoration: 'underline',
    },
    types: {
      opacity: 0.8,
      fontWeight: 200,
      textTransform: 'uppercase',
      fontSize: '12px',
    },
    info: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '5px',
      overflow: 'hidden',
      flex: 1,
    },
    name: {
      fontSize: '20px',
      padding: '10px 0',
      fontWeight: 900,
      opacity: 0.8,
    },
    imageWrapper: {
      borderRadius: '8px',
      overflow: 'hidden',
      width: '100%',
    },
    image: {
      maxHeight: '100%',
      objectFit: 'contain',
    },
  },
  { name: 'Pokemon' }
);
