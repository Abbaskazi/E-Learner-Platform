
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authAPI } from '../services/api';

interface NavbarProps {
  user?: any;
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">E-Learning Platform</Link>
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link href="/" className="hover:text-blue-400">Courses</Link>
              <Link href="/profile" className="hover:text-blue-400">Profile</Link>
              <span className="text-blue-300">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-400">Login</Link>
              <Link href="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
