import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { EnrollmentProvider } from './context/EnrollmentContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import GuestRoute from './components/auth/GuestRoute'
import AppLayout from './components/layout/AppLayout'
import Courses from './pages/Courses'
import Calendar from './pages/Calendar'
import Login from './pages/Login'
import Register from './pages/Register'


function App() {
  return (
    <AuthProvider>
      <EnrollmentProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<GuestRoute />}>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate to='/courses' replace />} />
                <Route path='courses' element={<Courses />} />
                <Route path='calendar' element={<Calendar />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </EnrollmentProvider>
    </AuthProvider>
  )
}

export default App