import React from 'react';
import DeleteCard from './DeleteCard';
import LikeButton from './LikeButton';
import CardComments from './CardComments';
import EditPost from './EditPost';


const displayPost = ({ post }) => {
    console.log(post.userId)




    return (
        <div className='card-container'>
            <div className="card-header">
                <img src="./img/profile-defaut.jpg" alt="profil-pic" />
                <div className="pseudo">
                    pseudo
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

export default displayPost;