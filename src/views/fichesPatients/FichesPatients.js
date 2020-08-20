import React, { useEffect, useState } from 'react'
import './fichesPatients.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AddFichePatientModal from './AddFichePatientModal'
import axios from 'axios';
import moment from 'moment'
import FichesPatientPagination from './FichesPatientsPagination'
const FichesPatients = () => {

    const [patientWithSheet, setPatientWithSheet] = useState('')
    const [patientWithSheetFilter, setPatientWithSheetFilter] = useState('')
    const [patients, setPatients] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(12)

    useEffect(() => {
        axios.get('http://localhost:4000/fiches-patients').then(res => {

            setPatients(res.data)
            let patientWithSheet = res.data.filter(data => {
                return data.fichePatient !== undefined
            })
            setPatientWithSheet(patientWithSheet)
            setPatientWithSheetFilter(patientWithSheet)
        

        }).catch(err => {
            console.log(err)
        })
    }, []);

    const handleChange = (e) => {
        let client = patientWithSheet.filter(patient => {
            return (!patient.name.toLowerCase().search(e.target.value.toLowerCase()))
           })
           setPatientWithSheetFilter(client)
    }

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = patientWithSheetFilter.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="fichesPatients">

            <p style={{ textAlign: 'right', marginBottom: '-30px', fontSize: '25px', color: 'green' }}>
                <FontAwesomeIcon type="button" data-toggle="modal" data-target="#exampleModalCenter" style={{ marginRight: '10px' }} icon={faPlus} />
            </p>

            <AddFichePatientModal patients={patients} />
            <h1 style={{ fontSize: '25px', textAlign: 'center', marginBottom: '40px' }}> Les Fiches Des Patients </h1>

            <form style={{ textAlign: 'right', marginBottom: '10px' }}>
                <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Filter :</label><input onChange={handleChange} name="name" type='text' style={{ borderRadius: '5px' }} placeholder="Nom et prénom" />
            </form>

            <div className='row'>

                {currentPosts && currentPosts.map(sheet => {
                    return (
                        <div key={sheet._id} className="col-md-4 col-sm-6 col-lg-3 sheet">
                            <img src={require('../../images/sheet.png')} />
                            <p className="patientName">{sheet.name}</p>
                            <p className="dateSheet">Créer le {moment(sheet.createdAt).subtract(10, 'days').calendar()}</p>
                        </div>
                    )
                })}

            </div>
            <div  className="col-12">
            <FichesPatientPagination postsPerPage={postsPerPage} totalPosts={patientWithSheetFilter.length} paginate={paginate}/>
            </div>
            
        </div>
    );
}

export default FichesPatients;