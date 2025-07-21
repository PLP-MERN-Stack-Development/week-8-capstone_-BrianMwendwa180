import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function BugsList() {
  const { token } = useContext(AuthContext);
  const [bugs, setBugs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBugs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/bugs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setBugs(data);
      } else {
        setError(data.message || 'Failed to fetch bugs');
      }
    } catch (err) {
      setError('Failed to fetch bugs');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/bugs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
      if (response.ok) {
        setTitle('');
        setDescription('');
        fetchBugs();
      } else {
        setError(data.message || 'Failed to create bug');
      }
    } catch (err) {
      setError('Failed to create bug');
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Bugs List</h1>
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow-md max-w-md">
        <h2 className="text-xl font-semibold mb-2">Create New Bug</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Title"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Bug
        </button>
      </form>
      {loading ? (
        <p>Loading bugs...</p>
      ) : (
        <ul className="space-y-4 max-w-md">
          {bugs.map((bug) => (
            <li key={bug._id} className="bg-white p-4 rounded shadow">
              <Link to={`/bugs/${bug._id}`} className="text-blue-600 hover:underline text-lg font-semibold">
                {bug.title}
              </Link>
              <p className="text-gray-700">{bug.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BugsList;
