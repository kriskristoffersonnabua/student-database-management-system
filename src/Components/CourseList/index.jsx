import { useEffect, useState } from "react"
import Table from "../Table"
import CourseForm from '../CourseForm'
import { deleteStudent, fetchAllCourses } from "../../database/helper-functions";
import { notification } from '../../helpers/notification'

const CourseList = () => {
  const [courses, setCourses] = useState([])
  const [showForm, toggleStudentForm] = useState(false)
  const [isEditing, toggleEditingMode] = useState(false)
  const [courseCurrentlyEditing, setCourseBeingEdited] = useState(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  const toggleForm = () => toggleStudentForm(!showForm)

  const fetchCourses = async () => {
    const courses = await fetchAllCourses()
    toggleEditingMode(false)
    setCourseBeingEdited(null)
    setCourses(courses)
  }

  const headers = ['ID', 'Degree', 'Course Name', 'Major', 'Minor', 'Course Details', 'Actions']

  const formattedData = courses.map((course) => {
    return [[course?.id, course?.degree, course?.course_name, course?.major, course?.minor, course?.course_details], { ...course }]
  })

  const delStudent = async (studentId) => {
    try {
      notification.dismissAll()
      notification.success('Deleting student..')
      await deleteStudent(studentId)
      fetchCourses()
      notification.success('Student deleted.')
    } catch (error) {
      console.error(error)
      notification.error('Could not delete student.')
    }
  }

  const openEditForm = (student) => {
    setCourseBeingEdited(student);
    setTimeout(() => {
      toggleEditingMode(true)
      setTimeout(() => {
        toggleForm()
      }, 10)
    }, 10)
  }

  if (showForm) {
    return <CourseForm toggleForm={toggleForm} fetchCourses={fetchCourses} isEditing={isEditing} courseCurrentlyEditing={courseCurrentlyEditing} />
  }

  return (
    <div>
      <button className="button is-primary mb-2 has-text-white is-small" onClick={toggleForm}>Add Course</button>
      <Table headers={headers} rows={formattedData} deleteFunction={delStudent} openUpdateForm={openEditForm} />
    </div>
  )
}

export default CourseList