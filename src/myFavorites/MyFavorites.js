import React from 'react'
import { useAuth } from '../authContext/AuthContext'
import Navbar from '../home/Navbar';

const MyFavorites = () => {

    const {posts} = useAuth();

    const userId = localStorage.getItem('userId');

    const userFavorites = posts.filter((post) => post.favorites.includes(userId));

  return (
    <div>
        <Navbar/>
        <h1 className='text-center'>MyFavorite Blogs</h1>
        <div className='row'>

        
            {userFavorites.length > 0 ? (
                userFavorites.map(post => (
                    <div key={post.id} className='col-md-6 mb-4 blog-post'>
                        <div className='card'>
                        <img src={post.imageUrl} alt={post.imageUrl}/>
                        </div>
                        <div className='card-body'>
                        <h3 className='card-title'>{post.title}</h3>
                        <p className='card-text'>{post.description}</p>
                        </div>
                       
                    </div>
                ))
        ):(
            <h1>No Favorite Blogs yet!</h1>
        )}
    </div>
    </div>
  );
};

export default MyFavorites;