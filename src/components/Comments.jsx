import React, { useState } from "react";
import { useAuth } from "../firebase";

const Comments = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState({ username: "", text: "" });
  const { currentUser } = useAuth();

  const handleChange = (e) => {
    setNewComment({
      ...newComment,
      username: currentUser.email,
      text: e.target.value,
    });
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
      <textarea
        name="text"
        onChange={handleChange}
        placeholder="Skriv en kommentar"
      />
      <button onClick={handleAddComment}>Lägg till kommentar</button>
    </div>
  );
};

export default Comments;
