import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Courses from './pages/Courses'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/courses' element={<Courses />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App