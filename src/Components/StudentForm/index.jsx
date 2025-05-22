import { useState } from 'react';

function StudentForm(props) {
  const [inputs, setInputs] = useState({});

  const handleChange = (evt) => {
    setInputs({
      ...inputs,
      [evt?.target.name]: evt?.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  }

  const handleCancel = () => {
    props?.toggleForm()
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#ffffff70', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', left: '0px', top: '0px', zIndex: 5, }}>
      <form className="box container is-max-tablet p-8 has-background-light" onSubmit={handleSubmit} style={{ boxShadow: '2px 2px #ffffff70' }}>
        <label > Lastname:
          <input class="input m-2 p-2 has-background-white"
            type="text"
            name="lastname"
            value={inputs.lastname || ""}
            onChange={handleChange}
          />
        </label>
        <label>Firstname:
          <input class="input m-2 p-2 has-background-white"
            type="text"
            name="firstname"
            value={inputs.firstname || ""}
            onChange={handleChange}
          />
        </label>
        <label>Middlename:
          <input class="input m-2 p-2 has-background-white"
            type="text"
            name="middlename"
            value={inputs.middlename || ""}
            onChange={handleChange}
          />
        </label>
        <label>Birthday:
          <input class="input m-2 p-2 has-background-white"
            type="date"
            name="birthday"
            value={inputs.birthday || ""}
            onChange={handleChange}
          />
        </label>
        <label>Year Level:
          <input class="input m-2 p-2 has-background-white"
            type="text"
            name="yearlevel"
            value={inputs.yearlevel || ""}
            onChange={handleChange}
          />
        </label>
        <label>Course:
          <input class="input m-2 p-2 has-background-white"
            type="text"
            name="course"
            value={inputs.course || ""}
            onChange={handleChange}
          />
        </label>
        <div class="field is-grouped is-grouped-centered p-3 m-4">
          <p class="control ">
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