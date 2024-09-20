import React from 'react'
import NumberInput from './NumberInput'

interface JoinRoomPopupProps {
  roomNumber: string
  setRoomNumber: (value: string) => void
  onJoin: () => void
  onClose: () => void
}

const JoinRoomPopup: React.FC<JoinRoomPopupProps> = ({
  roomNumber,
  setRoomNumber,
  onJoin,
  onClose,
}) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-gray-800 p-6 rounded-lg'>
        <h2 className='text-xl font-bold mb-4'>部屋に入室</h2>
        <p className='mb-2'>部屋番号を入力してください：</p>
        <input
          type='text'
          value={roomNumber}
          readOnly
          className='w-full bg-gray-700 text-white py-2 px-4 rounded mb-4'
        />
        <NumberInput value={roomNumber} onChange={setRoomNumber} />
        <div className='flex justify-between'>
          <button
            onClick={onJoin}
            className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          >
            入室
          </button>
          <button
            onClick={onClose}
            className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  )
}

export default JoinRoomPopup
