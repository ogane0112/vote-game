import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';


// 型定義
export interface Player {
    id: string
    user_id: string
    coins: number
    name: string
  }
  
 export  interface Topic {
    id: string
    content: string
    order: number
  }
  
  interface Vote {
    id: string
    voter_id: string
    voted_for_id: string
    bet_amount: number
    topic_id: string
  }
  
export   interface GameState {
    id: string
    status: 'waiting' | 'active' | 'completed'
    current_topic_id: string | null
    current_round: number
    TOPICS: Topic[]
    VOTES: Vote[]
    PLAYERS: Player[]
  }
  
  // useGameLogic フック
 export function useGameLogic(gameId: string) {
    const [gameState, setGameState] = useState<GameState | null>(null)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()
  
    useEffect(() => {
      if (!gameId) return
  
      fetchGameState()
  
      const subscription = supabase
        .channel(`game_${gameId}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'GAMES', filter: `id=eq.${gameId}` }, fetchGameState)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'TOPICS', filter: `game_id=eq.${gameId}` }, fetchGameState)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'VOTES', filter: `game_id=eq.${gameId}` }, fetchGameState)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'PLAYERS', filter: `game_id=eq.${gameId}` }, fetchGameState)
        .subscribe()
  
      return () => {
        subscription.unsubscribe()
      }
    }, [gameId])
  
    async function fetchGameState() {
      const { data, error } = await supabase
        .from('games')
        .select(`
          id,
          status,
          current_topic_id,
          current_round,
          topics (id, content),
          votes (id, voter_id, voted_for_id, bet_amount, topic_id),
          players (id, user_auth_id, coins)
        `)
        .eq('id', gameId)
        .single()
      console.log(data)
  
      if (error) {
        setError(error.message)
      } else {
        setGameState(data as GameState)
      }
    }
  
    async function castVote(voterId: string, votedForId: string, betAmount: number) {
      if (!gameState || gameState.status !== 'active') return
  
      const { error } = await supabase
        .from('votes')
        .insert({
          game_id: gameState.id,
          topic_id: gameState.current_topic_id,
          voter_id: voterId,
          voted_for_id: votedForId,
          bet_amount: betAmount
        })
  
      if (error) setError(error.message)
    }
  
    async function processRoundResults() {
      if (!gameState || gameState.status !== 'active') return
  
      const voteCount = gameState.VOTES.reduce((acc, vote) => {
        acc[vote.voted_for_id] = (acc[vote.voted_for_id] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      const mostVotedId = Object.keys(voteCount).reduce((a, b) => voteCount[a] > voteCount[b] ? a : b)
  
      const { error } = await supabase.rpc('process_round_results', {
        p_game_id: gameState.id,
        p_most_voted_id: mostVotedId,
        p_current_round: gameState.current_round,
        p_topics_length: gameState.TOPICS.length
      })
  
      if (error) setError(error.message)
  
      if (gameState.current_round >= 10) {
        const { error: updateError } = await supabase
          .from('games')
          .update({ status: 'completed' })
          .eq('id', gameState.id)
  
        if (updateError) setError(updateError.message)
      }
    }
  
    async function leaveGame(userId: string) {
      if (!gameState) return
  
      const { error: deleteError } = await supabase
        .from('players')
        .delete()
        .eq('game_id', gameState.id)
        .eq('user_id', userId)
  
      if (deleteError) {
        setError(deleteError.message)
        return
      }
  
      const { count, error: countError } = await supabase
        .from('players')
        .select('id', { count: 'exact' })
        .eq('game_id', gameState.id)
  
      if (countError) {
        setError(countError.message)
        return
      }
  
      if (count === 0) {
        const { error: updateError } = await supabase
          .from('games')
          .update({ status: 'completed' })
          .eq('id', gameState.id)
  
        if (updateError) {
          setError(updateError.message)
        }
      }
    }
  
    function getGameResults() {
      if (!gameState || gameState.status !== 'completed') return null
  
      const sortedPlayers = [...gameState.PLAYERS].sort((a, b) => b.coins - a.coins)
      return {
        winner: sortedPlayers[0],
        allPlayers: sortedPlayers
      }
    }
  
    return {
      gameState,
      error,
      castVote,
      processRoundResults,
      leaveGame,
      getGameResults
    }
  }
  