import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import AddPatientModel from './AddPatientModel'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import axios from 'axios'

const Patient = () => {

    const [patients, setPatients] = useState([]);
    const [clientSpecify, setClientSpecify] = useState([])
    const [loading, setLoading] = useState(true)
    const headerStyle = { backgroundColor: '#3C4B64', color: 'white', fontSize: '15px', border: '2px solid grey' }
    const rowStyle = { backgroundColor: 'white', border: '2px solid grey' };
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

    ]

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
            {loading === true ? <p style={{textAlign: 'center' , fontSize: '20px', marginTop: '5%', fontWeight: 'bold'}} >Loading...</p> : <div>

                <p style={{ textAlign: 'right', marginBottom: '-20px', fontSize: '23px', color: 'green' }}>
                    <FontAwesomeIcon type="button" data-toggle="modal" data-target="#exampleModalCenter" style={{ marginRight: '10px' }} icon={faUserPlus} />
                </p>

                <AddPatientModel />

                <h1 style={{ fontSize: '25px', textAlign: 'center', marginBottom: '40px' }}><CIcon style={{ fontSize: '25px', textAlign: 'center', marginTop: '-8px' }} name="cil-people" /> Les Patients </h1>
                <form style={{ textAlign: 'right', marginBottom: '10px' }}>
                    <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Filter :</label><input name="name" onChange={handleChange} type='text' style={{ borderRadius: '5px' }} placeholder="Nom et prénom" />
                </form>
                <BootstrapTable rowStyle={rowStyle}
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



                />
            </div>}
        </div>
    );
}

export default Patient;