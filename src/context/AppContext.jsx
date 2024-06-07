// AppContext.jsx
import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "En dag i parken",
      author: "Jane Doe",
      text: "Idag var jag ute och gick i parken och njöt av det fina vädret.",
    },
    {
      id: 2,
      title: "Mitt favoritrecept",
      author: "John Smith",
      text: "Jag vill dela med mig av mitt favoritrecept på chokladkaka.",
    },
  ]);

  const [comments, setComments] = useState({});
  const addComment = (postId, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: [...(prevComments[postId] || []), comment],
    }));
  };

  const addBlogPost = (newPost) => {
    setBlogPosts((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <AppContext.Provider
      value={{ blogPosts, setBlogPosts, comments, addComment, addBlogPost }}
    >
      {children}
    </AppContext.Provider>
  );
};
