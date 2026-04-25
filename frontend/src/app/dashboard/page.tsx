"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface SensorData {
  value: number;
  min: number;
  max: number;
  unit: string;
}

interface Cause {
  name: string;
  municipality: string;
  confidence: number;
  reason: string;
}

interface DashboardData {
  river: string;
  status: string;
  sensors: {
    temperature: SensorData;
    caudal: SensorData;
    pH: SensorData;
  };
  possible_causes: Cause[];
}

const RIVERS = ["Llobregat", "Besòs", "Ter", "Ebre", "Francolí"];

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRiver, setSelectedRiver] = useState("Llobregat");
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!token && !localStorage.getItem("token")) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/dashboard?river=${selectedRiver}`);
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, selectedRiver]);

  if (loading && !data) return <div style={{ textAlign: "center", padding: "4rem" }}>Loading dashboard...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center", padding: "4rem" }}>{error}</div>;
  if (!data) return null;

  const getStatusColor = (status: string) => {
    if (status === "Clean") return "var(--accent-green)";
    if (status === "Polluted") return "#e74c3c";
    return "#f39c12"; // Warning
  };

  const renderSensorBar = (name: string, sensor: SensorData) => {
    const globalMin = sensor.min * 0.5;
    const globalMax = sensor.max * 1.5;
    const rangeSpan = globalMax - globalMin;
    
    const minPct = ((sensor.min - globalMin) / rangeSpan) * 100;
    const maxPct = ((sensor.max - globalMin) / rangeSpan) * 100;
    const valPct = Math.max(0, Math.min(100, ((sensor.value - globalMin) / rangeSpan) * 100));

    const isOutOfRange = sensor.value < sensor.min || sensor.value > sensor.max;

    return (
      <div key={name} style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <strong style={{ textTransform: "capitalize", color: "var(--secondary-blue)" }}>{name}</strong>
          <span style={{ color: isOutOfRange ? "#e74c3c" : "#444", fontWeight: "bold" }}>
            {sensor.value} {sensor.unit}
          </span>
        </div>
        <div style={{ position: "relative", height: "12px", background: "#f0f0f0", borderRadius: "6px", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: `${minPct}%`, width: `${maxPct - minPct}%`, height: "100%", background: "var(--accent-green)", opacity: 0.4 }}></div>
          <div style={{ position: "absolute", left: `calc(${valPct}% - 6px)`, width: "12px", height: "12px", background: isOutOfRange ? "#e74c3c" : "var(--primary-blue)", borderRadius: "50%", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }}></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#888", marginTop: "0.4rem" }}>
          <span>Min: {sensor.min}</span>
          <span>Max: {sensor.max}</span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(400px, 1fr) 1.5fr", gap: "2rem", padding: "2rem", maxWidth: "1600px", margin: "0 auto", height: "calc(100vh - 120px)" }}>
      
      {/* Left Column */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", overflowY: "auto", paddingRight: "0.5rem" }}>
        
        {/* Header / Selector */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", flexShrink: 0 }}>
          <h1 style={{ color: "var(--primary-blue)", marginBottom: "1rem", fontSize: "1.8rem" }}>River Diagnostics</h1>
          <select 
            value={selectedRiver} 
            onChange={(e) => setSelectedRiver(e.target.value)}
            style={{ width: "100%", padding: "1rem", fontSize: "1.1rem", borderRadius: "8px", border: "2px solid #eaeaea", marginBottom: "1.5rem", outline: "none", cursor: "pointer", background: "#fcfcfc" }}
          >
            {RIVERS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <h2 style={{ margin: 0, color: "#444", fontSize: "1.2rem" }}>Status:</h2>
            <div style={{ 
              background: getStatusColor(data.status), 
              color: "white", 
              padding: "0.5rem 1.5rem", 
              borderRadius: "24px", 
              fontWeight: "bold",
              fontSize: "1.1rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
            }}>
              {data.status}
            </div>
          </div>
        </div>

        {/* Sensors */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", flexShrink: 0 }}>
          <h2 style={{ color: "var(--primary-blue)", marginBottom: "1.5rem", borderBottom: "2px solid #eee", paddingBottom: "0.75rem", fontSize: "1.4rem" }}>Sensor Data</h2>
          {Object.entries(data.sensors).map(([name, sensor]) => renderSensorBar(name, sensor))}
        </div>

        {/* Possible Causes */}
        {data.possible_causes.length > 0 && (
          <div style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", borderLeft: "5px solid #e74c3c", flexShrink: 0 }}>
            <h2 style={{ color: "#e74c3c", marginBottom: "1.5rem", borderBottom: "2px solid #eee", paddingBottom: "0.75rem", fontSize: "1.4rem" }}>Possible Pollution Sources</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {data.possible_causes.map((cause, idx) => (
                <div key={idx} style={{ padding: "1.2rem", background: "#fdfdfd", borderRadius: "8px", border: "1px solid #eee", transition: "transform 0.2s", cursor: "default" }} className="cause-card">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", alignItems: "flex-start" }}>
                    <strong style={{ color: "var(--secondary-blue)", fontSize: "1.1rem", lineHeight: 1.3 }}>{cause.name}</strong>
                    <span style={{ background: "#e74c3c", color: "white", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "bold", whiteSpace: "nowrap", marginLeft: "1rem" }}>
                      {Math.round(cause.confidence * 100)}% Match
                    </span>
                  </div>
                  <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "0.75rem" }}>
                    <span style={{ display: "inline-block", background: "#eef2f6", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{cause.municipality}</span>
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "#555", fontStyle: "italic", lineHeight: 1.5, background: "#fff5f5", padding: "0.75rem", borderRadius: "6px", borderLeft: "3px solid #ffb3b3" }}>
                    "{cause.reason}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Right Column (Image) */}
      <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #eaeaea" }}>
        {data.river === "Llobregat" || data.river === "Francolí" ? (
          <Image 
            src="/llobregat.png" 
            alt={`Satellite view of ${data.river}`}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        ) : (
          <div style={{ color: "#aaa", textAlign: "center", padding: "2rem" }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "1.5rem", opacity: 0.5 }}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <p style={{ fontSize: "1.2rem" }}>Awaiting latest satellite imagery for {data.river}...</p>
          </div>
        )}
      </div>

    </div>
  );
}
