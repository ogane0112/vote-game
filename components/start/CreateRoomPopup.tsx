import React from 'react'

interface CreateRoomPopupProps {
  roomNumber: string
  onClose: () => void
}

const CreateRoomPopup: React.FC<CreateRoomPopupProps> = ({ roomNumber, onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-gray-800 p-6 rounded-lg'>
        <h2 className='text-xl font-bold mb-4'>部屋が作成されました</h2>
        <p className='mb-4'>
          部屋番号: <span className='font-bold text-2xl'>{roomNumber}</span>
        </p>
        <button
          onClick={onClose}
          className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'
        >
          閉じる
        </button>
      </div>
    </div>
  )
}

export default CreateRoomPopup
