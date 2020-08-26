import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { useHistory } from 'react-router';

const Login = () => {

  const [data, setData] = useState({})
  const history = useHistory();
  const [message, setMessage] = useState()

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }
  

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:4000/login', data).then(res=> {
      setMessage(res.data.message)

      if(res.data.status === 200) {
        localStorage.setItem('token', res.data.userToken)
        history.push('/patients');
      }
      
    }).catch(err => console.log(err))
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit} action='/login' method="POST">
                    <h1 style={{textAlign: 'center', marginBottom:'20px', marginTop:'-20px'}}>Login</h1>
                   
                   <p style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }}> {message && message}</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={handleChange} type="text" placeholder="Username" name='userName' autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={handleChange} type="password" name='password' placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol className="text-center" xs="12">
                        <CButton style={{fontWeight: 'bold'}}  type="submit"  color="primary" className="px-4 col-12" >Login</CButton>
                      </CCol>
                     
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="" style={{ width: '44%', background: `url(${require('.././../../images/doctorFont.jpg')}) center center ` , backgroundSize:'cover'} }>
               
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
