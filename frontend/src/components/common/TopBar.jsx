import PropTypes from 'prop-types'

import './TopBar.css'


function TopBar({ title, subtitle, children }) {
    return (
        <header className='top-bar'>
            <div className='top-bar-text'>
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
            </div>

            {children && <div className='top-bar-actions'>{children}</div>}
        </header>
    )
}

TopBar.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    children: PropTypes.node
}

export default TopBar