import axios from 'axios';
import React from 'react';
import authorizationHeader from '../authorizationHeader';


const LikeButton = (post) => {
    const userId = localStorage.getItem('userId')

    const like = () => {
        alert('like')
        axios
            .post(`http://localhost:4000/api/posts/${userId}/like`, { headers: { 'Authorization': authorizationHeader } })
            .then((res) => res.data)
    }

    // faire un ternaire if alreaady liked then heart filled and on click delete like
    return (
        <div className="like-container" onClick={like}>

            <img src="./icons/heart-regular.svg" alt="like" />
        </div>
    );
};

export default LikeButton;