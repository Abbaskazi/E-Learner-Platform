
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { courseAPI, authAPI } from '../services/api';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

interface Course {
  _id: string;
  title: string;
  description: string;
  modules: any[];
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, userRes] = await Promise.all([
        courseAPI.getCourses(),
        authAPI.getMe(),
      ]);
      setCourses(coursesRes.data.courses);
      setUser(userRes.data.user);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
          {loading ? (
            <div className="text-center py-8">Loading courses...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Link
                  key={course._id}
                  href={`/course/${course._id}`}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="text-sm text-gray-500">{course.modules.length} modules</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
