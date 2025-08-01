'use client';

import React, { useState, useEffect } from 'react';
import TaskCard from '@/components/TaskCard';
import LeetCodeTaskCard from '@/components/LeetcodeCodeforces';
import Heatmap from '@/components/Heatmap';
import Auth from '@/components/Auth'; // Import the new Auth component
import { Sun, Moon, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import SixMonthCalendar from '@/components/SixMonthCalender';

type TaskId = 'gym' | 'project' | 'dsa';

interface HeatmapData {
    date: string;
    count: number;
}
interface Task {
  id: TaskId;
  title: string;
  streak: number;
  completedToday: boolean;
}

interface LeetCodeTask {
    id: 'leetcode';
    title: string;
    streak: number;
    completedToday: boolean;
}

type AnyTask = LeetCodeTask | Task;
type DailyHistory = Record<string, Record<string, boolean | number>>;

export default function Home() {
  const [tasks, setTasks] = useState<AnyTask[]>([
    { id: 'leetcode', title: 'Solve LeetCode/Codeforces', streak: 0, completedToday: false },
    { id: 'gym', title: 'Go to the Gym', streak: 0, completedToday: false },
    { id: 'project', title: 'Work on Project (1hr)', streak: 0, completedToday: false },
    { id: 'dsa', title: 'Revise Data Structures', streak: 0, completedToday: false },
  ]);

  const [history, setHistory] = useState<DailyHistory>({});
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        setLoading(false);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);
  
  useEffect(() => {
    if (user) {
      const fetchHistory = async () => {
        const { data, error } = await supabase
          .from('daily_tasks')
          .select('task_date, task_type, completed, count')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error fetching history:', error);
          return;
        }

        const formattedHistory: DailyHistory = {};
        data.forEach(record => {
          const date = record.task_date as string;
          if (!formattedHistory[date]) {
            formattedHistory[date] = {};
          }
          if (record.task_type === 'leetcode') {
            formattedHistory[date][record.task_type] = record.count;
          } else {
            formattedHistory[date][record.task_type] = record.completed;
          }
        });
        setHistory(formattedHistory);
      };

      fetchHistory();
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    setTasks(prevTasks => {
        const todayStr = new Date().toISOString().split('T')[0];
        return prevTasks.map(task => {
            const isCompleted = (entry: Record<string, boolean | number>, taskId: string): boolean => {
                 if (!entry) return false;
                const value = entry[taskId];
                return taskId === 'leetcode' ? (value as number) > 0 : !!value;
            }
            const completedToday = isCompleted(history[todayStr], task.id);
            let currentStreak = 0;
            const streakDate = new Date();
            if(!completedToday) {
                streakDate.setDate(streakDate.getDate() - 1);
            }

            while (true) {
                const dateStr = streakDate.toISOString().split('T')[0];
                const entry = history[dateStr];
                if (isCompleted(entry, task.id)) {
                currentStreak++;
                streakDate.setDate(streakDate.getDate() - 1);
                } else {
                break;
                }
            }
            return { ...task, streak: currentStreak, completedToday };
        });
    });
  }, [history, user]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleUpdateTask = async (taskId: string, value: boolean | number) => {
    if (!user) return;
    const todayStr = new Date().toISOString().split('T')[0];
    const record = {
      user_id: user.id,
      task_date: todayStr,
      task_type: taskId,
      completed: taskId === 'leetcode' ? (value as number) > 0 : !!value,
      count: taskId === 'leetcode' ? value : null,
    };
    const { error } = await supabase.from('daily_tasks').upsert(record, {
        onConflict: 'user_id, task_date, task_type'
    });
    if (error) {
        console.error('Error updating task:', error);
    } else {
        setHistory(prev => {
            const newHistory = { ...prev };
            if (!newHistory[todayStr]) {
                newHistory[todayStr] = {};
            }
            newHistory[todayStr][taskId] = value;
            return newHistory;
        });
    }
  };

  const getHeatmapDataForTask = (taskId: string): HeatmapData[] => {
    return Object.entries(history)
      // FIX: Provide a more specific type for `tasks` to avoid using `any`
      .filter(([, tasks]: [string, Record<string, boolean | number>]) => tasks[taskId])
      .map(([date, tasks]: [string, Record<string, boolean | number>]) => ({
        date,
        // FIX: Ensure count is always a number for the heatmap
        count: taskId === 'leetcode' ? Number(tasks[taskId]) : 1,
      }));
  };
  
  // FIX: Ensure leetcodeCountToday is always a number
  const leetcodeValue = history[new Date().toISOString().split('T')[0]]?.['leetcode'];
  const leetcodeCountToday = typeof leetcodeValue === 'number' ? leetcodeValue : 0;

  if (loading) {
      return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">Loading...</div>
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500`}>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Productivity Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome back, {user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700" type="button" aria-label="Toggle dark mode">
              {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-blue-500" />}
            </button>
            <button onClick={() => supabase.auth.signOut()} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-red-500 dark:text-red-400" type="button" aria-label="Sign out">
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </header> 

        <main>
            <SixMonthCalendar/>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {tasks.map((task) => (
              task.id === 'leetcode' ? (
                <LeetCodeTaskCard key={task.id} task={task as LeetCodeTask} countToday={leetcodeCountToday} onUpdate={handleUpdateTask as (id: 'leetcode', count: number) => void} />
              ) : (
                <TaskCard key={task.id} task={task as Task} onUpdate={handleUpdateTask as (id: TaskId, completed: boolean) => void} />
              )
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Heatmap title="Coding Problems" data={getHeatmapDataForTask('leetcode')} />
            <Heatmap title="Gym Sessions" data={getHeatmapDataForTask('gym')} />
            <Heatmap title="Project Work" data={getHeatmapDataForTask('project')} />
            <Heatmap title="DSA Revision" data={getHeatmapDataForTask('dsa')} />
          </section>
        </main>
      </div>
    </div>
  );
}