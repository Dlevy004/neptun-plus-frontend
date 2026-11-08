import PropTypes from 'prop-types'
import { BookOpenText, CalendarDays, Clock } from 'lucide-react'

import './AuthLayout.css'

const FEATURES = [
  { icon: BookOpenText, text: 'Kurzusok böngészése és felvétele' },
  { icon: CalendarDays, text: 'Heti órarend tervező' },
  { icon: Clock, text: 'Várólista követése' },
]


function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className='auth-page'>
      <aside className='auth-brand'>
        <div className='auth-brand-inner'>
          <p className='auth-wordmark'>Neptun<span>+</span></p>
          <h2>Tárgyfelvétel egyszerűen.</h2>

          <ul className='auth-features'>
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text}>
                <span className='auth-feature-icon'><Icon size={18} aria-hidden='true' /></span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className='auth-main'>
        <section className='auth-card'>
          <img className='auth-mobile-logo' src='/neptun-logo1.svg' alt='Neptun+ logó' draggable='false' />

          <header className='auth-header'>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </header>

          {children}

          {footer && <p className='auth-footer'>{footer}</p>}
        </section>
      </main>
    </div>
  )
}

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node
}

export default AuthLayout