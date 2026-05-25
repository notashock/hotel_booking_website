import {
  useEffect,
  useState,
} from "react";

import {
  getReceptionists,
  createReceptionist,
  deleteReceptionist,
} from "../services/userService";

const ManageReceptionists = () => {

  const [users, setUsers] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      const data =
        await getReceptionists();

      setUsers(data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createReceptionist({
        ...formData,
        role: "RECEPTIONIST",
      });

      alert(
        "Receptionist Created"
      );

      fetchUsers();

    } catch (error) {

      console.log(error);
    }
  };

  const handleDelete =
    async (id) => {

      try {

        await deleteReceptionist(id);

        fetchUsers();

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Manage Receptionists
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg mb-8"
      >

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-3 rounded w-full mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-3 rounded w-full mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-3 rounded w-full mb-4"
        />

        <button
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          Create Receptionist
        </button>

      </form>

      <div className="space-y-4">

        {
          users.map((user) => (

            <div
              key={user.id}
              className="bg-white p-5 rounded-xl shadow flex justify-between"
            >

              <div>

                <h2 className="text-2xl font-bold">
                  {user.name}
                </h2>

                <p>{user.email}</p>

              </div>

              <button
                onClick={() =>
                  handleDelete(user.id)
                }
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default ManageReceptionists;