Resume Hub

AI-Powered Resume Management Platform

Overview

Resume Hub is a full-stack web application designed to help users create, manage, and store professional resumes efficiently. The platform provides a clean user interface, secure authentication, and structured resume data handling, with a foundation ready for AI-driven features such as resume analysis and optimization.

Live Demo: https://resume-hub-1.onrender.com/

Repository: https://github.com/Ngong2/Resume-hub.git

Features

User authentication (registration & login)

Resume creation and management

Structured resume data storage

Responsive and modern UI

Secure backend API

Scalable architecture for AI integration

Note: AI-related features are designed as an extensible layer and can be expanded to include resume scoring, keyword matching, and job-fit analysis.

Tech Stack
Frontend

React.js

HTML5

CSS3

JavaScript (ES6+)

Backend

Node.js

Express.js

Database

MongoDB

Deployment

Render (Frontend & Backend)

GitHub (Version Control)

Project Structure
Resume-hub/
│
├── client/          # Frontend (React)
│   ├── src/
│   └── public/
│
├── server/          # Backend (Node.js + Express)
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── config/
│
├── .gitignore
├── README.md
└── package.json

Installation & Setup
Prerequisites

Node.js (v16+ recommended)

MongoDB (local or cloud)

Git

Clone the Repository
git clone https://github.com/Ngong2/Resume-hub.git
cd Resume-hub

Backend Setup
cd server
npm install
npm run dev


Create a .env file in the server directory and add:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Frontend Setup
cd client
npm install
npm start

Usage

Register a new account or log in.

Create and manage resume details.

Save and update resume data securely.

Access your resumes from any device.

Deployment

The application is deployed on Render:

Frontend: Static Site

Backend: Web Service

Ensure environment variables are properly set in the Render dashboard.

Future Improvements

AI resume analysis and scoring

PDF export functionality

Job matching recommendations

Role-based access control

Improved UI/UX with templates

Author
Ngong Kuot Ngong
Full-Stack Web Developer
GitHub: https://github.com/Ngong2

License

This project is licensed under the MIT License.
