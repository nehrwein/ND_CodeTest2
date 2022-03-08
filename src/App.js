import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LegoProvider from './context/LegoContext'
import Overview from './pages/Overview'
import Details from './pages/Details';
import './App.css'

const App = () => {
  return (
    <LegoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/sets/:setNum" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </LegoProvider>
  );
}

export default App;
