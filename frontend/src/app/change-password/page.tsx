"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Read the email from the token cookie (since our mock token is the email)
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      setEmail(token.split('=')[1]);
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, new_password: newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Action failed");
      }

      setSuccess("Password updated successfully!");
      setNewPassword("");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Change Password</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: "0.9rem" }}>
          Update the password for {email}
        </p>
        
        {error && <div style={{ color: "red", textAlign: "center", background: "#fee", padding: "0.5rem", borderRadius: "4px", marginTop: "1rem" }}>{error}</div>}
        {success && <div style={{ color: "green", textAlign: "center", background: "#efe", padding: "0.5rem", borderRadius: "4px", marginTop: "1rem" }}>{success}</div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
          <div className="form-group">
            <label htmlFor="new_password">New Password</label>
            <input 
              type="password" 
              id="new_password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", marginTop: "1rem" }}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
