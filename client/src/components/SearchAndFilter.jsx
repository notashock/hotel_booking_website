const SearchAndFilter = ({
  filters,
  setFilters,
}) => {

  const handleChange = (e) => {

    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">

      <h2 className="text-2xl font-bold mb-5">
        Search & Filters
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          name="location"
          placeholder="Search Location"
          value={filters.location}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="amenities"
          placeholder="Amenities"
          value={filters.amenities}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="date"
          name="checkInDate"
          value={filters.checkInDate}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="date"
          name="checkOutDate"
          value={filters.checkOutDate}
          onChange={handleChange}
          className="border p-3 rounded"
        />

      </div>

    </div>
  );
};

export default SearchAndFilter;