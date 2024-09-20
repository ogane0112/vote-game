'use client'
import React, { useState, useEffect } from 'react'

// プレイヤーの型定義
interface Player {
  name: string
  money: number
}

const GameBoard: React.FC<void> = () => {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Alice', money: 1000 },
    { name: 'Bob', money: 1200 },
    { name: 'Charlie', money: 800 },
    { name: 'David', money: 1500 },
    { name: 'Eve', money: 950 },
    { name: 'Frank', money: 1100 },
  ])
  const [currentPlayer, _setCurrentPlayer] = useState<Player>(players[0])
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [betAmount, setBetAmount] = useState<number>(100)
  const [currentTopic, _setCurrentTopic] = useState<string>('今日の朝ごはん')

  useEffect(() => {
    const sortedPlayers = [...players].sort((a, b) => b.money - a.money)
    setPlayers(sortedPlayers)
  }, [])

  const handlePlayerClick = (player: Player): void => {
    setSelectedPlayer(player)
    setShowPopup(true)
  }

  const handleBet = (): void => {
    if (selectedPlayer) {
      console.log(`${betAmount}円を${selectedPlayer.name}に賭けました`)
    }
    setShowPopup(false)
  }

  return (
    <div className='bg-gray-900 text-gray-300 p-4 sm:p-6 font-mono min-h-screen flex flex-col'>
      <div className='flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6'>
        {/* ランキングボード */}
        <div className='rankingboard lg:col-span-1 bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg border border-cyan-500'>
          <h2 className='text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-cyan-400'>
            所持金ランキング
          </h2>
          {players.map((player, index) => (
            <div key={index} className='flex justify-between items-center mb-1 sm:mb-2'>
              <span className='text-sm sm:text-base text-cyan-300'>
                {index + 1}. {player.name}
              </span>
              <span className='text-sm sm:text-base text-yellow-400'>{player.money}円</span>
            </div>
          ))}
        </div>

        {/* 投票ボードとステータスボードを包含する右側のコンテナ */}
        <div className='lg:col-span-2 flex flex-col gap-4 sm:gap-6'>
          {/* お題表示 */}
          <div className='topic-display bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg border border-pink-500'>
            <h2 className='text-lg sm:text-xl font-semibold mb-2 text-pink-400'>お題</h2>
            <p className='text-xl sm:text-2xl font-bold text-white'>{currentTopic}</p>
          </div>

          {/* 投票ボード */}
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
                      onClick={() => handlePlayerClick(player)}
                      className='w-full bg-gray-700 hover:bg-gray-600 text-indigo-300 font-bold py-1 sm:py-2 px-2 sm:px-4 rounded text-sm sm:text-base transition duration-300 ease-in-out border border-indigo-600 hover:border-indigo-500 hover:text-indigo-200'
                    >
                      {player.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          {/* ステータスボード */}
          <div className='statusboard bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg border border-emerald-500'>
            <h2 className='text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-emerald-400'>
              自分の所持金
            </h2>
            <p className='text-2xl sm:text-3xl font-bold text-yellow-400'>
              {currentPlayer.money} 円
            </p>
          </div>
        </div>
      </div>

      {/* ポップアップメニュー */}
      {showPopup && selectedPlayer && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-gray-800 p-6 rounded-lg shadow-xl border border-indigo-500'>
            <h2 className='text-xl font-bold mb-4 text-indigo-400'>
              {selectedPlayer.name}に賭ける金額を選択
            </h2>
            <input
              type='range'
              min={100}
              max={currentPlayer.money}
              step={100}
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className='w-full mb-4'
            />
            <p className='text-lg text-yellow-400 mb-4'>{betAmount} 円</p>
            <div className='flex justify-between'>
              <button
                onClick={() => setShowPopup(false)}
                className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
              >
                キャンセル
              </button>
              <button
                onClick={handleBet}
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded'
              >
                賭ける
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GameBoard
