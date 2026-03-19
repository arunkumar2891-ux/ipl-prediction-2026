Below is a **clean, professional `README.md`** you can directly paste into your GitHub repository. It is structured the way open-source repos usually are: overview → features → architecture → setup → deployment → future enhancements.

---

# 🏏 IPL Prediction Game

A modern **IPL match prediction web app** where users submit predictions for match winners before the game begins and compete on a **live leaderboard**. The platform includes **OTP-based authentication, automatic bid cut-off before match start, analytics, and leaderboard tracking**.

This project is designed to be lightweight, fast, and easily deployable on **Render** with a **Node.js backend and React frontend**.

---

# ✨ Features

### 🔐 Authentication

* Email-based login
* **6-digit OTP verification**
* Secure OTP validation before allowing predictions
* OTP paste support with modern multi-box input UI

### 🏏 Match Predictions

* Users select the predicted match winner
* Predictions are **locked 15 minutes before match start**
* Users can submit only **one prediction per match**

### ⏱ Automatic Cut-Off

* Prediction submission disabled automatically **15 minutes before match time**

### 📊 Leaderboard

* Live leaderboard showing:

  * Total points
  * Correct predictions
  * Rank among participants

### 📈 Analytics Dashboard

* Prediction distribution
* Accuracy metrics
* Performance trends

### 🎨 Modern UI

* Built with:

  * **React**
  * **Tailwind CSS**
  * **Framer Motion animations**
* Responsive UI for desktop and mobile

---

# 🧱 Architecture

```
Frontend (React + Vite)
│
├── Match Cards
├── Prediction Form
├── OTP Authentication
├── Leaderboard
└── Analytics Dashboard
│
Backend (Node.js + Express)
│
├── OTP Generation & Validation
├── Prediction Submission API
├── Leaderboard API
└── Match Data API
│
Database
└── Stores users, predictions, match data
```

---

# 📂 Project Structure

```
ipl-prediction-game
│
├── backend
│   ├── server.js
│   ├── routes
│   ├── controllers
│   └── services
│
├── src
│   ├── components
│   │   ├── MatchCard.tsx
│   │   ├── PredictionForm.tsx
│   │   ├── CountdownTimer.tsx
│   │   ├── Leaderboard.tsx
│   │   └── OTPInput.tsx
│   │
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── Leaderboard.tsx
│   │   └── Analytics.tsx
│   │
│   ├── data
│   │   └── matchData.ts
│   │
│   ├── lib
│   │   └── utils.ts
│   │
│   └── App.tsx
│
├── public
├── package.json
└── README.md
```

---

# ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/ipl-prediction-game.git
cd ipl-prediction-game
```

---

### 2️⃣ Install dependencies

Frontend

```bash
npm install
```

Backend

```bash
cd backend
npm install
```

---

# ▶️ Running Locally

### Start Backend

```bash
cd backend
node server.js
```

Runs on:

```
http://localhost:5000
```

---

### Start Frontend

```bash
npm run dev
```

Runs on:

```
http://localhost:8080
```

---

# 🌐 Deployment (Render)

This project is designed for **Render deployment**.

### Frontend

Deploy as a **Static Site**

Build Command

```
npm run build
```

Publish Directory

```
dist
```

---

### Backend

Deploy as a **Web Service**

Start Command

```
node backend/server.js
```

---

# 🧠 Key Business Rules

| Rule             | Description                                         |
| ---------------- | --------------------------------------------------- |
| Prediction Limit | One prediction per match per user                   |
| Cutoff Time      | Predictions close **15 minutes before match start** |
| Authentication   | OTP verification required                           |
| Leaderboard      | Based on correct predictions                        |

---

# 📊 Example Workflow

1️⃣ User selects their email from dropdown
2️⃣ OTP is sent to the email
3️⃣ User verifies OTP
4️⃣ User selects predicted match winner
5️⃣ Prediction is saved
6️⃣ After match result → leaderboard updates

---

# 🚀 Future Enhancements

Possible improvements:

* Admin panel to manage matches
* Automatic match result ingestion
* Slack / WhatsApp notifications
* Historical season statistics
* Multi-season support
* Tie-breaker prediction (score / wickets)

---

# 🛠 Tech Stack

| Layer     | Technology        |
| --------- | ----------------- |
| Frontend  | React + Vite      |
| UI        | Tailwind CSS      |
| Animation | Framer Motion     |
| Backend   | Node.js + Express |
| Auth      | OTP verification  |
| Hosting   | Render            |

---

# 🤝 Contributing

Contributions are welcome!

Steps:

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Submit a Pull Request

---

# 📜 License

This project is licensed under the **MIT License**.

---

If you'd like, I can also create a **much more impressive README with:**

* screenshots
* architecture diagram
* badges (deploy, license, tech stack)
* live demo section

— which will make your GitHub repo look **10× more professional**.
