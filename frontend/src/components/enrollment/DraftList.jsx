import { Trash2 } from 'lucide-react'

import Card from '../common/Card'
import './EnrollmentLists.css'


function DraftList({ courses, onRemove }) {
  return (
    <Card title='Felvett tárgyak (Draft)'>
      {courses.length === 0 ? (
        <p className='list-empty'>Még nem vettél fel tárgyat.</p>
      ) : (
        <ul className='enroll-list'>
          {courses.map((c) => (
            <li key={c.code} className='enroll-item'>
              <span className='enroll-dot' />
              <div className='enroll-info'>
                <strong>{c.name}</strong>
                <small>{c.code} • {c.credits} Kredit</small>
              </div>
              <button type='button' className='icon-btn' aria-label={`${c.name} eltávolítása`} onClick={() => onRemove(c.code)}>
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export default DraftList