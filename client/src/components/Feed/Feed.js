import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authorizationHeader from '../authorizationHeader';
import DisplayPost from './PostContainer';
import LikeButton from './LikeButton';
import EditPost from './EditPost';
import DeleteCard from './DeleteCard';
import CardComments from './CardComments';

const Feed = () => {

    const [posts, setPosts] = useState([]);
    useEffect(() => {

        axios
            .get(`http://localhost:4000/api/posts/`, { headers: { 'Authorization': authorizationHeader } })
            .then((res) => setPosts(res.data));
    }, []);
    console.log(posts)

    return (
        <>
            {
                posts.map((post, index) => {
                    return (

                        <div className='card-container'>
                            <div className="card-header">
                                <img src="./img/profile-defaut.jpg" alt="profil-pic" />
                                <div className="pseudo">
                                    pseudo
                                </div>
                            </div>

                            <div key={index}>{post.content}</div>

                            <div className="button-container">
                                <LikeButton post={post} />
                                <div className='modifier'>
                                    <EditPost />
                                    <DeleteCard />
                                </div>
                            </div>

                            <CardComments post={post} />

                        </div >
                    );

                })
            }


        </>
    );
};

export default Feed;