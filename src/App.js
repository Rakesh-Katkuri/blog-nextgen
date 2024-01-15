import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./home/Home";
import MyBlog from "./blogs/MyBlog";
import AddBlog from "./blogs/AddBlog";
import AuthProvider from "./authContext/AuthContext";
import Login from "./userAuthentication/LoginForm";
import Register from "./userAuthentication/RegisterForm";
import UpdatePostForm from "./blogs/UpdatePostFom";
import AllBlogs from "./blogs/AllBlogs";
import MyFavorites from "./myFavorites/MyFavorites";
import SearchedBlogs from "./searchBlogs/SearchedBlogs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogDetail from "./blogs/BlogDetail";
// import PrivateRoute from "./PrivateRoute";

const PrivateRoute = ({ element }) => {
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // Show a toast notification for unauthorized access
      toast.error("Authentication required. Please log in to access page.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, []);

  if (!userId) {
    // Redirect to the login page if userId is not present
    return <Navigate to="/login" />;
  }

  return <>{element}</>; // Only wrap the specific route element, not all Routes
};

const App = () => {
  // Clear localStorage on app startup
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      localStorage.removeItem("userId");
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AllBlogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />

            <Route path="/" element={<PrivateRoute element={<AllBlogs />} />} />
            <Route
              path="/my-blogs"
              element={<PrivateRoute element={<MyBlog />} />}
            />
            <Route
              path="/add-blog"
              element={<PrivateRoute element={<AddBlog />} />}
            />
            <Route
              path="/update/:postId"
              element={<PrivateRoute element={<UpdatePostForm />} />}
            />
            <Route
              path="/my-favorite/blogs"
              element={<PrivateRoute element={<MyFavorites />} />}
            />
            <Route
              path="/blog/:id"
              element={<PrivateRoute element={<BlogDetail />} />}
            />
            <Route
              path="/search-results"
              element={<PrivateRoute element={<SearchedBlogs />} />}
            />
          </Routes>
        </AuthProvider>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};
export default App;
//kilk
