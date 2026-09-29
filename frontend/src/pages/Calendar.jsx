import { Award } from 'lucide-react'

import TopBar from '../components/common/TopBar'
import Card from '../components/common/Card'
import SchedulePlanner from '../components/schedule/SchedulePlanner'
import { useEnrollment } from '../context/EnrollmentContext'

import './Calendar.css'


function Calendar() {
  const { draft, totalCredits } = useEnrollment()

  return (
    <div className="calendar-page">
      <TopBar title='Órarend'>
        <span className="total-credits"><Award strokeWidth={3}/> Összes felvett kredit: {totalCredits}</span>
      </TopBar>

      <Card title='Heti Órarend' aside={<span className='card-note'>Hétfő - Péntek</span>}>
        <SchedulePlanner courses={draft} />
      </Card>
    </div>
  )
}

export default Calendar