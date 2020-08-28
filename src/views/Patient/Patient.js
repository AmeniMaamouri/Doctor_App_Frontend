import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faEye, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import AddPatientModel from './AddPatientModel'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Redirect } from 'react-router-dom'
import { Modal, Button, } from "react-bootstrap";
import '../fichesPatients/fichesPatients.css'

const Patient = () => {

    const [patients, setPatients] = useState([]);
    const [clientSpecify, setClientSpecify] = useState([])
    const [loading, setLoading] = useState(true)
    const headerStyle = { backgroundColor: '#3C4B64', color: 'white', fontSize: '15px', border: '2px solid grey' }
    const rowStyle = { backgroundColor: 'white', border: '2px solid grey' };
    const [tokenData, setTokenData] = useState('')
    const [showM2, setShowM2] = useState(false);
    const handleCloseM2 = () => setShowM2(false);
    const handleShowM2 = () => setShowM2(true);
    const [sheet, setSheet] = useState('')

    const handleClick = (row) => {
        handleShowM2()
        setSheet(row)
       
    }


    function rankFormatter(cell, row, rowIndex, formatExtraData) {
        if (row.fichePatient == undefined) {

            return (
                < div
                    style={{
                        textAlign: "center",

                        fontWeight: "bold"
                    }}>

                    <p>-</p>
                </div>
            );

        } else {
            return (
                < div
                    style={{
                        textAlign: "center",
                        fontWeight: "bold"
                    }}>
                    <a onClick={() => handleClick(row)}><FontAwesomeIcon style={{ fontSize: '18px', marginRight: '20px', color: 'blue', cursor: 'pointer' }} className="iconPatientSend" icon={faPaperPlane} /></a>
                    <a href={`fiche-patient/` + row._id}><FontAwesomeIcon style={{ fontSize: '20px', color: 'green' }} className="iconPatientSend" icon={faEye} /></a>

                </div>
            );
        }
    }

    function rankFormatterDoctor(cell, row, rowIndex, formatExtraData) {
        if (row.fichePatient == undefined) {

            return (
                < div
                    style={{
                        textAlign: "center",

                        fontWeight: "bold"
                    }}>

                    <p>-</p>
                </div>
            );

        } else {
            return (
                < div
                    style={{
                        textAlign: "center",
                        fontWeight: "bold"
                    }}>
                    
                    <a href={`fiche-patient/` + row._id}><FontAwesomeIcon style={{ fontSize: '20px', color: 'green' }} className="iconPatientSend" icon={faEye} /></a>

                </div>
            );
        }
    }


    const columnsDoctor = [

        { dataField: 'name', text: 'Nom et prénom', headerStyle },
        { dataField: 'phone', text: 'Téléphone', headerStyle },

        {
            dataField: 'birth',
            headerStyle,
            text: 'Date de naissance',

            formatter: (cell) => {
                let dateObj = cell;
                if (typeof cell !== 'object') {
                    dateObj = new Date(cell);
                }
                return `${('0' + dateObj.getUTCDate()).slice(-2)}/${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/${dateObj.getUTCFullYear()}`;
            },
            editor: {
                type: Type.DATE
            }
        },
        { dataField: 'sexe', text: 'Sexe', headerStyle },
        { dataField: 'adress', text: 'Adresse', headerStyle },
        { dataField: '_id', text: 'Fiche Patient', headerStyle, cellEdit: false, formatter: rankFormatterDoctor, },

    ]

    const columns = [

        { dataField: 'name', text: 'Nom et prénom', headerStyle },
        { dataField: 'phone', text: 'Téléphone', headerStyle },

        {
            dataField: 'birth',
            headerStyle,
            text: 'Date de naissance',

            formatter: (cell) => {
                let dateObj = cell;
                if (typeof cell !== 'object') {
                    dateObj = new Date(cell);
                }
                return `${('0' + dateObj.getUTCDate()).slice(-2)}/${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/${dateObj.getUTCFullYear()}`;
            },
            editor: {
                type: Type.DATE
            }
        },
        { dataField: 'sexe', text: 'Sexe', headerStyle },
        { dataField: 'adress', text: 'Adresse', headerStyle },
        { dataField: '_id', text: 'Fiche Patient', headerStyle, cellEdit: false, formatter: rankFormatter, },

    ]


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

    const handleClickConfirm = () => {
        axios.post('http://localhost:4000/:patients', { fichePatient: sheet._id, patientName: sheet.name }).then(res => {

            console.log(res)

        }).catch(err => {
            console.log(err)
        })
        handleCloseM2()
    }

    useEffect(() => {
        axios.get('http://localhost:4000/patients').then(res => {
            setPatients(res.data)
            setClientSpecify(res.data)

            setLoading(false)

        }).catch(err => {
            console.log(err)
        })
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        let client = patients.filter(patient => {
            return (!patient.name.toLowerCase().search(e.target.value.toLowerCase()))
        })
        setClientSpecify(client)

    }


    return (
        <div>
            {localStorage.getItem('token') ? <div>
                {tokenData.role === 'Médecin' ? <div>


                    <h1 style={{ fontSize: '25px', textAlign: 'center', marginBottom: '40px' }}><CIcon style={{ fontSize: '25px', textAlign: 'center', marginTop: '-8px' }} name="cil-people" /> Les Patients </h1>
                    <form style={{ textAlign: 'right', marginBottom: '10px' }}>
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Filtrer :</label><input name="name" onChange={handleChange} type='text' style={{ borderRadius: '5px' }} placeholder="Nom et prénom" />
                    </form>
                    {loading === true ? <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '5%', fontWeight: 'bold' }} >Loading...</p> :
                        <BootstrapTable rowStyle={rowStyle}
                            noDataIndication="Le tableau est vide"
                            keyField='_id'
                            data={clientSpecify}
                            columns={columnsDoctor}
                            pagination={paginationFactory()}

                        />}
                </div> : <div>

                        <p style={{ textAlign: 'right', marginBottom: '-30px', fontSize: '23px', color: 'green' }}>
                            <FontAwesomeIcon type="button" data-toggle="modal" data-target="#exampleModalCenter" style={{ marginRight: '10px' }} icon={faUserPlus} />
                        </p>

                        <AddPatientModel />

                        <Modal centered show={showM2} onHide={handleCloseM2} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Envoyer fiche patient</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p style={{ fontSize: '18px', fontWeight: '500' }}>Voulez-vous vraiment envoyer la fiche de <span style={{ color: 'red' }}> {sheet.name} </span>  au médecin ?</p>
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

                        <h1 style={{ fontSize: '25px', textAlign: 'center', marginBottom: '40px' }}><CIcon style={{ fontSize: '25px', textAlign: 'center', marginTop: '-8px' }} name="cil-people" /> Les Patients </h1>
                        <form style={{ textAlign: 'right', marginBottom: '10px' }}>
                            <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Filtrer :</label><input name="name" onChange={handleChange} type='text' style={{ borderRadius: '5px' }} placeholder="Nom et prénom" />
                        </form>
                        {loading === true ? <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '5%', fontWeight: 'bold' }} >Loading...</p> :
                            <BootstrapTable rowStyle={rowStyle}
                                noDataIndication="Le tableau est vide"
                                keyField='_id'
                                data={clientSpecify}
                                columns={columns}
                                pagination={paginationFactory()}
                                cellEdit={cellEditFactory({
                                    mode: 'click', blurToSave: true, afterSaveCell: (oldValue, newValue, row, column) => {
                                        axios.put('http://localhost:4000/patients', row).then(res => {
                                            console.log(res)
                                        }).catch(err => {
                                            console.log(err)
                                        })
                                    }
                                })}



                            />}
                    </div>}
            </div> : <Redirect to="/login" />}
        </div>


    );
}

export default Patient;