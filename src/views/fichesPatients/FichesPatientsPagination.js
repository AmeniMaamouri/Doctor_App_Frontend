import React, { useState } from 'react'


const FichesPatientPagination = ({ postsPerPage, totalPosts, paginate }) => {

    const [iClicked, setiClicked] = useState('')
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (


        <nav style={{marginTop:'20px'}} className="col-12 ">
            <ul className="pagination" style={{justifyContent: 'center'}} >
               
                {pageNumbers.map((number,i) => (
                    <li key={number} className={i == iClicked && "active page-item"} style={{justifyContent: 'center'}}>
                        <a  onClick={() => {
                            paginate(number)
                            setiClicked(i)
                        }} href='!#/fiches-patients' className="page-link "> {number} </a>

                    </li>
                ))}
               
            </ul>
        </nav>
    );
}

export default FichesPatientPagination;