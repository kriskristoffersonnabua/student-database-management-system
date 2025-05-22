import { useEffect, useState } from "react"
import Table from "../StudentTable"
import StudentForm from '../StudentForm'
import { deleteStudent, fetchAllCourses, fetchAllStudents } from "../../database/helper-functions";
import { notification } from '../../helpers/notification'

export const formatCourse = (course) => {
  let courseString = '';
  if (course?.degree) courseString += `Bachelor of ${course?.degree} `
  if (course?.course_name) courseString += `${course?.course_name} `
  if (course?.major) courseString += `(${course?.major}) `
  if (course?.minor) courseString += `(${course?.minor}) `
  return courseString
}

const StudentsList = () => {
  const [listOfStudents, setStudentList] = useState([])
  const [courses, setCourses] = useState([])
  const [showForm, toggleStudentForm] = useState(false)
  const [isEditing, toggleEditingMode] = useState(false)
  const [studentCurrentlyEditing, setStudentBeingEditied] = useState(null)

  useEffect(() => {
    (async () => {
      await fetchCourses()
      await fetchStudents()
    })()
  }, [])

  const toggleForm = () => toggleStudentForm(!showForm)

  const fetchCourses = async () => {
    const courses = await fetchAllCourses()
    const coursesObject = {}
    courses.forEach((c) => Object.assign(coursesObject, { [c?.id]: { ...c } }))
    setCourses(coursesObject)
  }

  const fetchStudents = async () => {
    const students = await fetchAllStudents()
    toggleEditingMode(false)
    setStudentBeingEditied(null)
    setStudentList(students)
  }

  const headers = ['ID', 'Lastname', 'Firstname', 'Middlename', 'Birthday', 'Year Level', 'Course', 'Actions', ''
  ]

  const formattedData = listOfStudents.map((student) => {
    return [[student?.id, student?.lastname, student?.firstname, student?.middlename, student?.birthday, student?.year_level, formatCourse(courses?.[student?.course])], { ...student }]
  })

  const delStudent = async (studentId) => {
    try {
      notification.dismissAll()
      notification.success('Deleting student..')
      await deleteStudent(studentId)
      fetchStudents()
      notification.success('Student deleted.')
    } catch (error) {
      console.error(error)
      notification.error('Could not delete student.')
    }
  }

  const openEditForm = (student) => {
    setStudentBeingEditied(student);
    setTimeout(() => {
      toggleEditingMode(true)
      setTimeout(() => {
        toggleForm()
      }, 10)
    }, 10)
  }

  if (showForm) {
    return <StudentForm toggleForm={toggleForm} fetchStudents={fetchStudents} isEditing={isEditing} studentCurrentlyEditing={studentCurrentlyEditing} courses={courses} />
  }

  return (
    <div>
      <button className="button is-primary mb-2 has-text-white is-small" onClick={toggleForm}>Add Student</button>
      <Table headers={headers} rows={formattedData} deleteFunction={delStudent} openUpdateForm={openEditForm} />
    </div>
  )
}

export default StudentsList