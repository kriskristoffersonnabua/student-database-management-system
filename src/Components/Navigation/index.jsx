import { useEffect, useState } from "react"
import { useSetAtom } from "jotai"
import { loggedInUserDetails } from "../../helpers/atoms"

const Navigation = (props) => {
  const [hasRendered, toggleRendered] = useState(false)
  const setLoggedInUser = useSetAtom(loggedInUserDetails)

  useEffect(() => {
    if (!hasRendered) {
      const navbarItems = document.querySelectorAll('.navbar-item')
      navbarItems.forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation()
          props.setActiveTab(e?.target.innerHTML)
        })
      })
      toggleRendered(true)
    }
  }, [])
  

  return (
<nav className="navbar m-1" role="navigation" aria-label="main navigation" style={{ background: '#ffff', borderBottom: '2px solid' }}>
      <div className="navbar-brand is-flex is-align-item-flex-end">
<h1 className="login-title" style={{ color: '#4E71FF' }}>
  <span className="highlight">Student</span>
  <span className="text has-text-black-bis">Management</span>
</h1>
      </div>
      <div id="navbarBasicExample" className="navbar-menu ml-8 is-block is-flex is-justify-content-center">
        <div className="navbar-start">
          <span className="navbar-item has-text-weight-semibold">
            Home
          </span>
          <span className="navbar-item has-text-weight-semibold">
            Students
          </span >
            <span className="navbar-item has-text-weight-semibold">
            Courses
          </span >
       {/* Removed logout button as per new requirement */}

        </div>
      </div>
    </nav>
  )
}

export default Navigation
