import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import './AppLayout.css'

import Sidebar from '../common/Sidebar'


function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="app-layout">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        closeMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout