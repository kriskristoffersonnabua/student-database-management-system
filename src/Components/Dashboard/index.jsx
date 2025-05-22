import { useState } from 'react';
import Navigation from '../Navigation';
import StudentsList from '../StudentsList';
import CourseForm from '../CourseForm';
import CourseList from '../CourseList';


function Dashboard({ username }) {
  const [activeTab, setActiveTab, setInputs] = useState('Students');

  const renderContent = () => {
    switch (activeTab) {
      case 'Students':
        return (<div>
          <p className="mb-8 mt-4">This is your dashboard. Here you can manage your student data and view reports.</p>
          <StudentsList />
        </div>)
      case 'Courses':
        return (<div>
          <p className="mb-8 mt-4">Course management content goes here.</p>
          <CourseList />
        </div>)
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
