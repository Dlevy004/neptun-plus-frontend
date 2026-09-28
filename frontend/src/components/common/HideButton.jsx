import PropTypes from 'prop-types'

import { ChevronUp } from 'lucide-react'


export default function HideButton({ isCollapsed, setIsCollapsed }) {
    return (
        <button
            className='hide-btn'
            onClick={() => setIsCollapsed(prev => !prev)}
            aria-label={isCollapsed ? 'Menü kinyitása' : 'Menü összecsukása'}
            aria-expanded={!isCollapsed}
        >
            <ChevronUp aria-hidden="true" />
        </button>
    )
}

HideButton.propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired
}