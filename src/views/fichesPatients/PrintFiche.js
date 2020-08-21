import React from 'react'
import FichePatient from './FichePatient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'

const PrintFiche = () => {



    return (
        <div>
            <div className='printSheet' style={{textAlign: 'right'}}>

                <FontAwesomeIcon className='faPrint'  onClick={() => window.print()} icon={faPrint} />

                <FichePatient />
            </div>
        </div>
    );
}

export default PrintFiche;