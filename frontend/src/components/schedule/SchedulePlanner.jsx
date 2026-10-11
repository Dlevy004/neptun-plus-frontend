import './SchedulePlanner.css'

const DAYS = ['Hét', 'Kedd', 'Szer', 'Csüt', 'Pén']
const FULL_DAYS = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek']
const START_HOUR = 8
const END_HOUR = 20

const parseDayIndex = (day) => {
  if (typeof day === 'number') return day % 5
  if (!day) return 0
  const d = String(day).toLowerCase()
  if (d.includes('hét') || d.includes('het')) return 0
  if (d.includes('ked')) return 1
  if (d.includes('szer')) return 2
  if (d.includes('csüt') || d.includes('csut')) return 3
  if (d.includes('pén') || d.includes('pen')) return 4
  const parsed = parseInt(d, 10)
  return isNaN(parsed) ? 0 : parsed % 5
}

const parseStartHour = (start, time) => {
  if (typeof start === 'number') return start
  if (time && typeof time === 'string') {
    const match = time.match(/(\d{1,2}):/)
    if (match) return parseInt(match[1], 10)
  }
  return 8
}

function SchedulePlanner({ courses = [], compact = false }) {
  const safeCourses = Array.isArray(courses) ? courses : []

  const events = safeCourses.flatMap((c) => {
    if (!c) return []
    const code = c.code || `COURSE-${c.id}` || ''
    const name = c.title || c.name || 'Névtelen kurzus'
    const color = c.color || (c.id % 2 === 0 ? 'blue' : 'teal')

    if (!c.schedule) return []

    const schedList = Array.isArray(c.schedule) ? c.schedule : [c.schedule]

    return schedList.map((s) => ({
      ...s,
      code,
      name,
      color,
      day: parseDayIndex(s.day),
      start: parseStartHour(s.start, s.time),
      duration: typeof s.duration === 'number' ? s.duration : 2,
    }))
  })

  const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i)
  const colOffset = compact ? 1 : 2

  return (
    <div className={`planner ${compact ? 'planner--compact' : 'planner--full'}`}>
      <div
        className='planner-grid'
        style={{ gridTemplateRows: `auto repeat(${hours.length}, var(--row-h))` }}
      >
        {DAYS.map((d, i) => (
          <div key={d} className='planner-day' style={{ gridColumn: i + colOffset, gridRow: 1 }}>
            {d}
          </div>
        ))}

        {!compact &&
          hours.map((h) => (
            <div key={h} className='planner-hour' style={{ gridColumn: 1, gridRow: h - START_HOUR + 2 }}>
              {h}:00
            </div>
          ))}

        {events.map((e, idx) => (
          <div
            key={`${e.code}-${e.day}-${e.start}-${idx}`}
            className={`planner-event planner-event--${e.color}`}
            style={{
              gridColumn: e.day + colOffset,
              gridRow: `${Math.max(2, e.start - START_HOUR + 2)} / span ${e.duration}`,
            }}
          >
            <strong>{compact ? e.name : `${e.code} ${e.name}`}</strong>
            <span>{e.start}:00</span>
          </div>
        ))}
      </div>

      <div className='planner-agenda'>
        {FULL_DAYS.map((day, i) => {
          const dayEvents = events
            .filter((e) => e.day === i)
            .sort((a, b) => a.start - b.start)

          if (dayEvents.length === 0) return null

          return (
            <section key={day} className='agenda-day'>
              <h3>{day}</h3>
              <ul>
                {dayEvents.map((e, idx) => (
                  <li key={`${e.code}-${e.day}-${e.start}-${idx}`} className={`agenda-event planner-event--${e.color}`}>
                    <span className='agenda-time'>{e.start}:00 – {e.start + e.duration}:00</span>
                    <strong>{e.name}</strong>
                    <small>{e.code}</small>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}

        {events.length === 0 && <p className='list-empty'>Még nincs felvett órád.</p>}
      </div>
    </div>
  )
}

export default SchedulePlanner