import { useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import usersSlice, { setUser } from '../features/usersSlice';
import { Navigate } from 'react-router-dom';
import UploadImg from './uploadImage';


function EditProfil() {
    const dispatch = useDispatch()

    useEffect(() => {

        axios
            .get('http://localhost:4000/api/user/getOneUser/')
            .then((res) => dispatch(setUser(res.data)))

    }, []);


    const saveUserNewInfos = () => {
        // si il y a des changements sur la page profil : les sauvegarder
    };

    const deleteUserAccount = () => {
        if(!window.confirm(`Voulez-vous vraiment désactiver le compte ?`)) return;

        const userId = JSON.parse(localStorage.getItem("user")).user_id;
        axios.get(`http://localhost:4200/api/user/deleteUser/${userId}`);
        localStorage.clear();

        Navigate("/connexion");
    };



    return (
        <div className='profil-page'>
            <form className="editProfil" >
                <div className="editProfil__photo">
                    <div className="profil-photo">
                        <img src='./img/profile-defaut.jpg' alt="profile_picture" />
                    </div>
                    <br />
                    <UploadImg />
                </div>
                <br />
                <div className="editProfil__pseudo">
                    <label htmlFor='pseudo'>Pseudo </label>
                    <input type="text" name="pseudo" id="pseudo" />
                </div>
                <br />

                <div className="editProfil__save">
                    <input
                        type="submit"
                        name="editProfil__save"
                        id="editProfil__save"
                        value="Enregistrer"
                        onSubmit={saveUserNewInfos}
                    />
                </div>
                <br />
                <div className="editProfil__delete">
                    <input
                        type="submit"
                        name="editProfil__delete"
                        id="editProfil__delete"
                        value="Supprimer le compte"
                        onSubmit={deleteUserAccount}
                    />
                </div>
            </form>
        </div>
    );
};

export default EditProfil;