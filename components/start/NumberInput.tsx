'use client'
import React from 'react'

interface NumberInputProps {
  value: string
  onChange: (value: string) => void
}

const NumberInput: React.FC<NumberInputProps> = ({ value, onChange }) => {
  const buttons: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Clear', '0', 'Backspace']

  const handleClick = (btn: string) => {
    if (btn === 'Clear') {
      onChange('')
    } else if (btn === 'Backspace') {
      onChange(value.slice(0, -1))
    } else {
      onChange(value + btn)
    }
  }

  return (
    <div className='grid grid-cols-3 gap-2 mb-4'>
      {buttons.map((btn) => (
        <button
          key={btn}
          onClick={() => handleClick(btn)}
          className='bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded'
        >
          {btn}
        </button>
      ))}
    </div>
  )
}

export default NumberInput
