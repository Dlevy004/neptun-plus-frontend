const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';

const toNumericId = (id) => {
  if (typeof id === 'number') return id;
  const parsed = parseInt(String(id).replace(/\D/g, ''), 10);
  return isNaN(parsed) ? id : parsed;
};

const parseErrorMessage = (errorData, defaultMessage) => {
  if (!errorData || !errorData.detail) return defaultMessage;
  if (typeof errorData.detail === 'string') return errorData.detail;
  if (Array.isArray(errorData.detail)) {
    return errorData.detail.map(err => err.msg || JSON.stringify(err)).join(', ');
  }
  return JSON.stringify(errorData.detail);
};

export const fetchCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses`);
    if (!response.ok) {
      throw new Error('Nem sikerült a kurzusok betöltése a backendről.');
    }
    const data = await response.json();

    return data.map(course => ({
      id: course.id,
      code: `COURSE-${course.id}`,
      title: course.name || 'Ismeretlen kurzus',
      name: course.name || 'Ismeretlen kurzus',
      credits: 3,
      type: 'EA+GY',
      hours: '2+2',
      maxCapacity: course.max_capacity ?? 30,
      currentCapacity: course.current_capacity ?? 0,
      schedule: [
        { day: ((course.id - 1) % 5), start: 8 + ((course.id * 2) % 10), duration: 2 }
      ],
      color: course.id % 2 === 0 ? 'blue' : 'teal'
    }));
  } catch (error) {
    console.error('API Hiba (fetchCourses):', error);
    throw error;
  }
};

export const enrollCourseApi = async (userId, courseId) => {
  try {
    const cleanId = toNumericId(courseId);
    const response = await fetch(`${API_BASE_URL}/internal/courses/${cleanId}/reserve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(parseErrorMessage(errorData, 'Sikertelen tárgyfelvétel'));
    }

    return await response.json();
  } catch (error) {
    console.error('API Hiba (enrollCourseApi):', error);
    throw error;
  }
};

export const dropCourseApi = async (userId, courseId) => {
  try {
    const cleanId = toNumericId(courseId);
    const response = await fetch(`${API_BASE_URL}/internal/courses/${cleanId}/release`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(parseErrorMessage(errorData, 'Sikertelen tárgy leadás'));
    }

    return await response.json();
  } catch (error) {
    console.error('API Hiba (dropCourseApi):', error);
    throw error;
  }
};