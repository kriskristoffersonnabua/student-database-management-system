import { useEffect, useState } from "react"
import Table from "../Table"
import StudentForm from '../StudentForm'
import { deleteStudent, fetchAllStudents } from "../../database/helper-functions";
import { notification } from '../../helpers/notification'

const StudentsList = () => {
  const [listOfStudents, setStudentList] = useState([])
  const [showForm, toggleStudentForm] = useState(false)

  useEffect(() => {
    fetchStudents()
  }, [])

  const toggleForm = () => toggleStudentForm(!showForm)

  const fetchStudents = async () => {
    const students = await fetchAllStudents()
    console.log(students, 'students')
    setStudentList(students)
  }

  const headers = ['ID', 'Lastname', 'Firstname', 'Middlename', 'Birthday', 'Year Level', 'Course', 'Actions', ''
  ]

  const formattedData = listOfStudents.map((student) => {
    return [student?.id, student?.lastname, student?.firstname, student?.middlename, student?.birthday, student?.year_level, student?.course]
  })

  if (showForm) {
    return <StudentForm toggleForm={toggleForm} fetchStudents={fetchStudents} />
  }

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

  return (
    <div>
      <button className="button is-primary mb-2 has-text-white is-small" onClick={toggleForm}>Add Student</button>
      <Table headers={headers} rows={formattedData} deleteFunction={delStudent} />
    </div>
  )
}

export default StudentsList