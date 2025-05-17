

import React, { useState } from 'react';
import { doApiMethod } from '../services/apiservice';
import { useDataContext } from './DataProvider';
import { Search, User } from 'lucide-react';


const Patient_admission = ({ setPatientData,id,setId }) => {
  
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { setDataFor4 } = useDataContext();



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      setErrorMessage("אנא הזן מספר זהות.");
      return;
    }

    try {
      
      // שליחת בקשה לשרת לפי מספר זהות
      const response = await doApiMethod(`/api/patients/${id}`,'GET')
      console.log("response ::;",response);


      if (response.status === 200 && response.data) {

        const patient = response.data; // פרטי המטופל שהתקבלו
        setName(patient.name);
        setDob(patient.dob);
        
        setSuccessMessage(`מטופל נמצא: ${patient.name}, נולד ב-${patient.dob} ת.ז${id}`);
        // setValue(name);
      
        setDataFor4(patient);
        setPatientData(patient); // עדכון הסטייט בקומפוננטת האב
      } else {
        setErrorMessage("מטופל לא נמצא במערכת.");
      }
    } catch (error) {
      console.log(error);
      console.error("Error fetching patient details:", error);
      alert(error.response.data?.error?.message ?? "שגיאה בחיבור לשרת.");
      // setErrorMessage(error.response.data?.error?.message ?? "שגיאה בחיבור לשרת.");
    }
  };

  return (

<div className="p-4 md:p-6 lg:p-8"> {/* הוספת ריפוד רספונסיבי */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 w-full md:w-[600px] lg:w-[850px] mx-auto"> {/* רוחב רספונסיבי */}
        <form className="" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6"> {/* שינוי לפלקס רספונסיבי */}
            <input
              type="text"
              placeholder="הכנס מספר זהות מטופל"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {successMessage && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold">{name}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600"> {/* גריד רספונסיבי */}
                <p>ת.ז: {id}</p>
                <p>תאריך לידה: {dob}</p>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">שגיאה!</strong>
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
        </form>
      </div>
    </div>




     
            )
};

export default Patient_admission;