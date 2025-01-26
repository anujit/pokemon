import { createUseStyles } from 'react-jss';

export const Params = ({ title, values, separator = ', ' }: any) => {
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
    },
  },
  {
    name: 'pokemon-params',
  }
);
