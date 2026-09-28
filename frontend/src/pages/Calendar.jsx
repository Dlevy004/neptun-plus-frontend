import TopBar from "../components/common/TopBar"

import { Award } from 'lucide-react'


function Courses() {
  return (
    <div className="courses">
        <TopBar title='Órarend'>
        {/*TODO*/}
          <span className="total-credits"><Award/> Összes felvett kredit: TODO</span>
        </TopBar>
    </div>
  )
}

export default Courses