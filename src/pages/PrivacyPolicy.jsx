import React, { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: '"Inter", sans-serif', color: '#333' }}>
      <h1 style={{ color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', marginBottom: '20px' }}>Privacy Policy</h1>
      <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
        At Laxmi Jewellers, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
      </p>
      <h3 style={{ marginTop: '30px', color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif' }}>1. Information We Collect</h3>
      <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
        We may collect personal information such as your name, email address, phone number, and transaction details when you register for an account, subscribe to our newsletter, or participate in our Harvest Schemes.
      </p>
      <h3 style={{ marginTop: '30px', color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif' }}>2. How We Use Your Information</h3>
      <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
        We use the information we collect to operate and maintain our services, process transactions, communicate with you, and improve our website and customer experience. We do not sell your personal data to third parties.
      </p>
      <h3 style={{ marginTop: '30px', color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif' }}>3. Data Security</h3>
      <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
        We implement a variety of security measures to maintain the safety of your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.
      </p>
    </div>
  );
}
