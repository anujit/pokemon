export const Search = ({ onType }: any) => {
  return (
    <div>
      <input
        onChange={(e) => {
          onType(e.target.value);
        }}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};
