import React, { useEffect, useState } from 'react';
import ReserveFailed from './ReserveFailed';
import ReserveSuccess from './ReserveSuccess';
import {useSearchParams} from 'react-router-dom';
import axios from '../url/axios';

function ReserveFinish() {

  const [paymentStatus, setPaymentStatus] = useState('');
  const [searchParams] = useSearchParams();

 const billId = searchParams.get('billplz[id]').toString();
  

  useEffect(() => {
    const data = {billId: billId}
    axios.post('/booking-status', data).then((response) => {
      setPaymentStatus(response.data.status);
    })
  }, []);

  console.log(paymentStatus)

  return (
    <div>
      <div
        className="row justify-content-center"
        style={{ backgroundColor: "#333" }}
      >
        <div className="title">
              {paymentStatus === 'Booked' ? (<ReserveSuccess />) : (<ReserveFailed replace />)}
              </div>

      </div>
      </div>
  )
}

export default ReserveFinish