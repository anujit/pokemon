import { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';

type SearchProps = {
  onType: (text: string) => void;
};

export const Search = ({ onType }: SearchProps) => {
  const styles = useStyles();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className={styles.root}>
      <input
        ref={ref}
        className={styles.input}
        onChange={(e) => {
          onType(e.target.value);
        }}
        type="text"
        placeholder="Search a Pokemon..."
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
      '&:focus': {
        outline: 'none',
      },
    },
  },
  {
    name: 'Search',
  }
);
