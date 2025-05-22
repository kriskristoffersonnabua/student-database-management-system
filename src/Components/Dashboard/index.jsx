import React, { useState } from 'react';
import Navigation from '../Navigation';
import StudentsList from '../StudentsList';
import Form from '../StudentForm';
import CourseForm from '../CourseForm';


function Dashboard({ username }) {
  const [activeTab, setActiveTab, setInputs] = useState('Students');

  const renderContent = () => {
    switch (activeTab) {
      case 'Students':
        return (<div>
          <p className="mb-8 mt-4">This is your dashboard. Here you can manage your student data and view reports.</p>
          <StudentsList /><Form />
        </div>)
      case 'Courses':
        return (<div>
          <p>Course management content goes here.</p>
         < CourseForm /></div>
        )
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
