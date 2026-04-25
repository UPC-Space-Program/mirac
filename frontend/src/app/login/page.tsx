"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const endpoint = isLogin ? "/login" : "/register";

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Action failed");
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        setSuccess("Registration successful! You can now log in.");
        setIsLogin(true);
        setPassword("");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login to MIRAC" : "Create an Account"}</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: "0.9rem" }}>
          {isLogin ? "Enter your credentials to access the dashboard." : "Sign up to access environmental monitoring data."}
        </p>
        
        {error && <div style={{ color: "red", textAlign: "center", background: "#fee", padding: "0.5rem", borderRadius: "4px" }}>{error}</div>}
        {success && <div style={{ color: "green", textAlign: "center", background: "#efe", padding: "0.5rem", borderRadius: "4px" }}>{success}</div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Processing..." : (isLogin ? "Login" : "Register")}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button 
            type="button" 
            onClick={() => { setIsLogin(!isLogin); setError(""); setSuccess(""); }}
            style={{ background: "none", border: "none", color: "var(--secondary-blue)", cursor: "pointer", textDecoration: "underline", fontSize: "0.95rem" }}
          >
            {isLogin ? "Don't have an account? Register here." : "Already have an account? Log in."}
          </button>
        </div>
      </div>
    </div>
  );
}
