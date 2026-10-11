import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCourses, enrollCourseApi, dropCourseApi } from '../services/courseService';

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

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCourses();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // Kurzus felvétele
  const enrollCourse = async (courseId) => {
    try {
      await enrollCourseApi(currentUserId, courseId);
      
      // Típusfüggetlen keresés (szám vs string kezelése)
      const courseToAdd = courses.find(
        c => String(c.id) === String(courseId) || c.code === courseId
      );

      if (courseToAdd) {
        setEnrolledCourses(prev => {
          if (prev.some(c => String(c.id) === String(courseToAdd.id))) return prev;
          return [...prev, courseToAdd];
        });
      }

      await loadCourses();
    } catch (err) {
      alert(`Hiba a tárgy felvételekor: ${err.message}`);
    }
  };

  // Kurzus leadása
  const dropCourse = async (courseId) => {
    try {
      await dropCourseApi(currentUserId, courseId);
      
      setEnrolledCourses(prev => 
        prev.filter(c => String(c.id) !== String(courseId) && c.code !== courseId)
      );
      
      await loadCourses();
    } catch (err) {
      alert(`Hiba a tárgy leadásakor: ${err.message}`);
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
        refreshCourses: loadCourses
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};