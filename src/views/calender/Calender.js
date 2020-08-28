import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'

import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Button, } from "react-bootstrap";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import moment from 'moment'
import axios from 'axios';
import '../fichesPatients/fichesPatients.css'
import jwt from 'jsonwebtoken'


const Calender = () => {

    const [showM1, setShowM1] = useState(false);
    const [showM2, setShowM2] = useState(false);

    const handleCloseM1 = () => setShowM1(false);
    const handleShowM1 = () => setShowM1(true);
    const handleCloseM2 = () => setShowM2(false);
    const handleShowM2 = () => setShowM2(true);
    const [date, setDate] = useState('')
    const [eventName, setEventName] = useState('')
    const [message, setMessage] = useState('')
    const [appointment, setAppointment] = useState('')
    const [idEvent, setIdEvent] = useState('')
    const [tokenData, setTokenData] = useState('')

    useEffect(() => {
        axios.get('http://localhost:4000/calender').then(res => {
            console.log(res.data)
            setAppointment(res.data)

        }).catch(err => {
            console.log(err)
        })
    }, []);

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

    const handleDateClick = (arg) => {
        setDate(arg.dateStr)
        handleShowM1()

    }

    const handleEventClick = (info) => {
        setIdEvent(info.event._def.extendedProps._id)
        setEventName(info.event._def.title)
        handleShowM2()
    }

    const handleClickDelete = () => {
        axios.put('http://localhost:4000/calender', { _id: idEvent }).then(res => {
            setIdEvent('')
        }).catch(err => console.log(err))
        setTimeout(() => {
            window.location.reload();
        }, 0)
    }

    const handleChange = (e) => {
        setEventName(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const eventInformations = {
            title: eventName,
            start: date
        }

        axios.post('http://localhost:4000/calender', eventInformations).then(res => {
            setMessage(res.data.message)
            setDate('')
            setEventName('')
            setTimeout(() => {
                window.location.reload();
            }, 1000)

        }).catch(err => {
            console.log(err)
        })


    }


    return (
        <div>
            {tokenData.role === 'Médecin' ? <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', marginBottom: '30px' }}>

                <FullCalendar
                    initialView='timeGridWeek'

                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "timeGridWeek,timeGridDay,listWeek"
                    }}
                    views={{
                        timeGridWeek: {
                            type: 'timeGridWeek',
                            buttonText: 'Semaine' // adjust to 3 only for timeGridWeek/timeGridDay
                        },
                        timeGridDay: {
                            type: 'timeGridDay',
                            buttonText: 'Jour' // adjust to 3 only for timeGridWeek/timeGridDay
                        },
                        listWeek: {
                            type: 'listWeek',
                            buttonText: 'Liste' // adjust to 3 only for timeGridWeek/timeGridDay
                        },
                       
                      }}
                   
                      buttonText={{
                        today: "Aujourd'hui" 
                      }}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    // ref={this.calendarComponentRef}
                    // weekends={this.state.calendarWeekends}

                    slotDuration={'00:30:00'}
                    slotLabelInterval={'00:30:00'}



                    slotMinTime='08:00:00'
                    slotMaxTime='20:00:00'
                    events={appointment}


            
                    locale={'fr'}
                    defaultTimedEventDuration={'00:30:00'}
                    allDaySlot={false}
                    contentHeight='auto'

                    
                />

                <Modal centered show={showM1} onHide={handleCloseM1} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ajouter Rendez-vous</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {message == 'Rendez-Vous a été ajouté avec succès' && <p style={{ textAlign: 'center', fontWeight: 'bold', color: 'green' }}> {message} </p>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Nom du patient : </label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" onChange={handleChange} required />
                            </div>
                            <Modal.Footer>
                                <Button className='annBtn' variant="secondary" onClick={handleCloseM1}>
                                    Annuler
                    </Button>
                                <Button className='addBtnEvent' type="submit" variant="primary" >
                                    Ajouter rendez-vous
                    </Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Body>

                </Modal>

                {/* Delete Modal */}

                <Modal centered show={showM2} onHide={handleCloseM2} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Supprimer Rendez-vous</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{ fontSize: '18px', fontWeight: '500' }}>Voulez-vous vraiment supprimer le rendez-vous de <span style={{ color: 'red' }}>{eventName}</span> ?</p>
                        <Modal.Footer>
                            <Button className='annulerBtn' variant="secondary" onClick={handleCloseM2}>
                                Annuler
                    </Button>
                            <Button className='ouiBtn' onClick={handleClickDelete} variant="primary" >
                                Oui
                    </Button>
                        </Modal.Footer>

                    </Modal.Body>

                </Modal>


            </div> : <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', marginBottom: '30px' }}>

                    <FullCalendar
                        initialView='timeGridWeek'

                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "timeGridWeek,timeGridDay,listWeek"
                        }}

                        views={{
                            timeGridWeek: {
                                type: 'timeGridWeek',
                                buttonText: 'Semaine' // adjust to 3 only for timeGridWeek/timeGridDay
                            },
                            timeGridDay: {
                                type: 'timeGridDay',
                                buttonText: 'Jour' // adjust to 3 only for timeGridWeek/timeGridDay
                            },
                            listWeek: {
                                type: 'listWeek',
                                buttonText: 'Liste' // adjust to 3 only for timeGridWeek/timeGridDay
                            },
                           
                          }}
                       
                          buttonText={{
                            today: "Aujourd'hui" 
                          }}
                          
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                        // ref={this.calendarComponentRef}
                        // weekends={this.state.calendarWeekends}

                        slotDuration={'00:30:00'}
                        slotLabelInterval={'00:30:00'}



                        slotMinTime='08:00:00'
                        slotMaxTime='20:00:00'
                        events={appointment}


                        eventClick={handleEventClick}
                        locale={'fr'}
                        defaultTimedEventDuration={'00:30:00'}
                        allDaySlot={false}
                        contentHeight='auto'

                        dateClick={handleDateClick}

                    />

                    <Modal centered show={showM1} onHide={handleCloseM1} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Ajouter Rendez-vous</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {message == 'Rendez-Vous a été ajouté avec succès' && <p style={{ textAlign: 'center', fontWeight: 'bold', color: 'green' }}> {message} </p>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Nom du patient : </label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" onChange={handleChange} required />
                                </div>
                                <Modal.Footer>
                                    <Button className='annBtn' variant="secondary" onClick={handleCloseM1}>
                                        Annuler
                    </Button>
                                    <Button className='addBtnEvent' type="submit" variant="primary" >
                                        Ajouter rendez-vous
                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal.Body>

                    </Modal>

                    {/* Delete Modal */}

                    <Modal centered show={showM2} onHide={handleCloseM2} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Supprimer Rendez-vous</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p style={{ fontSize: '18px', fontWeight: '500' }}>Voulez-vous vraiment supprimer le rendez-vous de <span style={{ color: 'red' }}>{eventName}</span> ?</p>
                            <Modal.Footer>
                                <Button className='annulerBtn' variant="secondary" onClick={handleCloseM2}>
                                    Annuler
                    </Button>
                                <Button className='ouiBtn' onClick={handleClickDelete} variant="primary" >
                                    Oui
                    </Button>
                            </Modal.Footer>

                        </Modal.Body>

                    </Modal>


                </div>}
        </div>
    );
}

export default Calender;