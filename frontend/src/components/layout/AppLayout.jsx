import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import './AppLayout.css'
import Sidebar from '../common/Sidebar'
import HamburgerMenu from '../common/HamburgerMenu'


function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(
    () => localStorage.getItem('isSidebarCollapsed') === 'true'
  )

  useEffect(() => {
    localStorage.setItem('isSidebarCollapsed', isCollapsed)
  }, [isCollapsed])

  return (
    <div className="app-layout">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        closeMobileMenu={() => setIsMobileMenuOpen(false)}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div className="mobile-topbar">
        <span className="mobile-topbar-logo">Neptun+</span>
        <HamburgerMenu
          isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(true)}
        />
      </div>

      <main className={`app-content ${isCollapsed ? 'app-content--collapsed' : ''}`}>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout