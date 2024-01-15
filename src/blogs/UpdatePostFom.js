import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";
import Navbar from "../home/Navbar";

const UpdatePostForm = () => {
  const { posts, updatePost, getMyBlogs, setPosts } = useAuth();
  console.log("posts data", posts);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [updatedPost, setUpdatedPost] = useState({
    imageUrl: "",
    title: "",
    description: "",
  });
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postToUpdate = posts?.find((post) => post.id === postId);
    console.log("parseint", postId);
    console.log("postToUpdate", postToUpdate);
    if (postToUpdate) {
      setUpdatedPost({
        imageUrl: postToUpdate.imageUrl,
        title: postToUpdate.title,
        description: postToUpdate.description,
      });
    }
  }, [postId, posts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost({
      ...updatedPost,
      [name]: value,
    });
    console.log("handleInputChange", updatedPost);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    updatedPost.userId = userId;
    console.log("handleSubmit", updatedPost);
    updatePost({
      id: parseInt(postId),
      ...updatedPost,
    });
    navigate("/my-blogs");
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <form>
          <h2 className="text-center mb-4">Edit Your Blog</h2>

          <div className="mb-2">
            <label htmlFor="imageUrl">imageUrl</label>
            <input
              onChange={handleInputChange}
              value={updatedPost.imageUrl}
              name="imageUrl"
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="title">Title</label>
            <input
              onChange={handleInputChange}
              value={updatedPost.title}
              name="title"
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="description">Description</label>
            <textarea
              onChange={handleInputChange}
              value={updatedPost.description}
              name="description"
              id="exampleFormControlTextArea1"
              rows="3"
              className="form-control"
            />
          </div>

          <div className="d-grid">
            <button
              onClick={handleSubmit}
              className="btn btn-primary btn-block"
              style={{ background: "black", borderColor: "black" }}
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default UpdatePostForm;
