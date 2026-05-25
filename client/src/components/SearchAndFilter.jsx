const SearchAndFilter = ({
  search,
  setSearch
}) => {

  return (

    <div className="mb-6">

      <input
        type="text"
        placeholder="Search by Location"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border p-3 rounded w-full"
      />

    </div>
  );
};

export default SearchAndFilter;