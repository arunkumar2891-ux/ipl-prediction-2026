import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/api/api";
import { validateEmail } from "@/lib/utils";
import OtpInput from "@/components/OtpInput";

interface PredictionFormProps {
  matchId: number;
  homeTeam: string;
  awayTeam: string;
  disabled: boolean;
}

interface OtpInputProps {
  otp: string;
  setOtp: (value: string) => void;
  disabled?: boolean;
}

const PredictionForm = ({ matchId, homeTeam, awayTeam, disabled }: PredictionFormProps) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpValidated, setOtpValidated] = useState(false);

  const [selectedTeam, setSelectedTeam] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const teams = [homeTeam, awayTeam];
  useEffect(() => {
	if (otp.length === 6 && !otpValidated) {
		handleValidateOtp();
	}
  }, [otp]);
  const handleValidateOtp = async () => {
	  console.log("validateOTP triggered", { email, otp });
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!validateEmail(email.trim())) {
      setError("Email not registered.");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    setLoading(true);

    try {
      await api.otp({
        email: email.trim().toLowerCase(),
        flow: "validateOTP",
        otp: otp
      });

      setOtpValidated(true);

    } catch {
      setError("Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError(null);

    if (!otpValidated) {
      setError("Please validate OTP first.");
      return;
    }

    if (!selectedTeam) {
      setError("Please select a team.");
      return;
    }

    setLoading(true);

    try {
      const result = await api.submitPrediction({
        email: email.trim().toLowerCase(),
        matchNumber: matchId,
        selectedTeam
      });

      setResponse(JSON.stringify(result, null, 2));
      setSubmitted(true);

    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {submitted ? (
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
          <p className="text-sm text-accent font-medium mb-1">
            ✅ Prediction Submitted!
          </p>
          {response && (
            <pre className="text-xs font-mono-data text-muted-foreground overflow-auto max-h-24">
              {response}
            </pre>
          )}
        </div>
      ) : (
        <>
          {/* EMAIL */}
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            disabled={otpValidated || disabled}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-secondary/30 border-border text-foreground"
          />

          {/* OTP INPUT */}
          <OtpInput
			otp={otp}
			setOtp={setOtp}
			disabled={otpValidated}
		  />

          {otpValidated && (
            <p className="text-xs text-green-500">✅ OTP validated</p>
          )}

          {error && <p className="text-xs text-destructive">{error}</p>}
		
		  {/* TEAM SELECTION */}
          <div className="grid grid-cols-2 gap-3">
            {teams.map((team) => (
              <button
                key={team}
                type="button"
                disabled={disabled || !otpValidated}
                onClick={() => setSelectedTeam(team)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  selectedTeam === team
                    ? "border-primary bg-primary/10 text-foreground glow-primary"
                    : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/50"
                } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {team}
              </button>
            ))}
          </div>
		  
          {/* SUBMIT */}
          <Button
            onClick={handleSubmit}
            disabled={disabled || loading || !selectedTeam || !otpValidated}
            className="w-full glow-primary"
          >
            {loading ? "Submitting..." : disabled ? "⛔ Submissions Closed" : "Submit Prediction"}
          </Button>
        </>
      )}
    </div>
  );
};

export default PredictionForm;
