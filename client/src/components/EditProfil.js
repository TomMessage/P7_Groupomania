import { useEffect } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import authorizationHeader from './authorizationHeader';



function EditProfil() {
    const [imageUrl, setImageUrl] = useState({})
    const [pseudo, setPseudo] = useState({})


    useEffect(() => { // affichage du user

        const getUser = async () => {

            axios.get(`http://localhost:4000/api/user/me`, { headers: { 'Authorization': authorizationHeader } })
                .then((res) => console.log(res.data))
                //.then((res) => res.data)

                .then(({ pseudo }) => {
                    setPseudo(pseudo)
                })


        }
        getUser();
    }, []);





    const saveUserNewInfos = (e) => {
        e.preventDefault();
        // si il y a des changements sur la page profil : les sauvegarder au clic sur le bouton enregistrer 

        console.log('profil sauvegardé')
    };

    const deleteUserAccount = () => {
        if(!window.confirm(`Voulez-vous vraiment désactiver le compte ?`)) return;

        // axios.delete(`http://localhost:4000/api/user/${user_Id}`); 
        localStorage.clear();

        Navigate("/connexion");
    };



    return (
        <div className='profil-page'>
            <form className="editProfil" >
                <div className="editProfil__photo">s
                    <div className="profil-photo">
                        <img src={imageUrl} alt="profile_picture" />
                    </div>
                    <br />
                    <input type='file' name='img' id='img' />
                </div>
                <br />
                <div className="editProfil__pseudo">
                    <label htmlFor='pseudo'>Pseudo </label>
                    <input type="text" name="pseudo" id="pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                </div>
                <br />

                <div className="editProfil__save">
                    <input
                        type="submit"
                        name="editProfil__save"
                        id="editProfil__save"
                        value="Enregistrer"
                        onClick={saveUserNewInfos}
                    />
                </div>
                <br />
                <div className="editProfil__delete">
                    <input
                        type="submit"
                        name="editProfil__delete"
                        id="editProfil__delete"
                        value="Supprimer le compte"
                        onClick={deleteUserAccount}
                    />
                </div>
            </form>
        </div>
    );
};

export default EditProfil;