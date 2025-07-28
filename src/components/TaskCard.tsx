import React from 'react';
import { CheckCircle, XCircle, Zap, Dumbbell, BrainCircuit } from 'lucide-react';

type TaskId = 'gym' | 'project' | 'dsa';

interface Task {
  id: TaskId;
  title: string;
  streak: number;
  completedToday: boolean;
}


interface TaskCardProps {
  task: Task;
  onUpdate: (id: TaskId, completed: boolean) => void;
}

const icons: { [key in TaskId]: React.JSX.Element } = {
  gym: <Dumbbell className="w-8 h-8 text-red-500" />,
  project: <Zap className="w-8 h-8 text-blue-500" />,
  dsa: <BrainCircuit className="w-8 h-8 text-purple-500" />,
};



const TaskCard:React.FC<TaskCardProps>  = ({ task, onUpdate }) => {
  const { id, title, streak, completedToday } = task;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          {icons[id]}
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-800">{streak}</p>
            <p className="text-sm text-gray-500">day streak</p>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mt-4">{title}</h3>
      </div>
      <div className="mt-6">
        <button
          onClick={() => onUpdate(id, !completedToday)}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-semibold transition-colors duration-300 ${
            completedToday
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {completedToday ? (
            <CheckCircle className="w-5 h-5 mr-2" />
          ) : (
            <XCircle className="w-5 h-5 mr-2" />
          )}
          {completedToday ? 'Completed Today!' : 'Mark as Done'}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;