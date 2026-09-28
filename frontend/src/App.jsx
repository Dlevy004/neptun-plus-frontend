import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import AppLayout from './components/layout/AppLayout'
import Courses from './pages/Courses'
import Calender from './pages/Calendar'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to='/courses' replace />} />
          <Route path='courses' element={<Courses />} />
          <Route path='calendar' element={<Calender />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App