import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setUser({ name: data.name, email: data.email });
        } else {
          setError(data.message || 'Failed to fetch user');
        }
      } catch (err) {
        setError('Failed to fetch user');
      }
    };
    fetchUser();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await fetch('/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Profile updated successfully');
      } else {
        setError(data.message || 'Update failed');
      }
    } catch (err) {
      setError('Update failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <label className="block mb-2">
          Name
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </label>
        <label className="block mb-4">
          Email
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
