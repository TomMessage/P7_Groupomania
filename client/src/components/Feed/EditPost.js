import axios from 'axios';
import React from 'react';
import authorizationHeader from '../authorizationHeader';

const EditPost = ({ post }) => {
    const posterId = post._id;

    const editPost = (e) => {
        alert('edition')

        try {
            axios.put(
                `http://localhost:4000/api/posts/${posterId}`, { headers: { 'Authorization': authorizationHeader } })

        } catch(e) {
            console.log(e);
        }
    };
    return (
        <div onClick={editPost}>
            <img src='./icons/pen-to-square-solid.svg' alt="edit" />
        </div>
    );
};

export default EditPost;