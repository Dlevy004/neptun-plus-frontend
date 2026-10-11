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
  const {
    courses = [],
    enrolledCourses = [],
    enrollCourse,
    dropCourse,
    loading,
    error
  } = useEnrollment()

  const totalCredits = enrolledCourses.reduce(
    (sum, course) => sum + (course.credits || 0),
    0
  )

  return (
    <div className="courses">
      <TopBar title='Kurzus Katalógus'>
        <span className="total-credits">
          <Award strokeWidth={3}/> Összes felvett kredit: {totalCredits}
        </span>
        <button className="subject-sign-up-btn" type='button'>
          <CircleCheckBig strokeWidth={3}/> Tárgyfelvétel Véglegesítése
        </button>
      </TopBar>

      {error && <div className="error-banner">{error}</div>}

      <div className='courses-layout'>
        <AvailableCourses
          courses={courses}
          loading={loading}
          onAdd={(courseId) => enrollCourse(courseId)}
        />

        <div className='courses-side'>
          <Card title='Órarend Tervezet' aside={<span className='card-note'>Hétfő - Péntek</span>}>
            <SchedulePlanner courses={enrolledCourses} compact />
          </Card>

          <div className='draft-waitlist-wrapper'>
            <DraftList
              className='draft'
              courses={enrolledCourses}
              onRemove={(courseId) => dropCourse(courseId)}
            />

            <WaitlistPanel
              className='wait'
              courses={[]}
              onRemove={(courseId) => dropCourse(courseId)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses