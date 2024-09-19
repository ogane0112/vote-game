"use client";

import React, { useState, useEffect } from 'react';

const Ranking = () => {
  const [players, setPlayers] = useState([
    { name: 'Alice', money: 1000 },
    { name: 'Bob', money: 1200 },
    { name: 'Charlie', money: 800 },
    { name: 'David', money: 1500 },
    { name: 'Eve', money: 950 },
    { name: 'Frank', money: 1100 }
  ]);

  useEffect(() => {
    const sortedPlayers = [...players].sort((a, b) => b.money - a.money);
    setPlayers(sortedPlayers);
  }, []);

  return (
    <div className="bg-gray-900 text-gray-300 p-4 sm:p-6 font-mono">
      <div className="rankingboard bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg border border-cyan-500">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-cyan-400">所持金ランキング</h2>
        {players.map((player, index) => (
          <div key={index} className="flex justify-between items-center mb-1 sm:mb-2">
            <span className="text-sm sm:text-base text-cyan-300">{index + 1}. {player.name}</span>
            <span className="text-sm sm:text-base text-yellow-400">{player.money}円</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
