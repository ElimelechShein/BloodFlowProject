import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { doApiMethod } from "../services/apiservice";
import { useLocation, useNavigate } from "react-router-dom";


const SummaryPage = () => {
  const [AllData, setOrderData] = useState(null);
  const [localBarcodes, setLocalBarcodes] = useState({});
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState("");
  const [currentBarcodeInput, setCurrentBarcodeInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); 
  const { orderNumber } = location.state || {}; 
console.log("orderNumber :",orderNumber)



const handleKeyDown = (event, id) => {

  if (event.key === 'Control' || event.key === 'Shift' || event.key === 'Alt') {
    return;
  }
  setCurrentBarcodeInput((prevInput) => prevInput + event.key);
  if (event.key === 'Enter') {
    const barcode = currentBarcodeInput.slice(0, -1);
    handleBarcodeChange(id, barcode);
    setCurrentBarcodeInput(""); 
  }
};

  console.log("updatedTest11s@ :", AllData)
  const handleScan = (tubeId) => {
    setLocalBarcodes((prev) => ({
      ...prev,
      [currentColor]: tubeId,
    }));
    
    setIsCameraOpen(false);
    playBeep();
  };

  const playBeep = () => {
   
    const beep = new Audio('/sounds/beep-07a.mp3'); 
  
    beep.play();
  };

  const handleOpenCamera = (id) => {
    setCurrentColor(id);
    setIsCameraOpen(true);
  };

  const startScannerInput = (id) => {
 
    const inputElement = document.getElementById(`barcodeInput-${id}`);
    if (inputElement) {
      inputElement.focus();
    }
  };

  const handleBarcodeChange = (id, value) => {
    setLocalBarcodes((prev) => ({
      ...prev,
      [id]: value,
    }));
   
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await doApiMethod(`/api/orders/${orderNumber}`, "GET");
        console.log("response: ",response)
        setOrderData(response.data);

        
      } catch (error) {
        console.error(error);
   
      }

    };

    fetchOrderData();
  }, []);


  const handleSubmit = async () => {
    if (!AllData) return;

    const updatedTests = AllData.tests.map((test) => ({
      ...test,
      tubeId: localBarcodes[test.id] || null,
    }));
    
    console.log("updatedTests : ",updatedTests) ;
    const updatedOrder = {
      ...AllData.orderNumber,
      tests: AllData.tests.map((test) => ({
        ...test,
        tubeId: localBarcodes[test.id] || null,
      })),
    };

   
      const testsData = updatedTests
      const AllDataEntupdatedOrder = [{ id: AllData.nationalId , data: updatedOrder }];
      console.log("AllData.nationalId :",AllData.nationalId)
      console.log("AllDataEntupdatedOrder ::",AllDataEntupdatedOrder)
   try {
  
      for (const test of testsData) {
          try {
              const response = await doApiMethod(`/api/tests/${test.id}/${test.tubeId}`, "PATCH");

              console.log(`Barcode updated for test ID ${test.id}:`, response.data);
          } catch (error) {
              console.error(`Failed to update barcode for test ID ${test.id}:`, error);
          }
      }
      
      navigate("/SentToLab", { state:  AllDataEntupdatedOrder  });

    } catch (error) {
      alert(error)
    }
  
  };

  if (!AllData) return (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner w-16 h-16 border-8"></div>
    </div>
  );
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="containerGulery">
          <div className="d-flex justify-content-center p-5">
            <div className="styled-frame p-5 text-center">
              <h1 className="fw-bold">Order Details</h1>
              {AllData && AllData.orderNumber  ? (
                <>
                  <p>
                    <strong>ID:</strong> {AllData.nationalId}                
                  </p>
                  <p>
                    <strong>Order Number:</strong>{" "}
                    {AllData.orderNumber}
                  </p>
                </>
              ) : (
                <div className="styled-frame">
                  <p>Loading patient details...</p>
                </div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center p-5">
            <div className="WindowGalery">
              {AllData.tests.map((test) => (
                <div
                  key={test.id}
                  className="mb-4 p-3 min-w-[300px]"
                  style={{
                    border: `3px solid ${test.name}`,
                    borderRadius: "10px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: test.name,
                        marginRight: "10px",
                      }}
                    ></div>
                    <h3 className="Assistant fs-3 p-3">{test.name} Test { }</h3>
                  </div>
                  <ul>
                    {test.attributes.map((attribute, index) => (
                      <li key={index}>{attribute}</li>
                    ))}
                  </ul>
                  <div className="d-flex align-items-center mt-3">
    
     
                  {test.tubeId ? (
                    <div className=" mb-4 text-center">

                        <h3 className="text-primary"> ברקוד: {test.tubeId}</h3>
                    </div>
                 ) : ( 

                  
<>
 

                <input
                  type="text"
                  id={`barcodeInput-${test.id}`} 
                  placeholder="הכנס ברקוד"
                  className="form-control mt-2"
                  style={{ width: "150px" }}
                  value={localBarcodes[test.id] || ""}
                  onChange={(e) => handleBarcodeChange(test.id, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, test.id)} 
                />

              
                  <button
                      className="btn btn-outline-secondary mt-2 ms-2"
                      onClick={() => handleOpenCamera(test.id)}
                      title="סריקה דרך מצלמת המחשב"
                    >
                     <img src="/imges/CameraBarcode.png" alt="סורק ברקוד"  style={{ width: "40px" }} />
                    </button>

                  <button
                      className="btn btn-outline-secondary mt-2 ms-2"
                      onClick={() => startScannerInput(test.id)}
                      title="סריקה דרך סורק USB"
                    >
                     <img src="/imges/ScreenBarcode.png" alt="סורק ברקוד"  style={{ width: "40px" }} />
                    </button>

                  </>

                 )} 

                  </div>
                  {localBarcodes[test._id] && (
                    <p className="text-success mt-2">
                      Barcode: {localBarcodes[test.id]}
                    </p>
                  )}
                </div>
              ))}
              {isCameraOpen && (
                <div className="scanner-overlay">
                  <div className="scanner-animation">
                    <BarcodeScannerComponent
                      width={300}
                      height={200}
                      onUpdate={(err, result) => {
                        if (result) handleScan(result.text);
                      }}
                    />
                    <div className="red-line"></div>
                  </div>
                  <button
                    className="btn btn-danger mt-2 close-scanner"
                    onClick={() => setIsCameraOpen(false)}
                  >
                    Close Scanner
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="text-center p-4">
            <button className="btn btn-primary mt-4" onClick={handleSubmit}>
              Submit Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;