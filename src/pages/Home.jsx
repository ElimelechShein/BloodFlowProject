
import React  from 'react'
import { FilePlus, ClipboardList } from 'lucide-react';
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
<div className='container p-10'>

<div className=" classHome w-100%   text-center h-70 p-3 styled-frame">
    <h1 className=" me-3 text-primary text-muted fs-3">ברוכים הבאים למערכת בדיקות הדם</h1>
   </div>

    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full ">
        <button
          onClick={() => navigate("/Galery")}
          className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group styled-frame "
        >
          <div className="bg-emerald-100 p-4 rounded-full mb-4 group-hover:bg-emerald-200 transition-colors">
            <FilePlus className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">New Order</h3>
          <p className="text-gray-600 text-center">
            Create a new laboratory test order for a patient
          </p>
        </button>

        <button
          onClick={() => navigate("/OrderLookup")}
          className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group styled-frame "
        >
          <div className="bg-blue-100 p-4 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
            <ClipboardList className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Existing Orders</h3>
          <p className="text-gray-600 text-center">
            View and manage existing laboratory test orders
          </p>
        </button>
      </div>
    </div>

</div>
    </div>
  )
}

export default Home
