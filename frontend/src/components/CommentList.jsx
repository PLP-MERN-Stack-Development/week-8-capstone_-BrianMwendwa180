import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function CommentList({ bugId }) {
  const { token } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/bugs/${bugId}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setComments(data);
      } else {
        setError(data.message || 'Failed to fetch comments');
      }
    } catch (err) {
      setError('Failed to fetch comments');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [bugId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (comments.length === 0) return <p>No comments yet.</p>;

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id} className="border-b border-gray-200 py-2">
            <p>{comment.text}</p>
            <p className="text-sm text-gray-500">By {comment.authorName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
