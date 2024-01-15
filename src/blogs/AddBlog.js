import Navbar from "../home/Navbar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";

const AddBlog = () => {
  const [posts, setPosts] = useState({
    likes: 0,
    likesBy: [],
    favorites: [],
  });
  const { createPost } = useAuth();
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setPosts({ ...posts, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handlePost = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    posts.userId = userId;
    createPost(posts);
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="signup template d-flex justify-content-center align-items-center vh-100 bg-dark-subtle">
        <div className="form_container p-5 w-50 rounded bg-white">
          <form>
            <h2 className="text-center mb-4">Post Your Blog</h2>

            <div className="mb-2">
              <label htmlFor="imageUrl">imageUrl</label>
              <input
                onChange={handleChangeInput}
                name="imageUrl"
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="title">Title</label>
              <input
                onChange={handleChangeInput}
                name="title"
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="description">Description</label>
              <textarea
                onChange={handleChangeInput}
                name="description"
                id="exampleFormControlTextArea1"
                rows="3"
                className="form-control"
              />
            </div>

            <div className="d-grid">
              <button
                onClick={handlePost}
                className="btn btn-primary btn-block"
                style={{ background: "black", borderColor: "black" }}
              >
                Post Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
