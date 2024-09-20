import React from 'react'

interface Player {
  name: string
  money: number
}

interface VoteBoardProps {
  players: Player[]
  currentPlayer: Player
  onPlayerClick: (player: Player) => void
}

const VoteBoard: React.FC<VoteBoardProps> = ({ players, currentPlayer, onPlayerClick }) => (
  <div className='viteboard flex-grow bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg border border-indigo-500'>
    <h1 className='text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-indigo-400'>
      投票する人を選択する
    </h1>
    <ul className='grid grid-cols-2 gap-2 sm:gap-4'>
      {players
        .filter((p) => p.name !== currentPlayer.name)
        .map((player, index) => (
          <li key={index}>
            <button
              onClick={() => onPlayerClick(player)}
              className='w-full bg-gray-700 hover:bg-gray-600 text-indigo-300 font-bold py-1 sm:py-2 px-2 sm:px-4 rounded text-sm sm:text-base transition duration-300 ease-in-out border border-indigo-600 hover:border-indigo-500 hover:text-indigo-200'
            >
              {player.name}
            </button>
          </li>
        ))}
    </ul>
  </div>
)

export default VoteBoard
