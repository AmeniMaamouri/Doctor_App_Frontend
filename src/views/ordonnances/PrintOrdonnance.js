import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print';
import Ordonnance from './Ordonnance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'

const PrintOrdonnance = () => {
    const componentRef = useRef();
   
    return (
      <div>
        <ReactToPrint 
          trigger={() => <div style={{textAlign: 'right'}}><FontAwesomeIcon className='faPrint' icon={faPrint} /></div>}
          content={() => componentRef.current}
        />
        
        <Ordonnance  ref={componentRef} />
      </div>
    );
  };

  export default PrintOrdonnance