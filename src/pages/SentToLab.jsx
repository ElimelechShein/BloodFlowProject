import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doApiMethod } from "../services/apiservice"; // וודא שהנתיב נכון

const SentToLab = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const AllData = location.state[0] || {}; // גישה לאובייקט הראשון במערך
    console.log("data AllData sentoLab:", AllData);
    const tests = AllData.data.tests || [];
    const nationalId = AllData.id;
    console.log("nationalId ::", nationalId);
    const [patientDetails, setPatientDetails] = useState(null);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            if (nationalId) {
                try {
                    const response = await doApiMethod(`/api/patients/${nationalId}`, 'GET');
                    if (response.status === 200 && response.data) {
                        console.log("response The patients :", response);
                        setPatientDetails(response.data);
                    } else {
                        console.error("Failed to fetch patient details:", response);
                        setPatientDetails({ name: "לא זמין", id: "לא זמין", dob: "לא זמין" });
                    }
                } catch (error) {
                    console.error("Error fetching patient details:", error);
                    setPatientDetails({ name: "לא זמין", id: "לא זמין", dob: "לא זמין" });
                }
            }
        };

        fetchPatientDetails();
    }, [nationalId]);

    return (
        <div className="container-fluid">
            <div className="container p-5 shadow-lg w-50">
                <h1 className="text-success mb-4 text-center fs-2">הנתונים נשלחו בהצלחה למעבדה</h1>

                {tests.length > 0 ? (
                    <div className=" mb-4 text-center">
                        <h3 className="text-primary">מספר הזמנה: {tests[0].orderNumber}</h3>
                    </div>
                ) : (
                    <p className="text-danger">מספר ההזמנה אינו זמין.</p>
                )}

                    <div className="data-container mt-4  mw-1000 ">
                      <h4 className="text-info mb-3">פרטי מטופל:</h4>
                            <div className="card-body styled-frame mw-1000">
                                <p><strong>שם:</strong> {patientDetails?.name || "לא זמין"}</p>
                                <p><strong>תעודת זהות:</strong> {patientDetails?.nationalId || "לא זמין"}</p>
                                <p><strong>תאריך לידה:</strong> {patientDetails?.dob || "לא זמין"}</p>
                            </div>
                    </div>
                {tests.length > 0 ? (
                    <div className="data-container mt-4 ">
                        <h4 className="text-info mb-3">פרטי דגימות:</h4>
                        <ul className="list-group shadow-sm rounded styled-frame">
                            {tests.map((test, index) => (
                                <li key={index} className="list-group-item">
                                    <strong>צבע מבחנה:</strong> {test.name || "לא זמין"} <br />
                                    <strong>בדיקות:</strong> {test.attributes && test.attributes.length > 0 ? test.attributes.join(", ") : "לא זמין"} <br />
                                    <strong>ברקוד:</strong> {test.tubeId || "לא זמין"}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-danger mt-3">שגיאה: לא התקבלו דגימות.</p>
                )}

                <div className="text-center mt-5">
                    <button className="btn btn-primary btn-lg rounded-pill shadow" onClick={() => navigate("/Home")}>
                        חזרה לדף הבית
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SentToLab;