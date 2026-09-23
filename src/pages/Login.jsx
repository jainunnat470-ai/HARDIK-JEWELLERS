import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase
          .from('custom_users')
          .insert([{ email, password, full_name: fullName, phone_number: phone }])
          .select()
          .single();

        if (error) {
          if (error.code === '23505') throw new Error('Email already registered.');
          throw error;
        }

        alert('Profile created successfully! You are now logged in.');
        localStorage.setItem('userId', data.id);
        navigate(-1);
      } else {
        const { data, error } = await supabase
          .from('custom_users')
          .select('*')
          .eq('email', email)
          .eq('password', password)
          .single();

        if (error || !data) {
          throw new Error('Invalid email or password');
        }

        localStorage.setItem('userId', data.id);
        navigate(-1);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fff6f7',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'var(--font-sans)'
    }}>
      <div style={{ 
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '440px', 
        padding: '40px', 
        background: '#ffffff', 
        border: '1px solid rgba(212, 138, 148, 0.15)',
        borderRadius: '16px', 
        boxShadow: '0 20px 40px rgba(212, 138, 148, 0.08)',
        boxSizing: 'border-box'
      }}>
        {/* Back navigation button to last used screen */}
        <button 
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--peacock-green)',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: 0,
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          ← Back
        </button>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img src="/assets/logo.jpg?v=4" alt="Logo" style={{ height: '54px', marginBottom: '15px' }} />
          <h2 style={{ 
            color: 'var(--peacock-green)', 
            fontFamily: 'var(--font-serif)',
            fontSize: '1.8rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            margin: 0
          }}>
            {isSignUp ? 'Join the Harvest' : 'Welcome Back'}
          </h2>
          <p style={{ color: '#666666', fontSize: '0.85rem', marginTop: '8px', lineHeight: '1.4' }}>
            {isSignUp ? 'Begin your journey of pure gold' : 'Access your Digital Gold Harvest Dashboard'}
          </p>
        </div>
        
        {error && (
          <div style={{ 
            color: '#e53e3e', 
            background: '#fff5f5', 
            padding: '12px', 
            marginBottom: '20px', 
            textAlign: 'center', 
            border: '1px solid #fed7d7', 
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isSignUp && (
            <>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                style={{ 
                  padding: '14px 16px', 
                  background: '#ffffff', 
                  border: '1px solid #e2e8f0', 
                  color: '#1a1a1a', 
                  outline: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-sans)',
                  boxSizing: 'border-box',
                  width: '100%'
                }}
              />
              <input 
                type="text" 
                placeholder="Phone Number" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{ 
                  padding: '14px 16px', 
                  background: '#ffffff', 
                  border: '1px solid #e2e8f0', 
                  color: '#1a1a1a', 
                  outline: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-sans)',
                  boxSizing: 'border-box',
                  width: '100%'
                }}
              />
            </>
          )}
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              padding: '14px 16px', 
              background: '#ffffff', 
              border: '1px solid #e2e8f0', 
              color: '#1a1a1a', 
              outline: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontFamily: 'var(--font-sans)',
              boxSizing: 'border-box',
              width: '100%'
            }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              padding: '14px 16px', 
              background: '#ffffff', 
              border: '1px solid #e2e8f0', 
              color: '#1a1a1a', 
              outline: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontFamily: 'var(--font-sans)',
              boxSizing: 'border-box',
              width: '100%'
            }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '14px', 
              background: 'var(--royal-gold)', 
              color: '#ffffff', 
              border: 'none', 
              fontWeight: '700', 
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginTop: '8px',
              borderRadius: '8px',
              fontSize: '12px',
              transition: 'background 0.2s ease',
              boxSizing: 'border-box',
              width: '100%'
            }}>
            {loading ? 'Processing...' : (isSignUp ? 'Create Profile' : 'Sign In')}
          </button>
        </form>

        <div style={{ marginTop: '25px', textAlign: 'center' }}>
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ background: 'transparent', border: 'none', color: '#666666', cursor: 'pointer', fontSize: '0.85rem' }}>
            {isSignUp ? 'Already have an account? ' : "Don't have a profile? "}
            <span style={{ color: 'var(--royal-gold)', textDecoration: 'underline', fontWeight: '600' }}>
              {isSignUp ? 'Sign In' : 'Join Now'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
