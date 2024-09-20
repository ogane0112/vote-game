# components/game ディレクトリを作成
mkdir -p components/game

# GameBoard.tsx を作成
cat << EOF > components/game/GameBoard.tsx
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
      console.log(\`\${betAmount}円を\${selectedPlayer.name}に賭けました\`)
      // ここで実際の賭け処理を実装
    }
    setShowBetPopup(false)
  }

  const togglePauseMenu = (): void => {
    setShowPauseMenu(!showPauseMenu)
  }

  return (
    <div className='bg-gray-900 text-gray-300 p-4 sm:p-6 font-mono min-h-screen flex flex-col'>
      <button
        onClick={togglePauseMenu}
        className='absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded'
      >
        Pause
      </button>
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

      {showPauseMenu && (
        <PauseMenu onClose={togglePauseMenu} />
      )}
    </div>
  )
}

export default GameBoard
EOF

# RankingBoard.tsx を作成
cat << EOF > components/game/RankingBoard.tsx
import React from 'react'

interface Player {
  name: string
  money: number
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
        <span className='text-sm sm:text-base text-yellow-400'>{player.money}円</span>
      </div>
    ))}
  </div>
)

export default RankingBoard
EOF

# TopicDisplay.tsx を作成
cat << EOF > components/game/TopicDisplay.tsx
import React from 'react'

interface TopicDisplayProps {
  currentTopic: string
}

const TopicDisplay: React.FC<TopicDisplayProps> = ({ currentTopic }) => (
  <div className='topic-display bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg border border-pink-500'>
    <h2 className='text-lg sm:text-xl font-semibold mb-2 text-pink-400'>お題</h2>
    <p className='text-xl sm:text-2xl font-bold text-white'>{currentTopic}</p>
  </div>
)

export default TopicDisplay
EOF

# VoteBoard.tsx を作成
cat << EOF > components/game/VoteBoard.tsx
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
EOF

# StatusBoard.tsx を作成
cat << EOF > components/game/StatusBoard.tsx
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
    <h2 className='text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-emerald-400'>
      自分の所持金
    </h2>
    <p className='text-2xl sm:text-3xl font-bold text-yellow-400'>
      {currentPlayer.money} 円
    </p>
  </div>
)

export default StatusBoard
EOF

# BetPopup.tsx を作成
cat << EOF > components/game/BetPopup.tsx
import React from 'react'

interface Player {
  name: string
  money: number
}

interface BetPopupProps {
  selectedPlayer: Player
  betAmount: number
  setBetAmount: (amount: number) => void
  onCancel: () => void
  onBet: () => void
  maxBet: number
}

const BetPopup: React.FC<BetPopupProps> = ({
  selectedPlayer,
  betAmount,
  setBetAmount,
  onCancel,
  onBet,
  maxBet,
}) => (
  <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
    <div className='bg-gray-800 p-6 rounded-lg shadow-xl border border-indigo-500'>
      <h2 className='text-xl font-bold mb-4 text-indigo-400'>
        {selectedPlayer.name}に賭ける金額を選択
      </h2>
      <input
        type='range'
        min={100}
        max={maxBet}
        step={100}
        value={betAmount}
        onChange={(e) => setBetAmount(Number(e.target.value))}
        className='w-full mb-4'
      />
      <p className='text-lg text-yellow-400 mb-4'>{betAmount} 円</p>
      <div className='flex justify-between'>
        <button
          onClick={onCancel}
          className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
        >
          キャンセル
        </button>
        <button
          onClick={onBet}
          className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded'
        >
          賭ける
        </button>
      </div>
    </div>
  </div>
)

export default BetPopup
EOF

# PauseMenu.tsx を作成
cat << EOF > components/game/PauseMenu.tsx
import React, { useState } from 'react'

interface PauseMenuProps {
  onClose: () => void
}

const PauseMenu: React.FC<PauseMenuProps> = ({ onClose }) => {
  const [showSettings, setShowSettings] = useState(false)

  const handleExit = () => {
    console.log('ゲームを退出します')
    // ここでゲーム退出のロジックを実装
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-gray-800 p-6 rounded-lg shadow-xl border border-yellow-500'>
        <h2 className='text-2xl font-bold mb-6 text-yellow-400'>ポーズメニュー</h2>
        <div className='flex flex-col space-y-4'>
          <button
            onClick={onClose}
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
          >
            ゲームに戻る
          </button>
          <button
            onClick={toggleSettings}
            className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'
          >
            設定
          </button>
          <button
            onClick={handleExit}
            className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
          >
            ゲームを退出
          </button>
        </div>
        {showSettings && (
          <div className='mt-6 p-4 bg-gray-700 rounded-lg'>
            <h3 className='text-xl font-bold mb-4 text-white'>設定</h3>
            {/* ここに設定オプションを追加 */}
            <p className='text-gray-300'>設定オプションをここに追加します。</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PauseMenu
EOF

# 作成したファイルの確認
ls -l components/game/