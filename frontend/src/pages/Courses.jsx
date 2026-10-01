import { Award, CircleCheckBig } from 'lucide-react'

import TopBar from '../components/common/TopBar'
import Card from '../components/common/Card'
import AvailableCourses from '../components/courses/AvailableCourses'
import SchedulePlanner from '../components/schedule/SchedulePlanner'
import DraftList from '../components/enrollment/DraftList'
import WaitlistPanel from '../components/enrollment/WaitlistPanel'
import { useEnrollment } from '../context/EnrollmentContext'

import './Courses.css'


function Courses() {
  const { courses, draft, waitlist, totalCredits, setStatus } = useEnrollment()

  return (
    <div className="courses">
      <TopBar title='Kurzus Katalógus'>
        <span className="total-credits"><Award strokeWidth={3}/> Összes felvett kredit: {totalCredits}</span>
        <button className="subject-sign-up-btn" type='button'><CircleCheckBig strokeWidth={3}/> Tárgyfelvétel Véglegesítése</button>
      </TopBar>

      <div className='courses-layout'>
        <AvailableCourses courses={courses} onAdd={(code) => setStatus(code, 'draft')} />

        <div className='courses-side'>
          <Card title='Órarend Tervezet' aside={<span className='card-note'>Hétfő - Péntek</span>}>
            <SchedulePlanner courses={draft} compact />
          </Card>
          <div className='draft-waitlist-wrapper'>
            <DraftList  className='draft' courses={draft} onRemove={(code) => setStatus(code, 'none')} />
            <WaitlistPanel className='wait' courses={waitlist} onRemove={(code) => setStatus(code, 'none')} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses