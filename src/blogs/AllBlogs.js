import React, { useContext, useEffect, useState } from "react";
import Navbar from "../home/Navbar";
import { useAuth } from "../authContext/AuthContext";
import "./style.css";
import axios from "axios";
// import BlogList from "./BlogList";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogList from "./BlogList1";

//redux
// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "../redux/reducer/likesSlice";
// import { updateLikes } from "../redux/actions/likesAction";

const AllBlogs = () => {
  //Accessing posts and update fun from ContexApi
  const { posts, getBlogs, updatePost, loggedIn, handleFavorite, handleLike } =
    useAuth();

  //Retrieving the userId from LocalStorage
  const userId = localStorage.getItem("userId");
  const location = useLocation(); // Get the current location

  // const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await getBlogs();
      } catch (error) {
        console.error("error fetching blogs", error);
      }
    };
    fetchBlogs();
  }, [location.pathname]);

  const handleLikes = (blogId) => {
    handleLike(blogId);
  };
  const handleFavorites = (blogId) => {
    handleFavorite(blogId);
  };

  // //function to handle post likes
  // const handleLike = async (blogId) => {
  //   console.log("handleLike function called");
  //   const userId = localStorage.getItem("userId");
  //   if (!userId) {
  //     toast.error("Please log in to like the post!", {
  //       position: "top-center",
  //       autoClose: 1000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //     return; // Do not proceed if the user is not logged in
  //   }

  //   try {
  //     const response = await axios.get(`http://localhost:3002/posts/${blogId}`);
  //     const post = response.data;

  //     const userId = localStorage.getItem("userId");
  //     const userLiked = post.likesBy.includes(userId);

  //     if (userLiked) {
  //       post.likes -= 1;
  //       post.likesBy = post.likesBy.filter((id) => id !== userId);
  //       toast.info("Post Unliked!", {
  //         position: "top-center",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //     } else {
  //       post.likes += 1;
  //       post.likesBy.push(userId);
  //       toast.success("Post Liked!", {
  //         position: "top-center",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //     }
  //     console.log(post, "all blogs likes");
  //     await updatePost(post);
  //     // dispatch(updateLikes(post))
  //   } catch (error) {
  //     console.log("error updating post", error);
  //   }
  // };

  // //favorites
  // const handleFavorite = (blogId) => {
  //   const userId = localStorage.getItem("userId");
  //   const updatedPost = posts.find((blog) => blog.id === blogId);

  //   if (!userId) {
  //     toast.error("Please log in to add the post to favorites!", {
  //       position: "top-center",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //     return; // Do not proceed if the user is not logged in
  //   }

  //   if (updatedPost && userId) {
  //     if (!updatedPost.favorites.includes(userId)) {
  //       updatedPost.favorites.push(userId);
  //       updatePost(updatedPost);
  //       toast.success("Added to Favorites!", {
  //         position: "top-center",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //     } else {
  //       updatedPost.favorites = updatedPost.favorites.filter(
  //         (favUserId) => favUserId !== userId
  //       );
  //       updatePost(updatedPost);
  //       toast.warning("Removed from Favorites!", {
  //         position: "top-center",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //     }
  //   }
  // };

  //rendering all blog posts
  return (
    <>
      <Navbar />
      <div className="bg-dark-subtle">
        <div className="header">
          <div
            className="headertitles d-flex flex-column align-items-center"
            style={{ fontFamily: "'Lora, serif", color: "#444" }}
          >
            <span
              className="headertitleSm position-absolute fs-5"
              style={{ top: "16%" }}
            >
              Capturing Moments
            </span>
            <span
              className="headertitleLg position-absolute"
              style={{ top: "18%", fontSize: "100px" }}
            >
              Blogs
            </span>
          </div>
          <img
            className="headerImg w-100"
            style={{ height: "450px", objectFit: "cover" }}
            src="https://wallpapercave.com/wp/wp8990085.jpg"
          />
        </div>

        {posts.length > 0 ? (
          <BlogList
            blogs={posts}
            handleLike={handleLikes}
            handleFavorite={handleFavorites}
            deletePost={updatePost}
            showButtons={false}
          />
        ) : (
          <p>no blogs</p>
        )}
      </div>
    </>
  );
};

export default AllBlogs;
