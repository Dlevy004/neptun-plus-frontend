import CourseActionButton from './CourseActionButton'


function CourseCard({ course, onAdd }) {
  const { code, name, credits, type, hours } = course

  return (
    <article className='course-card'>
      <div className='course-card-head'>
        <div className='course-card-title'>
          <span className='course-code'>{code}</span>
          <h3>{name}</h3>
        </div>
        <CourseActionButton course={course} onAdd={onAdd} />
      </div>

      <div className='course-card-meta'>
        <span className={`badge ${type === 'GY' ? 'badge--gy' : ''}`}>{type}</span>
        <span><b className='course-credits'>{credits}</b> kredit</span>
        <span className='course-hours'>Óraszám: {hours}</span>
      </div>
    </article>
  )
}

export default CourseCard