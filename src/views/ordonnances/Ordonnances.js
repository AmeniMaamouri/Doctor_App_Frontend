import React, { useEffect, useState } from 'react'
import FichesPatientPagination from '../fichesPatients/FichesPatientsPagination'
import '../fichesPatients/fichesPatients.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AddOrdonnanceModal from './AddOrdonnanceModal'
import axios from 'axios'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import { Redirect } from 'react-router-dom'

const Ordonnances = () => {
    const [patients, setPatients] = useState()
    const [ordonnance, setOrdonnance] = useState()
    const [ordonnanceShows, setOrdonnanceShows] = useState()
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(12)
    const [tokenData, setTokenData] = useState('')

    useEffect(() => {
        axios.get('http://localhost:4000/ordonnances').then(res => {
            setOrdonnanceShows(res.data.ordonnance)
            setPatients(res.data.patients)
            setOrdonnance(res.data.ordonnance)
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
        let ordonnances = ordonnance.filter(ord => {
            const patientt = patients.filter(pat => {
                return pat._id === ord.patient
            })
            return (!patientt[0].name.toLowerCase().search(e.target.value.toLowerCase()))
        })
        setOrdonnanceShows(ordonnances)
    }

    let indexOfLastPost
    let indexOfFirstPost
    let currentPosts
    let paginate

    if (ordonnanceShows) {

        indexOfLastPost = currentPage * postsPerPage
        indexOfFirstPost = indexOfLastPost - postsPerPage
        currentPosts = ordonnanceShows.slice(indexOfFirstPost, indexOfLastPost)

        paginate = (pageNumber) => setCurrentPage(pageNumber)

    }


    return (
        <div>
            {localStorage.getItem('token') ? <div>

{tokenData.role === 'Secrétaire' ? <div className="fichesPatients">


    <h1 style={{ fontSize: '25px', textAlign: 'center', marginBottom: '40px' }}> Les Ordonnances Médicales </h1>

    <form style={{ textAlign: 'right', marginBottom: '10px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Filter :</label><input name="name" type='text' style={{ borderRadius: '5px' }} onChange={handleChange} placeholder="Nom et prénom" />
    </form>

    {loading === true ? <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '7%', fontWeight: 'bold' }} >Loading...</p> :
        <div>
            <div className='row'>


                {currentPosts && currentPosts.map(ord => {
                    const patientt = patients.filter(pat => {
                        return pat._id === ord.patient
                    })
                    return (
                        <div key={ord._id} className="col-md-4 col-sm-6 col-lg-3 sheet">
                            <a href={`/ordonnance/` + ord._id} >
                                <img className='imgOrd' src={require('../../images/ordonnance.png')} />
                                {patientt.map(patt => {
                                    return (
                                        <p key={patt._id} className="patientNameOrd"> {patt.name} </p>
                                    )
                                })}
                                <p className="dateSheet">Créer le {moment(ord.createdAt).format('L')}</p>
                            </a>

                        </div>
                    )
                })}



            </div>
            <div className="col-12">
                <FichesPatientPagination postsPerPage={postsPerPage} totalPosts={ordonnanceShows.length} paginate={paginate} />
            </div>
        </div>}

</div> : <div className="fichesPatients">

        <p style={{ textAlign: 'right', marginBottom: '-30px', fontSize: '25px', color: 'green' }}>
            <FontAwesomeIcon type="button" data-toggle="modal" data-target="#exampleModalCenter" style={{ marginRight: '10px' }} icon={faPlus} />
        </p>

        <AddOrdonnanceModal patients={patients} />
        <h1 style={{ fontSize: '25px', textAlign: 'center', marginBottom: '40px' }}> Les Ordonnances Médicales </h1>

        <form style={{ textAlign: 'right', marginBottom: '10px' }}>
            <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Filter :</label><input name="name" type='text' style={{ borderRadius: '5px' }} onChange={handleChange} placeholder="Nom et prénom" />
        </form>

        {loading === true ? <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '7%', fontWeight: 'bold' }} >Loading...</p> :
            <div>
                <div className='row'>


                    {currentPosts && currentPosts.map(ord => {
                        const patientt = patients.filter(pat => {
                            return pat._id === ord.patient
                        })
                        return (
                            <div key={ord._id} className="col-md-4 col-sm-6 col-lg-3 sheet">
                                <a href={`/ordonnance/` + ord._id} >
                                    <img className='imgOrd' src={require('../../images/ordonnance.png')} />
                                    {patientt.map(patt => {
                                        return (
                                            <p key={patt._id} className="patientNameOrd"> {patt.name} </p>
                                        )
                                    })}
                                    <p className="dateSheet">Créer le {moment(ord.createdAt).format('L')}</p>
                                </a>

                            </div>
                        )
                    })}



                </div>
                <div className="col-12">
                    <FichesPatientPagination postsPerPage={postsPerPage} totalPosts={ordonnanceShows.length} paginate={paginate} />
                </div>
            </div>}

    </div>}

</div> : <Redirect to='/login' />}
        </div>
    );
}

export default Ordonnances;