import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { EnrollmentProvider } from './context/EnrollmentContext'
import AppLayout from './components/layout/AppLayout'
import Courses from './pages/Courses'
import Calendar from './pages/Calendar'


function App() {
  return (
    <EnrollmentProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to='/courses' replace />} />
            <Route path='courses' element={<Courses />} />
            <Route path='calendar' element={<Calendar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </EnrollmentProvider>
  )
}

export default App