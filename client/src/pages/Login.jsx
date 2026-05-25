import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email:"",
    password:"",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

      const response = await API.post(
        "/auth/login",
        formData
      );

      login(
        response.data.token,
        response.data.user
      );

      navigate("/");

    }catch(error){

      console.log(error);

      alert("Invalid Credentials");
    }
  };

  return (

    <div className="flex justify-center items-center min-h-screen">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-[400px]"
      >

        <h1 className="text-3xl font-bold text-center mb-5">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white w-full py-3 rounded">
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;