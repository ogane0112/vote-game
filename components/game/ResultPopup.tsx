import React from 'react';

interface Player {
  id: string;
  user_id: string;
  name: string;
  coins: number;
}

interface ResultPopupProps {
  results: {
    winner: Player;
    allPlayers: Player[];
  };
  onClose: () => void;
}

const ResultPopup: React.FC<ResultPopupProps> = ({ results, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">ゲーム結果</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-yellow-400 mb-2">勝者</h3>
          <div className="bg-gray-700 rounded p-3">
            <p className="text-white">{results.winner.name}</p>
            <p className="text-yellow-300">{results.winner.coins} コイン</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">ランキング</h3>
          <ul className="space-y-2">
            {results.allPlayers.map((player, index) => (
              <li 
                key={player.id} 
                className={`flex justify-between items-center p-2 rounded ${
                  index === 0 ? 'bg-yellow-600' : 
                  index === 1 ? 'bg-gray-500' : 
                  index === 2 ? 'bg-yellow-700' : 'bg-gray-700'
                }`}
              >
                <span className="text-white">
                  {index + 1}. {player.name}
                </span>
                <span className="text-yellow-300 font-semibold">
                  {player.coins} コイン
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default ResultPopup;