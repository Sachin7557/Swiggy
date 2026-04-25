import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function SignIn({ onClose, onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [method, setMethod] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    // Simple simulation of sign-in
    const user = { email };
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (e) {}
    onSignIn && onSignIn(user);
    alert("Signed in as " + email);
    onClose && onClose();
  };

  const googleSignIn = () => {
    // Simulate Google sign-in (replace with real OAuth flow later)
    const input = window.prompt("Enter Google email to simulate sign-in:");
    const email = input && input.includes("@") ? input : `google_${Date.now()}@gmail.com`;
    const user = { email, name: "Google User" };
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (e) {}
    onSignIn && onSignIn(user);
    alert("Signed in with Google as " + user.email);
    onClose && onClose();
  };

  const sendOtp = () => {
    if (!phone || phone.length < 6) return alert("Enter a valid phone number");
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setSentOtp(code);
    // In real app, send SMS. Here we simulate by showing the code.
    // show OTP inline for simulation and also alert the code
    alert(`OTP sent to ${phone} (simulation): ${code}`);
    console.log(`Simulated OTP for ${phone}: ${code}`);
  };

  const verifyOtp = () => {
    if (!sentOtp) return alert("Please request OTP first");
    if (otp === sentOtp) {
      const user = { phone };
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {}
      onSignIn && onSignIn(user);
      alert("Signed in as " + phone);
      onClose && onClose();
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-[90%] max-w-[420px] rounded p-6 shadow-lg z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Sign in</h3>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <button type="button" onClick={() => setMethod("phone")} className={`flex-1 p-2 rounded ${method === "phone" ? "bg-[#fc8019] text-white" : "bg-white"}`}>
              Phone
            </button>
            <button type="button" onClick={() => setMethod("email")} className={`flex-1 p-2 rounded ${method === "email" ? "bg-[#fc8019] text-white" : "bg-white"}`}>
              Email
            </button>
          </div>

          {method === "phone" ? (
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Mobile number</label>
              <div className="flex gap-2">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter mobile number"
                  className="flex-1 border px-3 py-2 rounded outline-none"
                />
                <button type="button" onClick={sendOtp} className="px-3 py-2 bg-[#fc8019] text-white rounded">Send OTP</button>
              </div>
              {sentOtp && (
                <div className="flex gap-2 items-center">
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="flex-1 border px-3 py-2 rounded outline-none"
                  />
                  <button type="button" onClick={verifyOtp} className="px-3 py-2 bg-[#10b981] text-white rounded">Verify</button>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded outline-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <button type="submit" className="px-4 py-2 bg-[#fc8019] text-white rounded">Sign in</button>
                <button type="button" onClick={onClose} className="text-sm text-gray-500">Cancel</button>
              </div>
            </form>
          )}

          <div className="flex items-center gap-2">
            <button type="button" onClick={googleSignIn} className="flex-1 flex items-center justify-center gap-2 border px-3 py-2 rounded hover:bg-gray-50">
              <FaGoogle className="text-red-500 text-xl" />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
