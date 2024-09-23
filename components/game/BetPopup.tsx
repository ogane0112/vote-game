import React from 'react'

interface Player {
  name: string
  coin: number
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
