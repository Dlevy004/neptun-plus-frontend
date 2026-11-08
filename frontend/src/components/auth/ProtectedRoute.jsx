import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import FullPageLoader from '../common/FullPageLoader'


function ProtectedRoute() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <FullPageLoader />
  if (!user) return <Navigate to='/login' replace />

  return <Outlet />
}

export default ProtectedRoute