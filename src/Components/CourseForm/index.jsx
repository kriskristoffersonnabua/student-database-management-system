import { useState } from 'react';

function Form() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const major = event.target.major;
    const  minor = event.target.minor;
    const coursedetail = event.target.coursedetail;
    setInputs(values => ({...values, [major]: value, [minor]: value, [coursedetail]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  }

  return (
        <form className="container is-max-tablet m-5 p-3"onSubmit={handleSubmit}>
        <label > Major:
        <input class="input m-2 p-2"
            type="text" 
            name="major" 
            value={inputs.major || ""} 
            onChange={handleChange}
        />
        </label>
        <label>Minor:
            <input class="input m-2 p-2"
            type="text" 
            name="minor"
            value={inputs.minor || ""}
            onChange={handleChange}
            />
        </label>
        <label>Course Detail:
            <input class="input m-2 p-2"
            type="text" 
            name="coursedetail"
            value={inputs.coursedetail || ""}
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