import { createUseStyles } from 'react-jss';

type PokemonParamsProps = {
  title: string;
  values: string[];
  separator?: string;
};

export const Params = ({
  title,
  values,
  separator = ', ',
}: PokemonParamsProps) => {
  const classes = useStyles();
  return (
    <div>
      <h2 className={classes.title}>{title.toUpperCase()}</h2>
      <p
        style={{
          display: 'flex',
        }}
      >
        <span>{values.join(separator)}</span>
      </p>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    title: {
      opacity: 0.8,
      fontSize: '18px',
      margin: '8px 0',
    },
  },
  {
    name: 'pokemon-params',
  }
);
