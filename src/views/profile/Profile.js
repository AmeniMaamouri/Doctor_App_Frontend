import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const [profilData, setProfilData] = useState('')
    const [message, setMessage] = useState('')
    let { id } = useParams();
    const history = useHistory()
    useEffect(() => {

        axios.get(`http://localhost:4000/profil/` + id).then(res => {
            setProfilData(res.data)
            if(res.data.status === 500){
                history.push('/404')
            }
           
        }).catch(err => console.log(err))
    }, [])

    const handleChange = (e) => {
        setProfilData({ ...profilData, [e.target.name]: e.target.value })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:4000/profil/` + id, profilData).then(res => {
            setMessage(res.data.message)
            
            setTimeout(() => {
                history.push('/patients')
            }, 1000);
        }).catch((err) => console.log(err))
    }

    return (
        <div>
            {id === '5f467e88635729a14868bb20' ? <h3 style={{ textAlign: 'center', marginBottom: '50px' }}>Changer le profil de votre secrétaire</h3> : <h3 style={{ textAlign: 'center', marginBottom: '50px' }}>Changer votre profil</h3>}
            <form className='col-7 mx-auto' onSubmit={handleSubmit}>

                {message && <p style={{ textAlign: 'center', fontWeight: 'bold', color: 'green', marginBottom: '30px', fontSize: '18px' }}>{message}</p>}
                <div className="form-group ">
                    <label htmlFor="userName">Username</label>
                    <input type="text" name="userName" onChange={handleChange} value={profilData.userName} class="form-control" id="userName" />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Nom et prénom</label>
                    <input type="text" name="name" onChange={handleChange} value={profilData.name} class="form-control" id="name" />
                </div>


                <div className="form-group">
                    <label htmlFor="phone">Téléphone</label>
                    <input type="text" name="phone" onChange={handleChange} value={profilData.phone} class="form-control" id="phone" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Changer mot de passe</label>
                    <input type="password" name="password" onChange={handleChange} class="form-control" id="password" />
                </div>

                <div className="form-group mx-auto">
                    <input style={{ backgroundColor: '#3C4B64', color: 'white', fontWeight: 'bold', border: 'none', outline: 'none', padding: '8px 0', borderRadius: '7px', marginTop: '10px' }} className="col-12 mx-auto" type="submit" value='Modifier' />
                </div >

            </form>
        </div>
    );
}

export default Profile;