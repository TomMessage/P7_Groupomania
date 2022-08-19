import axios from 'axios';
import { useState, useRef } from 'react';
import authorizationHeader from '../authorizationHeader';



function NewPost() {
    const userPseudo = localStorage.getItem('pseudo');
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [picture, setPicture] = useState("");

    const handlePost = (e) => {
        e.preventDefault();
        if(content || picture) {
            const postContent = new FormData();
            postContent.append("content", content);

            axios.post(`http://localhost:4000/api/posts/`, postContent, { headers: { 'Authorization': authorizationHeader } })
                .then((res) => {
                    console.log(res.data);
                    contentRef.current.reset();

                })

        } else {
            alert("Veuillez entrer un message")
        }
        window.location.reload();
    };

    return (
        <div className="new-post-modal">
            <div className="user-info">{userPseudo} - Ecrivez un nouveau post
            </div>
            <form onSubmit={handlePost} ref={contentRef} >
                <textarea name="message"
                    id="message"
                    placeholder="Quoi de neuf ?"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}></textarea>
                <div className='newPostFooter'>
                    <input type="submit" value="Envoyer" />

                    <label htmlFor="file-upload" className='addPhoto'>
                        <img src="./icons/image-solid.svg" alt="like" />
                    </label>
                    <input id="file-upload" type="file" />
                </div>

            </form>
        </div>
    );
};

export default NewPost;
