export default function Press() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto', padding: '2rem 0' }}>
      <h1 style={{ fontSize: '3rem', color: 'var(--primary-blue)', textAlign: 'center' }}>Press & Media</h1>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '1.2rem', marginBottom: '2rem' }}>Latest news and coverage about MIRAC's initiatives.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <article style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderTop: '4px solid var(--secondary-blue)' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.4rem', color: '#222' }}>"The Future of Environmental Monitoring in Catalonia"</h2>
          <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <span><strong>La Vanguardia</strong></span>
            <span>April 12, 2026</span>
          </div>
          <p style={{ fontSize: '1.05rem', color: '#444', lineHeight: 1.6 }}>
            MIRAC's innovative use of Copernicus satellite data is heralded as a game-changer for tracking non-compliant discharges from water treatment facilities during heavy storm seasons. The dashboard provides transparency that regional authorities say has been missing for decades.
          </p>
        </article>

        <article style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderTop: '4px solid var(--accent-green)' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.4rem', color: '#222' }}>"Startup MIRAC Secures Funding to Expand River Watch"</h2>
          <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <span><strong>Ara</strong></span>
            <span>March 5, 2026</span>
          </div>
          <p style={{ fontSize: '1.05rem', color: '#444', lineHeight: 1.6 }}>
            Following a highly successful pilot tracking anomalies in the Llobregat river basin, MIRAC announces a new round of funding to scale their smart monitoring infrastructure across all major waterways of Catalonia, promising cleaner beaches by next summer.
          </p>
        </article>

        <article style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderTop: '4px solid var(--primary-blue)' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.4rem', color: '#222' }}>"How AI and Satellites are Saving the Mediterranean"</h2>
          <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <span><strong>TechCrunch Europe</strong></span>
            <span>January 28, 2026</span>
          </div>
          <p style={{ fontSize: '1.05rem', color: '#444', lineHeight: 1.6 }}>
            A deep dive into the technology powering MIRAC's intelligent dashboard. The article explains how sophisticated algorithmic models can effortlessly connect sudden heavy rainfall events to unexpected coastal pollution spikes up to 48 hours later.
          </p>
        </article>
      </div>
    </div>
  );
}
