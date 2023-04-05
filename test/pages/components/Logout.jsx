import React from 'react'

const Logout = () => {

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

  return (
    <div>
        <button className="testttt" onClick={logout}>Logout</button>
    </div>
  )
}

export default Logout;