const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const toNumericId = (id) => {
  if (typeof id === 'number') return id;
  const parsed = parseInt(String(id).replace(/\D/g, ''), 10);
  return isNaN(parsed) ? id : parsed;
};

export const fetchCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses`);
    if (!response.ok) throw new Error('Nem sikerült a kurzusok betöltése.');
    const data = await response.json();

    return data.map(course => ({
      id: course.id,
      code: `COURSE-${course.id}`,
      title: course.name,
      name: course.name,
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

export const fetchUserEnrollments = async (userId = 1) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}/enrollments`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.enrolled_course_ids || [];
  } catch (error) {
    console.error('API Hiba (fetchUserEnrollments):', error);
    return [];
  }
};

export const enrollCourseApi = async (userId, courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        course_id: toNumericId(courseId)
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = typeof errorData.detail === 'string'
        ? errorData.detail
        : 'Sikertelen tárgyfelvétel';
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    console.error('API Hiba (enrollCourseApi):', error);
    throw error;
  }
};

export const dropCourseApi = async (userId, courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/drop`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        course_id: toNumericId(courseId)
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = typeof errorData.detail === 'string'
        ? errorData.detail
        : 'Sikertelen tárgy leadás';
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    console.error('API Hiba (dropCourseApi):', error);
    throw error;
  }
};