// BlogCard.jsx
import React from "react";

const BlogCard = ({
  blog,
  handleLike,
  handleFavorite,
  deletePost,
  showButtons,
  handleCardClick,
}) => {
  const userId = localStorage.getItem("userId");

  return (
    <div className="card">
      {/* Title and Three Dots in the same row */}
      <div className="card-header d-flex justify-content-between align-items-center">
        <h1 className="blog-title">{blog.title}</h1>
        {showButtons && blog.userId === userId && (
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id={`dropdownMenuButton-${blog.id}`}
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-ellipsis-v"></i>
          </button>
        )}
        <div
          className={`dropdown-menu`}
          aria-labelledby={`dropdownMenuButton-${blog.id}`}
        >
          {/* Edit Button */}
          <button className="dropdown-item" onClick={handleCardClick}>
            Edit
          </button>
          {/* Delete Button */}
          <button
            onClick={() => {
              deletePost(blog.id);
            }}
            className="dropdown-item"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="card-body">
        <img
          src={blog.imageUrl}
          className="card-img-top blog-image custom-img"
          alt="image blog"
          onClick={() => handleCardClick(blog)}
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
  );
};

export default BlogCard;
