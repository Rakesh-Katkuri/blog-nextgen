import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../home/Navbar';

const SearchedBlogs = () => {
    const location = useLocation();
    const {searchResults} = location.state || {searchResults: []}

  return (
    <div>
           <Navbar />
        <h1>SEARCH RESULTS</h1>
        {searchResults.length > 0 ? (
            searchResults.map((post) => (
                <div key={post.id}>
                  <img src={post.imageUrl} alt="image"/>
                  <h3>{post.title}</h3>
                  <h3>{post.description}</h3>
                </div>
              ))
        ):(
            <h4>NO SEARCH RESULTS FOUND</h4>
        )}
        
    </div>
  )
}

export default SearchedBlogs