import axios from 'axios';
import React, { useEffect, useState } from 'react';



const LikeButton = (post) => {
    const userId = localStorage.getItem('userId')
    const [isLiked, setIsLiked] = useState(false);


    useEffect(() => {
        if(post.post.likers.includes(userId)) {
            setIsLiked(true);
        }
    }, [post.post.likers, userId]);

    const postId = post.post._id;

    const handleLike = async (e) => {
        e.preventDefault();
        let data = {
            userId: userId,
        };
        try {
            await axios.patch(`http://localhost:4000/api/posts/like/${postId}`, data)
            setIsLiked(true);
        } catch(e) {
            console.log(e);
        }


    };
    const handleUnlike = async (e) => {
        e.preventDefault();
        let data = {
            userId: userId,
        };

        try {
            await axios.patch(`http://localhost:4000/api/posts/unLike/${postId}`, data)
            setIsLiked(false);
        } catch(e) {
            console.log(e);
        }
    };
    return (
        <div className="like-container" >

            {isLiked ? (
                <img
                    src="./icons/heart-solid.svg"
                    alt="coeur plein"
                    onClick={handleUnlike}
                />
            ) : (
                <img
                    src="./icons/heart-regular.svg"
                    alt="coeur vide"
                    onClick={handleLike}
                />
            )}
        </div>
    );
};

export default LikeButton;