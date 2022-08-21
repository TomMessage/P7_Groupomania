import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authorizationHeader from '../authorizationHeader';
import DisplayPost from './PostContainer';



const Feed = () => {

    const [posts, setPosts] = useState([]);
    useEffect(() => {

        axios
            .get(`http://localhost:4000/api/posts/`, { headers: { 'Authorization': authorizationHeader } })
            .then((res) => setPosts(res.data))

    }, []);
    posts.reverse();




    return (
        <>
            {
                posts.map((post, index) => {
                    return (
                        <DisplayPost key={index} post={post} />
                    )


                })
            }


        </>
    );
};

export default Feed;