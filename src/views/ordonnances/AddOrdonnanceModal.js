import React, { useState } from 'react'
import axios from 'axios'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

const AddOrodonnanceModal = ({ patients }) => {

    const [ordonnance, setOrdonnance] = useState({})
    const [idPatient, setIdPatient] = useState('')

    const [message, setMessage] = useState('')

    const handleChange = (e) => {

        setOrdonnance({ [e.target.name]: e.target.value })
    }

    const handleChangeAutocomplete = (e, value) => {
        setIdPatient(value)
    }

    const handleSubmit = (e, value) => {
        e.preventDefault()

        if (idPatient == '') {
            setMessage('Choisir Un Patient')


        } else {
            var obj = Object.assign({}, idPatient, ordonnance)
            axios.post('http://localhost:4000/ordonnances', obj).then(res => {
                setMessage(res.data.message)
                if (res.data.message == 'Ordonnance a été ajouté avec succès') {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                }

            }).catch(err => {
                console.log(err)
            })
        }

    }


    return (
        <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center" id="exampleModalLongTitle">Ajouter une ordonnance</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {message == 'Ordonnance a été ajouté avec succès' && <p style={{ textAlign: 'center', fontWeight: 'bold', color: 'green' }}> {message} </p>}

                        {message == 'Choisir Un Patient' && <p style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }}> {message} </p>}
                        <form className="modalPatient" onSubmit={handleSubmit} action='/fiches-patients' method="POST">
                            <div className="form-group">
                                <Autocomplete

                                    onChange={handleChangeAutocomplete}
                                    id="combo-box-demo"
                                    options={patients}
                                    getOptionLabel={(option) => option.name}

                                    renderInput={(params) => <TextField {...params} label="Nom du patient" variant="outlined" />}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Ordonnance</label>
                                <textarea style={{whiteSpace: 'pre-wrap'}} required className="form-control" id="exampleFormControlTextarea1" onChange={handleChange} name='Ordonnance' rows={12} />
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

export default AddOrodonnanceModal
