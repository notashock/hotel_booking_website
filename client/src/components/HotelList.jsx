import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
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

<p className="flex items-center gap-1 text-gray-600">
  <MdLocationOn className="text-red-500 text-xl" />
  {hotel.location}
</p>

  <p className="text-gray-600 mb-4">
    {hotel.facilities}
  </p>

  <Link
    to={`/hotels/${hotel.id}`}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    View Details
  </Link>

</div>
        ))
      }

    </div>
  );
};

export default HotelList;