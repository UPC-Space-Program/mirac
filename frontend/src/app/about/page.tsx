export default function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '2rem 0' }}>
      <h1 style={{ fontSize: '3rem', color: 'var(--primary-blue)' }}>About MIRAC</h1>
      
      <div style={{ textAlign: 'left', background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2 style={{ color: 'var(--secondary-blue)' }}>Our Story</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#444' }}>
          Founded by a team of environmental scientists and data engineers, MIRAC was born out of a critical need to protect the rich biodiversity of Catalonia's rivers and coastline. We recognized that while water processing plants play a vital role in sanitation, heavy rainfall events often overwhelm their capacity, leading to untracked discharges of polluted water into our delicate ecosystems.
        </p>

        <h2 style={{ color: 'var(--secondary-blue)', marginTop: '1rem' }}>The Technology</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#444' }}>
          Our platform bridges the gap between reactive environmental policy and proactive, real-time intervention. We ingest and analyze high-resolution Copernicus satellite imagery to detect visual water quality anomalies at river mouths. Our proprietary algorithms then cross-reference this data with upstream operational records from local water treatment facilities (EDAR) and recent weather patterns.
        </p>

        <h2 style={{ color: 'var(--secondary-blue)', marginTop: '1rem' }}>Our Mission</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#444' }}>
          By creating a unified, intelligent dashboard, we provide authorities, environmental agencies, and the public with transparent, actionable insights. We believe that with the right data, we can trace pollution events back to their source, hold responsible parties accountable, and ultimately prevent environmental degradation before it's too late.
        </p>
      </div>
    </div>
  );
}
