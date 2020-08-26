import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import jwt from 'jsonwebtoken'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { 
  TheHeaderDropdown,
  TheHeaderDropdownMssg,

}  from './index'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)
  const [tokenData, setTokenData] = useState('')

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  useEffect(()=> {
    var token = localStorage.getItem('token');
    jwt.verify(token, '3023b0f5ec57', function (err, decoded) {
      setTokenData(decoded)
      if (err) { // Manage different errors here (Expired, untrusted...)
        localStorage.clear();
        window.location.reload();
      }
    })
  },[])

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
      </CHeaderNav>

      <CHeaderNav className="px-3">
      
        <TheHeaderDropdownMssg/>
        <p style={{paddingTop:'19px', fontWeight:'bold', marginLeft:'10px'}}>{tokenData.role}</p>
        <TheHeaderDropdown/>
      </CHeaderNav>

      
    </CHeader>
  )
}

export default TheHeader
