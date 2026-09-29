import { Clock, Trash2 } from 'lucide-react'

import Card from '../common/Card'
import './EnrollmentLists.css'


function WaitlistPanel({ courses, onRemove }) {
  return (
    <Card title='Várólisták'>
      {courses.length === 0 ? (
        <p className='list-empty'>Nincs várólistás tárgyad.</p>
      ) : (
        <ul className='enroll-list'>
          {courses.map((c) => (
            <li key={c.code} className='enroll-item'>
              <Clock size={14} className='wait-icon' />
              <div className='enroll-info'>
                <strong>{c.name}</strong>
                <small>Pozíció: <b className='wait-pos'>{c.waitlistPosition}. a várólistán</b></small>
              </div>
              <button type='button' className='icon-btn' aria-label={`${c.name} lemondása`} onClick={() => onRemove(c.code)}>
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export default WaitlistPanel