import axios from 'axios';
import React from 'react';
import authorizationHeader from '../authorizationHeader';

const DeleteCard = ({ post }) => {
    const posterId = post.userId;

    const deletePost = (e) => {
        alert('suppression')

        try {
            axios.delete(
                `http://localhost:4000/api/posts/${posterId}`, { headers: { 'Authorization': authorizationHeader } })

        } catch(e) {
            console.log(e);
        }
    };

    return (
        <div onClick={deletePost} >
            <img src="./icons/trash-can-regular.svg" alt="delete" />
        </div>
    );
};

export default DeleteCard;