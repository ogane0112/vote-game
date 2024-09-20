import React from 'react'
import Link from 'next/link'
import BackButton from './BackButton'
import CreateRoomButton from './CreateRoomButton'
import JoinRoomButton from './JoinRoomButton'

const GameStartScreen: React.FC = () => {
  return (
    <main className='bg-gray-900 text-gray-300 min-h-screen flex flex-col items-center justify-center font-mono'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg border border-indigo-500 max-w-md w-full'>
        <h1 className='text-4xl font-bold mb-8 text-center text-indigo-400'>お題当てゲーム</h1>

        <div className='space-y-4'>
          <CreateRoomButton />
          <JoinRoomButton />

          <Link href='/rules' className='block w-full'>
            <button className='w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out'>
              ルール確認
            </button>
          </Link>

          <Link href='/settings' className='block w-full'>
            <button className='w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out'>
              設定
            </button>
          </Link>
          <BackButton />
        </div>
      </div>
    </main>
  )
}

export default GameStartScreen
