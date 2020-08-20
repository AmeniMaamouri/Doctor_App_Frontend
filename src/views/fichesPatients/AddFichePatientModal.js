import React, { useState} from 'react'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import axios from 'axios';


const AddFichePatientModal = ({ patients }) => {


    const [observ, setObserv] = useState({})
    const [idPatient, setIdPatient] = useState('')

    const [message, setMessage] = useState('')

    const handleChange = (e) => {
      
        setObserv({ ...observ, [e.target.name]: e.target.value })
    }

    const handleChangeAutocomplete = (e, value) => {
       
        setIdPatient(value)
    }


    const handleSubmit = (e, value) => {
        e.preventDefault()
       
        if (idPatient == '') {
            setMessage('Choisir Un Patient')
            

        } else {
            var obj = Object.assign({}, idPatient, observ)
            axios.post('http://localhost:4000/fiches-patients', obj).then(res => {
                setMessage(res.data.message)
                if (res.data.message == 'Fiche client a été ajouté avec succès') {
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
        <div  className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle"  aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center" id="exampleModalLongTitle">Ajouter Fiche Patient</h5>
                        <button type="button" className="close"  data-dismiss="modal" aria-label="Close">
                            <span  aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {message == 'Fiche client a été ajouté avec succès' && <p style={{ textAlign: 'center', fontWeight: 'bold', color: 'green' }}> {message} </p>}
                        {message == 'Fiche client existe déja' && <p style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }}> {message} </p>}
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

                            {/* <FormControl required className="col-12" style={{ marginBottom: '30px' }}>
                                <InputLabel htmlFor="my-input">Observation</InputLabel>
                                <Input onChange={handleChange} name='observation' id="my-input" aria-describedby="my-helper-text" />

                            </FormControl> */}

                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Observation</label>
                                <textarea  required className="form-control" id="exampleFormControlTextarea1" onChange={handleChange} name='observation' rows={7} />
                            </div>

                            <TextField
                                onChange={handleChange}
                                required
                                style={{ marginBottom: '40px' }}
                                id="date"
                                
                                name='dateObservation'
                                label="Date d'observation"
                                type="date"
                                defaultValue={new Date()}
                                className='col-12'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />



                            <div className="modalPatientFooter ">
                                <button type="button"  className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                <button type="submit" className="btn btn-primary">Ajouter</button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default AddFichePatientModal;