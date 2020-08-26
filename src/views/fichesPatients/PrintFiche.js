import React, { useEffect, useState } from 'react'
import FichePatient from './FichePatient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import jwt from 'jsonwebtoken'
import { Redirect } from 'react-router-dom';

const PrintFiche = () => {
    const [tokenData, setTokenData] = useState('')

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

                    <FontAwesomeIcon className='faPrint' onClick={() => window.print()} icon={faPrint} />

                    <FichePatient />
                </div>}
        </div> : <Redirect to="/login" />}
        </div>
    );
}

export default PrintFiche;