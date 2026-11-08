import { Link, useNavigate } from 'react-router-dom'
import { LogIn, LogOut } from 'lucide-react'

import './SidebarUser.css'

import { useAuth } from '../../context/AuthContext'


const getInitials = (user) => {
  const letters = [user.last_name, user.first_name].map((name) => name?.trim()[0]).filter(Boolean)
  return (letters.join('') || user.username?.[0] || '?').toUpperCase()
}


function SidebarUser() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return (
      <Link to='/login' className='sidebar-user-btn'>
        <LogIn aria-hidden='true' />
        <span className='sidebar-user-label'>Bejelentkezés</span>
      </Link>
    )
  }

  const fullName = `${user.last_name} ${user.first_name}`.trim() || user.username

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className='sidebar-user'>
      <div className='sidebar-user-card'>
        <span className='sidebar-user-avatar' aria-hidden='true'>{getInitials(user)}</span>

        <div className='sidebar-user-text'>
          <strong title={fullName}>{fullName}</strong>
          <small>{user.username}</small>
        </div>
      </div>

      <button
        type='button'
        className='sidebar-user-btn sidebar-user-btn--logout'
        onClick={handleLogout}
        title='Kijelentkezés'
        aria-label='Kijelentkezés'
      >
        <LogOut aria-hidden='true' />
        <span className='sidebar-user-label'>Kijelentkezés</span>
      </button>
    </div>
  )
}

export default SidebarUser