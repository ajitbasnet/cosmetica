export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 48px 100px' }}>
      <p style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#9b9b9b', marginBottom: 20 }}>Legal</p>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 56, fontWeight: 400, marginBottom: 48 }}>Privacy Policy</h1>
      {[
        { title: 'Information We Collect', body: 'We collect information you provide directly to us when you contact us, subscribe to our newsletter, or create an account. This includes your name, email address, and any other information you choose to provide.' },
        { title: 'How We Use Your Information', body: 'We use the information we collect to provide and improve our services, communicate with you, send marketing communications (with your consent), and comply with legal obligations.' },
        { title: 'Data Retention', body: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.' },
        { title: 'Your Rights', body: 'You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at privacy@cosmetica.com.' },
        { title: 'Contact Us', body: 'If you have any questions about this Privacy Policy, please contact us at hello@cosmetica.com.' },
      ].map((s, i) => (
        <div key={i} style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 400, marginBottom: 12 }}>{s.title}</h2>
          <p style={{ fontFamily: 'DM Sans', fontSize: 15, lineHeight: 1.8, color: '#555' }}>{s.body}</p>
        </div>
      ))}
    </div>
  )
}
