import React, { useState } from 'react';
import Navigation from '../Navigation';
import StudentsList from '../StudentsList';

function Dashboard({ username }) {
  const [activeTab, setActiveTab] = useState('Students');

  const renderContent = () => {
    switch (activeTab) {
      case 'Students':
        return (<div>
          <p className="mb-8 mt-4">This is your dashboard. Here you can manage your student data and view reports.</p>
          <StudentsList />
        </div>)
      case 'Courses':
        return <p>Course management content goes here.</p>;
      default:
        return null;
    }
  };

  return (
    <div className='container' style={{ height: '100vh', width: '100%' }}>
      <Navigation setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  )
}

export default Dashboard;
