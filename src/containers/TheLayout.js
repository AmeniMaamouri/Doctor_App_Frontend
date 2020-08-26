import React, { useEffect, useState } from 'react'
import {
  TheContent,
  TheSidebar,

  TheHeader
} from './index'
import { Redirect } from 'react-router-dom'


const TheLayout = () => {

  const [idToken, setIdToken] = useState('')

  useEffect(() => {
    setIdToken(localStorage.getItem('token'))
  }, [])

  
  return (
      <div>
        {localStorage.getItem('token') ? <div>
      
      <div className="c-app c-default-layout">
       <TheSidebar />
       <div className="c-wrapper">
         <TheHeader />
         <div className="c-body">
           <TheContent />
         </div>

       </div>
     </div> 
   </div> : <Redirect to='/login' />}
      </div>
  )
}

export default TheLayout
