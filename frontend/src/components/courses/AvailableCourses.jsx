import { useState } from 'react'
import { Search } from 'lucide-react'

import './AvailableCourses.css'

import Card from '../common/Card'
import CourseItem from './CourseItem'
import CourseCard from './CourseCard'


function AvailableCourses({ courses, onAdd }) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const filtered = courses.filter(
    (c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
  )

  return (
    <Card
      title='Elérhető Kurzusok'
      className='available-courses'
      aside={
        <label className='search-box'>
          <Search size={14} />
          <input
            type='search'
            placeholder='Keresés...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      }
    >
      <div className='course-table-wrapper'>
        <table className='course-table'>
          <thead>
            <tr>
              <th>Tárgykód</th>
              <th>Tárgy neve</th>
              <th>Kredit</th>
              <th>Típus</th>
              <th>Óraszám</th>
              <th>Művelet</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((course) => (
              <CourseItem key={course.code} course={course} onAdd={onAdd} />
            ))}
          </tbody>
        </table>
      </div>

      <div className='course-cards'>
        {filtered.map((course) => (
          <CourseCard key={course.code} course={course} onAdd={onAdd} />
        ))}
      </div>
    </Card>
  )
}

export default AvailableCourses