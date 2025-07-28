import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
// import { LogIn, UserPlus } from 'lucide-react';

export default function Auth(){
    const [email, setEmail] = useState('');
    const [loading,setLoading] = useState(false);
    const [password,setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState('');

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let error;
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        error = signInError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        error = signUpError;
        if (!error) {
            setMessage('Check your email for the confirmation link!');
        }
      }
      if (error) throw error;
    } catch (error) {
        if (error instanceof Error) {
        setMessage(error.message);
        } else {
        setMessage('An unknown error occurred. Please try again.');
        }
    } finally {
      setLoading(false);
    }
  };

     return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {isLogin ? 'Welcome Back!' : 'Create an Account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {isLogin ? 'Sign in to continue your streak' : 'Sign up to start tracking your habits'}
            </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
              disabled={loading}
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </div>
        </form>
        {message && <p className="mt-2 text-center text-sm text-red-600 dark:text-red-400">{message}</p>}
        <div className="text-sm text-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(!isLogin);
              setMessage('');
            }}
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </a>
        </div>
      </div>
    </div>
  );

}
