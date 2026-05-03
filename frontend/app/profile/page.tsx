
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { authAPI, courseAPI } from '../../services/api';
import Navbar from '../../components/Navbar';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await authAPI.getMe();
      console.log('Profile API Response:', response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const isCourseCompleted = (courseId: string) => {
    const progress = user?.progress?.find((p: any) => p.courseId.toString() === courseId);
    return progress?.passed;
  };

  const getCourseProgress = (courseId: string) => {
    return user?.progress?.find((p: any) => p.courseId.toString() === courseId);
  };

  const enrolledCourses = user?.enrolledCourses?.filter((course: any) => !isCourseCompleted(course._id)) || [];
  const completedCourses = user?.enrolledCourses?.filter((course: any) => isCourseCompleted(course._id)) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            <p className="text-xl mb-2"><strong>Name:</strong> {user.name}</p>
            <p className="text-xl mb-2"><strong>Email:</strong> {user.email}</p>
            <p className="text-xl"><strong>Role:</strong> {user.role}</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-6">Enrolled Courses</h2>
            {enrolledCourses.length === 0 ? (
              <p className="text-gray-600">No enrolled courses yet. <Link href="/" className="text-blue-600 hover:underline">Browse courses</Link></p>
            ) : (
              <div className="space-y-4">
                {enrolledCourses.map((course: any) => {
                  const progress = getCourseProgress(course._id);
                  return (
                    <div key={course._id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold">
                            <Link href={`/course/${course._id}`} className="text-blue-600 hover:underline">
                              {course.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600">{course.description}</p>
                          {progress && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Progress: {progress.completedModules.length} / {course.modules.length} modules
                              </p>
                              <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${(progress.completedModules.length / course.modules.length) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                        <Link
                          href={`/course/${course._id}`}
                          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          Resume Course
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Completed Courses</h2>
            {completedCourses.length === 0 ? (
              <p className="text-gray-600">No completed courses yet.</p>
            ) : (
              <div className="space-y-4">
                {completedCourses.map((course: any) => {
                  const progress = getCourseProgress(course._id);
                  return (
                    <div key={course._id} className="border p-4 rounded-lg bg-green-50">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-semibold">
                              <Link href={`/course/${course._id}`} className="text-blue-600 hover:underline">
                                {course.title}
                              </Link>
                            </h3>
                            <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">Completed</span>
                          </div>
                          <p className="text-gray-600">{course.description}</p>
                          {progress && (
                            <p className="mt-2 text-sm text-gray-500">
                              Score: {progress.testScore.toFixed(1)}%
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            courseAPI.getCertificate(course._id).then((response) => {
                              const url = window.URL.createObjectURL(new Blob([response.data]));
                              const link = document.createElement('a');
                              link.href = url;
                              link.setAttribute('download', `certificate-${course.title}.pdf`);
                              document.body.appendChild(link);
                              link.click();
                            }).catch((error: any) => {
                              alert(error.response?.data?.message || 'Failed to download certificate');
                            });
                          }}
                          className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                        >
                          Download Certificate
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
