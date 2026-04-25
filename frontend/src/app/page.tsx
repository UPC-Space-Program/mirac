import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '4rem 2rem',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2 }}>
          <Image 
            src="/bg.png" 
            alt="River Background" 
            fill 
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        {/* Overlay for readability */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.85)', zIndex: -1 }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px', zIndex: 1 }}>
          <Image 
            src="/Logo_MIRAC.png" 
            alt="MIRAC Big Logo" 
            width={600} 
            height={200}
            priority
            style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
          />
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-blue)', marginTop: '2rem', marginBottom: '1rem' }}>
            Monitorització Intel·ligent de Rius i Aigües Catalanes
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#444', lineHeight: 1.6, marginBottom: '2rem' }}>
            A comprehensive, satellite-powered monitoring platform ensuring the health and safety of Catalonia's vital river ecosystems.
          </p>
          <a href="#demo" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex', padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
            See How It Works
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" style={{ padding: '6rem 2rem', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-blue)', marginBottom: '1rem', textAlign: 'center' }}>Real-time Intelligence</h2>
        <p style={{ fontSize: '1.1rem', color: '#666', textAlign: 'center', maxWidth: '600px', marginBottom: '3rem' }}>
          Explore a mock demonstration of how MIRAC integrates continuous sensor data with satellite imagery to track pollution down to the source.
        </p>

        {/* Mock Dashboard UI */}
        <div style={{ width: '100%', maxWidth: '1200px', background: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', overflow: 'hidden', border: '1px solid #eaeaea' }}>
          
          {/* Mock Header */}
          <div style={{ background: 'var(--primary-blue)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
            </div>
            <div style={{ color: 'white', fontSize: '0.9rem', opacity: 0.8, marginLeft: '1rem' }}>mirac-platform.cat / dashboard</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', padding: '2rem' }}>
            {/* Mock Left Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ background: '#f5f7fa', padding: '1.5rem', borderRadius: '8px' }}>
                <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem', fontSize: '1.2rem' }}>Scanning Llobregat...</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="demo-status-pulse" style={{ background: 'var(--accent-green)', color: 'white', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    ANALYZING
                  </div>
                </div>
              </div>

              <div style={{ background: '#f5f7fa', padding: '1.5rem', borderRadius: '8px' }}>
                <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem', fontSize: '1.2rem' }}>Live Sensor Data</h3>
                {['Temperature', 'Flow Rate', 'pH Levels'].map((sensor) => (
                  <div key={sensor} style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#444', marginBottom: '0.4rem', fontWeight: 'bold' }}>{sensor}</div>
                    <div className="demo-sensor-bar">
                      <div className="demo-sensor-fill"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mock Right Panel (Map Image) */}
            <div style={{ position: 'relative', background: '#eaeaea', borderRadius: '8px', overflow: 'hidden', minHeight: '400px' }}>
               <Image 
                  src="/llobregat.png" 
                  alt="Satellite mock view" 
                  fill
                  style={{ objectFit: 'cover' }}
               />
               {/* Scanning Overlay Line */}
               <div style={{
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 width: '100%',
                 height: '4px',
                 background: 'rgba(52, 168, 83, 0.8)',
                 boxShadow: '0 0 15px rgba(52, 168, 83, 0.8)',
                 animation: 'slideBar 3s infinite linear alternate'
               }}></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
