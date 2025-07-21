import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

function BugDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [bug, setBug] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBug = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/bugs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setBug(data);
        setTitle(data.title);
        setDescription(data.description);
      } else {
        setError(data.message || 'Failed to fetch bug');
      }
    } catch (err) {
      setError('Failed to fetch bug');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBug();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`/api/bugs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
      if (response.ok) {
        setBug(data);
      } else {
        setError(data.message || 'Failed to update bug');
      }
    } catch (err) {
      setError('Failed to update bug');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this bug?')) return;
    try {
      const response = await fetch(`/api/bugs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        navigate('/bugs');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete bug');
      }
    } catch (err) {
      setError('Failed to delete bug');
    }
  };

  if (loading) return <p>Loading bug details...</p>;
  if (!bug) return <p>No bug found.</p>;

  return (
    <div className="min-h-screen p-4 bg-gray-100 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Bug Details</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleUpdate} className="bg-white p-4 rounded shadow mb-6">
        <label className="block mb-2">
          Title
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          Description
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Update Bug
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
          >
            Delete Bug
          </button>
        </div>
      </form>
      <CommentList bugId={id} />
      <CommentForm bugId={id} onCommentAdded={fetchBug} />
    </div>
  );
}

export default BugDetails;
