import React, { useState } from 'react';
import Navigation from '../Navigation';

function Dashboard({ username }) {
  const [activeTab, setActiveTab] = useState('Students');

  const renderContent = () => {
    switch (activeTab) {
      case 'Students':
        return <p>This is your dashboard. Here you can manage your student data and view reports.</p>;
      case 'Courses':
        return <p>Course management content goes here.</p>;
      default:
        return null;
    }
  };

  return (
    <div className='container' style={{ height: '100vh', width: '100%'}}>
      <Navigation setActiveTab={setActiveTab}/>
      {renderContent()}
    </div>
  )
}

export default Dashboard;
