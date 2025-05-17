import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage["authToken"];

    const isTokenValid = (token) => {
        if(!token) return false;

        try {
            const payload = JSON.parse(atob(token.split(".")[1])); // decode
            return payload.exp * 1000 > Date.now();
        }
        catch {
            return false;
        }
    }
  return isTokenValid(token) ? <Outlet /> : <Navigate to="/" replace/>
}

export default ProtectedRoute