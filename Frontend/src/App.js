import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import SideBar from './SideBar/SideBar';
import SideBar from './SideBar/SideBar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SideBar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
