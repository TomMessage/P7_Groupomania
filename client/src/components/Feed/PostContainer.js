import React, { useEffect, useState } from 'react';
import DeleteCard from './DeleteCard';
import LikeButton from './LikeButton';
import CardComments from './CardComments';
import EditPost from './EditPost';
import axios from 'axios';
import authorizationHeader from '../authorizationHeader';


const DisplayPost = ({ post }) => {
    console.log(post.userId);
    console.log(post.pseudo);
    const [img, setImg] = useState('');

    const getUser = async () => {

        axios.get(`http://localhost:4000/api/user/me`, { headers: { 'Authorization': authorizationHeader } })
            .then((res) => res.data)

            .then((data) => {
                setImg(data.imageUrl)
            })
    }
    getUser();




    return (
        <div className='card-container'>
            <div className="card-header">
                <img src={img} alt="profil-pic" />
                <div className="pseudo">
                    {post.pseudo}
                </div>
            </div>

            <div >{post.content}</div>

            <div className="button-container">
                <LikeButton post={post} />
                <div className='modifier'>
                    <EditPost post={post} />
                    <DeleteCard post={post} />
                </div>
            </div>

            <CardComments post={post} />

        </div >


    );
};

export default DisplayPost;