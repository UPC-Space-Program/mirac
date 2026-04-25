"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token || localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  if (isLoggedIn) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link href="/change-password" title="Change Password" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-blue)', color: 'white', padding: '0.5rem 1rem', borderRadius: '24px', textDecoration: 'none' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Profile
        </Link>
        <button onClick={handleLogout} style={{ marginLeft: '1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.5)', color: 'white', padding: '0.5rem 1rem', borderRadius: '24px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link href="/login" className="btn-primary">
      Login
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.5rem' }}>
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </Link>
  );
}
