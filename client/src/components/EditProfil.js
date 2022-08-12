import { useEffect } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import authorizationHeader from './authorizationHeader';

function EditProfil() {
    const [pseudo, setPseudo] = useState({})

    useEffect(() => {
        const getUser = async () => {

            axios.get(`http://localhost:4000/api/user/me`, { headers: { 'Authorization': authorizationHeader } })
                .then((res) => res.data)

                .then((data) => {
                    console.log(data);
                    setPseudo(data.pseudo)
                })
        }
        getUser();
    }, []);

    const saveUserNewInfos = (e) => {
        e.preventDefault();
        // si il y a des changements sur la page profil : les sauvegarder au clic sur le bouton enregistrer 
        axios.put("http://localhost:4000/api/user/")
            .then((res) => res.data)
            .then((res) => this.setPseudo)

        console.log('profil sauvegardé')
    };

    const deleteUserAccount = () => {
        if(!window.confirm(`Voulez-vous vraiment désactiver le compte ?`)) return;

        axios.delete(`http://localhost:4000/api/user/:id`, { headers: { 'Authorization': authorizationHeader } })
            .then(res => {
                console.log(res.data);
            })
        localStorage.clear()

        Navigate("/connexion")
    };

    const imageUrl = 'https://api.thecatapi.com/v1/images/search';
    const [img, setImg] = useState();

    const fetchProfilePic = async () => {
        const res = await axios.get(imageUrl).then((res) => res.data[0].url);

        const imageObjectURL = (res);
        setImg(imageObjectURL);

    };
    useEffect(() => {
        fetchProfilePic();
    }, []);
    console.log(img)

    return (
        <div className='profil-page'>
            <form className="editProfil" >
                <div className="editProfil__photo">
                    <div className="profil-photo">
                        <img src={img} alt="profile_picture" />
                    </div>
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