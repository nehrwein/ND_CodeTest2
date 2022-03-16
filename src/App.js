import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LegoProvider from './context/LegoContext'
import Overview from './pages/Overview'
import Sets from './pages/Sets'
import Details from './pages/Details';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <LegoProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/sets/:themeNum" element={<Sets />} />
          <Route path="/set/:setNum" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </LegoProvider>
  );
}

export default App;
