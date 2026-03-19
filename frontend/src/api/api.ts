export const api = {

 submitPrediction: async (payload) => {
   const API_URL = import.meta.env.VITE_API_URL;
   console.log(import.meta.env.VITE_API_URL)
   const res = await fetch(`${API_URL}/api/prediction`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(payload)
   });

   return res.json();
 },

 getLeaderboard: async () => {
   const res = await fetch(`${API_URL}/api/leaderboard`);
   return res.json();
 },

 getBids: async () => {
   const res = await fetch(`${API_URL}/api/bids`);
   return res.json();
 },

 otp: async (payload) => {
   const res = await fetch(`${API_URL}/api/otp`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(payload)
   });
	if (res.status !== 200) {
    throw new Error("OTP validation failed");
  }
   return res.json();
 }

};
