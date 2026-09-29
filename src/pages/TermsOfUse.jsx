import React, { useEffect } from 'react';

export default function TermsOfUse() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: '"Inter", sans-serif', color: '#333' }}>
      <h1 style={{ color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', marginBottom: '20px' }}>Terms of Use</h1>
      <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
        Welcome to Laxmi Jewellers. By accessing or using our website, you agree to comply with and be bound by these Terms of Use.
      </p>
      <h3 style={{ marginTop: '30px', color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif' }}>1. Acceptance of Terms</h3>
      <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
        By using our services, creating an account, or participating in any of our schemes, you confirm that you have read, understood, and agreed to these terms. If you do not agree with any part of these terms, please do not use our services.
      </p>
      <h3 style={{ marginTop: '30px', color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif' }}>2. User Responsibilities</h3>
      <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
        You agree to provide accurate and complete information when registering an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
      </p>
      <h3 style={{ marginTop: '30px', color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif' }}>3. Changes to Terms</h3>
      <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
        Laxmi Jewellers reserves the right to modify these Terms of Use at any time. We will notify you of any significant changes, and your continued use of our services constitutes acceptance of the updated terms.
      </p>
    </div>
  );
}
