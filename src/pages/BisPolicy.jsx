import React, { useEffect } from 'react';

export default function BisPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: '"Inter", sans-serif', color: '#333' }}>
      <h1 style={{ color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', marginBottom: '20px' }}>BIS Hallmarking Policy</h1>
      <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
        At Laxmi Jewellers, we are committed to providing you with the highest quality gold jewelry. All our gold jewelry is 100% BIS Hallmarked, ensuring purity and authenticity.
      </p>
      <h3 style={{ marginTop: '30px', color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif' }}>1. What is BIS Hallmarking?</h3>
      <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
        The Bureau of Indian Standards (BIS) Hallmarking is the official guarantee of purity for gold jewelry in India. It certifies that the piece of jewelry meets the international standards of purity and fineness.
      </p>
      <h3 style={{ marginTop: '30px', color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif' }}>2. Our Commitment</h3>
      <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
        Every piece of gold jewelry purchased from Laxmi Jewellers carries the required BIS hallmark components: the BIS logo, purity grade, testing center mark, and the jeweler's mark.
      </p>
      <h3 style={{ marginTop: '30px', color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif' }}>3. Exchanges & Returns</h3>
      <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
        Because our jewelry is certified by BIS, you can be confident in its resale or exchange value. We offer transparent and fair exchange rates based on the hallmarked purity of your items.
      </p>
    </div>
  );
}
