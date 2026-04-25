"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface DashboardData {
  mouth: {
    id: number;
    name: string;
    status: string;
    pollutionLevel: number;
  };
  source: {
    name: string;
    municipality: string;
    confidence: number;
    reason: string;
  } | null;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/dashboard`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return <div className="dashboard-container">Loading dashboard data...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 style={{ color: "var(--primary-blue)", marginBottom: "1rem" }}>Catalonia River Mouths Dashboard</h1>
        <p>Real-time Copernicus satellite data analysis combined with weather patterns to detect and trace water pollution sources.</p>
      </div>

      <div className="card-grid">
        {data.map((item) => (
          <div key={item.mouth.id} className={`card status-${item.mouth.status}`}>
            <h3>{item.mouth.name}</h3>
            <div className="status">Status: {item.mouth.status}</div>
            <div>Pollution Level: {(item.mouth.pollutionLevel * 100).toFixed(0)}%</div>
            
            {item.source && (
              <div className="source-info">
                <h4>Potential Source Detected</h4>
                <p><strong>Plant:</strong> {item.source.name} ({item.source.municipality})</p>
                <p><strong>Confidence:</strong> {(item.source.confidence * 100).toFixed(0)}%</p>
                <p style={{ marginTop: "0.5rem", fontStyle: "italic", fontSize: "0.85rem" }}>
                  {item.source.reason}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
