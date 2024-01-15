// MyFavorites.jsx
import React from "react";
import { useAuth } from "../authContext/AuthContext";
import Navbar from "../home/Navbar";
import BlogList from "../blogs/BlogList1";
// import BlogList from "./BlogList1"; // Import the BlogList component

const MyFavorites = () => {
  const { posts, handleLike, handleFavorite, deletePost } = useAuth(); // Assuming you have these methods in your AuthContext

  const userId = localStorage.getItem("userId");

  const userFavorites = posts.filter((post) => post.favorites.includes(userId));

  return (
    <div>
      <Navbar />
      <h1 className="text-center">My Favorite Blogs</h1>
      {userFavorites.length > 0 ? (
        // Use BlogList component to display userFavorites
        <BlogList
          blogs={userFavorites}
          handleLike={handleLike}
          handleFavorite={handleFavorite}
          deletePost={deletePost}
        />
      ) : (
        <h1>No Favorite Blogs yet!</h1>
      )}
    </div>
  );
};

export default MyFavorites;
