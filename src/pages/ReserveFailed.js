import React from 'react'

function ReserveFailed() {

    const delayNav = () => {
        window.location.replace(process.env.REACT_APP_THIS)
        }
        
        setTimeout(delayNav, 6000);

  return (
    <div>
      <div
        className="row justify-content-center min-vh-100"
        style={{ backgroundColor: "#333333" }}
      >
              
        <div className="title">
        <div className="subtitle mb-3" style={{ paddingTop: "7%" }}>
                We're Sorry
              </div>
              <h2 style={{ color: "white" }}>Your reservation was failed. <br/>Please try again.</h2>

              </div>

      </div>
      </div>
  )
}

export default ReserveFailed