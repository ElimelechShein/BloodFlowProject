
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';


import Home from './pages/Home';
import Login from './pages/Login';
import Galery from './pages/Galery';

import SummaryPage from './pages/SummaryPage';

import SentToLab from './pages/SentToLab';

import OrderLookup from './pages/OrderLookup';
import Header from './pages/Header';
import { DataProvider } from './pages/DataProvider';
// import PatientDetails from './pages/PatientDetails';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
  
      <BrowserRouter>
      <DataProvider>
        <Routes>
          {/* public */}
          <Route path="/" element={<Login />} />

          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Header />} >
            
                <Route path="/Home" element={<Home />} />
                {/* <Route path="/PatientDetails" element={<PatientDetails />}  /> */}
                <Route path="/Summary" element={<SummaryPage />}  />
                <Route path="/SentToLab" element={<SentToLab />} />
               
                <Route path="/Galery" element={<Galery />} />
                <Route path="/OrderLookup" element={<OrderLookup />} />
            </Route>
          </Route>
        </Routes>
        </DataProvider>
      </BrowserRouter>
  
  );
}

export default App;
