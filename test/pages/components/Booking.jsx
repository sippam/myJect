import React from 'react'

const Booking = () => {
    const time = [
        {key: 1, value: "10:00 - 11:00"},
        {key: 2, value: "11:00 - 12:00"},
        {key: 3, value: "12:00 - 13:00"},
        {key: 4, value: "13:00 - 14:00"},
        {key: 5, value: "14:00 - 15:00"},
        {key: 6, value: "15:00 - 16:00"},
    ]
  return (
    <div>

        {time.map((item) => {
            return <p key={item.key}>{item.value}</p>
        })}
    </div>
  )
}

export default Booking;