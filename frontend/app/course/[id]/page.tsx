
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { courseAPI, authAPI } from '../../../services/api';
import Navbar from '../../../components/Navbar';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const [course, setCourse] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [processingModule, setProcessingModule] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, [courseId]);

  const fetchData = async () => {
    try {
      const [courseRes, userRes] = await Promise.all([
        courseAPI.getCourse(courseId),
        authAPI.getMe(),
      ]);
      setCourse(courseRes.data.course);
      setUser(userRes.data.user);

      const progress = userRes.data.user.progress.find(
        (p: any) => p.courseId.toString() === courseId
      );
      if (progress) {
        const completedCount = progress.completedModules.length;
        if (completedCount < courseRes.data.course.modules.length) {
          setCurrentModuleIndex(completedCount);
        } else {
          setCurrentModuleIndex(completedCount - 1);
        }
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const isEnrolled = course?.isEnrolled;
  const progress = user?.progress?.find((p: any) => p.courseId.toString() === courseId);
  const completedModules = progress?.completedModules || [];
  const allModulesCompleted = completedModules.length === course?.modules?.length;

  const isModuleCompleted = (moduleId: string) => {
    return completedModules.some((id: string) => id.toString() === moduleId.toString());
  };

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await courseAPI.enrollCourse(courseId);
      window.location.reload();
    } catch (error: any) {
      console.error('Enrollment failed:', error);
      alert(error.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  };

  const handleNextModule = async () => {
    if (!course || !user) return;
    const currentModule = course.modules[currentModuleIndex];
    setProcessingModule(true);
    try {
      await courseAPI.updateProgress(courseId, currentModule._id);
      if (currentModuleIndex < course.modules.length - 1) {
        setCurrentModuleIndex(currentModuleIndex + 1);
      }
      fetchData();
    } catch (error: any) {
      console.error('Failed to update progress:', error);
      alert(error.response?.data?.message || 'Failed to update progress');
    } finally {
      setProcessingModule(false);
    }
  };

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
        <div className="max-w-7xl mx-auto px-4 py-8">
          {!isEnrolled ? (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-gray-600 mb-6">{course.description}</p>
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-lg">Modules:</h3>
                <div className="space-y-2">
                  {course.modules.map((module: any, index: number) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-700">
                      <span className="font-semibold w-8">{index + 1}.</span>
                      <span>{module.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-lg font-semibold"
              >
                {enrolling ? 'Enrolling...' : 'Enroll Now'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
                  <h3 className="text-xl font-bold mb-4">Course Modules</h3>
                  <div className="space-y-2">
                    {course.modules.map((module: any, index: number) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          index === currentModuleIndex
                            ? 'bg-blue-100 border-2 border-blue-500'
                            : isModuleCompleted(module._id)
                            ? 'bg-green-50 border border-green-300'
                            : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                        }`}
                        onClick={() => {
                          if (index <= completedModules.length) {
                            setCurrentModuleIndex(index);
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            {index + 1}. {module.title}
                          </span>
                          {isModuleCompleted(module._id) && (
                            <span className="text-green-600 font-semibold">✓</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                    <p className="font-semibold mb-2">
                      Progress: {completedModules.length} / {course.modules.length}
                    </p>
                    <div className="w-full bg-gray-300 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${(completedModules.length / course.modules.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                  
                  {!allModulesCompleted ? (
                    <div>
                      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        Module {currentModuleIndex + 1}: {course.modules[currentModuleIndex].title}
                      </h2>
                      <div className="prose max-w-none mb-8 text-gray-700 leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: course.modules[currentModuleIndex].content.replace(/\n/g, '<br />') }} />
                      </div>
                      
                      {!isModuleCompleted(course.modules[currentModuleIndex]._id) ? (
                        <button
                          onClick={handleNextModule}
                          disabled={processingModule}
                          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 text-lg font-semibold"
                        >
                          {processingModule ? 'Processing...' : 
                            (currentModuleIndex === course.modules.length - 1 ? 'Complete & Go to Test' : 'Next Module')}
                        </button>
                      ) : (
                        <div className="flex space-x-4">
                          {currentModuleIndex < course.modules.length - 1 && (
                            <button
                              onClick={() => setCurrentModuleIndex(currentModuleIndex + 1)}
                              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold"
                            >
                              Next Module
                            </button>
                          )}
                          {currentModuleIndex === course.modules.length - 1 && (
                            <button
                              onClick={() => router.push(`/test/${courseId}`)}
                              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 text-lg font-semibold"
                            >
                              Go to Test
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="mb-8 p-6 bg-green-100 rounded-lg">
                        <p className="text-green-800 font-semibold text-xl">All modules completed!</p>
                      </div>
                      {progress?.passed ? (
                        <div>
                          <div className="mb-8 p-6 bg-green-100 rounded-lg">
                            <p className="text-green-800 font-semibold text-xl">
                              Test passed! Score: {progress.testScore.toFixed(1)}%
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              courseAPI.getCertificate(courseId).then((response) => {
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
                            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 mr-4 text-lg font-semibold"
                          >
                            Download Certificate
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => router.push(`/test/${courseId}`)}
                          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold"
                        >
                          Take Test
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
