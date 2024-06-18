import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Comments from "./Comments";
import { useAuth } from "../firebase";

const BlogPosts = () => {
  const { blogPosts, comments, addComment, deleteBlogPost, updateBlogPost } = useContext(AppContext);
  const { currentUser } = useAuth();
  const [editPostId, setEditPostId] = useState(null);
  const [editPostData, setEditPostData] = useState({ title: "", text: "" });

  const handleAddComment = (postId, comment) => {
    addComment(postId, comment);
  };

  const handleEditPost = (postId, post) => {
    setEditPostId(postId);
    setEditPostData(post);
  };

  const handleSaveEdit = (postId) => {
    updateBlogPost({ ...editPostData, id: postId, author: currentUser.email });
    setEditPostId(null);
    setEditPostData({ title: "", text: "" });
  };

  const handleCancelEdit = () => {
    setEditPostId(null);
    setEditPostData({ title: "", text: "" });
  };

  const handleDeletePost = (postId) => {
    const postToDelete = blogPosts.find(post => post.id === postId);
    if (currentUser && postToDelete && currentUser.email === postToDelete.author) {
      deleteBlogPost(postId);
    } else {
      console.log("Du har inte behörighet att ta bort detta inlägg.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPostData({ ...editPostData, [name]: value });
  };

  return (
    <div>
      <h2>Senaste blogginläggen</h2>
      {blogPosts.map((post) => (
        <div key={post.id} className="post-card">
          {editPostId === post.id ? (
            <div>
              <input
                type="text"
                name="title"
                value={editPostData.title}
                onChange={handleChange}
                placeholder="Titel"
              />
              <textarea
                name="text"
                value={editPostData.text}
                onChange={handleChange}
                placeholder="Innehåll"
              />
              <button onClick={() => handleSaveEdit(post.id)}>Spara</button>
              <button onClick={handleCancelEdit}>Avbryt</button>
            </div>
          ) : (
            <div>
              <h3>{post.title}</h3>
              <p>
                <strong>Författare:</strong> {post.author}
              </p>
              <p>{post.text}</p>
              {currentUser && currentUser.email === post.author && (
                <div>
                  <button onClick={() => handleEditPost(post.id, post)}>Redigera</button>
                  <button onClick={() => handleDeletePost(post.id)}>Ta bort</button>
                </div>
              )}
            </div>
          )}
          <Comments
            postId={post.id}
            comments={comments[post.id] || []}
            onAddComment={(comment) => handleAddComment(post.id, comment)}
          />
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
