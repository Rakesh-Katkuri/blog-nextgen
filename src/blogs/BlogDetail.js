import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../home/Navbar";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/posts/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...blogdetail</div>;
  }

  const headerStyle = {
    background: "linear-gradient(to right, #ff7e5f, #feb47b)", // Replace with your preferred color values
    color: "#fff", // Text color
    textAlign: "center",
    padding: "50px 0", // Adjust the padding as needed
  };
  const cardStyle = {
    maxWidth: "300px", // Adjust the maximum width of the card
    margin: "10px", // Adjust the margin as needed
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <header style={headerStyle}>
          <h1 className="display-4">Blog Detail Page</h1>
          <p className="lead">Explore the details of the selected blog.</p>
        </header>
        <div className="card" style={cardStyle}>
          <img src={blog.imageUrl} className="card-img-top" alt="Blog Cover" />
          <div className="card-body">
            <h1 className="card-title">{blog.title}</h1>
            <p className="card-text">{blog.description}</p>
            {/* Add more details as needed */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
