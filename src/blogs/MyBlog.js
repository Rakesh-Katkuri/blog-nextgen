import React, { useEffect, useState } from "react";
import Navbar from "../home/Navbar";
import { useAuth } from "../authContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import BlogList from "./BlogList";

function MyBlog() {
  const { posts, getMyBlogs, deletePost, handleLike, handleFavorite } =
    useAuth();
  const loggedInUserId = localStorage.getItem("userId");
  const navigate = useNavigate();
  console.log("my blog post data", posts);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const fetchedBlogs = await getMyBlogs();
      } catch (error) {
        console.error("error fetching blogs", error);
      }
    };
    fetchMyBlogs();
  }, []);

  // const getMyBlogs = async (user) => {
  //   try {
  //     const response = await axios.get("http://localhost:3002/posts");
  //     console.log(response.data);
  //     const userId = localStorage.getItem("userId");
  //     const myBlog = response.data.filter((item) => item.userId === userId);
  //     setPost(myBlog);
  //     console.log("anoop my blog data", myBlog)
  //   } catch (error) {
  //     console.log("error in post request", error);
  //   }
  // };

  const handleLikes = (blogId) => {
    handleLike(blogId);
  };
  const handleFavorites = (blogId) => {
    handleFavorite(blogId);
  };
  return (
    <>
      <Navbar />
      {posts.length > 0 ? (
        <BlogList
          blogs={posts}
          handleLike={handleLikes}
          handleFavorite={handleFavorites}
          deletePost={deletePost}
        />
      ) : (
        <p>no blogs</p>
      )}
    </>
  );
}

export default MyBlog;
