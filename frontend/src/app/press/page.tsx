import Image from "next/image";

export default function Press() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        minHeight: '40vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '4rem 2rem',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2 }}>
          <Image src="/bg.png" alt="River Background" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.90)', zIndex: -1 }}></div>

        <div style={{ zIndex: 1, textAlign: 'center', maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3.5rem', color: 'var(--primary-blue)', marginBottom: '1rem' }}>Press & Media</h1>
          <p style={{ fontSize: '1.2rem', color: '#444', lineHeight: 1.6 }}>
            Latest news and coverage about MIRAC's groundbreaking initiatives across Catalonia.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1000px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <article style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderTop: '4px solid var(--secondary-blue)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s ease' }} className="cause-card">
              <h2 style={{ marginBottom: '1rem', fontSize: '1.4rem', color: '#222', lineHeight: 1.4 }}>"The Future of Environmental Monitoring in Catalonia"</h2>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                <span style={{ color: 'var(--primary-blue)', fontWeight: 'bold' }}>La Vanguardia</span>
                <span>April 12, 2026</span>
              </div>
              <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: 1.6 }}>
                MIRAC's innovative use of Copernicus satellite data is heralded as a game-changer for tracking non-compliant discharges from water treatment facilities during heavy storm seasons. The dashboard provides transparency that regional authorities say has been missing for decades.
              </p>
            </article>

            <article style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderTop: '4px solid var(--accent-green)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s ease' }} className="cause-card">
              <h2 style={{ marginBottom: '1rem', fontSize: '1.4rem', color: '#222', lineHeight: 1.4 }}>"Startup MIRAC Secures Funding to Expand River Watch"</h2>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                <span style={{ color: 'var(--primary-blue)', fontWeight: 'bold' }}>Ara</span>
                <span>March 5, 2026</span>
              </div>
              <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: 1.6 }}>
                Following a highly successful pilot tracking anomalies in the Llobregat river basin, MIRAC announces a new round of funding to scale their smart monitoring infrastructure across all major waterways of Catalonia, promising cleaner beaches by next summer.
              </p>
            </article>

            <article style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderTop: '4px solid var(--primary-blue)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s ease' }} className="cause-card">
              <h2 style={{ marginBottom: '1rem', fontSize: '1.4rem', color: '#222', lineHeight: 1.4 }}>"How AI and Satellites are Saving the Mediterranean"</h2>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                <span style={{ color: 'var(--primary-blue)', fontWeight: 'bold' }}>TechCrunch Europe</span>
                <span>January 28, 2026</span>
              </div>
              <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: 1.6 }}>
                A deep dive into the technology powering MIRAC's intelligent dashboard. The article explains how sophisticated algorithmic models can effortlessly connect sudden heavy rainfall events to unexpected coastal pollution spikes up to 48 hours later.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
