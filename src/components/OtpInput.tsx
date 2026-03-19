import { useRef } from "react";
import { Input } from "@/components/ui/input";

interface OtpInputProps {
  otp: string;
  setOtp: (value: string) => void;
  disabled?: boolean;
}

const OtpInput = ({ otp, setOtp, disabled }: OtpInputProps) => {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = otp.split("");
    newOtp[index] = value;

    const joined = newOtp.join("");
    setOtp(joined);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(pasted);

    pasted.split("").forEach((digit, i) => {
      if (inputs.current[i]) {
        inputs.current[i]!.value = digit;
      }
    });

    const nextIndex = pasted.length < 6 ? pasted.length : 5;
    inputs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {[...Array(6)].map((_, i) => (
        <Input
          key={i}
          type="text"
          maxLength={1}
          disabled={disabled}
          ref={(el) => (inputs.current[i] = el)}
          value={otp[i] || ""}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-lg font-semibold bg-secondary/30 border-border"
        />
      ))}
    </div>
  );
};

export default OtpInput;