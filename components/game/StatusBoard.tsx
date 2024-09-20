import React from 'react'

interface Player {
  name: string
  money: number
}

interface StatusBoardProps {
  currentPlayer: Player
}

const StatusBoard: React.FC<StatusBoardProps> = ({ currentPlayer }) => (
  <div className='statusboard bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg border border-emerald-500'>
    <h2 className='text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-emerald-400'>自分の所持金</h2>
    <p className='text-2xl sm:text-3xl font-bold text-yellow-400'>{currentPlayer.money} 円</p>
  </div>
)

export default StatusBoard
