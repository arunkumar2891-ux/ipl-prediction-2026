import { useState } from "react";
import { members } from "@/data/members";
import { Input } from "@/components/ui/input";

interface Props {
  onGroupDetected: (groups: string[]) => void;
}

const EmailGate = ({ onGroupDetected }: Props) => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    const users = members.filter(
      (m) => m.Email.toLowerCase() === email.toLowerCase()
    );

    if (users.length === 0) {
      alert("Email not found in player list");
      return;
    }

    const groups = users.map((u) => u.Group);

    localStorage.setItem("userGroups", JSON.stringify(groups));
    onGroupDetected(groups);
  };

  return (
    <div className="max-w-md mx-auto card-surface p-6 text-center">
      <h2 className="text-lg font-semibold mb-4">
        Enter your email to view leaderboard
      </h2>

      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-secondary/30 border-border text-foreground placeholder:text-muted-foreground"
      />

      <button
        onClick={handleSubmit}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        View Leaderboard
      </button>
    </div>
  );
};

export default EmailGate;