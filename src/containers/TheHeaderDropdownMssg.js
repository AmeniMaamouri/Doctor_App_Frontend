import React, { useEffect, useState } from 'react'
import '../views/fichesPatients/fichesPatients.css'
import moment from 'moment'
import 'moment/locale/fr'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import jwt from 'jsonwebtoken'
const TheHeaderDropdownMssg = ({ notif, itemsCount, setItemsCount, handleClick }) => {

  const [tokenData, setTokenData] = useState('')
  moment.locale('fr')
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

    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"

    >

      {tokenData.role === 'Secrétaire' ? null : <div>
        <CDropdownToggle onClick={handleClick} className="c-header-nav-link" caret={false}>
          <CIcon name="cil-envelope-open" /><CBadge shape="pill" color="info">{itemsCount}</CBadge>
        </CDropdownToggle></div>}

      <CDropdownMenu style={{ overflowY: 'scroll', height: '300px' }} className="pt-0 " placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"

        >
          <strong>Les Messages</strong>
        </CDropdownItem>

        {notif && notif.map(data => {
          return (
            <CDropdownItem className='msgDropDown' key={data._id} style={{ width: '390px' }} href={`/fiche-patient/` + data.fichePatient}>
              <div className="message">
                <div className="pt-3 mr-3 float-left">
                  <div className="c-avatar">
                    <CImg
                      src={require('../images/secretaire.png')}
                      className="c-avatar-img"
                      alt="admin@bootstrapmaster.com"
                    />
                    <span className="c-avatar-status bg-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">Secrétaire</small>
                  <small className="text-muted float-right mt-1">{moment(data.date).fromNow()}</small>
                </div>
                <div className="text-truncate font-weight-bold textMsg">
                  <span className="fa fa-exclamation text-danger"></span> Vous envoyée une fiche client
              </div>
                <div className="small text-muted text-truncate font-weight-bold">
                  Fiche de {data.patientName}
                </div>
              </div>
            </CDropdownItem>
          )
        })}

        <CDropdownItem style={{ width: '390px' }} href='#'>
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={require('../images/secretaire.png')}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Ameni Maamouri</small>
              <small className="text-muted float-right mt-1"></small>
            </div>
            <div className="text-truncate font-weight-bold">
              <span className="fa fa-exclamation text-danger"></span> Bienvenue Au Plateforme
              </div>
            <div className="small text-muted text-truncate font-weight-bold">
              Cette plateforme est crée par Ameni Maamouri
              </div>
          </div>
        </CDropdownItem>


      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownMssg