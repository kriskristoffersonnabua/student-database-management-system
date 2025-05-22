import { useState } from 'react';
import { addStudent } from '../../database/helper-functions';

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

  const handleChange = (evt) => {
    let value = evt?.target.value
    if (evt?.target.name === 'birthday') {
      value = new Date(evt?.target?.value).toISOString()
    }
    setInputs({
      ...inputs,
      [evt?.target.name]: value
    })
  }

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      console.log(inputs)
      const response = addStudent({ ...inputs })
      console.log(response)
      if (response) {
        props?.toggleForm()
        props?.fetchStudents()
        alert('Student was added.')
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong. Could not add student')
    }
  }

  const handleCancel = () => {
    props?.toggleForm()
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#ffffff70', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', left: '0px', top: '0px', zIndex: 5, }}>
      <form className="box container is-max-tablet p-8 has-background-light" onSubmit={handleSubmit} style={{ boxShadow: '2px 2px #ffffff70' }}>
        <label > Lastname:
          <input class="input m-2 p-2 has-background-white has-text-black"
            type="text"
            name="lastname"
            value={inputs.lastname || ""}
            onChange={handleChange}
          />
        </label>
        <label>Firstname:
          <input class="input m-2 p-2 has-background-white has-text-black"
            type="text"
            name="firstname"
            value={inputs.firstname || ""}
            onChange={handleChange}
          />
        </label>
        <label>Middlename:
          <input class="input m-2 p-2 has-background-white has-text-black"
            type="text"
            name="middlename"
            value={inputs.middlename || ""}
            onChange={handleChange}
          />
        </label>
        <label>Birthday:
          <input class="input m-2 p-2 has-background-white has-text-black"
            type="date"
            name="birthday"
            value={inputs.birthday || ""}
            onChange={handleChange}
          />
        </label>
        <label>Year Level:
          <input class="input m-2 p-2 has-background-white has-text-black"
            type="text"
            name="year_level"
            value={inputs.year_level || ""}
            onChange={handleChange}
          />
        </label>
        <label>Course:
          <input class="input m-2 p-2 has-background-white has-text-black"
            type="text"
            name="course"
            value={inputs.course || ""}
            onChange={handleChange}
          />
        </label>
        <div class="field is-grouped is-grouped-centered p-3 m-4">
          <p class="control">
            <button class="button is-primary">
              Add
            </button>
          </p>
          <p class="control ">
            <button class="button is-light" onClick={handleCancel}>
              Cancel
            </button>
          </p>
        </div>

      </form>
    </div>

  )
}
export default StudentForm;