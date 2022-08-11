import React from 'react';
import DeleteCard from './DeleteCard';
import LikeButton from './LikeButton';
import CardComments from './CardComments';
import EditPost from './EditPost';

const displayPosts = ({ post }) => {
    const userPseudo = localStorage.getItem('pseudo');

    // ensuite render la "res" du map.get pour les afficher dynamiquement
    // faire le module d'infinite scroll 

    const updatePost = () => {
        //logique de sauvegarde des modifications de posts

    }

    return (
        <div className='card-container'>
            <div className="card-header">
                <img src='' alt="profil-pic" />
                <div className="pseudo">
                    {userPseudo}
                </div>
            </div>
            <br />
            <textarea defaultValue='post du user ici en dynamique' />

            <div className="button-container">
                <LikeButton post={post} />
                <div className='modifier'><EditPost />
                    <DeleteCard /></div>

            </div>

            <div className="card-footer">

                <CardComments post={post} />
            </div>
        </div >
    );
};

export default displayPosts;