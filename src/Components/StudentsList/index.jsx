import { useEffect } from "react"
import Table from "../Table"

const StudentsList = () => {

  useEffect(() => {
  }, [])

  const headers = ['ID', 'Lastname', 'Firstname', 'Middlename', 'Birthday', 'Year Level', 'Course'
  ]
  const rows = [
    {
      id: 1,
      lastname: 'Doe',
      firstname: 'Jane',
      middlename: 'Awesome',
      birthday: '2025-05-22T03:17:24.614Z',
      yearLevel: 2,
      course: 'Computer Science'
    }
  ]
  return (
    <div>
      <Table headers={headers} rows={rows}/>
    </div>
  )
}

export default StudentsList