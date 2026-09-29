import { Plus, Check, Clock } from 'lucide-react'


function CourseItem({ course, onAdd }) {
  const { code, name, credits, type, hours, status } = course

  return (
    <tr>
      <td className='course-code'>{code}</td>
      <td>{name}</td>
      <td className='course-credits'>{credits}</td>
      <td><span className={`badge ${type === 'GY' ? 'badge--gy' : ''}`}>{type}</span></td>
      <td className='course-hours'>{hours}</td>
      <td>
        {status === 'none' && (
          <button type='button' className='action-btn' aria-label={`${name} felvétele`} onClick={() => onAdd(code)}>
            <Plus size={16} />
          </button>
        )}
        {status === 'draft' && (
          <span className='action-btn action-btn--done' title='Felvéve (draft)'><Check size={16} /></span>
        )}
        {status === 'waitlist' && (
          <span className='action-btn action-btn--wait' title='Várólistán'><Clock size={16} /></span>
        )}
      </td>
    </tr>
  )
}

export default CourseItem