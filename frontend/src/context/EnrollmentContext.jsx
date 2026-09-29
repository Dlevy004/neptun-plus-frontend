import { createContext, useContext, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

import { mockCourses } from '../data/mockCourses'

const EnrollmentContext = createContext(null)

export function EnrollmentProvider({ children }) {
  const [courses, setCourses] = useState(mockCourses)

  const setStatus = (code, status) =>
    setCourses((prev) => prev.map((c) => (c.code === code ? { ...c, status } : c)))

  const value = useMemo(() => {
    const draft = courses.filter((c) => c.status === 'draft')
    const waitlist = courses.filter((c) => c.status === 'waitlist')
    const totalCredits = draft.reduce((sum, c) => sum + c.credits, 0)

    return { courses, draft, waitlist, totalCredits, setStatus }
  }, [courses])

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  )
}

EnrollmentProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function useEnrollment() {
  const ctx = useContext(EnrollmentContext)
  if (!ctx) throw new Error('useEnrollment csak EnrollmentProvider-en belül használható')
  return ctx
}