import { useState } from 'react';

function Form() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const lastname = event.target.lastname;
    const firstname = event.target.firstname;
    const middlename = event.target.middlename;
    const birthday = event.target.birthday;
    const yearlevel = event.target.yearlevel;
    const course = event.target.course;
    setInputs(values => ({...values, [lastname]: value, [firstname]: value, [middlename]: value, [birthday]: value, [yearlevel]: value, [course
    ]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  }

  return (
        <form className="container is-max-tablet m-5 p-3" onSubmit={handleSubmit}>
        <label > Lastname:
        <input class="input m-2 p-2"
            type="text" 
            name="lastname" 
            value={inputs.lastname || ""} 
            onChange={handleChange}
        />
        </label>
        <label>Firstname:
            <input class="input m-2 p-2"
            type="text" 
            name="firstname"
            value={inputs.firstname || ""} 
            onChange={handleChange}
            />
            </label>
            <label>Middlename:
            <input class="input m-2 p-2"
            type="text" 
            name="middlename" 
            value={inputs.middlename || ""} 
            onChange={handleChange}
            />
            </label>
            <label>Birthday:
            <input class="input m-2 p-2"
            type="date" 
            name="birthday" 
            value={inputs.birthday || ""} 
            onChange={handleChange}
            />
            </label>
            <label>Year Level:
            <input class="input m-2 p-2"
            type="text" 
            name="yearlevel" 
            value={inputs.yearlevel || ""} 
            onChange={handleChange}
            />
            </label>
            <label>Course:
            <input  class="input m-2 p-2"
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
            <a class="button is-light">
            Cancel
            </a>
        </p>
        </div>
       
            </form>
  )
}
export default Form;