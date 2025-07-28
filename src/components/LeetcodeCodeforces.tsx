import React, { useState, useEffect } from 'react';
import { Code, Save } from 'lucide-react';

interface LeetCodeTask {
    id: 'leetcode';
    title: string;
    streak: number;
    completedToday: boolean;
}

interface LeetCodeTaskCardProps {
    task: LeetCodeTask;
    countToday: number;
    onUpdate: (id: 'leetcode', count: number) => void;
}

const LeetCodeTaskCard:React.FC<LeetCodeTaskCardProps>= ({ task, countToday, onUpdate }) => {
  const { title, streak } = task;
  const [count, setCount] = useState(countToday);

  useEffect(() => {
    setCount(countToday);
  }, [countToday]);

  const handleSave = () => {
    onUpdate('leetcode', count);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <Code className="w-8 h-8 text-yellow-500" />
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{streak}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">day streak</p>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-4">{title}</h3>
      </div>
      <div className="mt-6">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Problems solved today:</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={count}
            onChange={(e) => setCount(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            aria-label="Number of problems solved today"
            />
          <button
            onClick={handleSave}
            type="button"
            className="flex-shrink-0 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center"
            aria-label="Save solved problems count"
          >
            <Save className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeTaskCard;