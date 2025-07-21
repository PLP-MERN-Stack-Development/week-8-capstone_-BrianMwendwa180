import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function CommentForm({ bugId, onCommentAdded }) {
  const { token } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`/api/bugs/${bugId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (response.ok) {
        setText('');
        onCommentAdded();
      } else {
        setError(data.message || 'Failed to add comment');
      }
    } catch (err) {
      setError('Failed to add comment');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Comment</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <textarea
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        rows={4}
        placeholder="Write your comment here..."
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Adding...' : 'Add Comment'}
      </button>
    </form>
  );
}

export default CommentForm;
