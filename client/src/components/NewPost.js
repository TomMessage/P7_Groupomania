import { useState } from 'react';
import { setPost } from '../features/postsSlice';
import { useDispatch, useSelector } from "react-redux";


function NewPost() {
    const userPseudo = localStorage.getItem('pseudo');
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");

    const handlePost = () => {

        if(message) {
            const data = new FormData();
            data.append('posterId', userData._id);
            data.append('message', message);


            dispatch(setPost(data));
        } else {
            alert("Veuillez entrer un message")
        }
    };

    return (
        <div className="new-post-modal">
            <div className="user-info">{userPseudo} - Ecrivez un nouveau post
            </div>
            <form>
                <textarea placeholder="Message..."></textarea>
                <input type="submit" value="Envoyer" onSubmit={handlePost} />
            </form>
        </div>
    );
};

export default NewPost;
