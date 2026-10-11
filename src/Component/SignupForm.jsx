import { useState } from 'react';

const SignupForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;                           {/*can also be written as const name = e.target.name; const value = e.target.value;*/}
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Account created successfully!');
    onSwitchToLogin();
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">Create Account</h2>
      <p className="text-sm text-gray-500 text-center mb-6">Sign up to get started</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            name="username"
            placeholder="ashraf"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="ashraf@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-xs text-gray-500 hover:text-black"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
        >
          Sign Up
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?
        <button onClick={onSwitchToLogin} className="text-blue-600 font-medium hover:underline">
          Log in
        </button>
      </p>
    </div>
  );
};

export default SignupForm; 