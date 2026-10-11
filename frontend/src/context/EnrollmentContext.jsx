import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { 
  fetchCourses, 
  fetchUserEnrollments, 
  enrollCourseApi, 
  dropCourseApi 
} from '../services/courseService';

export const EnrollmentContext = createContext();

export const useEnrollment = () => {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error('useEnrollment-nek az EnrollmentProvider-en belül kell lennie!');
  }
  return context;
};

export const EnrollmentProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUserId = 1;

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [allCourses, enrolledIds] = await Promise.all([
        fetchCourses(),
        fetchUserEnrollments(currentUserId)
      ]);

      setCourses(allCourses);

      const userEnrolled = allCourses.filter(c => enrolledIds.includes(c.id));
      setEnrolledCourses(userEnrolled);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const enrollCourse = async (courseId) => {
    try {
      const result = await enrollCourseApi(currentUserId, courseId);

      toast.success(result.message || 'Sikeres tárgyfelvétel!');

      await loadData();
    } catch (err) {
      toast.error(err.message || 'Sikertelen tárgyfelvétel!');
    }
  };

  const dropCourse = async (courseId) => {
    try {
      const result = await dropCourseApi(currentUserId, courseId);

      toast.success(result.message || 'Sikeres tárgy leadás!');

      await loadData();
    } catch (err) {
      toast.error(err.message || 'Sikertelen tárgy leadás!');
    }
  };

  return (
    <EnrollmentContext.Provider
      value={{
        courses,
        enrolledCourses,
        loading,
        error,
        enrollCourse,
        dropCourse,
        refreshCourses: loadData
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};