import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'


class Ordonnance extends Component {

    state = {
        loading: true,
        ordonnance: {}
    }

    componentDidMount() {
        const id = window.location.pathname.split('/')[2]
        axios.get(`http://localhost:4000/ordonnance/` + id).then(res => {
         
            this.setState({
                ordonnance: res.data,
                loading: false
            })
        }).catch(err => {
            console.log(err)
        })
    }


    render() {
        return <div>
                {this.state.loading === true? <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '7%', fontWeight: 'bold' }} >Loading...</p> : 
            <div style={{ marginTop: '60px', backgroundColor: 'white', borderRadius: '10px', marginBottom: '40px' }}>
            {this.loading === true ? <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '7%', fontWeight: 'bold' }}>Loading...</p> :
                <div className="fiche">

                    <div style={{ paddingTop: "50px" }} className='row information justify-content-around'>
                        <div className="col-4  personnel">
                            <p><strong>Dr Mohamed KOTRANE AYARI</strong></p>
                            <p><strong>Chirugien Dentiste</strong></p>
                            <p><strong>E-mail :</strong> kotrane@gmail.com</p>
                            <p className="tete"><strong>Nom et prénom : </strong> {this.state.ordonnance.patientName} </p>


                        </div>
                        <div className="col-4 place">
                            <p><strong>Adresse : </strong> 2 Rue Abdallah Cheikh - Ariana</p>

                            <p><strong>GSM :</strong> 20 25 1000 - 98 558 320</p>
                            <p><strong>Fax : </strong> 71 87 98 64</p>
                            <p className="tete"><strong>Ariana, le : </strong> {moment(this.state.ordonnance.createdAt).format('L')}</p>

                        </div>
                    </div>


                    <p style={{ textAlign: 'center', marginTop: '60px', fontSize: '20px', color: 'black', fontWeight: '500', whiteSpace: 'pre', lineHeight: '50px' }}>{this.state.ordonnance.ordonnance}</p>
                    <div className="row ">
                        <div style={{textAlign:'right'}} className="col-10 ">
                            <p style={{fontWeight: 'bold', fontSize: '18px' , paddingBottom: "100px", marginTop:'60px'}}>Signature</p>
                            </div>
                    </div>
                </div>}
        </div>}
    

        </div>
}
}
export default Ordonnance;