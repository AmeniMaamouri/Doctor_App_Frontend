import React, { useEffect, useState } from 'react'
import './fichesPatients.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AddFichePatientModal from './AddFichePatientModal'
import axios from 'axios';
import moment from 'moment'
import FichesPatientPagination from './FichesPatientsPagination'
import jwt from 'jsonwebtoken'
import { Redirect } from 'react-router-dom'

const FichesPatients = () => {

    const [patientWithSheetFilter, setPatientWithSheetFilter] = useState('')
    const [patients, setPatients] = useState('')
    const [fichePatients, setFichePatients] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(12)
    const [loading, setLoading] = useState(true)
    const [tokenData, setTokenData] = useState('')

    useEffect(() => {
        axios.get('http://localhost:4000/fiches-patients').then(res => {

            setPatients(res.data.patients)
            setFichePatients(res.data.fichePatient)
            setPatientWithSheetFilter(res.data.fichePatient)
            setLoading(false)

        }).catch(err => {
            console.log(err)
        })
    }, []);

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

    const handleChange = (e) => {

        let client = fichePatients.filter(sheet => {
            const patientt = patients.filter(pat => {
                return pat.fichePatient === sheet._id
            })
            return (!patientt[0].name.toLowerCase().search(e.target.value.toLowerCase()))
        })

        setPatientWithSheetFilter(client)

    }

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = patientWithSheetFilter.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div>
            {localStorage.getItem('token') ? <div>
            {tokenData.role === 'Secrétaire' ? <div className="fichesPatients">

            
                <h1 style={{ fontSize: '25px', textAlign: 'center', marginBottom: '40px' }}> Les Fiches Des Patients </h1>

                <form style={{ textAlign: 'right', marginBottom: '10px' }}>
                    <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Filter :</label><input onChange={handleChange} name="name" type='text' style={{ borderRadius: '5px' }} placeholder="Nom et prénom" />
                </form>

                {loading === true ? <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '7%', fontWeight: 'bold' }}>Loading...</p> :

                    <div>
                        <div className='row'>

                            {currentPosts && currentPosts.map(sheet => {

                                const patient = patients.filter(pat => {
                                    return pat.fichePatient === sheet._id
                                })
                                return (
                                    <div key={sheet._id} className="col-md-4 col-sm-6 col-lg-3 sheet">
                                        <a href={`/fiche-patient/` + patient[0]._id}>
                                            <img className='imgSheet' src={require('../../images/sheet.png')} />
                                            <p className="patientName">{patient[0].name}</p>
                                            <p className="dateSheet">Créer le {moment(sheet.createdAt).format('L')}</p>
                                        </a>

                                    </div>
                                )
                            })}

                        </div>
                        <div className="col-12">
                            <FichesPatientPagination postsPerPage={postsPerPage} totalPosts={patientWithSheetFilter.length} paginate={paginate} />
                        </div>
                    </div>
                }
            </div> : <div className="fichesPatients">

                    <p style={{ textAlign: 'right', marginBottom: '-30px', fontSize: '25px', color: 'green' }}>
                        <FontAwesomeIcon type="button" data-toggle="modal" data-target="#exampleModalCenter" style={{ marginRight: '10px' }} icon={faPlus} />
                    </p>

                    <AddFichePatientModal patients={patients} />
                    <h1 style={{ fontSize: '25px', textAlign: 'center', marginBottom: '40px' }}> Les Fiches Des Patients </h1>

                    <form style={{ textAlign: 'right', marginBottom: '10px' }}>
                        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Filter :</label><input onChange={handleChange} name="name" type='text' style={{ borderRadius: '5px' }} placeholder="Nom et prénom" />
                    </form>

                    {loading === true ? <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '7%', fontWeight: 'bold' }}>Loading...</p> :

                        <div>
                            <div className='row'>

                                {currentPosts && currentPosts.map(sheet => {

                                    const patient = patients.filter(pat => {
                                        return pat.fichePatient === sheet._id
                                    })
                                    return (
                                        <div key={sheet._id} className="col-md-4 col-sm-6 col-lg-3 sheet">
                                            <a href={`/fiche-patient/` + patient[0]._id}>
                                                <img className='imgSheet' src={require('../../images/sheet.png')} />
                                                <p className="patientName">{patient[0].name}</p>
                                                <p className="dateSheet">Créer le {moment(sheet.createdAt).format('L')}</p>
                                            </a>

                                        </div>
                                    )
                                })}

                            </div>
                            <div className="col-12">
                                <FichesPatientPagination postsPerPage={postsPerPage} totalPosts={patientWithSheetFilter.length} paginate={paginate} />
                            </div>
                        </div>
                    }
                </div>}
        </div> : <Redirect to="/login" />}
        </div>
    );
}

export default FichesPatients;