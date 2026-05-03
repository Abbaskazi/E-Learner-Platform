
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { courseAPI, authAPI } from '../../../services/api';
import Navbar from '../../../components/Navbar';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

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
      setAnswers(new Array(courseRes.data.course.mcqs.length).fill(''));

      const progress = userRes.data.user.progress.find(
        (p: any) => p.courseId.toString() === courseId
      );
      if (progress && progress.completedModules.length < courseRes.data.course.modules.length) {
        alert('Please complete all modules first!');
        router.push(`/course/${courseId}`);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (answers.includes('')) {
      alert('Please answer all questions');
      return;
    }
    setSubmitting(true);
    try {
      const response = await courseAPI.submitTest(courseId, answers);
      setResult(response.data);
    } catch (error: any) {
      console.error('Failed to submit test:', error);
      alert(error.response?.data?.message || 'Failed to submit test');
    } finally {
      setSubmitting(false);
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
        <div className="max-w-4xl mx-auto px-4 py-8">
          {result ? (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold mb-6">Test Results</h1>
              <div className={`p-6 rounded-lg mb-6 ${result.passed ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className="text-2xl font-semibold mb-2">
                  {result.passed ? 'Congratulations! You Passed!' : 'You Failed. Try Again!'}
                </p>
                <p className="text-xl">Score: {result.score.toFixed(1)}%</p>
                <p className="text-lg">Correct: {result.correct} / {result.total}</p>
                <p className="text-lg">Passing Score: {course.passingCriteria}%</p>
              </div>
              <button
                onClick={() => router.push(`/course/${courseId}`)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Back to Course
              </button>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold mb-6">{course.title} - Test</h1>
              <p className="text-gray-600 mb-6">Passing criteria: {course.passingCriteria}%</p>
              <div className="space-y-6">
                {course.mcqs.map((mcq: any, index: number) => (
                  <div key={index} className="border-b pb-6">
                    <p className="font-semibold mb-4">
                      {index + 1}. {mcq.question}
                    </p>
                    <div className="space-y-2">
                      {mcq.options.map((option: string, optIndex: number) => (
                        <label key={optIndex} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={answers[index] === option}
                            onChange={() => handleAnswerChange(index, option)}
                            className="w-4 h-4"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Test'}
              </button>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
