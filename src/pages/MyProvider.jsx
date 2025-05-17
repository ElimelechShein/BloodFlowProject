// src/context/MyContext.js
import React, { createContext, useState, useEffect } from "react";
import '../stayle/stayle.css'
// יצירת ה-Context
export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  // מצב לשמירת הערך
  const [value, setValue] = useState(() => {
    // בעת טעינת הדף, קרא את הערך מה-localStorage
    return localStorage.getItem("myValue") || "";
  });

  // שמירת הערך ב-localStorage כאשר הוא משתנה
  useEffect(() => {
    localStorage.setItem("myValue", value);
  }, [value]);

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};
