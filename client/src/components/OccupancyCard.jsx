const OccupancyCard = ({
  title,
  value,
}) => {

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold mb-3">
        {title}
      </h2>

      <p className="text-4xl font-bold text-blue-600">
        {value}
      </p>

    </div>
  );
};

export default OccupancyCard;