import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doApiMethod } from "../services/apiservice";

const OrderLookup = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLookup = async (e) => {
    e.preventDefault();
    setError(""); // איפוס שגיאות


    
    try {

      navigate("/summary", { state: { orderNumber } });

    } catch (err) {
      setError(`אירעה שגיאה בתקשורת עם השרת.`,err);
    }
  };

  return (

    <div className="container-fluid">
        
         <div className="container">


<div className="Auth-form-container  ">
      <form className=" Auth-form styled-frame" onSubmit={handleLookup}>
        <div className="Auth-form-content">

          <h3 className="Auth-form-title">חיפוש הזמנה</h3>
          <div className="form-group mt-3">
          <label htmlFor="orderNumber" className="form-label">
            מספר הזמנה
          </label>
          <input
            type="text"
            id="orderNumber"
            className="form-control"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
          />
          </div>

          <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
          חפש הזמנה
        </button>
        </div>
        </div>
      </form></div>
      <div className="diverror">   
      {error && <p className="text-danger mt-3 fs-6">{error}</p>} </div>
    


</div>
</div>




    
  );
};

export default OrderLookup;
