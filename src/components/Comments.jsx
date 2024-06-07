import React, { useState } from "react";

const Comments = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState({ username: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleAddComment = () => {
    onAddComment(newComment);
    setNewComment({ username: "", text: "" });
  };

  return (
    <div className="comment-input">
      <h3>Kommentarer</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <p>
              <strong>{comment.username}:</strong> {comment.text}
            </p>
          </li>
        ))}
      </ul>
      <input
        type="text"
        name="username"
        value={newComment.username}
        onChange={handleChange}
        placeholder="Användarnamn"
      />
      <textarea
        name="text"
        value={newComment.text}
        onChange={handleChange}
        placeholder="Skriv en kommentar"
      />
      <button onClick={handleAddComment}>Lägg till kommentar</button>
    </div>
  );
};

export default Comments;
