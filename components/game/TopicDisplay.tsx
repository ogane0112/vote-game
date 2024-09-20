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
