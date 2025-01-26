import { createUseStyles } from 'react-jss';

export const Search = ({ onType }: any) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        onChange={(e) => {
          onType(e.target.value);
        }}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      marginBottom: '1rem',
    },
    input: {
      background: '#454a55',
      border: 'none',
      fontSize: '1rem',
      padding: '1rem',
      width: '60%',
    },
  },
  {
    name: 'Search',
  }
);
