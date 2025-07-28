🎯 Productivity & Habit Tracker
A modern, full-stack web application designed to help you track your daily goals, build consistent habits, and visualize your progress over time. Never miss a day of coding, working out, or learning again!

✨ Key Features
Daily Task Tracking: Log your daily achievements for customizable tasks.

Streak Counter: Stay motivated by building and maintaining your daily streaks for each habit.

Contribution Heatmap: Visualize your consistency and effort throughout the year with a GitHub-style heatmap for each task.

Secure User Authentication: Full email/password login and signup functionality powered by Supabase Auth.

Persistent Data Storage: All your progress is securely stored in a Supabase PostgreSQL database.

Sleek, Responsive UI: A modern and clean interface built with Tailwind CSS, including a dark mode toggle.

Easy Deployment: Ready to be deployed in minutes on Vercel.

🚀 Tech Stack
This project is built with a modern, full-stack serverless architecture.

Technology

Description

Next.js

Full-stack React framework for the frontend and server-side logic.

React

Core UI library for building interactive components.

Tailwind CSS

A utility-first CSS framework for rapid and beautiful UI development.

Supabase

Open-source Firebase alternative for the backend. Used for:

    • Authentication

Secure user login and signup.

    • PostgreSQL Database

Storing all user and task data.

Lucide React

A beautiful and consistent icon library.

Vercel

The platform for seamless deployment and hosting.

🛠️ Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js (v18 or later)

npm or yarn

A free Supabase account (Sign up here)

1. Clone the Repository
First, clone the project to your local machine.

git clone https://github.com/your-username/productivity-tracker.git
cd productivity-tracker

2. Install Dependencies
Install all the necessary project dependencies.

npm install
# or
yarn install

3. Set Up Supabase
Create a New Project: Go to your Supabase dashboard and create a new project.

Create the Database Table: Go to the SQL Editor in your new project and run the SQL script from the Supabase Table Setup Guide to create the daily_tasks table and enable Row Level Security (RLS).

Disable Email Confirmation (Optional): If you don't want users to confirm their email upon signup, go to Authentication -> Settings and toggle off "Confirm email".

4. Configure Environment Variables
Find your Supabase API keys in your project's Settings -> API.

Create a new file named .env.local in the root of your project.

Copy the contents of .env.example (if provided) or add the following variables to your new .env.local file, replacing the placeholder values with your actual Supabase keys:

NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

5. Run the Development Server
You're all set! Start the development server to see your application in action.

npm run dev

Open http://localhost:3000 with your browser to see the result.

🌐 Deployment
This application is optimized for deployment on Vercel.

Push to GitHub: Ensure your project is pushed to a GitHub repository.

Import to Vercel: Sign up for Vercel with your GitHub account and import the repository.

Add Environment Variables: In the Vercel project settings, add the same NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY variables that you used locally.

Deploy: Click the "Deploy" button. Your site will be live in minutes!

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
Distributed under the MIT License. See LICENSE for more information.
