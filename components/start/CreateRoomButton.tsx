'use client'
import React, { useState } from 'react'
import CreateRoomPopup from './CreateRoomPopup'

const CreateRoomButton: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [roomNumber, setRoomNumber] = useState('')

  const handleCreateRoom = () => {
    const randomRoomNumber = Math.floor(100000 + Math.random() * 900000).toString()
    setRoomNumber(randomRoomNumber)
    setShowPopup(true)
  }

  return (
    <>
      <button
        onClick={handleCreateRoom}
        className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out'
      >
        部屋を作成
      </button>
      {showPopup && <CreateRoomPopup roomNumber={roomNumber} onClose={() => setShowPopup(false)} />}
    </>
  )
}

export default CreateRoomButton
