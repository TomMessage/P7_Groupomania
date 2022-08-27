import axios from 'axios';
import React from 'react';
import authorizationHeader from '../authorizationHeader';

const DeleteCard = ({ post }) => {
    const content = post.content;


    const deletePost = (e) => {
        var data = JSON.stringify({
            "content": content
        });
        const token = localStorage.getItem('token');
        var config = {
            method: 'delete',
            url: 'http://localhost:4000/api/posts/6302125f2fc597e57f3b6d00',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div onClick={deletePost} >
            <img src="./icons/trash-can-regular.svg" alt="delete" />
        </div>
    );
};

export default DeleteCard;