import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const UploadImg = () => {
    const [file, setFile] = useState();

    const userData = useSelector((state) => state.userSlice);

    const handlePicture = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("pseudo", userData.pseudo);
        data.append("userId", userData._id);
        data.append("file", file);


    };

    return (
        <form action="" onSubmit={handlePicture} className="upload-pic">
            <input
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <br />
            <input type="submit" value="Envoyer" />
        </form>
    );
};

export default UploadImg;