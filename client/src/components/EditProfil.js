import { useEffect } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import authorizationHeader from './authorizationHeader';

function EditProfil() {
    const [pseudo, setPseudo] = useState({})
    const [img, setImg] = useState({})

    useEffect(() => {
        const getUser = async () => {

            axios.get(`http://localhost:4000/api/user/me`, { headers: { 'Authorization': authorizationHeader } })
                .then((res) => res.data)

                .then((data) => {
                    console.log(data);
                    setPseudo(data.pseudo)
                    setImg(data.imageUrl)
                })
        }
        getUser();
    }, []);

    const saveUserNewInfos = (e) => {
        e.preventDefault();
        var data = JSON.stringify({
            "pseudo": pseudo
        });
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId')
        var config = {
            method: 'put',
            url: 'http://localhost:4000/api/user/' + userId,
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
        localStorage.setItem('pseudo', pseudo);
    };

    const deleteUserAccount = () => {
        if(!window.confirm(`Voulez-vous vraiment désactiver le compte ?`)) return;
        const userId = localStorage.getItem('userId')


        axios.delete(`http://localhost:4000/api/user/${userId}`, { headers: { 'Authorization': authorizationHeader } })
            .then(res => {
                console.log(res.data);
            })
        localStorage.clear()

        Navigate("/connexion")
    };




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