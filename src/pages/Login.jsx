
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "./DataProvider";
import {  LogIn } from "lucide-react";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const {setDataFor2} = useDataContext();
  
  const onSubmit = async (e) => {
    e.preventDefault(); 


      // const response = await doApiMethod("/api/users/login",  "POST",{
    try {
      const response = await axios.post("http://localhost:3007/api/users/login", {
          email,
        password,
      });

     
      if (response.data.token) {
        const { token ,user} = response.data;
        localStorage.setItem("authToken", JSON.stringify(token));
        setDataFor2(user?.name);
        navigate("/Home");
      } else {
        alert("שם משתמש או סיסמה שגויים");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("שגיאה בחיבור לשרת");
    }
  };

  return (
  
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 ">
<div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md styled-frame">
  <div className="flex justify-center mb-8">

    <div className="bg-indigo-100 p-3 rounded-full">
      
      <LogIn size={30} color="blue" />

    </div>
  </div>
  <h2 className="text-2xl font-bold text-center text-gray-800 mb-8  ">
    Hospital Lab System Login
  </h2>
  <form onSubmit={onSubmit} className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Email Address
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Password
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
    </div>
    <button
      type="submit"
      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
    >
      Sign In
    </button>
  </form>
</div>
</div>



  );
};

export default Login;
