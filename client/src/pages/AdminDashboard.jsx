import AddHotelForm
from "../components/AddHotelForm";
const AdminDashboard = () => {

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-3">
            Manage Hotels
          </h2>

          <p>
            Add and manage hotels
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-3">
            Manage Rooms
          </h2>

          <p>
            Add and manage rooms
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-3">
            Promotions
          </h2>

          <p>
            Manage discount offers
          </p>

        </div>

      </div>
      <AddHotelForm />
    </div>
  );
};

export default AdminDashboard;