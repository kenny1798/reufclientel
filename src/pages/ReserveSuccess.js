import React from 'react'

function ReserveSuccess() {

const delayNav = () => {
window.location.replace(process.env.REACT_APP_LP)
}

setTimeout(delayNav, 6000);

  return (
    <div>
      <div
        className="row justify-content-center min-vh-100"
        style={{ backgroundColor: "#333333" }}
      >
        <div className="title">
              <div className="subtitle" style={{ paddingTop: "7%" }}>
                Congratulation
              </div>
              <h2 style={{ color: "white" }}>Your reservation has been placed successfully</h2>

              </div>

      </div>
      </div>
  )
}

export default ReserveSuccess