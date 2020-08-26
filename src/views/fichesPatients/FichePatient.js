import React, { useState, useEffect } from 'react'
import './fichesPatients.css'
import MaterialTable from 'material-table'


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import moment from 'moment'
import jwt from 'jsonwebtoken'


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const FichePatient = () => {

    const { id } = useParams();

    const [columns] = useState([
        { title: 'Date', field: 'dateObservation', type: 'date', editable: 'never' },
        { title: 'Observation', field: 'observation' },
    ]);

    const [data, setData] = useState([]);
    const [arrayData, setArrayData] = useState()
    const [ficheId, setFicheId] = useState()
    const [sheetNumber, setSheetNumber] = useState()
    const [loading, setLoading] = useState(true)
    const [tokenData, setTokenData] = useState('')


    useEffect(() => {

        axios.get(`http://localhost:4000/fiche-patient/` + id).then(res => {
            setData(res.data)
            setArrayData(res.data.fiche.notes)
            setFicheId(res.data.fiche._id)
            setSheetNumber(JSON.stringify(res.data.fiche.sheetNumber))
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }, [])

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
            {tokenData.role === 'Secrétaire' ? <div>  {loading === true ? <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '7%', fontWeight: 'bold' }}>Loading...</p> :
                <div className="fiche">
                    <div style={{ textAlign: 'center' }}>
                        <h4>Fiche N°{sheetNumber}</h4>
                    </div>
                    <div className='row information justify-content-around'>
                        <div className="col-4  personnel">
                            <p><strong>Nom et prénom :</strong> {data.name}</p>
                            <p><strong>Date de naissance : </strong> {moment(data.birth).format('L')}</p>
                            <p><strong>Sexe :</strong> {data.sexe}</p>

                        </div>
                        <div className="col-4 place">
                            <p><strong>Adresse : </strong> {data.adress}</p>

                            <p><strong>Téléphone :</strong> {data.phone}</p>
                            <p><strong>Fiche créé le : </strong> {moment(data.createdAt).format('L')}</p>

                        </div>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <MaterialTable

                            icons={tableIcons}
                            title="Les Notes"
                            columns={columns}
                            data={arrayData}
                            options={{
                                paging: false,
                                search: false,
                                addRowPosition: 'first',

                            }}
                            localization={{ body: { editRow: { deleteText: 'Voulez-vous vraiment supprimer?' } } }}
             

                        />
                    </div>



                </div>} </div> : <div>  {loading === true ? <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '7%', fontWeight: 'bold' }}>Loading...</p> :
                    <div style={{ marginTop: '20px' }} className="fiche">
                        <div style={{ textAlign: 'center' }}>
                            <h4>Fiche N°{sheetNumber}</h4>
                        </div>
                        <div className='row information justify-content-around'>
                            <div className="col-4  personnel">
                                <p><strong>Nom et prénom :</strong> {data.name}</p>
                                <p><strong>Date de naissance : </strong> {moment(data.birth).format('L')}</p>
                                <p><strong>Sexe :</strong> {data.sexe}</p>

                            </div>
                            <div className="col-4 place">
                                <p><strong>Adresse : </strong> {data.adress}</p>

                                <p><strong>Téléphone :</strong> {data.phone}</p>
                                <p><strong>Fiche créé le : </strong> {moment(data.createdAt).format('L')}</p>

                            </div>
                        </div>

                        <div style={{ marginBottom: '40px' }}>
                            <MaterialTable

                                icons={tableIcons}
                                title="Les Notes"
                                columns={columns}
                                data={arrayData}
                                options={{
                                    paging: false,
                                    search: false,
                                    addRowPosition: 'first',

                                }}
                                localization={{ body: { editRow: { deleteText: 'Voulez-vous vraiment supprimer?' } } }}
                                editable={{
                                    onRowAdd: newData =>
                                        new Promise((resolve, reject) => {
                                            newData = {
                                                _id: data.fiche._id,
                                                observation: newData.observation,
                                                dateObservation: new Date()

                                            }

                                            setTimeout(() => {
                                                setArrayData([newData, ...arrayData]);
                                                axios.post(`http://localhost:4000/fiche-patient/` + id, newData).then(res => {
                                                    console.log(res)
                                                }).catch(err => {
                                                    console.log(err)
                                                })
                                                resolve();
                                            }, 1000)

                                        }),


                                    onRowUpdate: (newData, oldData) =>
                                        new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                const dataUpdate = [...arrayData];
                                                const index = oldData.tableData.id;
                                                dataUpdate[index] = newData;
                                                setArrayData([...dataUpdate]);

                                                let information = {
                                                    notes: dataUpdate,
                                                    _id: ficheId,
                                                }

                                                axios.put(`http://localhost:4000/fiche-patient/` + id, information).then(res => {
                                                    console.log(res)
                                                }).catch(err => {
                                                    console.log(err)
                                                })
                                                resolve();
                                            }, 1000)
                                        }),
                                    onRowDelete: oldData =>

                                        new Promise((resolve, reject) => {

                                            setTimeout(() => {

                                                const dataDelete = [...arrayData];
                                                const index = oldData.tableData.id;
                                                dataDelete.splice(index, 1);
                                                setArrayData([...dataDelete]);
                                                let information = {
                                                    notes: dataDelete,
                                                    _id: ficheId,
                                                }
                                                axios.put(`http://localhost:4000/fiche-patient/` + id, information).then(res => {
                                                    console.log(res)
                                                }).catch(err => {
                                                    console.log(err)
                                                })
                                                resolve()
                                            }, 1000)
                                        }),
                                }}

                            />
                        </div>



                    </div>} </div>}
        </div>

    );
}

export default FichePatient;