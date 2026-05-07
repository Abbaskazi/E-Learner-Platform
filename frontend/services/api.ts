
import axios from 'axios';

//const API_URL = 'http://127.0.0.1:32691/api';
//const API_URL = 'http://192.168.49.2:32691/api';
//const API_URL = 'http://localhost:5000/api';
const API_URL = 'http://localhost:5000/api';
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const authAPI = {
  register: (data: { name: string; email: string; password: string; role?: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  logout: () => api.get('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

export const courseAPI = {
  getCourses: () => api.get('/courses'),
  getCourse: (id: string) => api.get(`/courses/${id}`),
  enrollCourse: (courseId: string) => api.post(`/courses/enroll/${courseId}`),
  updateProgress: (courseId: string, moduleId: string) =>
    api.post(`/courses/progress/${courseId}/module/${moduleId}`),
  submitTest: (courseId: string, answers: string[]) =>
    api.post(`/courses/test/${courseId}/submit`, { answers }),
  getCertificate: (courseId: string) =>
    api.get(`/courses/certificate/${courseId}`, { responseType: 'blob' }),
};

export default api;
