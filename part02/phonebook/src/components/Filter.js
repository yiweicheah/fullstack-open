const Filter = ({ filter, setFilter }) => {
  return (
    <p>
      filter shown with{""}
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </p>
  );
};

export default Filter;
