import React, { useState } from 'react'
import './style.css'
import axios from 'axios'



const AddPatientModel = () => {

    const [patient, setPatient] = useState('');
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setPatient({ ...patient, [e.target.name]: e.target.value })

    }

    const handleSumbit = (e) => {
        e.preventDefault();
       axios.post('http://localhost:4000/patients', patient).then(res => {
           
           setMessage(res.data.message)
           if(res.data.message == 'Le Patient a été ajouté avec succès' ){
            setTimeout(()=> {
                window.location.reload();
              },1000)
         }
       }).catch(err => {
           console.log(err)
       })
       
   
    }

    return (

        <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center" id="exampleModalLongTitle">Ajouter Patient</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    {message == 'Le Patient a été ajouté avec succès' && <p style={{textAlign:'center', fontWeight:'bold', color:'green'}}> {message} </p>}
                    {message == 'Patient existe déja' && <p style={{textAlign:'center', fontWeight:'bold', color:'red'}}> {message} </p>}
                        <form onSubmit={handleSumbit} className="modalPatient" action='/patients' method="POST">
                            <div className="form-group">
                                <label htmlFor="formGroupExampleInput">Nom et prénom</label>
                                <input required type="text" onChange={handleChange} className="form-control" id="name" name='name' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="formGroupExampleInput2">Téléphone</label>
                                <input required type="text" onChange={handleChange} className="form-control" id="phone" name='phone' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="formGroupExampleInput2">Date de naissance</label>
                                <input required type="date" onChange={handleChange} className="form-control" id="birth" name='birth' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Sexe</label>
                                <select required defaultValue={'DEFAULT'}  id="sexe" name='sexe' onChange={handleChange} className="form-control" >
                                <option value="DEFAULT" disabled>----- Choisir Sexe -----</option>
                                    <option  value='Femme'>Femme</option>
                                    <option value="Homme">Homme</option>
    
                                </select>
                            </div>
                           
                            <div className="form-group">
                                <label htmlFor="formGroupExampleInput2">Adresse</label>
                                <input required type="text" onChange={handleChange} className="form-control" id="adress" name='adress' />
                            </div>
                            <div className="modalPatientFooter ">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                <button type="submit" className="btn btn-primary">Ajouter</button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default AddPatientModel;