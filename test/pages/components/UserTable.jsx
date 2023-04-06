import React from 'react'

const UserTable = () => {
  return (
    <div>
        <table>
          <tbody>
            {match ? (
              <>
                <tr>
                  <th className="table-style">Conference 1</th>
                  {con1.length > 0 &&
                    con1.map((data) => {
                      return (
                        <>
                          {/* <div className="header">
                              {val.roomName}
                              <span className="description">
                                Email : {val.email}
                                <br />
                                Name : {val.name}
                                <br />
                                Day : {val.day}
                                <br />
                                Period : {val.timeFrom}:00 - {val.timeTo}:00
                                <br />
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(val.id);
                                  }}
                                >
                                  Delete
                                </button>
                              </span>
                            </div> */}
                          <td className="table-style">
                            {/* <div key={uuid()} className="card"> */}
                            {/* <div className="card-body"> */}
                            <div className="header">
                              <h4>Room name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>Email : {data.email}</p>
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(val.id);
                                  }}
                                >
                                  delete
                                </button>
                              </span>
                            </div>
                            {/* </div> */}
                            {/* </div> */}
                          </td>
                        </>
                      );
                    })}
                </tr>
                <tr>
                  <th className="table-style">Conference 2</th>
                  {con2.length > 0 &&
                    con2.map((data) => {
                      return (
                        <>
                          <td className="table-style">
                            <div className="header">
                              <h4>Room name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
                                <p>Email : {data.email}</p>
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(data.id);
                                  }}
                                >
                                  delete
                                </button>
                              </span>
                            </div>
                          </td>
                        </>
                      );
                    })}
                </tr>
                <tr>
                  <th className="table-style">Conference 3</th>
                  {con3.length > 0 &&
                    con3.map((data) => {
                      return (
                        <>
                          <td className="table-style">
                            <div className="header">
                              <h4>Room name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
                                <p>Email : {data.email}</p>
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(data.id);
                                  }}
                                >
                                  delete
                                </button>
                              </span>
                            </div>
                          </td>
                        </>
                      );
                    })}
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <th className="table-style">Meeting 1</th>
                  {meet1.length > 0 &&
                    meet1.map((data) => {
                      return (
                        <>
                          <td className="table-style">
                            <div className="header">
                              <h4>Room name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
                                <p>Email : {data.email}</p>
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(data.id);
                                  }}
                                >
                                  delete
                                </button>
                              </span>
                            </div>
                          </td>
                        </>
                      );
                    })}
                </tr>
                <tr>
                  <th className="table-style">Meeting 2</th>
                  {meet2.length > 0 &&
                    meet2.map((data) => {
                      return (
                        <>
                          <td className="table-style">
                            <div className="header">
                              <h4>Room name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
                                <p>Email : {data.email}</p>
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(data.id);
                                  }}
                                >
                                  delete
                                </button>
                              </span>
                            </div>
                          </td>
                        </>
                      );
                    })}
                </tr>
                <tr>
                  <th className="table-style">Meeting 3</th>
                  {meet3.length > 0 &&
                    meet3.map((data) => {
                      return (
                        <>
                          <td className="table-style">
                            <div className="header">
                              <h4>Room name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
                                <p>Email : {data.email}</p>
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(data.id);
                                  }}
                                >
                                  delete
                                </button>
                              </span>
                            </div>
                          </td>
                        </>
                      );
                    })}
                </tr>
                <tr>
                  <th className="table-style">Meeting 4</th>
                  {meet4.length > 0 &&
                    meet4.map((data) => {
                      return (
                        <>
                          <td className="table-style">
                            <div className="header">
                              <h4>Room name : {data.roomName}</h4>
                              <p>
                                Period : {data.timeFrom}:00 - {data.timeTo}
                                :00
                              </p>
                              <span className="description">
                                <p>Date : {data.day}</p>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
                                <p>Email : {data.email}</p>
                                <button
                                  className="delete-btn"
                                  onClick={() => {
                                    deleteBooking(data.id);
                                  }}
                                >
                                  delete
                                </button>
                              </span>
                            </div>
                          </td>
                        </>
                      );
                    })}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
  )
}

export default UserTable;