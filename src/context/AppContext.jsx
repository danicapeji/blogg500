import React, { createContext, useState } from "react";
import { auth } from "../firebase/firebase";

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
  const [user, setUser] = useState(null);

  const loginWithEmailPassword = async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error("Error signing in with email and password:", error);
    }
  };

  const registerWithEmailPassword = async (email, password) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error("Error registering with email and password:", error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const addComment = (postId, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: [...(prevComments[postId] || []), comment],
    }));
  };

  const addBlogPost = (newPost) => {
    setBlogPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const deleteBlogPost = (postId) => {
    setBlogPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
  };

  const updateBlogPost = (updatedPost) => {
    setBlogPosts((prevPosts) => prevPosts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
  };

  return (
    <AppContext.Provider
      value={{
        blogPosts,
        setBlogPosts,
        comments,
        addComment,
        addBlogPost,
        deleteBlogPost,
        updateBlogPost,
        user,
        loginWithEmailPassword,
        registerWithEmailPassword,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
