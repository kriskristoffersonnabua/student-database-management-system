import { useEffect, useState } from "react"
import Table from "../Table"
import { db } from "../../database/firebase-config"
import { collection, query, where, getDocs } from "firebase/firestore";


const StudentsList = () => {
  const [listOfStudents, setStudentList] = useState([])
  useEffect(() => {
    fetchStudents()
  }, [])

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
  const rows = [
    {
      lastname: 'Doe',
      firstname: 'Jane',
      middlename: 'Awesome',
      birthday: '2025-05-22T03:17:24.614Z',
      yearLevel: 2,
      course: 'Computer Science'
    }
  ]
  
  const formattedData = listOfStudents.map((student) => {
    return [student?.lastname, student?.firstname, student?.middlename, student?.birthday, student?.year_level, student?.course]
  })

  return (
    <div>
      <Table headers={headers} rows={formattedData} />
    </div>
  )
}

export default StudentsList