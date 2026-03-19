import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const SNAP_BASE = "https://prod-paloaltonetworks-dev-cloud-fm.snaplogic.io/api/1/rest/feed-master/queue/PaloAltoNetworks-Dev/projects/Arunkumar%20J%20S";

async function callSnap(url, method = "GET", body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "*/*"
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("API failed");
  }

  return response.json();
}

/* ---------- Prediction ---------- */

/*app.post("/api/prediction", async (req, res) => {
  try {
    const url = `${SNAP_BASE}/GetDataTask?bearer_token=${encodeURIComponent(process.env.SNAP_PREDICTION_TOKEN)}`;
    const data = await callSnap(url, "POST", req.body);
    res.json(data.response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});*/

app.post("/api/prediction", async (req, res) => {
  try {

    const { matchStartUtc } = req.body;

    if (!matchStart) {
      return res.status(400).json({ error: "Match start time missing" });
    }

    const startTime = new Date(matchStartUtc);
    const cutoff = new Date(startTime.getTime() - (15 * 60 * 1000));
    const now = new Date();

    if (now > cutoff) {
      return res.status(403).json({
        error: "Predictions closed 15 minutes before match start"
      });
    }

    const url = `${SNAP_BASE}/GetDataTask?bearer_token=${encodeURIComponent(process.env.SNAP_PREDICTION_TOKEN)}`;

    const data = await callSnap(url, "POST", req.body);

    res.json(data.response);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------- Leaderboard ---------- */

app.get("/api/leaderboard", async (req, res) => {
  try {
    const url = `${SNAP_BASE}/LeaderBoardAPITask?bearer_token=${encodeURIComponent(process.env.SNAP_LEADER_TOKEN)}`;
    const data = await callSnap(url);
    res.json(data.response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------- Bids ---------- */

app.get("/api/bids", async (req, res) => {
  try {
    const url = `${SNAP_BASE}/Bid_APITask?bearer_token=${encodeURIComponent(process.env.SNAP_BID_TOKEN)}`;
    const data = await callSnap(url);
    res.json(data.response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------- OTP ---------- */

app.post("/api/otp", async (req, res) => {
  try {
    const url = `${SNAP_BASE}/manageOTPUltra?bearer_token=${encodeURIComponent(process.env.SNAP_OTP_TOKEN)}`;
    const data = await callSnap(url, "POST", req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------- Health check (for keeping Render awake) ---------- */

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

/* ---------- Start server ---------- */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
