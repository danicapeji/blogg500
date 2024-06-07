import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Comments from "./Comments";

const BlogPosts = () => {
  const { blogPosts, comments, addComment, addBlogPost } =
    useContext(AppContext);

  const handleAddComment = (postId, comment) => {
    addComment(postId, comment);
  };

  return (
    <div>
      <h2>Senaste blogginläggen</h2>
      {blogPosts.map((post) => (
        <div key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <p>
            <strong>Författare:</strong> {post.author}
          </p>
          <p>{post.text}</p>
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
