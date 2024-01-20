import React, { useEffect, useState } from "react";
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
import Footer from "./footer/Footer";
import Navbar2 from "./home/Navbar2";
import ToastMessage from "./toastMessage/ToastMessages";
// import PrivateRoute from "./PrivateRoute";

const PrivateRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");
 

  return userId ? children : <Navigate to="/login" />
  

  // useEffect(() => {
  //   // const userId = localStorage.getItem("userId");
  //   if (!userId) {
  //     // Show a toast notification for unauthorized access
  //     // toast.error("Authentication required. Please log in to access page.", {
  //     //   position: "top-center",
  //     //   autoClose: 5000,
  //     //   hideProgressBar: false,
  //     //   closeOnClick: true,
  //     //   pauseOnHover: true,
  //     //   draggable: true,
  //     // });
  //     return (
  //       <>
  //       <Navigate to="/login" />
  //       <div class="alert alert-danger">
  //   <strong>Danger!</strong> This alert box could indicate a dangerous or potentially negative action.
  // </div>
  //       </>
  //     )
  //   }
  // }, []);

  // if (!userId) {
  //   // Redirect to the login page if userId is not present
    
  //   return <Navigate to="/login" />
    
  
  // }

  // return <>{element}</>; // Only wrap the specific route element, not all Routes
};
const AlertMessage = ({show}) =>{

  toast.error("Authentication required. Please log in to access page.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

  return (
    <>
    {show ? <ToastContainer/> : null }
    
    </>
  )
}

// const Authentication = () =>{

//   const userId = localStorage.getItem("userId");
// if(!userId){
// setShowToast(true)
// }
  
// }

const App = () => {
  const userId = localStorage.getItem("userId");
  const [alert, setAlert] = useState(false)
  
  // Clear localStorage on app startup
  useEffect(() => {
    // const userId = localStorage.getItem("userId");
    
    if(userId){ 
      setAlert(true);
    }else{
      setAlert(false);
    }
    
  }, [userId]);

  return (
    <div className="conatiner">

<BrowserRouter>
      
      <AuthProvider>
      <Navbar2/>
      <AlertMessage show={alert}/>
        <Routes>
          <Route path="/" element={<AllBlogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          {/* <Route path="/login" element={<PrivateRoute element={<Login />} />} /> */}
          <Route path="/" element={<PrivateRoute><AllBlogs /></PrivateRoute> }/>
          <Route
            path="/my-blogs"
            element={<PrivateRoute ><MyBlog /></PrivateRoute> } 
          />
          <Route
            path="/add-blog"
            element={<PrivateRoute><AddBlog /> </PrivateRoute>}
          />
          <Route
            path="/update/:postId"
            element={<PrivateRoute><UpdatePostForm /></PrivateRoute >}
          />
          <Route
            path="/my-favorite/blogs"
            element={<PrivateRoute><MyFavorites /></PrivateRoute>}
          />
          <Route
            path="/blog/:id"
            element={<PrivateRoute><BlogDetail /></PrivateRoute >}
          />
          <Route
            path="/search-results"
            element={<PrivateRoute><SearchedBlogs /></PrivateRoute> }
          /> 
          
        </Routes>
        <Footer/>
        {/* <ToastContainer/> */}
      </AuthProvider>
      
    </BrowserRouter>

     
      {/* <BrowserRouter>
      
        <AuthProvider>
        <Navbar2/>
          <Routes>
            <Route path="/" element={<AllBlogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />

            <Route path="/login" element={<PrivateRoute element={<Login />} />} />
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
          <Footer/>
        
        </AuthProvider>
        
      </BrowserRouter> */}
     
      
      </div>
  );
};
export default App;
//kilk