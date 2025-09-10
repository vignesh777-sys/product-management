// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return setError("Fill all fields");
    // dummy login, store auth flag
    localStorage.setItem('auth', 'true');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-600 mb-3">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md"/>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md"/>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Login</Button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
