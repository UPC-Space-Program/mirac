import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-image">
        <Image 
          src="/mirac_logo.png" 
          alt="MIRAC Big Logo" 
          width={500} 
          height={500}
          priority
        />
      </div>
      <div className="hero-content">
        <h1>Safeguarding Our Waters</h1>
        <p>
          Welcome to MIRAC (Monitorització Intel·ligent de Rius i Aigües Catalanes). 
          We are dedicated to the smart monitoring of Catalonia's river ecosystems. 
          By leveraging real-time Copernicus satellite imagery and advanced weather 
          correlations, our platform detects pollution at river mouths and accurately 
          traces it back to its source, holding responsible parties accountable and 
          preserving the natural beauty of our waterways.
        </p>
        <div style={{ marginTop: '1rem' }}>
          <Link href="/about" className="btn-primary" style={{ display: 'inline-flex', width: 'fit-content' }}>
            Learn More
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
