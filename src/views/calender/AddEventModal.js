

import React from 'react'

const AddEventModal = () => {
    return ( <div  className="modal fade " id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle"  aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title text-center" id="exampleModalLongTitle">Ajouter Fiche Patient</h5>
                <button type="button" className="close"  data-dismiss="modal" aria-label="Close">
                    <span  aria-hidden="true">×</span>
                </button>
            </div>
            <div className="modal-body">
                
                <form className="modalPatient"  action='/fiches-patients' method="POST">
                    <div className="form-group">
                     
                    </div>


                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Observation</label>
                        <textarea  required className="form-control" id="exampleFormControlTextarea1"  name='observation' rows={7} />
                    </div>

                 



                    <div className="modalPatientFooter ">
                        <button type="button"  className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                        <button type="submit" className="btn btn-primary">Ajouter</button>
                    </div>
                </form>

            </div>

        </div>
    </div>
</div> );
}
 
export default AddEventModal;