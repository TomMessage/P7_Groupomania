import axios from 'axios';
import { useState, useRef } from 'react';

function NewPost() {
    const userPseudo = localStorage.getItem('pseudo');
    const userImg = localStorage.getItem('imageUrl');
    const contentRef = useRef();

    const [content, setContent] = useState("");
    const [picture, setPicture] = useState("");

    const handlePost = (e) => {

        e.preventDefault();

        if(content || picture) {

            var data = JSON.stringify({
                "content": content,
                "pseudo": userPseudo,
                "userImg": userImg,
                "imageUrl": picture,

            });

            const token = localStorage.getItem('token');

            var formData = new FormData();

            formData.append("imageUrl", picture);
            formData.append("pseudo", userPseudo);
            formData.append("userImg", userImg);
            formData.append("content", content);
            console.log(formData);

            axios.post('http://localhost:4000/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token,
                }
            })

            console.log(picture);

            window.location.reload();
        };
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




                    <input id="imageUrl" type="file" name='imageUrl' accept=".jpg, .jpeg, .png, .gif"

                        onChange={(e) => setPicture(e.target.files[0])} />

                    <input type="submit" value="Envoyer" />


                </div>

            </form>
        </div>
    );
};

export default NewPost;
