import { useState, useEffect } from 'react';
import { addStudent, updateStudent } from '../../database/helper-functions';
import { notification } from '../../helpers/notification'
import { formatCourse } from '../StudentsList';

const defaultStudentData = {
  lastname: '',
  firstname: '',
  middlename: '',
  birthday: new Date().toISOString(),
  year_level: 1,
  course: ''
}

function StudentForm(props) {
  const [inputs, setInputs] = useState({ ...defaultStudentData });
  const [isUpdating, toggleIsUpdating] = useState(false)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    setCourses(Object.values(props?.courses))
  }, [props?.courses])

  useEffect(() => {
    if (props?.isEditing) {
      toggleIsUpdating(true)
      setInputs(props?.studentCurrentlyEditing)
    }
  }, [props?.isEditing, props?.studentCurrentlyEditing])

  const handleChange = (evt) => {
    let value = evt?.target.value
    setInputs({
      ...inputs,
      [evt?.target.name]: value
    })
  }

  const handleSubmit = (event) => {
    if (!props?.isEditing) {
      try {
        event.preventDefault();
        const response = addStudent({ ...inputs })
        if (response) {
          props?.toggleForm()
          props?.fetchStudents()
          notification.success("Student was added.")
        }
      } catch (error) {
        console.error(error)
        notification.error("Could not add student.")
        props?.fetchStudents()
      }
    }
    else {
      try {
        event.preventDefault();
        const response = updateStudent({ ...inputs })
        if (response) {
          props?.toggleForm()
          props?.fetchStudents()
          setInputs(defaultStudentData)
          notification.success("Student was updated.")
        }
      } catch (error) {
        console.error(error)
        setInputs(defaultStudentData)
        notification.error("Could not update student.")
        props?.fetchStudents()
      }
    }
  }

  const handleCancel = () => {
    props?.toggleForm()
  }


  return (
    <div style={{ width: '100vw', height: '100vh', background: 'rgba(47, 51, 49, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', left: 0, top: 0, zIndex: 1000 }}>
      <form className="box container is-max-desktop p-6 has-background-white" onSubmit={handleSubmit} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '8px', width: '100%', maxWidth: '480px' }}>
        <label > Lastname:
          <input className="input m-2 p-2 has-background-white has-text-black"
            type="text"
            name="lastname"
            value={inputs?.lastname || ""}
            onChange={handleChange}
          />
        </label>
        <label>Firstname:
          <input className="input m-2 p-2 has-background-white has-text-black"
            type="text"
            name="firstname"
            value={inputs?.firstname || ""}
            onChange={handleChange}
          />
        </label>
        <label>Middlename:
          <input className="input m-2 p-2 has-background-white has-text-black"
            type="text"
            name="middlename"
            value={inputs?.middlename || ""}
            onChange={handleChange}
          />
        </label>
        <label>Birthday:
          <input className="input m-2 p-2 has-background-white has-text-black"
            type="date"
            name="birthday"
            value={inputs?.birthday || ""}
            onChange={handleChange}
          />
        </label>
        <label>Year Level:
          <input className="input m-2 p-2 has-background-white has-text-black"
            type="text"
            name="year_level"
            value={inputs?.year_level || ""}
            onChange={handleChange}
          />
        </label>
        <label>Course:
          <div className="control">
            <div className="select is-fullwidth has-background-white has-text-black">
              <select className="select has-background-white has-text-black" name="course" value={inputs?.course} onChange={handleChange}>
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{formatCourse(course)}</option>
                ))}
              </select>
            </div>
          </div>
        </label>
        <div className="field is-grouped is-grouped-centered p-3 m-4">
          <p className="control">
            <button className="button is-primary has-text-white">
              {isUpdating ? 'Update' : 'Add'}
            </button>
          </p>
          <p className="control ">
            <button className="button is-light" onClick={handleCancel}>
              Cancel
            </button>
          </p>
        </div>
      </form>
    </div>
  )
}
export default StudentForm
