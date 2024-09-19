"use client"
import React, { useState, useEffect } from 'react';

const GameBoard = () => {
  const [players, setPlayers] = useState([
    { name: 'Alice', money: 1000 },
    { name: 'Bob', money: 1200 },
    { name: 'Charlie', money: 800 },
    { name: 'David', money: 1500 },
    { name: 'Eve', money: 950 },
    { name: 'Frank', money: 1100 }
  ]);
  const [currentTopic, setCurrentTopic] = useState('お題を表示する場所');

  useEffect(() => {
    const sortedPlayers = [...players].sort((a, b) => b.money - a.money);
    setPlayers(sortedPlayers);
  }, []);

  const handlePlayerClick = (player: any) => {
    setCurrentTopic(`${player.name}のお題`);
  };

  return (
    <div className="bg-gray-900 text-gray-300 p-4 sm:p-6 font-mono">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="rankingboard md:col-span-1 bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg border border-cyan-500">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-cyan-400">所持金ランキング</h2>
          {players.map((player, index) => (
            <div key={index} className="flex justify-between items-center mb-1 sm:mb-2">
              <span className="text-sm sm:text-base text-cyan-300">{index + 1}. {player.name}</span>
              <span className="text-sm sm:text-base text-yellow-400">{player.money}円</span>
            </div>
          ))}
        </div>
        
        <div className="viteboard md:col-span-2 bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg border border-indigo-500">
          <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-indigo-400">{currentTopic}</h1>
          <ul className="grid grid-cols-2 gap-2 sm:gap-4">
            {players.map((player, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePlayerClick(player)}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-indigo-300 font-bold py-1 sm:py-2 px-2 sm:px-4 rounded text-sm sm:text-base transition duration-300 ease-in-out border border-indigo-600 hover:border-indigo-500 hover:text-indigo-200"
                >
                  {player.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="statusboard col-span-1 md:col-span-3 bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg mt-4 sm:mt-6 border border-emerald-500">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-emerald-400">トップの所持金</h2>
          <p className="text-2xl sm:text-3xl font-bold text-yellow-400">{players[0].money} 円</p>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;