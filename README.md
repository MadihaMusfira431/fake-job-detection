# Fake Job Detection System

This project is a college group project designed to detect Fake Job Scams, Phishing Emails, and Malicious URLs using Machine Learning and NLP.

## Architecture
- **Frontend**: React (Vite)
- **Backend**: Node.js & Express.js
- **ML Service**: Python (Flask)
- **Database**: MongoDB

## Project Structure
- `client/`: React frontend
- `server/`: Node.js + Express backend
- `ml-service/`: Python ML microservice

## Getting Started

### 1. ML Service
```bash
cd ml-service
python -m venv venv
source venv/bin/activate # or venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 2. Backend Server
```bash
cd server
npm install
npm run dev
```

### 3. Frontend Client
```bash
cd client
npm install
npm run dev
```
