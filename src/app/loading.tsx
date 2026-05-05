export default function Loading() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafaf8' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, letterSpacing: '0.1em', color: '#0a0a0a', animation: 'pulse 1.5s ease-in-out infinite' }}>
          COSMÉTICA
        </p>
        <div style={{ width: 40, height: 1, background: '#0a0a0a', animation: 'lineGrow 1.2s ease-in-out infinite' }} />
      </div>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes lineGrow { 0%{width:0;opacity:0} 50%{width:60px;opacity:1} 100%{width:0;opacity:0} }
      `}</style>
    </div>
  )
}
