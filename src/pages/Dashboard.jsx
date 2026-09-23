import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, XCircle, CreditCard, UploadCloud, Gem, Sparkles, PlusCircle } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storeUpi, setStoreUpi] = useState('admin@upi');
  const [showNewSchemeForm, setShowNewSchemeForm] = useState(false);
  
  // Payment Modal State
  const [showModal, setShowModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedSchemeId, setSelectedSchemeId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' or 'Cash'
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    // Fetch user details
    const { data: userData } = await supabase.from('custom_users').select('*').eq('id', userId).single();
    if (!userData) {
      localStorage.removeItem('userId');
      navigate('/login');
      return;
    }
    setUser(userData);

    // Fetch store UPI settings
    const { data: settings } = await supabase.from('store_settings').select('upi_id').eq('id', 1).single();
    if (settings) setStoreUpi(settings.upi_id);

    // Fetch all active schemes AND their payments
    const { data: schemesData } = await supabase
      .from('harvest_schemes')
      .select('*, payments(*)')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    setSchemes(schemesData || []);
    setLoading(false);
  };

  useEffect(() => {
    document.title = "My Scheme Dashboard | Laxmi Jewellers";
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startScheme = async (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    const { error } = await supabase.from('harvest_schemes').insert([{ user_id: user.id, monthly_amount: amount, status: 'active' }]);
    if (error) alert('Error starting scheme: ' + error.message);
    else {
      setShowNewSchemeForm(false);
      fetchData();
    }
  };

  const openPaymentModal = (schemeId, monthNumber) => {
    setSelectedSchemeId(schemeId);
    setSelectedMonth(monthNumber);
    setPaymentMethod('UPI');
    setScreenshotFile(null);
    setPaymentSuccess(false);
    setShowModal(true);
  };

  const submitPayment = async (e) => {
    e.preventDefault();
    setUploading(true);

    const targetScheme = schemes.find(s => s.id === selectedSchemeId);
    if (!targetScheme) {
      setUploading(false);
      return;
    }

    let screenshot_url = null;

    if (paymentMethod === 'UPI') {
      if (!screenshotFile) {
        alert("Please upload a payment screenshot for UPI transactions.");
        setUploading(false);
        return;
      }
      
      const fileExt = screenshotFile.name.split('.').pop();
      const fileName = `${user.id}-${selectedSchemeId}-${selectedMonth}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('payment_screenshots')
        .upload(filePath, screenshotFile);

      if (uploadError) {
        alert("Error uploading screenshot: " + uploadError.message);
        setUploading(false);
        return;
      }

      // Get public URL
      const { data } = supabase.storage.from('payment_screenshots').getPublicUrl(filePath);
      screenshot_url = data.publicUrl;
    }

    const existingPayment = targetScheme.payments?.find(p => p.month_number === selectedMonth);

    let submitError;
    if (existingPayment) {
      const { error } = await supabase.from('payments').update({
        status: 'pending_approval',
        payment_method: paymentMethod,
        screenshot_url: screenshot_url
      }).eq('id', existingPayment.id);
      submitError = error;
    } else {
      const { error } = await supabase.from('payments').insert([{ 
        scheme_id: selectedSchemeId, 
        user_id: user.id, 
        month_number: selectedMonth, 
        amount: targetScheme.monthly_amount,
        status: 'pending_approval',
        payment_method: paymentMethod,
        screenshot_url: screenshot_url
      }]);
      submitError = error;
    }

    if (submitError) alert('Error submitting payment: ' + submitError.message);
    else {
      setPaymentSuccess(true);
      fetchData();
    }
    setUploading(false);
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--ivory-bg)', color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', letterSpacing: '2px' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory-bg)', color: 'var(--text-dark)', padding: '120px 20px 60px', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ color: 'var(--peacock-green)', fontFamily: '"Cinzel", serif', fontSize: '2.8rem', letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>
              Digital Harvest
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '10px', margin: '10px 0 0 0' }}>
              Welcome back, <span style={{ color: 'var(--text-dark)', fontWeight: 'bold' }}>{user?.full_name || 'Customer'}</span>
            </p>
            <div style={{ width: '60px', height: '2px', background: 'var(--royal-gold)', margin: '15px 0 0 0' }} />
          </div>

          {schemes.length > 0 && !showNewSchemeForm && (
            <button 
              onClick={() => setShowNewSchemeForm(true)}
              className="btn-gold" 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 25px', cursor: 'pointer' }}
            >
              <PlusCircle size={18} />
              Start New Scheme
            </button>
          )}
        </div>
        
        {schemes.length === 0 || showNewSchemeForm ? (
          <div style={{ background: 'var(--pristine-white)', padding: '50px', border: '1px solid var(--royal-gold-border)', borderRadius: '0', textAlign: 'center', boxShadow: 'var(--box-shadow-luxury)', marginBottom: '40px' }}>
            {showNewSchemeForm && schemes.length > 0 && (
              <button onClick={() => setShowNewSchemeForm(false)} style={{ position: 'absolute', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '14px', cursor: 'pointer', textDecoration: 'underline' }}>
                Cancel
              </button>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <Sparkles size={48} color="var(--royal-gold)" />
            </div>
            <h3 style={{ color: 'var(--peacock-green)', fontSize: '2rem', fontFamily: '"Cinzel", serif', marginBottom: '15px' }}>Start Your Golden Journey</h3>
            <p style={{ color: 'var(--text-muted)', margin: '0 auto 30px', fontSize: '1.1rem', maxWidth: '500px', lineHeight: '1.6' }}>Invest in pure BIS Hallmarked gold simply for 11 months, and get the 12th month as an absolute BONUS from Laxmi Jewellers.</p>
            <form onSubmit={startScheme} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '10px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Monthly Installment (₹)</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--royal-gold)', fontSize: '1.2rem', fontWeight: 'bold' }}>₹</span>
                  <input 
                    type="number" 
                    name="amount" 
                    min="1000" 
                    step="500" 
                    required 
                    style={{ padding: '15px 15px 15px 45px', background: 'var(--ivory-cards)', border: '1px solid var(--royal-gold-border)', borderRadius: '0', color: 'var(--text-dark)', outline: 'none', width: '300px', fontSize: '1.2rem', transition: 'border-color 0.3s' }} 
                    onFocus={(e) => e.target.style.borderColor = 'var(--royal-gold)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--royal-gold-border)'}
                  />
                </div>
              </div>
              <button type="submit" className="btn-gold" style={{ cursor: 'pointer', padding: '16px 40px', fontSize: '12px' }}>
                Start Saving Now
              </button>
            </form>
          </div>
        ) : null}

        {schemes.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {schemes.map((scheme, index) => {
              
              const schemePayments = scheme.payments || [];
              const totalGoldAccumulated = schemePayments.reduce((acc, curr) => {
                if (curr.status === 'approved' && curr.gold_purchased) return acc + Number(curr.gold_purchased);
                return acc;
              }, 0).toFixed(4);

              return (
                <div key={scheme.id} style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative' }}>
                  
                  {schemes.length > 1 && (
                    <div style={{ position: 'absolute', top: '-15px', left: '20px', background: 'var(--royal-gold)', color: '#fff', padding: '5px 15px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', zIndex: 10 }}>
                      A/C {schemes.length - index}
                    </div>
                  )}

                  {/* Wallet Card - Ivory Theme */}
                  <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--pristine-white)', borderRadius: '0', border: '1px solid var(--royal-gold-border)', padding: '40px', boxShadow: 'var(--box-shadow-luxury)' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1, flexWrap: 'wrap', gap: '20px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                          <Gem color="var(--royal-gold)" size={24} />
                          <h3 style={{ color: 'var(--peacock-green)', fontFamily: '"Cinzel", serif', fontSize: '1.6rem', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Digital Gold Wallet</h3>
                        </div>
                        <p style={{ color: 'var(--text-muted)', margin: '0 0 20px 0', fontSize: '0.9rem' }}>Scheme Started: {new Date(scheme.start_date).toLocaleDateString()}</p>
                        
                        <div style={{ marginTop: '20px' }}>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px', fontWeight: 'bold' }}>Monthly Installment</p>
                          <p style={{ color: 'var(--text-dark)', fontSize: '1.8rem', fontWeight: 'bold', margin: 0, fontFamily: '"Cinzel", serif' }}>₹{scheme.monthly_amount.toLocaleString('en-IN')}</p>
                        </div>
                      </div>

                      {/* 
                      <div style={{ textAlign: 'right', background: 'var(--ivory-cards)', padding: '20px 30px', borderRadius: '0', border: '1px solid var(--royal-gold-light)', boxShadow: '0 5px 15px rgba(0,0,0,0.03)' }}>
                        <p style={{ color: 'var(--peacock-green)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 'bold' }}>Total Gold Accumulated</p>
                        <div style={{ color: 'var(--royal-gold)', fontSize: '2.8rem', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'baseline', gap: '5px', justifyContent: 'flex-end', fontFamily: '"Cinzel", serif' }}>
                          {totalGoldAccumulated} <span style={{ fontSize: '1.5rem', color: 'var(--text-dark)' }}>g</span>
                        </div>
                      </div>
                      */}
                    </div>
                  </div>
                  
                  {/* Payment Schedule Grid */}
                  <div style={{ background: 'var(--pristine-white)', border: '1px solid var(--royal-gold-border)', borderRadius: '0', padding: '40px', boxShadow: 'var(--box-shadow-luxury)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                      <h4 style={{ color: 'var(--peacock-green)', fontSize: '1.4rem', fontFamily: '"Cinzel", serif', letterSpacing: '1px' }}>Payment Schedule</h4>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                        {schemePayments.filter(p => p.status === 'approved').length} / 11 Months Paid
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                      {[...Array(11)].map((_, i) => {
                        const monthNum = i + 1;
                        const payment = schemePayments.find(p => p.month_number === monthNum);
                        
                        let statusText = "Unpaid";
                        let Icon = Clock;
                        let iconColor = "var(--text-muted)";
                        let borderColor = "var(--royal-gold-light)";
                        let bg = "var(--ivory-bg)";

                        if (payment) {
                          if (payment.status === 'approved') { 
                            statusText = "Approved"; 
                            Icon = CheckCircle;
                            iconColor = "#28a745"; 
                            borderColor = "rgba(40,167,69,0.3)"; 
                            bg = "rgba(40,167,69,0.05)"; 
                          }
                          else if (payment.status === 'pending_approval') { 
                            statusText = "Pending Approval"; 
                            Icon = Clock;
                            iconColor = "var(--royal-gold)"; 
                            borderColor = "var(--royal-gold-border)"; 
                            bg = "var(--royal-gold-light)"; 
                          }
                          else if (payment.status === 'rejected') { 
                            statusText = "Payment Failed"; 
                            Icon = XCircle;
                            iconColor = "#dc3545"; 
                            borderColor = "rgba(220,53,69,0.3)"; 
                            bg = "rgba(220,53,69,0.05)"; 
                          }
                        }

                        return (
                          <div 
                            key={monthNum} 
                            style={{ 
                              padding: '25px 20px', 
                              border: `1px solid ${borderColor}`, 
                              borderRadius: '0', 
                              textAlign: 'center', 
                              background: bg, 
                              position: 'relative',
                              transition: 'transform 0.3s, box-shadow 0.3s',
                              cursor: 'default'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-5px)';
                              e.currentTarget.style.boxShadow = `0 10px 20px rgba(0,0,0,0.05)`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', fontWeight: 'bold' }}>Month {monthNum}</div>
                            
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                              <Icon color={iconColor} size={28} />
                            </div>
                            
                            <div style={{ color: iconColor, fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>{statusText}</div>
                            
                            {!payment || payment.status === 'rejected' ? (
                              <button 
                                onClick={() => openPaymentModal(scheme.id, monthNum)}
                                className="btn-outline"
                                style={{ 
                                  padding: '10px 20px', 
                                  width: '100%', 
                                  cursor: 'pointer',
                                  fontSize: '10px'
                                }}
                              >
                                Pay Now
                              </button>
                            ) : (
                              <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '15px', marginTop: 'auto' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Paid on: {new Date(payment.payment_date).toLocaleDateString()}</div>
                                {payment.gold_purchased && (
                                  <div style={{ fontSize: '1.1rem', color: 'var(--royal-gold)', fontWeight: 'bold' }}>
                                    +{payment.gold_purchased}g
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                      
                      {/* 12th Month Bonus Card */}
                      <div style={{ 
                        padding: '25px 20px', 
                        border: '1px solid var(--royal-gold-border)', 
                        borderRadius: '0', 
                        textAlign: 'center', 
                        background: 'var(--royal-gold-light)', 
                        position: 'relative',
                        overflow: 'hidden',
                        animation: 'pulseGold 2s infinite'
                      }}>
                        <div style={{ color: 'var(--peacock-green)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', fontWeight: 'bold' }}>Month 12</div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                          <Sparkles color="var(--royal-gold)" size={32} />
                        </div>
                        <div style={{ margin: '10px 0', fontWeight: 'bold', color: 'var(--royal-gold)', fontSize: '1.5rem', fontFamily: '"Cinzel", serif', letterSpacing: '2px' }}>BONUS</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--royal-gold-border)', paddingTop: '15px', marginTop: '15px', fontWeight: 'bold' }}>
                          Unlocks Automatically
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Payment Modal (White & Pink Premium Luxury Theme) */}
      {showModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.4)', 
          backdropFilter: 'blur(8px)', 
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' 
        }}>
          <div style={{ 
            background: '#ffffff', 
            padding: '36px', 
            width: '100%', 
            maxWidth: '440px', 
            border: '1px solid rgba(212, 138, 148, 0.15)', 
            borderRadius: '20px', 
            boxShadow: '0 24px 64px rgba(212, 138, 148, 0.12)',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212, 138, 148, 0.1)', paddingBottom: '16px', marginBottom: '20px' }}>
              <h3 style={{ color: 'var(--peacock-green)', fontFamily: 'var(--font-serif)', fontSize: '1.4rem', margin: 0, fontWeight: 700, letterSpacing: '0.5px' }}>SECURE PAYMENT</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'rgba(0,0,0,0.05)', border: 'none', color: '#1a1a1a', cursor: 'pointer', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', fontSize: '14px' }}>
                ✕
              </button>
            </div>
            
            {!paymentSuccess ? (
              <>
                <div style={{ background: '#fff6f7', padding: '16px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center', border: '1px solid rgba(212, 138, 148, 0.15)' }}>
                  <p style={{ color: 'var(--peacock-green)', margin: '0 0 4px 0', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Paying for Month {selectedMonth}</p>
                  {schemes.find(s => s.id === selectedSchemeId) && (
                    <p style={{ color: '#1a1a1a', fontSize: '1.8rem', fontWeight: '700', margin: 0, fontFamily: 'var(--font-serif)' }}>
                      ₹{schemes.find(s => s.id === selectedSchemeId).monthly_amount.toLocaleString('en-IN')}
                    </p>
                  )}
                </div>
                
                <form onSubmit={submitPayment}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#555555', marginBottom: '10px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700' }}>Select Payment Method</label>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <label style={{ flex: 1, padding: '12px 8px', border: `1px solid ${paymentMethod === 'UPI' ? 'var(--royal-gold)' : '#e2e8f0'}`, borderRadius: '12px', textAlign: 'center', cursor: 'pointer', background: paymentMethod === 'UPI' ? 'rgba(212, 138, 148, 0.08)' : 'transparent', color: paymentMethod === 'UPI' ? 'var(--peacock-green)' : '#666666', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <input type="radio" name="method" value="UPI" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} style={{ display: 'none' }} />
                        <CreditCard size={18} />
                        <span style={{ fontSize: '12px', fontWeight: '700' }}>UPI / QR Scan</span>
                      </label>
                      <label style={{ flex: 1, padding: '12px 8px', border: `1px solid ${paymentMethod === 'Cash' ? 'var(--royal-gold)' : '#e2e8f0'}`, borderRadius: '12px', textAlign: 'center', cursor: 'pointer', background: paymentMethod === 'Cash' ? 'rgba(212, 138, 148, 0.08)' : 'transparent', color: paymentMethod === 'Cash' ? 'var(--peacock-green)' : '#666666', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <input type="radio" name="method" value="Cash" checked={paymentMethod === 'Cash'} onChange={() => setPaymentMethod('Cash')} style={{ display: 'none' }} />
                        <Gem size={18} />
                        <span style={{ fontSize: '12px', fontWeight: '700' }}>Store Cash</span>
                      </label>
                    </div>
                  </div>

                  {paymentMethod === 'UPI' && (
                    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', border: '1px solid rgba(212, 138, 148, 0.12)', marginBottom: '20px', textAlign: 'center', boxShadow: '0 8px 24px rgba(212, 138, 148, 0.03)' }}>
                      <p style={{ color: '#555555', fontSize: '12px', marginBottom: '14px', fontWeight: '600' }}>Scan the Official QR Code to Pay</p>
                      
                      <div style={{ marginBottom: '16px', padding: '8px', background: '#fff', display: 'inline-block', borderRadius: '8px', border: '1px solid rgba(212, 138, 148, 0.15)' }}>
                        <img 
                          src={supabase.storage.from('payment_screenshots').getPublicUrl('admin_qr_code.png').data.publicUrl} 
                          alt="Store QR Code" 
                          style={{ width: '150px', height: '150px', objectFit: 'contain', borderRadius: '4px' }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>

                      <div style={{ fontSize: '12px', color: 'var(--peacock-green)', fontWeight: '700', marginBottom: '20px', padding: '10px 14px', background: '#fff6f7', border: '1px dashed var(--royal-gold)', borderRadius: '8px' }}>
                        UPI ID: <span style={{ color: '#1a1a1a' }}>{storeUpi}</span>
                      </div>
                      
                      <label style={{ display: 'block', color: '#555555', marginBottom: '8px', fontSize: '11px', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700' }}>Upload Screenshot</label>
                      <div style={{ position: 'relative' }}>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => setScreenshotFile(e.target.files[0])}
                          style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 2 }}
                        />
                        <div style={{ padding: '12px', border: '1px dashed rgba(212, 138, 148, 0.3)', borderRadius: '8px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: screenshotFile ? 'var(--peacock-green)' : '#888888', transition: 'all 0.2s' }}>
                          <UploadCloud size={16} />
                          <span style={{ fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px', fontWeight: '700' }}>
                            {screenshotFile ? screenshotFile.name : "Choose screenshot image"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'Cash' && (
                    <div style={{ background: '#fff6f7', border: '1px solid rgba(212, 138, 148, 0.15)', padding: '20px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' }}>
                      <p style={{ color: 'var(--peacock-green)', margin: 0, lineHeight: '1.5', fontWeight: '700', fontSize: '13px' }}>Please visit our showroom to pay the installment in cash.</p>
                      <p style={{ color: '#666666', fontSize: '11px', margin: '8px 0 0 0' }}>Your status will be pending until our admin verifies receipt.</p>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={uploading} 
                    className="btn-gold"
                    style={{ 
                      width: '100%', 
                      padding: '14px', 
                      cursor: uploading ? 'not-allowed' : 'pointer', 
                      opacity: uploading ? 0.7 : 1,
                      background: 'var(--royal-gold)',
                      color: '#ffffff',
                      borderRadius: '12px',
                      fontWeight: '700',
                      border: 'none',
                      fontSize: '12px',
                      letterSpacing: '0.8px',
                      textTransform: 'uppercase',
                      transition: 'background 0.2s ease',
                      boxSizing: 'border-box'
                    }}
                  >
                    {uploading ? 'Processing...' : 'Submit Payment Request'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle size={54} color="#28a745" style={{ margin: '0 auto 16px' }} />
                <h4 style={{ color: 'var(--peacock-green)', fontSize: '1.4rem', marginBottom: '8px', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>PAYMENT SUBMITTED!</h4>
                <p style={{ color: '#666666', marginBottom: '24px', lineHeight: '1.5', fontSize: '12px' }}>Your request for Month {selectedMonth} has been sent successfully and is now pending admin approval.</p>
                <button 
                  onClick={() => setShowModal(false)}
                  style={{ 
                    cursor: 'pointer',
                    background: '#ffffff',
                    color: 'var(--peacock-green)',
                    border: '1px solid rgba(212, 138, 148, 0.3)',
                    padding: '10px 24px',
                    borderRadius: '24px',
                    fontSize: '11px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
