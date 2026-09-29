import './Card.css'


function Card({ title, aside, className = '', children }) {
  return (
    <section className={`card ${className}`}>
      {(title || aside)
        &&
        (
          <header className='card-header'>
            <h2 className='card-title'>{title}</h2>
            {aside}
          </header>
        )
      }
      {children}
    </section>
  )
}

export default Card