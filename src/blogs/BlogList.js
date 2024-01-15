import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import BlogDetail from "./BlogDetail";

import axios from "axios";

const BlogList = ({
  blogs,
  handleLike,
  handleFavorite,
  deletePost,
  showButtons = true,
}) => {
  const userId = localStorage.getItem("userId");
  const itemsPerRow = 3; // Adjust the number of items per row
  const itemsPerPage = 6; // Adjust the number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedBlog, setSelectedBlog] = useState(null);

  const { getMyBlogs } = useAuth();

  const navigate = useNavigate();

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setSelectedBlog(null); // Close the dropdown when paginating
    setCurrentPage(pageNumber);
  };

  const handleUpdateNew = () => {
    getMyBlogs();
    setSelectedBlog(null); // Close the dropdown after updating
  };

  const handleCardClick = (blog) => {
    setSelectedBlog(blog);
    navigate(`/blog/${blog.id}`);
  };
  //add
  const renderBlogs = () => {
    const rows = [];
    for (let i = 0; i < currentPosts.length; i += itemsPerRow) {
      const row = currentPosts.slice(i, i + itemsPerRow);
      rows.push(
        <div className="row custom-row" key={i}>
          {row.map((blog) => (
            <div
              className={`col-md-${12 / itemsPerRow}`}
              key={blog.id}
              onClick={() => handleCardClick(blog)}
            >
              <div className="card">
                {/* Title and Three Dots in the same row */}
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h1 className="blog-title">{blog.title}</h1>
                  <div className="dropdown">
                    {showButtons && blog.userId === userId && (
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id={`dropdownMenuButton-${blog.id}`}
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        onClick={() => setSelectedBlog(blog)}
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    )}
                    <div
                      className={`dropdown-menu ${
                        selectedBlog === blog ? "show" : ""
                      }`}
                      aria-labelledby={`dropdownMenuButton-${blog.id}`}
                    >
                      {/* Edit Button */}
                      <Link to={`/update/${blog.id}`}>
                        <button
                          onClick={handleUpdateNew}
                          className="dropdown-item"
                        >
                          <i className="fas fa-edit"></i> Edit
                        </button>
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          deletePost(blog.id);
                          setSelectedBlog(null);
                        }}
                        className="dropdown-item"
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="card-body">
                  <img
                    src={blog.imageUrl}
                    className="card-img-top blog-image custom-img"
                    alt="image blog"
                  />
                </div>

                {/* Like and Favorite Buttons */}
                <div className="row text-center custom-like-fav">
                  <div className="col-sm-6">
                    {blog.likes}
                    <button
                      className="custom-interaction-button"
                      onClick={() => handleLike(blog.id)}
                    >
                      <i
                        className={`fas fa-thumbs-up ${
                          blog.likesBy && blog.likesBy.includes(userId)
                            ? "text-primary"
                            : ""
                        }`}
                      ></i>
                    </button>
                  </div>

                  <div className="col-sm-6">
                    <button
                      className="custom-interaction-button"
                      onClick={() => handleFavorite(blog.id)}
                    >
                      <i
                        className={`fas fa-heart ${
                          blog.favorites.includes(userId) ? "text-danger" : ""
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div className="card-footer">
                  <p className="blog-description">{blog.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div>
      {selectedBlog ? (
        <BlogDetail blog={selectedBlog} />
      ) : (
        <>
          {renderBlogs()}
          <nav className="d-flex justify-content-center">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <li
                    key={pageNumber}
                    className={`page-item ${
                      pageNumber === currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default BlogList;
