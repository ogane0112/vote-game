// Start of Selection
import React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-gray-900 text-gray-300 min-h-screen flex flex-col items-center justify-center font-mono'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg border border-indigo-500 max-w-md w-full'>
        {children}
      </div>
    </div>
  )
}
