import React from 'react';
import { useState } from 'react';

const CardComments = () => {
    const [text, setText] = useState('');
    const handleComment = () => {

    }

    // faire un map.get pour obtenir tous les coms
    return (
        <div className="comment-container">
            <div className='comment-header'>
                <img src="./img/profile-defaut.jpg" alt="profil-pic" />
                <div className="pseudo">
                    <p>pseudo</p>
                </div>
            </div>
            <div className='comment-content'>
                <p>texte du commentaire</p>
                <div className='modifier'>
                    <div><img src='./icons/pen-to-square-solid.svg' alt="edit" /></div>
                    <div><img src="./icons/trash-can-regular.svg" alt="delete" /></div>

                </div>
            </div>


            <form action="" onSubmit={handleComment} className="comment-form">
                <input
                    type="text"
                    name="text"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder="Laisser un commentaire"
                />
                <br />
                <input type="submit" value="Envoyer" />
            </form>

        </div >
    );
};

export default CardComments;