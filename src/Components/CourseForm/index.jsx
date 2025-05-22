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
    <div style={{ width: '100vw', height: '100vh', background: '#ffffff70', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', left: '0px', top: '0px', zIndex: 5, }}>
      <form className="box container is-max-tablet p-8 has-background-light" onSubmit={handleSubmit} style={{ boxShadow: '2px 2px #ffffff70' }}>
        <label > Major:
        <input class="input m-2 p-2 has-background-white"
            type="text" 
            name="major" 
            value={inputs.major || ""} 
            onChange={handleChange}
        />
        </label>
        <label>Minor:
            <input class="input m-2 p-2 has-background-white"
            type="text" 
            name="minor"
            value={inputs.minor || ""}
            onChange={handleChange}
            />
        </label>
        <label>Course Detail:
            <input class="input m-2 p-2 has-background-white"
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
           <button class="button is-light" onClick={() => setInputs({})}>
              Cancel
            </button>
        </p>
        </div>
       
            </form>
            </div>
  )
}
export default Form;