'use client'
import React, { useState, useEffect } from 'react'
 // Start of Selection
import RankingBoard from '@/components/game/RankingBoard'
import TopicDisplay from '@/components/game/TopicDisplay'
import VoteBoard from '@/components/game/VoteBoard'
import StatusBoard from '@/components/game/StatusBoard'
import BetPopup from '@/components/game/BetPopup'
import PauseMenu from '@/components/game/PauseMenu'
import ResultPopup from '@/components/game/ResultPopup'
import { useGameLogic,Player} from '../actions' // useGameLogicをインポート
import { useRouter } from 'next/router'



// GameBoard コンポーネント
const GameBoard: React.FC<{ gameId: string; userId: string }> = ({ gameId, userId }) => {
    const  router = useRouter()
    const {
      gameState,
      error,
      castVote,
      processRoundResults,
      leaveGame,
      getGameResults
    } = useGameLogic(gameId)
  
    const [showBetPopup, setShowBetPopup] = useState<boolean>(false)
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
    const [betAmount, setBetAmount] = useState<number>(100)
    const [showPauseMenu, setShowPauseMenu] = useState<boolean>(false)
    const [showResultPopup, setShowResultPopup] = useState<boolean>(false)
    const [gameResults, setGameResults] = useState<any>(null)
  
    const currentPlayer = gameState?.PLAYERS.find(player => player.user_id === userId)
    const currentTopic = gameState?.TOPICS.find(topic => topic.id === gameState.current_topic_id)?.content
  
    useEffect(() => {
      if (error) {
        console.error('Game error:', error)
        // エラー処理（例：エラーメッセージを表示する）
      }
    }, [error])
  
    useEffect(() => {
      if (gameState && gameState.status === 'active') {
        const allPlayersVoted = gameState.PLAYERS.every(player => 
          gameState.VOTES.some(vote => 
            vote.voter_id === player.id && vote.topic_id === gameState.current_topic_id
          )
        )
  
        if (allPlayersVoted) {
          processRoundResults()
        }
      }
    }, [gameState])
  
    useEffect(() => {
      if (gameState && gameState.status === 'completed') {
        const results = getGameResults()
        setGameResults(results)
        setShowResultPopup(true)
      }
    }, [gameState?.status])
  
    const handlePlayerClick = (player: Player): void => {
      setSelectedPlayer(player)
      setShowBetPopup(true)
    }
  
    const handleBet = async (): Promise<void> => {
      if (selectedPlayer && currentPlayer) {
        await castVote(currentPlayer.id, selectedPlayer.id, betAmount)
        console.log(`${betAmount}コインを${selectedPlayer.name}に賭けました`)
      }
      setShowBetPopup(false)
    }
  
    const togglePauseMenu = (): void => {
      setShowPauseMenu(!showPauseMenu)
    }
  
    const handleLeaveGame = async (): Promise<void> => {
      await leaveGame(userId)
      router.push('/') // ルートディレクトリにリダイレクト
    }
    if (!gameState) {
      return <div>Loading...</div>
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
          <RankingBoard players={gameState.PLAYERS} />
          <div className='lg:col-span-2 flex flex-col gap-4 sm:gap-6'>
            <TopicDisplay currentTopic={currentTopic || ''} />
            <VoteBoard
              players={gameState.PLAYERS}
              currentPlayer={currentPlayer}
              onPlayerClick={handlePlayerClick}
            />
            <StatusBoard currentPlayer={currentPlayer} />
          </div>
        </div>
  
        {showBetPopup && selectedPlayer && currentPlayer && (
          <BetPopup
            selectedPlayer={selectedPlayer}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            onCancel={() => setShowBetPopup(false)}
            onBet={handleBet}
            maxBet={currentPlayer.coins}
          />
        )}
  
        {showPauseMenu && (
          <PauseMenu 
            onClose={togglePauseMenu}
            onLeaveGame={handleLeaveGame}
          />
        )}
  
        {showResultPopup && gameResults && (
          <ResultPopup
            results={gameResults}
            onClose={() => setShowResultPopup(false)}
          />
        )}
      </div>
    )
  }
  
  export default GameBoard