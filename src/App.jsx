import { useState } from 'react';
import LoginForm from './Component/LoginForm';
import SignupForm from './Component/SignupForm';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-linear-to-r from-blue-500 to-indigo-200 flex flex-col items-center justify-center p-4">
      {/* Toggle Buttons */}
      <div className="bg-gray-300 p-1 rounded-lg flex gap-2 mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-4 py-2 rounded-md font-medium ${isLogin ? 'bg-white text-blue-600' : 'text-gray-700 hover:text-black'}`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-4 py-2 rounded-md font-medium ${!isLogin ? 'bg-white text-blue-600' : 'text-gray-700 hover:text-black'}`}
        >
          Signup
        </button>
      </div>

      {/* Forms ko  render karein */}
      {isLogin ? (
        <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
      ) : (
        <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </main>
  );
}