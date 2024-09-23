import React from 'react'

interface Player {
  name: string
  coin: number
}

interface RankingBoardProps {
  players: Player[]
}

const RankingBoard: React.FC<RankingBoardProps> = ({ players }) => (
  <div className='rankingboard lg:col-span-1 bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg border border-cyan-500'>
    <h2 className='text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-cyan-400'>
      所持金ランキング
    </h2>
    {players.map((player, index) => (
      <div key={index} className='flex justify-between items-center mb-1 sm:mb-2'>
        <span className='text-sm sm:text-base text-cyan-300'>
          {index + 1}. {player.name}
        </span>
        <span className='text-sm sm:text-base text-yellow-400'>{player.coin}円</span>
      </div>
    ))}
  </div>
)

export default RankingBoard
