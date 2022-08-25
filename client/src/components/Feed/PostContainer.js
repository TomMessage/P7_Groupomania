import React, { useEffect, useState } from 'react';
import LikeButton from './LikeButton';
import axios from 'axios';
import authorizationHeader from '../authorizationHeader';

const DisplayPost = ({ post, isAdmin }) => {
    const userId = localStorage.getItem('userId');
    const postId = post._id;
    const [editPostModal, setEditPostModal] = useState(false);
    const [content, setContent] = useState("");


    const editPost = (e) => {
        e.preventDefault();
        var data = JSON.stringify({
            "content": content,

        });
        const token = localStorage.getItem('token');
        var config = {
            method: 'put',
            url: `http://localhost:4000/api/posts/${postId}`,
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

        window.location.reload();
    }


    const deletePost = (e) => {
        var data = JSON.stringify({
            "content": content
        });
        const token = localStorage.getItem('token');
        var config = {
            method: 'delete',
            url: `http://localhost:4000/api/posts/${postId}`,
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
        window.location.reload();
    };

    return (

        <div className='card-container'>
            <div className="card-header">
                <img src={post.userImg} alt="profil-pic" />
                <div className="pseudo">
                    {post.pseudo}
                </div>
            </div>
            <br />
            {editPostModal ? <> <form action="" onSubmit={editPost}>
                <textarea
                    type="text"
                    name="editMessage"
                    id="editMessage"
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={post.content}
                    value={content}
                />
                <button type="submit" className="postform--submit">
                    <p>Envoyer</p>
                </button>
            </form>
            </> : <div className='contentAndImage'>
                <div className='content'>
                    {post.content}
                </div>
                {post.imageUrl && (
                    <div className="post-imageUrl">
                        <img src={post.imageUrl} alt="illustration du post" />
                    </div>
                )}

            </div>
            }

            <br />

            <div className="button-container">
                <LikeButton post={post} />
                {(post.userId === userId || isAdmin === true) && (
                    <div className='modifier'>
                        <div onClick={(e) => setEditPostModal(!editPostModal)}>
                            <img src='./icons/pen-to-square-solid.svg' alt="edit" />
                        </div>

                        <div onClick={deletePost} >
                            <img src="./icons/trash-can-regular.svg" alt="delete" />
                        </div>
                    </div>
                )}
            </div>



        </div >


    );

};

export default DisplayPost;