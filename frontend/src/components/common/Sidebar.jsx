import PropTypes from 'prop-types'
import { BookOpenText, CalendarDays } from 'lucide-react'

import './Sidebar.css'

import NavButton from './NavButton'
import MobileMenu from './MobileMenu'
import HideButton from './HideButton'


function SideNavbar({ isMobileMenuOpen, closeMobileMenu, isCollapsed, setIsCollapsed }) {
    const adminNavLinks = (
        <>
            <NavButton IconComponent={BookOpenText} title='Kurzusok' url='/courses' onClick={closeMobileMenu} />
            <NavButton IconComponent={CalendarDays} title='Órarend' url='/calendar' onClick={closeMobileMenu} />
        </>
    )

    return (
        <>
            <nav
                className={isCollapsed ? 'sidenav-collapsed' : 'sidenav-container'}
                aria-label="Oldalnavigációs menü"
            >
                <div className='sidenav-top'>
                    <a href='/courses' aria-label="Ugrás a kurzusok oldalra">
                        <img
                            src={isCollapsed ? '/neptun-logo2.svg' : '/neptun-logo1.svg'}
                            className='neptunLogo'
                            alt='Neptun+ logó'
                            draggable='false'
                        />
                    </a>

                    {adminNavLinks}
                </div>

                <HideButton isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
            </nav>

            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={closeMobileMenu}
                className='admin-mobile-menu'
            >
                <nav
                    className='admin-mobile-links'
                    onClick={closeMobileMenu}
                    aria-label="Navigációs mobil menü"
                >
                    {adminNavLinks}
                </nav>
            </MobileMenu>
        </>
    )
}

SideNavbar.propTypes = {
    isMobileMenuOpen: PropTypes.bool.isRequired,
    closeMobileMenu: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired
}

export default SideNavbar