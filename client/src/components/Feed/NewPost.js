import axios from 'axios';
import { useState, useRef } from 'react';
import authorizationHeader from '../authorizationHeader';



function NewPost() {
    const userPseudo = localStorage.getItem('pseudo');
    const userImg = localStorage.getItem('imageUrl');
    const contentRef = useRef();
    const pseudoRef = useRef();


    const [content, setContent] = useState("");
    const [picture, setPicture] = useState("");
    const [pseudo, setPseudo] = useState("");


    const handlePost = (e) => {
        e.preventDefault();
        if(content || picture) {
            var data = JSON.stringify({
                "content": content,
                "pseudo": userPseudo,
                "userImg": userImg

            });
            const token = localStorage.getItem('token');
            var config = {
                method: 'post',
                url: 'http://localhost:4000/api/posts',
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
        } else {
            alert("Veuillez entrer un message")
        }
        window.location.reload();
    };



    return (
        <div className="new-post-modal">
            <div className="user-info" >{userPseudo}  - Ecrivez un nouveau post
            </div>
            <form onSubmit={handlePost} ref={contentRef} >
                <textarea name="message"
                    id="message"
                    placeholder="Quoi de neuf ?"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}></textarea>
                <div className='newPostFooter'>

                    <label htmlFor="file-upload" className='addPhoto'>
                        <img src="./icons/image-solid.svg" alt="like" />
                    </label>
                    <input id="file-upload" type="file" />
                    <input type="submit" value="Envoyer" />


                </div>

            </form>
        </div>
    );
};

export default NewPost;
