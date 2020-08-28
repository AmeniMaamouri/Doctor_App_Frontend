import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

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

const TheHeaderDropdown = () => {
  const history = useHistory()
  const [tokenData, setTokenData] = useState('')

  const handleClick = () => {

    localStorage.clear('token')
    history.push('/login')
  }

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
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">

          {tokenData.role === 'Secrétaire' ? <CImg
            src={require('../images/secretaire.png')}
            className="c-avatar-img"
            alt="user photo"
            style={{ width: '50px' }}
          /> : <CImg
              src={require('../images/doctoravatar.png')}
              className="c-avatar-img"
              alt="user photo"
              style={{ width: '38px' }}
            />}

        </div>
      </CDropdownToggle>

      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >

          <strong>Réglages</strong>
        </CDropdownItem>
        {tokenData.role === 'Secrétaire' ? null : <div>
          <CDropdownItem href={`/profil/` + tokenData.id}>
            <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
          <CDropdownItem href={`/profil/5f467e88635729a14868bb20`}>
            <CIcon name="cil-settings" className="mfe-2" />
          Compte secrétaire
        </CDropdownItem>
          <CDropdownItem divider />
        </div>}

        <CDropdownItem onClick={handleClick}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Se déconnecter
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
