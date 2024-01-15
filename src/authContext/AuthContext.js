import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [blogs, setBlogs] = useState([]); //getall
  const navigate = useNavigate();
  // const [post, setPost] = useState([]);
  const loggedInUserId = localStorage.getItem("userId");

  // const login = async (user) => {

  // };

  // const register = async (user) => {

  // };

  const getBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3002/posts");
      console.log(response.data);
      setPosts(response.data);
      console.log("get all rakesh", blogs);
    } catch (error) {
      console.log("error in post request", error);
    }
  };

  const getMyBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3002/posts");
      console.log(response.data);
      const userId = localStorage.getItem("userId");
      const myBlog = response.data.filter((item) => item.userId === userId);
      console.log("my blog data", myBlog);
      console.log("user id data", userId);
      setPosts(myBlog);
    } catch (error) {
      console.log("error in post request", error);
    }
  };

  const createPost = async (posts) => {
    try {
      const response = await axios.post("http://localhost:3002/posts", posts);
      console.log(response.data);
    } catch (error) {
      console.log("error in post request", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3002/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.log("error deleting post", error);
    }
  };

  const updatePost = async (updatedPost) => {
    //rrree

    try {
      //fetch existing post data by id
      const response = await axios.get(
        `http://localhost:3002/posts/${updatedPost.id}`
      );
      const existingPost = response.data;
      let mergedPost;
      if (updatedPost.likesBy || updatedPost.favorites || updatedPost.likes) {
        //merge the updated data while retaining likes and favorites
        mergedPost = {
          id: updatedPost.id,
          imageUrl: updatedPost.imageUrl,
          title: updatedPost.title,
          description: updatedPost.description,
          likesBy: updatedPost.likesBy,
          userId: updatedPost.userId,

          likes: updatedPost.likes, //retain likes
          favorites: updatedPost.favorites, //retian favorites
        };
      } else {
        mergedPost = {
          id: updatedPost.id,
          imageUrl: updatedPost.imageUrl,
          title: updatedPost.title,
          description: updatedPost.description,
          likesBy: existingPost.likesBy,
          userId: updatedPost.userId,

          likes: existingPost.likes, //retain likes
          favorites: existingPost.favorites, //retian favorites
        };
      }

      console.log(mergedPost, "merged post data");
      //perform the update request to api endpoint
      const updatedPostResponse = await axios.put(
        `http://localhost:3002/posts/${updatedPost.id}`,
        mergedPost
      );

      //update the posts state with the updated post
      const updatedPosts = posts.map((post) =>
        post.id === updatedPostResponse.data.id
          ? updatedPostResponse.data
          : post
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.log("error ", error);
    }

    // await axios.put(`http://localhost:3002/posts/${updatedPost.id}`, updatedPost)
    //   .then((response) => {
    //       const updatedPostResponse = response.data;
    //       const updatedPosts = posts.map((post) =>
    //       post.id === updatedPostResponse.id ? updatedPostResponse : posts
    //       );
    //       setPosts(updatedPosts);
    //       // setPost(updatedPosts);
    //   })
    //   .catch((error)=>{
    //       console.log('error ', error)
    //   });
  };

  //LIKE AND FAVORITE BUTTONS
  //function to handle post likes
  const handleLike = async (blogId) => {
    console.log("handleLike function called");
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please log in to like the post!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return; // Do not proceed if the user is not logged in
    }

    try {
      const response = await axios.get(`http://localhost:3002/posts/${blogId}`);
      const post = response.data;

      const userId = localStorage.getItem("userId");
      const userLiked = post.likesBy.includes(userId);

      if (userLiked) {
        post.likes -= 1;
        post.likesBy = post.likesBy.filter((id) => id !== userId);
        toast.info("Post Unliked!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        post.likes += 1;
        post.likesBy.push(userId);
        toast.success("Post Liked!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      console.log(post, "all blogs likes");
      await updatePost(post);
      // dispatch(updateLikes(post))
    } catch (error) {
      console.log("error updating post", error);
    }
  };

  //favorites
  const handleFavorite = (blogId) => {
    const userId = localStorage.getItem("userId");
    const updatedPost = posts.find((blog) => blog.id === blogId);

    if (!userId) {
      toast.error("Please log in to add the post to favorites!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return; // Do not proceed if the user is not logged in
    }

    if (updatedPost && userId) {
      if (!updatedPost.favorites.includes(userId)) {
        updatedPost.favorites.push(userId);
        updatePost(updatedPost);
        toast.success("Added to Favorites!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        updatedPost.favorites = updatedPost.favorites.filter(
          (favUserId) => favUserId !== userId
        );
        updatePost(updatedPost);
        toast.warning("Removed from Favorites!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };
  //LIKE AND FAVORITE BUTTONS

  const logout = () => {
    setLoggedIn(false); // Corrected to setLoggedIn(false)
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        loggedIn,
        getBlogs,
        posts,
        getMyBlogs,
        blogs,
        createPost,
        deletePost,
        updatePost,
        setPosts,
        handleFavorite,
        handleLike,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
