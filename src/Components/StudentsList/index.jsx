import { useEffect, useState } from "react"
import Table from "../Table"
import StudentForm from '../StudentForm'
import { deleteStudent, fetchAllStudents } from "../../database/helper-functions";
import { notification } from '../../helpers/notification'

const StudentsList = () => {
  const [listOfStudents, setStudentList] = useState([])
  const [showForm, toggleStudentForm] = useState(false)
  const [isEditing, toggleEditingMode] = useState(false)
  const [studentCurrentlyEditing, setStudentBeingEditied] = useState(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  const toggleForm = () => toggleStudentForm(!showForm)

  const fetchStudents = async () => {
    const students = await fetchAllStudents()
    toggleEditingMode(false)
    setStudentBeingEditied(null)
    setStudentList(students)
  }

  const headers = ['ID', 'Lastname', 'Firstname', 'Middlename', 'Birthday', 'Year Level', 'Course', 'Actions', ''
  ]

  const formattedData = listOfStudents.map((student) => {
    return [[student?.id, student?.lastname, student?.firstname, student?.middlename, student?.birthday, student?.year_level, student?.course], { ...student }]
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
    console.log(student)
    setStudentBeingEditied(student);
    setTimeout(() => {
      toggleEditingMode(true)
      setTimeout(() => {
        toggleForm()
      }, 10)
    }, 10)
  }

  if (showForm) {
    return <StudentForm toggleForm={toggleForm} fetchStudents={fetchStudents} isEditing={isEditing} studentCurrentlyEditing={studentCurrentlyEditing} />
  }

  return (
    <div>
      <button className="button is-primary mb-2 has-text-white is-small" onClick={toggleForm}>Add Student</button>
      <Table headers={headers} rows={formattedData} deleteFunction={delStudent} openUpdateForm={openEditForm} />
    </div>
  )
}

export default StudentsList