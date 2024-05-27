import React, {useState } from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from '../url/axios';


function ReserveConfirm({data}) {

  const [open, setOpen] = useState(false);
  const [hideBtn, setHideBtn] = useState("");
  const [err,setErr] = useState("");

  const onOpenModal = () =>{
    setOpen(true);
  } 
  const onCloseModal = () => {
    setErr("")
    setHideBtn("")
    setOpen(false);
  }


  const handleConfirm = () => {
    setHideBtn("hide")
    const sendData = {pax: data.pax, selectedDate: data.selectedDate, selectedSession: data.selectedSession, name: data.name, email: data.email, phoneNumber: data.phoneNumber}
    axios.post('/booking', sendData).then((res) => {
        if(res.data.url){
            window.location.href = res.data.url;
        }else if(res.data.error){
          setErr(res.data.error)
        }
    }).catch(err =>{console.log(err.message)})
  }
  
  

  return (
    <div>
      <button className='btn btn-primary my-3' onClick={onOpenModal}>Reserve Now</button>
      <Modal open={open} onClose={onCloseModal} center classNames={{
          overlay: 'customOverlay',
          modal: 'customModal',
        }}>
      <div className='row'>
        <div className='col-lg-12'>
        <h2 className='mt-4'>Confirm Booking Details</h2>
        <br/>
        {err === "" ? (<></>) : (
        <div class="alert alert-danger" role="alert">
          {err}
        </div>)}

        <p>PAX: <strong>{data.pax}</strong></p>
        <p>DATE: <strong>{data.selectedDate.slice(0,15)}</strong></p>
        <p>SESSION: <strong>{data.selectedSession}</strong></p>
        <p>NAME: <strong>{data.name}</strong></p>
        <p>EMAIL: <strong>{data.email}</strong></p>
        <p>PHONE NO: <strong>{data.phoneNumber}</strong></p>
        </div>
        <div className='col-lg-12 text-end'>
          {hideBtn === "" ? (<button className='btn btn-success' onClick={handleConfirm}>Confirm</button>) : (<></>)}
        
        </div>
      </div>
      </Modal>
    </div>
  )
};

ReactDOM.createPortal(<ReserveConfirm/>, document.getElementById('root'))

export default ReserveConfirm