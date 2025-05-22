import { useEffect, useState } from "react"
import Table from "../Table"
import { db } from "../../database/firebase-config"
import { collection, query, getDocs } from "firebase/firestore";
import StudentForm from '../StudentForm'

const StudentsList = () => {
  const [listOfStudents, setStudentList] = useState([])
  const [showForm, toggleStudentForm] = useState(false)

  useEffect(() => {
    fetchStudents()
  }, [])

  const toggleForm = () => toggleStudentForm(!showForm)

  const fetchStudents = async () => {
    console.log('called')
    const q = query(collection(db, "students"));
    const querySnapshot = await getDocs(q);
    const students = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      students.push({
        ...doc.data(),
        id: doc.id
      })
    });
    console.log(students, 'students')
    setStudentList(students)
  }

  const headers = ['Lastname', 'Firstname', 'Middlename', 'Birthday', 'Year Level', 'Course'
  ]

  const formattedData = listOfStudents.map((student) => {
    return [student?.lastname, student?.firstname, student?.middlename, student?.birthday, student?.year_level, student?.course]
  })

  console.log(showForm)
  if (showForm) {
    return <StudentForm toggleForm={toggleForm} />
  }

  return (
    <div>
      <button className="button is-primary mb-2" onClick={toggleForm}>Add Student</button>
      <Table headers={headers} rows={formattedData} />
    </div>
  )
}

export default StudentsList