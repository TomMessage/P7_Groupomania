import { useState } from 'react';



function NewPost() {
    const userPseudo = localStorage.getItem('pseudo');

    const [message, setMessage] = useState("");

    const handlePost = (e) => {
        e.preventDefault();
        if(message) {
            //create post,
            console.log(message)
        } else {
            alert("Veuillez entrer un message")
        }
    };

    return (
        <div className="new-post-modal">
            <div className="user-info">{userPseudo} - Ecrivez un nouveau post
            </div>
            <form>
                <textarea name="message"
                    id="message"
                    placeholder="Quoi de neuf ?"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}></textarea>
                <div className='newPostFooter'>
                    <input type="submit" value="Envoyer" onClick={handlePost} />
                    <button className='addPhoto'><img src="./icons/image-solid.svg" alt="like" /></button>

                </div>

            </form>
        </div>
    );
};

export default NewPost;
