const Filter = ({ handleNewSearch, newSearch }) => {
  return (
    <div className="">
      search:
      <input type="text" onChange={handleNewSearch} value={newSearch} />
    </div>
  );
};

export default Filter;
