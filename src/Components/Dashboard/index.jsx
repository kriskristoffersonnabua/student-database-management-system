import { useState, useEffect } from 'react';
import Navigation from '../Navigation';
import StudentsList from '../StudentsList';
import CourseList from '../CourseList';
import StudentTable from '../StudentTable';
import CourseTable from '../CourseTable';
import { fetchAllStudents, fetchAllCourses } from '../../database/helper-functions';
import { useSetAtom } from 'jotai';
import { loggedInUserDetails } from '../../helpers/atoms';

function Dashboard({ username }) {
  const [activeTab, setActiveTab] = useState('Home');
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const setLoggedInUser = useSetAtom(loggedInUserDetails);

  useEffect(() => {
    if (activeTab === 'Home') {
      const fetchData = async () => {
        const studentsData = await fetchAllStudents();
        const coursesData = await fetchAllCourses();
        setStudents(studentsData);
        setCourses(coursesData);
        setTotalStudents(studentsData.length);
        setTotalCourses(coursesData.length);
      };
      fetchData();
    }
  }, [activeTab]);

  const formatCourse = (course) => {
    let courseString = '';
    if (course?.degree) courseString += `Bachelor of ${course?.degree} `;
    if (course?.course_name) courseString += `${course?.course_name} `;
    if (course?.major) courseString += `(${course?.major}) `;
    if (course?.minor) courseString += `(${course?.minor}) `;
    return courseString;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        const studentHeaders = ['ID', 'Lastname', 'Firstname', 'Middlename', 'Birthday', 'Year Level', 'Course'];
        const studentRows = students.map((student) => {
          return [[
            student?.id,
            student?.lastname,
            student?.firstname,
            student?.middlename,
            student?.birthday,
            student?.year_level,
            formatCourse(courses.find(c => c.id === student.course))
          ], { ...student }];
        });

        const courseHeaders = ['ID', 'Degree', 'Course Name', 'Major', 'Minor', 'Course Details'];
        const courseRows = courses.map((course) => {
          return [[
            course?.id,
            course?.degree,
            course?.course_name,
            course?.major,
            course?.minor,
            course?.course_details
          ], { ...course }];
        });

        return (
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="title is-3" style={{ marginBottom: '1rem' }}>Dashboard Summary</h2>
              <button
                className="button has-background-primary-dark has-text-white"
                style={{ padding: '0.5rem 1.5rem', borderRadius: '8px', boxShadow: '0 2px 6px rgba(36, 36, 39, 0.1)' }}
                onClick={() => setLoggedInUser(null)}
              >
                LogOut
              </button>
            </div>
            <div style={{ display: 'flex', gap: '3rem' }}>
            <div style={{ backgroundColor: '#EAEFEF', padding: '1.5rem 2rem', borderRadius: '8px', boxShadow: '0 2px 6px rgba(51, 52, 70, 0.1)', minWidth: '180px', textAlign: 'center' }}>
              <p style={{ fontSize: '1.2rem', color: '#333446' }}>Total Students</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#7F8CAA' }}>{totalStudents}</p>
            </div>
            <div style={{ backgroundColor: '#EAEFEF', padding: '1.5rem 2rem', borderRadius: '8px', boxShadow: '0 2px 6px rgba(51, 52, 70, 0.1)', minWidth: '180px', textAlign: 'center' }}>
              <p style={{ fontSize: '1.2rem', color: '#333446' }}>Total Courses</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#7F8CAA' }}>{totalCourses}</p>
            </div>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <h3 className="title is-4">Students</h3>
              <StudentTable headers={studentHeaders} rows={studentRows} showActions={false} />
            </div>
            <div style={{ marginTop: '2rem' }}>
              <h3 className="title is-4">Courses</h3>
              <CourseTable headers={courseHeaders} rows={courseRows} showActions={false} />
            </div>
          </div>
        );
      case 'Students':
        return (
          <div>
            <p className="mb-8 mt-4"> Here you can manage your student data and view reports.</p>
            <StudentsList />
          </div>
        );
      case 'Courses':
        return (
          <div>
            <p className="mb-8 mt-4">Course management content goes here.</p>
            <CourseList />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='container' style={{ height: '100vh', width: '100%' }}>
      <Navigation setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
}

export default Dashboard;
