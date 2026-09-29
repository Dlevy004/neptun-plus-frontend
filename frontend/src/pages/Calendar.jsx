import { Award } from 'lucide-react'

import TopBar from '../components/common/TopBar'
import Card from '../components/common/Card'
import SchedulePlanner from '../components/schedule/SchedulePlanner'
import { useEnrollment } from '../context/EnrollmentContext'

import './Calendar.css'


function Calendar() {
  const { draft, totalCredits } = useEnrollment()

  return (
    <div className="courses">
        <TopBar title='Órarend'>
        {/*TODO*/}
          <span className="total-credits"><Award strokeWidth={3}/> Összes felvett kredit: TODO</span>
        </TopBar>
    </div>
  )
}

export default Courses