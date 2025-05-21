import React, { useState } from 'react';
import './dashboard.css';

function Dashboard({ username }) {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <p>This is your dashboard. Here you can manage your student data and view reports.</p>;
      case 'Course':
        return <p>Course management content goes here.</p>;
      default:
        return null;
    }
  };

  return (
     <div className="dashboard-container">
       <div class="sidebar-header flex items-center gap-1 px-5 ">
    <span class="font-extrabold text-lg">
     Student Management
    </span>
    <button aria-label="Toggle menu" class="ml-auto text-gray-300 lg:hidden focus:outline-none">
     <i class="fas fa-bars">
     </i>
    </button>
   </div>
   
      <nav className="dashboard-nav">
        <ul>
          {['Dashboard', 'Course'].map((tab) => (
            <li
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
              style={{ cursor: 'pointer', display: 'inline', marginRight: '15px', fontWeight: activeTab === tab ? 'bold' : 'normal' }}
            >
              {tab}
            </li>
          ))}
        </ul>
      </nav>
      <h1>Welcome, {username}!</h1>
      {renderContent()}
    </div>
  );
}

export default Dashboard;
