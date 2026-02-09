# 🚀 Run Guide: ScamGuard AI

Follow these steps to set up and run the "Fake Job & Scam Detection" project on your local machine.

---

## 🛠️ 1. Prerequisites
Ensure you have the following installed:
- **Node.js** (v20 or higher)
- **Python** (v3.9 or higher)
- **MongoDB** (A local instance or a MongoDB Atlas URI)

---

## 📦 2. One-Time Setup
Run this command from the **root directory** to install all dependencies for the Frontend, Backend, and ML Service:

```bash
npm run install-all
```

---

## ⚙️ 3. Environment Configuration
Create or update the `.env` file in the `server/` directory:

**File path**: `server/.env`
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
ML_SERVICE_URL=http://localhost:5000/predict
```

---

## 🏃 4. Running the Project

### Option A: Run Everything (Recommended)
This runs the Frontend, Backend, and ML Service simultaneously from the root directory:

```bash
npm run dev
```

### Option B: Run Individually (For Debugging)
If you need to run services separately, use multiple terminals:

1.  **ML Service** (NLP Engine):
    ```bash
    cd ml-service
    python app.py
    ```
    *Runs on: http://localhost:5000*

2.  **Backend Server** (Node.js):
    ```bash
    cd server
    npm run dev
    ```
    *Runs on: http://localhost:5001*

3.  **Frontend** (React):
    ```bash
    cd client
    npm run dev
    ```
    *Runs on: http://localhost:5173* (or as shown in terminal)

---

## 🔗 Port Summary
| Service | Port | Description |
| :--- | :--- | :--- |
| **ML Service** | 5000 | Python Flask NLP API |
| **Backend** | 5001 | Express API & DB Management |
| **Frontend** | 5173 | React User Interface |

---
