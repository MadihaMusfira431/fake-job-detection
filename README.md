# ScamGuard AI 🛡️
> A High-Performance Fake Job & Scam Detection Module

![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js)
![Python](https://img.shields.io/badge/Intelligence-Python-yellow?style=for-the-badge&logo=python)
![MongoDB](https://img.shields.io/badge/Storage-MongoDB-darkgreen?style=for-the-badge&logo=mongodb)

## 📖 Introduction
ScamGuard AI is a full-stack solution built to protect job seekers from sophisticated phishing and fraudulent listings. It uses a MERN stack core with a Python-based NLP engine to analyze text patterns in real-time.

---

## 🛠️ Quick Start

### Prerequisites
- Node.js (v20+)
- Python (3.9+)
- MongoDB Atlas Account

### Local Development
To start the entire environment with live-reloading:
```bash
npm install
npm run dev
```

### Production Testing
To simulate the Render deployment locally:
```bash
npm run build-prod
npm run start-prod
```
> **Note**: Ensure ports 5000 and 5001 are free before starting.

---

## 📂 Project Structure
- `client/` - React frontend (Vite + SCSS)
- `server/` - Node.js Express Backend
- `ml-service/` - Python NLP microservice
- `EXPLANATION.md` - **[READ THIS]** Detailed architecture breakdown.

---

## 🚀 Deployment
This project is pre-configured for **Render Blueprints**. 
1. Link your GitHub repo to Render.
2. It will automatically detect `render.yaml`.
3. Set your `MONGO_URI` in the Render dashboard.

---

## 🎓 Contributors
- **College Project Team**

## 📄 License
MIT License
