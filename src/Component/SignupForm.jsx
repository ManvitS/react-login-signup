import { useState } from 'react';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = (name, value, currentFormData = formData) => {
    let errorMsg = '';

    if (name === 'email') {
      if (!value.trim()) {
        errorMsg = 'Email is required';
      } else if (!EMAIL_REGEX.test(value)) {
        errorMsg = 'Invalid email address';
      }
    }

    if (name === 'password') {
      if (!PASSWORD_REGEX.test(value)) {
        errorMsg = 'Requires 8+ chars with uppercase, lowercase, number & symbol';
      }
    }

    if (name === 'confirmPassword') {
      if (value !== currentFormData.password) {
        errorMsg = 'Passwords do not match';
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    setTouched((prev) => ({ ...prev, [name]: true }));
    validate(name, value, updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    const isEmailValid = EMAIL_REGEX.test(formData.email);
    const isPasswordValid = PASSWORD_REGEX.test(formData.password);
    const isMatch = formData.password === formData.confirmPassword;

    if (isEmailValid && isPasswordValid && isMatch && formData.username.trim()) {
      alert('Account created successfully!');
      onSwitchToLogin();
    }
  };

  const getInputClass = (name) => {
    if (!touched[name]) return 'border-gray-300';
    return errors[name] ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50';
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
            className={`w-full px-3 py-2 border rounded-md outline-none ${getInputClass('email')}`}
            required
          />
          {touched.email && errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
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
              className={`w-full px-3 py-2 border rounded-md outline-none ${getInputClass('password')}`}
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
          {touched.password && errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
          {touched.password && !errors.password && formData.password && (
            <p className="text-green-600 text-xs mt-1">Strong password</p>
          )}
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
            className={`w-full px-3 py-2 border rounded-md outline-none ${getInputClass('confirmPassword')}`}
            required
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
          )}
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
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          type="button"
          className="text-blue-600 font-medium hover:underline"
        >
          Log in
        </button>
      </p>
    </div>
  );
};

export default SignupForm;