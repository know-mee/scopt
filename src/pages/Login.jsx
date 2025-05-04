import React from 'react'
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="bg-zinc-900 text-white rounded-lg shadow-lg p-8 w-100 h-110">
      <h1 className="text-6xl font-extrabold text-center p-5 font-serif">SCOPT</h1>
      <p className="text-lg text-center text-gray-300 mt-1 mb-6">
        Sales & Customers Operation Performance Tool
      </p>
      <div className="mb-4 flex items-center gap-2">
      <label className=" text-sm text-white "><FaEnvelope className="text-xl" /></label>
        <input type="email" className="w-full bg-transparent border-b border-gray-400 outline-none py-1 text-lg"placeholder="Email"/>
      </div>
      <div className="mb-4 flex items-center gap-2">
      <label className=" text-sm text-white "><FaLock className="text-xl"/></label>
        <input type="email" className="w-full bg-transparent border-b border-gray-400 outline-none py-1 text-lg"placeholder="Password"/>
      </div>
    <div className="text-center">
      <Link to="/dashboard">
        <button className="border border-gray-300 mt-7 px-4 py-2 rounded hover:bg-white hover:text-black transition text-lg">Sign In</button></Link>
      </div>
    </div>
  </div>
  )
}

export default Login
