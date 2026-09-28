import { useEffect } from 'react'

import PropTypes from 'prop-types'
import { X } from 'lucide-react'

import './MobileMenu.css'


function MobileMenu({ isOpen, onClose, children, className = '' }) {
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = isOpen ? 'hidden' : originalOverflow;

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    return (
        <nav className={`nav-mobile ${isOpen ? 'show' : ''} ${className}`} aria-hidden={!isOpen} aria-label='Mobil navigáció'>
            <button
                className="close-btn"
                aria-label="Menü bezárása"
                onClick={onClose}
            >
                <X className="close-icon" aria-hidden='true'/>
            </button>
            <div className="mobile-menu-content">
                {children}
            </div>
        </nav>
    )
}

MobileMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}

export default MobileMenu