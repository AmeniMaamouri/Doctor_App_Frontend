import React, { useRef, useEffect,useState } from 'react'
import ReactToPrint from 'react-to-print';
import Ordonnance from './Ordonnance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import jwt from 'jsonwebtoken'
import { Redirect } from 'react-router-dom';

const PrintOrdonnance = () => {
  const componentRef = useRef();
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
      {tokenData.role === 'Médecin' ? <div>
        <Ordonnance ref={componentRef} />
      </div> : <div>
          <ReactToPrint
            trigger={() => <div style={{ textAlign: 'right' }}><FontAwesomeIcon className='faPrint' icon={faPrint} /></div>}
            content={() => componentRef.current}
          />

          <Ordonnance ref={componentRef} />
        </div>}
    </div> : <Redirect to='/login' />}
    </div>
  );
};

export default PrintOrdonnance