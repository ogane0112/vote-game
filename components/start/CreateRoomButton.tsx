// 'use client'
// import React, { useState } from 'react'
import CreateRoomPopup from './CreateRoomPopup'
import { makeRoom } from '@/utils/supabase/actions'
const CreateRoomButton: React.FC = () => {
  // const [showPopup, setShowPopup] = useState(false)
  // const [roomNumber, setRoomNumber] = useState('')

  // const handleCreateRoom = () => {
  //   const randomRoomNumber = Math.floor(100000 + Math.random() * 900000).toString()
  //   // setRoomNumber(randomRoomNumber)
  //   // setShowPopup(true)
  // }

  return (
    <>
    <form>
    <button
        formAction={makeRoom}
        className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out'
      >
        部屋を作成
      </button>

    </form>

      {/* {showPopup && <CreateRoomPopup roomNumber={roomNumber} onClose={() => setShowPopup(false)} />} */}
    </>
  )
}

export default CreateRoomButton
