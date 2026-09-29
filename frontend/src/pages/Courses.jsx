import { useState } from 'react'
import { Award, CircleCheckBig } from 'lucide-react'

import TopBar from '../components/common/TopBar'
import Card from '../components/common/Card'
import AvailableCourses from '../components/courses/AvailableCourses'
import SchedulePlanner from '../components/schedule/SchedulePlanner'
import DraftList from '../components/enrollment/DraftList'
import WaitlistPanel from '../components/enrollment/WaitlistPanel'
import { mockCourses } from '../data/mockCourses'

import './Courses.css'


function Courses() {
  const [courses, setCourses] = useState(mockCourses)

  const draft = courses.filter((c) => c.status === 'draft')
  const waitlist = courses.filter((c) => c.status === 'waitlist')
  const totalCredits = draft.reduce((sum, c) => sum + c.credits, 0)

  const setStatus = (code, status) =>
    setCourses((prev) => prev.map((c) => (c.code === code ? { ...c, status } : c)))

  return (
    <div className="courses">
      <TopBar title='Kurzus Katalógus' subtitle='Tárgyfelvételi időszak: 2026 Tavasz'>
        <span className="total-credits"><Award strokeWidth={3}/> Összes felvett kredit: {totalCredits}</span>
        <button className="subject-sign-up-btn" type='button'><CircleCheckBig strokeWidth={3}/> Tárgyfelvétel Véglegesítése</button>
      </TopBar>

      <div className='courses-layout'>
        <AvailableCourses courses={courses} onAdd={(code) => setStatus(code, 'draft')} />

        <div className='courses-side'>
          <Card title='Órarend Tervezet' aside={<span className='card-note'>Hétfő - Péntek</span>}>
            <SchedulePlanner courses={draft} compact />
          </Card>
          <DraftList courses={draft} onRemove={(code) => setStatus(code, 'none')} />
          <WaitlistPanel courses={waitlist} onRemove={(code) => setStatus(code, 'none')} />
        </div>
      </div>
    </div>
  )
}

export default Courses