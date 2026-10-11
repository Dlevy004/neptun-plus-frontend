import { Trash2 } from 'lucide-react'
import Card from '../common/Card'
import './EnrollmentLists.css'

function DraftList({ courses = [], onRemove }) {
  return (
    <Card title='Felvett tárgyak (Draft)'>
      {courses.length === 0 ? (
        <p className='list-empty'>Még nem vettél fel tárgyat.</p>
      ) : (
        <ul className='enroll-list'>
          {courses.map((c) => {
            const courseId = c.id || c.code;
            const courseName = c.title || c.name || 'Névtelen kurzus';

            return (
              <li key={courseId} className='enroll-item'>
                <span className='enroll-dot' />
                <div className='enroll-info'>
                  <strong>{courseName}</strong>
                  <small>{c.code || courseId} • {c.credits ?? 0} Kredit</small>
                </div>
                <button
                  type='button'
                  className='icon-btn'
                  aria-label={`${courseName} eltávolítása`}
                  onClick={() => onRemove && onRemove(courseId)}
                >
                  <Trash2 size={16} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  )
}

export default DraftList