export const SearchForm = ({ search, handleChange }) => {
  return (
    <p>
      find countries <input value={search} onChange={(e) => handleChange(e)} />
    </p>
  );
};
