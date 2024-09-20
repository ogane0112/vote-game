'use client'
import React, { useState, useEffect } from 'react'
import RankingBoard from './RankingBoard'
import TopicDisplay from './TopicDisplay'
import VoteBoard from './VoteBoard'
import StatusBoard from './StatusBoard'
import BetPopup from './BetPopup'
import PauseMenu from './PauseMenu'

// プレイヤーの型定義
interface Player {
  name: string
  money: number
}

const GameBoard: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Alice', money: 1000 },
    { name: 'Bob', money: 1200 },
    { name: 'Charlie', money: 800 },
    { name: 'David', money: 1500 },
    { name: 'Eve', money: 950 },
    { name: 'Frank', money: 1100 },
  ])
  const [currentPlayer, setCurrentPlayer] = useState<Player>(players[0])
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [showBetPopup, setShowBetPopup] = useState<boolean>(false)
  const [betAmount, setBetAmount] = useState<number>(100)
  const [currentTopic, setCurrentTopic] = useState<string>('今日の朝ごはん')
  const [showPauseMenu, setShowPauseMenu] = useState<boolean>(false)

  useEffect(() => {
    const sortedPlayers = [...players].sort((a, b) => b.money - a.money)
    setPlayers(sortedPlayers)
  }, [])

  const handlePlayerClick = (player: Player): void => {
    setSelectedPlayer(player)
    setShowBetPopup(true)
  }

  const handleBet = (): void => {
    if (selectedPlayer) {
      console.log(`${betAmount}円を${selectedPlayer.name}に賭けました`)
      // ここで実際の賭け処理を実装
    }
    setShowBetPopup(false)
  }

  const togglePauseMenu = (): void => {
    setShowPauseMenu(!showPauseMenu)
  }

  return (
    <div className='bg-gray-900 text-gray-300 p-4 sm:p-6 font-mono min-h-screen flex flex-col'>
      <div className='flex flex-col sm:flex-row justify-between items-center mb-4'>
        <h1 className='text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-0'>ゲームボード</h1>
        <button
          onClick={togglePauseMenu}
          className='w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded'
        >
          Pause
        </button>
      </div>
      <div className='flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6'>
        <RankingBoard players={players} />
        <div className='lg:col-span-2 flex flex-col gap-4 sm:gap-6'>
          <TopicDisplay currentTopic={currentTopic} />
          <VoteBoard
            players={players}
            currentPlayer={currentPlayer}
            onPlayerClick={handlePlayerClick}
          />
          <StatusBoard currentPlayer={currentPlayer} />
        </div>
      </div>

      {showBetPopup && selectedPlayer && (
        <BetPopup
          selectedPlayer={selectedPlayer}
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          onCancel={() => setShowBetPopup(false)}
          onBet={handleBet}
          maxBet={currentPlayer.money}
        />
      )}

      {showPauseMenu && <PauseMenu onClose={togglePauseMenu} />}
    </div>
  )
}

export default GameBoard
