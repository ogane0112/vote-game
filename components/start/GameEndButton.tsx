'use client'
import React from 'react'

function GameEndButton() {
  const handleExit = () => {
    const confirmExit = window.confirm('ゲームを終了してGoogle検索ページに戻りますか？')
    if (confirmExit) {
      window.location.href = 'https://www.google.com'
    }
  }
  return (
    <button
      onClick={handleExit}
      className='w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out'
    >
      ゲーム終了（Google検索へ）
    </button>
  )
}

export default GameEndButton
