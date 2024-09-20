'use client'
import React, { useState } from 'react'
import JoinRoomPopup from './JoinRoomPopup'

const JoinRoomButton: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [roomNumber, setRoomNumber] = useState('')

  const handleJoinRoom = () => {
    setShowPopup(true)
  }

  const handleJoinConfirm = () => {
    console.log(`部屋番号 ${roomNumber} に入室しました`)
    setShowPopup(false)
  }

  return (
    <>
      <button
        onClick={handleJoinRoom}
        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out'
      >
        部屋に入室
      </button>
      {showPopup && (
        <JoinRoomPopup
          roomNumber={roomNumber}
          setRoomNumber={setRoomNumber}
          onJoin={handleJoinConfirm}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  )
}

export default JoinRoomButton
