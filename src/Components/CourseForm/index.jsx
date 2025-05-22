import { useState, useEffect } from 'react';
import { notification } from '../../helpers/notification'
import { addCourse, updateCourse } from '../../database/helper-functions';

const defaultCourseData = {
  major: '',
  minor: '',
  course_details: ''
}

function CourseForm(props) {
  const [inputs, setInputs] = useState({ ...defaultCourseData });
  const [isUpdating, toggleIsUpdating] = useState(false)

  useEffect(() => {
    if (props?.isEditing) {
      toggleIsUpdating(true)
      setInputs(props?.courseCurrentlyEditing)
    }
  }, [props?.isEditing, props?.courseCurrentlyEditing])

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
        const response = addCourse({ ...inputs })
        if (response) {
          props?.toggleForm()
          props?.fetchCourses()
          notification.success("Course was added.")
        }
      } catch (error) {
        console.error(error)
        notification.error("Could not add course.")
        props?.fetchCourses()
      }
    }
    else {
      try {
        event.preventDefault();
        const response = updateCourse({ ...inputs })
        if (response) {
          props?.toggleForm()
          props?.fetchCourses()
          setInputs(defaultCourseData)
          notification.success("Course was updated.")
        }
      } catch (error) {
        console.error(error)
        setInputs(defaultCourseData)
        notification.error("Could not update course.")
        props?.fetchCourses()
      }
    }
  }
   const [Degree] = useState(props?.degree || [{ id: 1, name: "Science" },
  { id: 2, name: "Arts" },
  ])
  const [SelectedDegree] = useState(inputs?.degree || '')

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#ffffff70', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', left: '0px', top: '0px', zIndex: 5, }}>
      <form className="box container is-max-tablet p-8 has-background-light" onSubmit={handleSubmit} style={{ boxShadow: '2px 2px #ffffff70' }}>
       <label>Bachelors Degree:
          <div className="control">
            <div className="select m-2 p-2 is-fullwidth has-text-black">
              <select className="select has-background-white has-text-black" name="" value={inputs?.degree} onChange={handleChange}>
                <option value="">Select a Degree</option>
                {Degree.map((degree) => (
                  <option key={degree.id} value={degree.name}>{degree.name}</option>
                ))}
              </select>
            </div>
          </div>
        </label>
         <label>Course Name:
          <input class="input m-2 p-2 has-background-white has-text-black"
            type="text"
            name="course"
            value={inputs.course || ""}
            onChange={handleChange}
          />
        </label>
        <label> Major:
          <input class="input m-2 p-2 has-background-white has-text-black"
            type="text"
            name="major"
            value={inputs.major || ""}
            onChange={handleChange}
          />
        </label>
        <label>Minor:
          <input class="input m-2 p-2 has-background-white has-text-black"
            type="text"
            name="minor"
            value={inputs.minor || ""}
            onChange={handleChange}
          />
        </label>
        <label>Course Detail:
          <input class="input m-2 p-2 has-background-white has-text-black"
            type="text"
            name="course_details"
            value={inputs.course_details || ""}
            onChange={handleChange}
          />
        </label>
        <div class="field is-grouped is-grouped-centered p-3 m-4">
          <p class="control ">
            <button class="button is-primary has-text-white">
              {isUpdating ? 'Update Course' : 'Add Course'}
            </button>
          </p>
          <p class="control ">
            <button class="button is-light" onClick={() => props?.toggleForm()}>
              Cancel
            </button>
          </p>
        </div>

      </form>
    </div>
  )
}
export default CourseForm;