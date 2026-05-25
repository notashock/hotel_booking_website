const HotelList = ({ hotels }) => {

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {
        hotels.map((hotel) => (

          <div
            key={hotel.id}
            className="bg-white rounded-xl shadow-lg p-5"
          >

            <h2 className="text-2xl font-bold mb-3">
              {hotel.name}
            </h2>

            <p className="mb-2">
              📍 {hotel.location}
            </p>

            <p className="text-gray-600">
              {hotel.facilities}
            </p>

          </div>
        ))
      }

    </div>
  );
};

export default HotelList;