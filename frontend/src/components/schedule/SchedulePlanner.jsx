import './SchedulePlanner.css'

const DAYS = ['Hét', 'Kedd', 'Szer', 'Csüt', 'Pén']
const FULL_DAYS = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek']
const START_HOUR = 8
const END_HOUR = 20


function SchedulePlanner({ courses, compact = false }) {
  const events = courses.flatMap((c) =>
    c.schedule.map((s) => ({ ...s, code: c.code, name: c.name, color: c.color }))
  )
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

        {events.map((e) => (
          <div
            key={`${e.code}-${e.day}-${e.start}`}
            className={`planner-event planner-event--${e.color}`}
            style={{
              gridColumn: e.day + colOffset,
              gridRow: `${e.start - START_HOUR + 2} / span ${e.duration}`,
            }}
          >
            <strong>{compact ? e.name : `${e.code} ${e.name}`}</strong>
            <span>{e.start}:00</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SchedulePlanner