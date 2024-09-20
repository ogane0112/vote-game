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
