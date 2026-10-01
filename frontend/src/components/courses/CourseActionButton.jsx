import { Plus, Check, Clock } from 'lucide-react'


function CourseActionButton({ course, onAdd }) {
  const { code, name, status } = course

  if (status === 'draft') {
    return <span className='action-btn action-btn--done' title='Felvéve (draft)'><Check size={16} /></span>
  }
  if (status === 'waitlist') {
    return <span className='action-btn action-btn--wait' title='Várólistán'><Clock size={16} /></span>
  }
  return (
    <button type='button' className='action-btn' aria-label={`${name} felvétele`} onClick={() => onAdd(code)}>
      <Plus size={16} />
    </button>
  )
}

export default CourseActionButton