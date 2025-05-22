import { useEffect, useState } from "react"
import Table from "../Table"
import StudentForm from '../StudentForm'
import { fetchAllStudents } from "../../database/helper-functions";

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

  const headers = ['Lastname', 'Firstname', 'Middlename', 'Birthday', 'Year Level', 'Course', 'Actions', ''
  ]

  const formattedData = listOfStudents.map((student) => {
    return [student?.lastname, student?.firstname, student?.middlename, student?.birthday, student?.year_level, student?.course]
  })

  if (showForm) {
    return <StudentForm toggleForm={toggleForm} fetchStudents={fetchStudents} />
  }

  return (
    <div>
      <button className="button is-primary mb-2 has-text-white is-small" onClick={toggleForm}>Add Student</button>
      <Table headers={headers} rows={formattedData} />
    </div>
  )
}

export default StudentsList