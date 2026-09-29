import PropTypes from 'prop-types'
import { Menu } from 'lucide-react'

import './HamburgerMenu.css'


function HamburgerMenu({ onClick, isOpen}) {
    return(
        <button
            type="button"
            className="hamburger"
            aria-label="Menü megnyitása"
            onClick={onClick}
            aria-expanded={isOpen}
        >
            <Menu className="hamburger-icon" strokeWidth={2.5} aria-hidden='true'/>
        </button>
    )
}

HamburgerMenu.propTypes = {
    onClick: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
}

export default HamburgerMenu