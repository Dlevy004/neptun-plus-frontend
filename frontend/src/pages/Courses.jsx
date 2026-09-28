import { Award, CircleCheckBig } from 'lucide-react'

import TopBar from "../components/common/TopBar"

import './Courses.css'


function Courses() {
  return (
    <div className="courses">
      <TopBar title='Kurzus Katalógus'>
        {/*TODO*/}
        <span className="total-credits"><Award strokeWidth={3}/> Összes felvett kredit: TODO</span>
        <button className="subject-sign-up-btn" type='button'><CircleCheckBig strokeWidth={3}/> Tárgyfelvétel Véglegesítése</button>
      </TopBar>

    </div>
  )
}

export default Courses