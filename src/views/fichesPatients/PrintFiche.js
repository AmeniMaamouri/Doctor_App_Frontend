import React, { useEffect, useState } from 'react'
import FichePatient from './FichePatient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import jwt from 'jsonwebtoken'
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import { Modal, Button, } from "react-bootstrap";
import { useParams } from 'react-router-dom';

const PrintFiche = () => {
    const [tokenData, setTokenData] = useState('')
    const [showM2, setShowM2] = useState(false);
    const [data, setData] = useState(false);
    const handleCloseM2 = () => setShowM2(false);
    const handleShowM2 = () => setShowM2(true);
    const { id } = useParams();

    useEffect(() => {

        axios.get(`http://localhost:4000/fiche-patient/` + id).then(res => {
            setData(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const handleClick = () => {
        handleShowM2()
    
    }

    const handleClickConfirm = () => {
        axios.post('http://localhost:4000/:patients', { fichePatient: id, patientName: data.name }).then(res => {

          

        }).catch(err => {
            console.log(err)
        })
        handleCloseM2()
    }

    useEffect(() => {
        var token = localStorage.getItem('token');
        jwt.verify(token, '3023b0f5ec57', function (err, decoded) {
            setTokenData(decoded)
            if (err) { // Manage different errors here (Expired, untrusted...)
                localStorage.clear();
                window.location.reload();
            }
        })
    }, [])

    return (
        <div>
            {localStorage.getItem('token') ? <div>
                {tokenData.role === 'Médecin' ? <div className='printSheet' style={{ textAlign: 'right' }}>

                    <FichePatient />
                </div> : <div className='printSheet' style={{ textAlign: 'right' }}>
                       <a onClick={handleClick}> <FontAwesomeIcon style={{ fontSize: '23px', marginRight: '20px', color: '#3C4B64', cursor: 'pointer' }} className="iconPatientSend" icon={faPaperPlane} /></a>
                        <FontAwesomeIcon className='faPrint iconPatientSend' style={{ cursor: 'pointer' }} onClick={() => window.print()} icon={faPrint} />

                        <Modal centered show={showM2} onHide={handleCloseM2} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Envoyer fiche patient</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p style={{ fontSize: '18px', fontWeight: '500' }}>Voulez-vous vraiment envoyer la fiche de <span style={{ color: 'red' }}> {data.name} </span>  au médecin ?</p>
                                <Modal.Footer>
                                    <Button className='ouiBtn' variant="secondary" onClick={handleCloseM2}>
                                        Annuler
                    </Button>
                                    <Button className='annulerBtn' onClick={handleClickConfirm} variant="primary" >
                                        Oui
                         </Button>
                                </Modal.Footer>

                            </Modal.Body>

                        </Modal>

                        <FichePatient />
                    </div>}
            </div> : <Redirect to="/login" />}
        </div>
    );
}

export default PrintFiche;