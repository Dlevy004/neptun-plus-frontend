import CourseActionButton from './CourseActionButton'


function CourseItem({ course, onAdd }) {
  const { code, name, credits, type, hours } = course

  return (
    <tr>
      <td className='course-code'>{code}</td>
      <td>{name}</td>
      <td className='course-credits'>{credits}</td>
      <td><span className={`badge ${type === 'GY' ? 'badge--gy' : ''}`}>{type}</span></td>
      <td className='course-hours'>{hours}</td>
      <td><CourseActionButton course={course} onAdd={onAdd} /></td>
    </tr>
  )
}

export default CourseItem