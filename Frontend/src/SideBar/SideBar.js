import React, { useState } from 'react';
import './SideBar.css';
import Customer_Stats from '../Customer_Mangement/Customer_Stats';
import CustomerManagement from '../Customer_Mangement/Customer_Mangement';
function App() {
  const [activePage, setActivePage] = useState('');

  const renderContent = () => {
    switch (activePage) {
      case 'Customer_Mangement':
        return <CustomerManagement />;
      case 'Customer_Stats':
        return <Customer_Stats/>
    }
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => setActivePage('Customer_Mangement')}>Customer_Mangement</button>
        <button onClick={() => setActivePage('Customer_Stats')}>Customer_Stats</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
