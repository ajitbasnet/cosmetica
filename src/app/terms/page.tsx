export default function TermsPage() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 48px 100px' }}>
      <p style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#9b9b9b', marginBottom: 20 }}>Legal</p>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 56, fontWeight: 400, marginBottom: 48 }}>Terms & Conditions</h1>
      {[
        { title: 'Acceptance of Terms', body: 'By accessing and using our website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.' },
        { title: 'Use of Services', body: 'Our services are intended for business use by beauty brands seeking social media marketing services. You agree to use our services only for lawful purposes and in accordance with these Terms.' },
        { title: 'Intellectual Property', body: 'All content on this website, including text, graphics, logos, and images, is the property of COSMÉTICA and is protected by applicable copyright and trademark laws.' },
        { title: 'Limitation of Liability', body: 'COSMÉTICA shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services or inability to use our services.' },
        { title: 'Governing Law', body: 'These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.' },
      ].map((s, i) => (
        <div key={i} style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 400, marginBottom: 12 }}>{s.title}</h2>
          <p style={{ fontFamily: 'DM Sans', fontSize: 15, lineHeight: 1.8, color: '#555' }}>{s.body}</p>
        </div>
      ))}
    </div>
  )
}
