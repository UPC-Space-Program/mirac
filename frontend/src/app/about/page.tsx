import Image from "next/image";

export default function About() {
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
          <h1 style={{ fontSize: '3.5rem', color: 'var(--primary-blue)', marginBottom: '1rem' }}>About MIRAC</h1>
          <p style={{ fontSize: '1.2rem', color: '#444', lineHeight: 1.6 }}>
            Bridging the gap between environmental policy and proactive, real-time intervention.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'center' }} className="about-press-grid">
        <div style={{ maxWidth: '800px', width: '100%', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

          <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ color: 'var(--secondary-blue)', marginBottom: '1rem', fontSize: '1.8rem' }}>Our Story</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555' }}>
                Founded by a team of Aerospace Engineers, MIRAC was born out of a critical need to protect the rich biodiversity of Catalonia's rivers and coastline. We recognized that while water processing plants play a vital role in sanitation, heavy rainfall events often overwhelm their capacity, leading to untracked discharges of polluted water into our delicate ecosystems.
              </p>
            </div>

            <div>
              <h2 style={{ color: 'var(--secondary-blue)', marginBottom: '1rem', fontSize: '1.8rem' }}>The Technology</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555' }}>
                Our platform bridges the gap between reactive environmental policy and proactive, real-time intervention. We ingest and analyze high-resolution Copernicus satellite imagery to detect visual water quality anomalies at river mouths. Our proprietary algorithms then cross-reference this data with upstream operational records from local water treatment facilities (EDAR) and recent weather patterns.
              </p>
            </div>

            <div>
              <h2 style={{ color: 'var(--secondary-blue)', marginBottom: '1rem', fontSize: '1.8rem' }}>Our Mission</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555' }}>
                By creating a unified, intelligent dashboard, we provide authorities, environmental agencies, and the public with transparent, actionable insights. We believe that with the right data, we can trace pollution events back to their source, hold responsible parties accountable, and ultimately prevent environmental degradation before it's too late.
              </p>
            </div>
          </div>

          <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: 'var(--secondary-blue)', marginBottom: '2rem', fontSize: '1.8rem', textAlign: 'center' }}>Meet the Team</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
              {[
                { name: "Laia Delicado", role: "HR" },
                { name: "Paula Stamati", role: "CEO" },
                { name: "Bingchi Zhu", role: "CFO" },
                { name: "Joel Garcia", role: "CTO" },
                { name: "Ricard Vilaró", role: "CIO" }
              ].map((member, i) => (
                <div key={i} style={{ padding: '2rem 1.5rem', background: '#f5f7fa', borderRadius: '12px', textAlign: 'center', border: '1px solid #eaeaea', transition: 'transform 0.2s ease', cursor: 'default' }} className="cause-card">
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', margin: '0 auto 1rem auto', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    <img src={member.name + ".JPG"} alt={member.name} style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%' }} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>{member.name}</h3>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>{member.role}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
