import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { EnrollmentProvider } from './context/EnrollmentContext'
import AppLayout from './components/layout/AppLayout'
import Courses from './pages/Courses'
import Calendar from './pages/Calendar'


function App() {
  return (
    <div className="app">
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2000,
        }}
      />
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
    </div>
  )
}

export default App