import TopBar from "../components/common/TopBar"

import './Courses.css'


function Courses() {
  return (
    <div className="courses">
      <TopBar title='Kurzus Katalógus'>
        {/*TODO*/}
        <span className="total-credits">Összes felvett kredit: TODO</span>
        <button className="subject-sign-up-btn" type='button'>Tárgyfelvétel Véglegesítése</button>
      </TopBar>

    </div>
  )
}

export default Courses