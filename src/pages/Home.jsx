import React, { useContext, useState } from "react";
import BlogPosts from "../components/BlogPosts";
import { AppContext } from "../context/AppContext";
import { useAuth } from "../firebase"; // Uppdaterad import här

const Home = () => {
  const { addBlogPost } = useContext(AppContext);
  const { currentUser } = useAuth(); // Uppdaterad användning här
  const [newPost, setNewPost] = useState({ title: "", text: "" });

  const handleAddPost = () => {
    const postToAdd = {
      id: Math.random(),
      title: newPost.title,
      author: currentUser.email, // Använd inloggad användares email
      text: newPost.text,
    };

    addBlogPost(postToAdd);
    setNewPost({ title: "", text: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  return (
    <div>
      <h2>Home</h2>
      <p>Välkommen till vår blogg!</p>
      {currentUser && (
        <div className="form-container">
          <h3>Lägg till nytt inlägg</h3>
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleChange}
            placeholder="Titel"
          />
          <textarea
            name="text"
            value={newPost.text}
            onChange={handleChange}
            placeholder="Innehåll"
          />
          <button onClick={handleAddPost}>Lägg till</button>
        </div>
      )}
      <BlogPosts />
    </div>
  );
};

export default Home;
