import { NavLink } from 'react-router-dom'

import PropTypes from "prop-types"

import './NavButton.css'


function NavButton({ IconComponent, title, url, onClick }) {
    return (
        <NavLink onClick={onClick} to={url} end className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
            <IconComponent aria-hidden="true"/>
            <p className="btn-title">{title}</p>
        </NavLink>
    )
}

NavButton.propTypes = {
    IconComponent: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export default NavButton