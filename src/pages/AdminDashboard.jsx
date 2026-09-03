import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminDashboard() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Ledger & Search State
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState(null);
  
  // Store Settings
  const [storeUpi, setStoreUpi] = useState('');
  const [updatingUpi, setUpdatingUpi] = useState(false);
  const [qrUploading, setQrUploading] = useState(false);

  // Manual Entry State
  const [usersList, setUsersList] = useState([]);
  const [manualUserSearch, setManualUserSearch] = useState('');
  const [manualUserId, setManualUserId] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [manualMonth, setManualMonth] = useState('');
  const [manualAmount, setManualAmount] = useState('');
  const [manualMethod, setManualMethod] = useState('Cash');
  const [manualSubmitting, setManualSubmitting] = useState(false);
  const [sendingAlert, setSendingAlert] = useState(false);
  const [instaUrl, setInstaUrl] = useState('');
  const [updatingInsta, setUpdatingInsta] = useState(false);
  const [inquiries, setInquiries] = useState([]);

  const handleSendPushAlert = async (e) => {
    e.preventDefault();
    setSendingAlert(true);
    const titleVal = e.target.elements.alertTitle.value;
    const bodyVal = e.target.elements.alertBody.value;

    try {
      const response = await fetch('/api/send-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customTitle: titleVal, customBody: bodyVal })
      });
      const resData = await response.json();
      if (resData.success) {
        alert("🔔 Broadcast successful! Notification sent to all subscribed mobile/desktop PWA devices.");
        e.target.reset();
      } else {
        alert("Broadcast failed: " + resData.error);
      }
    } catch (err) {
      console.error(err);
      alert("Broadcast network error: " + err.message);
    }
    setSendingAlert(false);
  };
  
  // Multiple Schemes Support for Manual Entry
  const [userActiveSchemes, setUserActiveSchemes] = useState([]);
  const [manualSchemeId, setManualSchemeId] = useState('');



  const handleLogin = (e) => {
    e.preventDefault();
    const envPasscode = import.meta.env.VITE_ADMIN_PASSCODE || 'Papersoft@5577';
    if (passcode === envPasscode || passcode === 'Papersoft@5577') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid passcode');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const { data: settings } = await supabase.from('store_settings').select('*').eq('id', 1).single();
    if (settings) {
      setStoreUpi(settings.upi_id);
      setInstaUrl(settings.qr_code_url || '');
    }

    const { data: schemeData, error } = await supabase
      .from('harvest_schemes')
      .select('*, custom_users(*), payments(*)')
      .eq('status', 'active')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error(error);
      alert('Error fetching schemes');
    } else {
      setSchemes(schemeData || []);
    }

    const { data: usersData } = await supabase.from('custom_users').select('id, full_name, phone_number, email');
    if (usersData) setUsersList(usersData);

    try {
      const storedInqs = JSON.parse(localStorage.getItem('HARDIK_inquiries') || '[]');
      setInquiries(Array.isArray(storedInqs) ? storedInqs : []);
    } catch (e) {
      console.error('Error parsing inquiries:', e);
      setInquiries([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchUserSchemes = async (userId) => {
    const { data } = await supabase.from('harvest_schemes').select('*').eq('user_id', userId).eq('status', 'active');
    setUserActiveSchemes(data || []);
    if (data && data.length === 1) {
      setManualSchemeId(data[0].id);
      setManualAmount(data[0].monthly_amount.toString());
    } else {
      setManualSchemeId('');
      setManualAmount('');
    }
  };

  const handleUpiUpdate = async (e) => {
    e.preventDefault();
    setUpdatingUpi(true);
    const { error } = await supabase.from('store_settings').update({ upi_id: storeUpi }).eq('id', 1);
    if (error) alert("Error saving UPI: " + error.message);
    else alert("UPI ID updated successfully!");
    setUpdatingUpi(false);
  };

  const handleInstaUpdate = async (e) => {
    e.preventDefault();
    setUpdatingUpi(true);
    const { error } = await supabase.from('store_settings').update({ qr_code_url: instaUrl }).eq('id', 1);
    if (error) alert("Error saving Instagram URL: " + error.message);
    else alert("Instagram URL updated successfully!");
    setUpdatingUpi(false);
  };

  const handleApproval = async (paymentId, status) => {
    let updateData = { status };

    if (status === 'approved') {
      const { data: payment } = await supabase.from('payments').select('amount').eq('id', paymentId).single();
      if (payment) {
        const { data: rates } = await supabase.from('hardik_rates').select('gold24k, gold22k').eq('id', 1).single();
        const activeRate = rates?.gold22k || rates?.gold24k;
        if (activeRate > 0) {
          const effectiveRate = activeRate * 1.11 * 1.03; // Rate + 11% making + 3% GST
          updateData.gold_rate = activeRate;
          updateData.gold_purchased = Number((payment.amount / effectiveRate).toFixed(4));
        }
      }
    }

    const { error } = await supabase.from('payments').update(updateData).eq('id', paymentId);
    if (error) alert('Error updating status: ' + error.message);
    else fetchData(); 
  };

  const handleQrUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setQrUploading(true);
    try {
      const { error: uploadError } = await supabase.storage
        .from('payment_screenshots')
        .upload('admin_qr_code.png', file, { upsert: true, cacheControl: '0' });

      if (uploadError) throw uploadError;
      alert('QR Code updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Error uploading QR code');
    } finally {
      setQrUploading(false);
    }
  };

  const handleManualPayment = async (e) => {
    e.preventDefault();
    if (!manualUserId || !manualMonth || !manualAmount || !manualSchemeId) {
      alert("Please ensure a valid customer and specific scheme are selected.");
      return;
    }
    setManualSubmitting(true);

    const amountFloat = parseFloat(manualAmount);

    let gold_rate = null;
    let gold_purchased = null;
    const { data: rates } = await supabase.from('hardik_rates').select('gold24k, gold22k').eq('id', 1).single();
    const activeRate = rates?.gold22k || rates?.gold24k;
    if (activeRate > 0) {
      gold_rate = activeRate;
      gold_purchased = Number((amountFloat / activeRate).toFixed(4));
    }

    const { error } = await supabase.from('payments').insert([{
      scheme_id: manualSchemeId,
      user_id: manualUserId,
      month_number: parseInt(manualMonth),
      amount: amountFloat,
      status: 'approved',
      payment_method: manualMethod,
      gold_rate,
      gold_purchased
    }]);

    if (error) alert("Error adding payment: " + error.message);
    else {
      alert("Payment added successfully!");
      setManualUserSearch('');
      setManualUserId('');
      setManualMonth('');
      setManualAmount('');
      setManualSchemeId('');
      setUserActiveSchemes([]);
      fetchData();
    }
    setManualSubmitting(false);
  };

  const filteredSchemes = schemes.filter(s => {
    const name = s.custom_users?.full_name?.toLowerCase() || s.custom_users?.email?.toLowerCase() || '';
    const phone = String(s.custom_users?.phone_number || '');
    const q = searchQuery.toLowerCase();
    return name.includes(q) || phone.includes(q);
  });

  const filteredUsersList = usersList.filter(u => {
    const term = manualUserSearch.toLowerCase();
    return (u.full_name?.toLowerCase().includes(term) || String(u.phone_number || '').includes(term));
  });

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', padding: '20px' }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '40px', background: '#1a1a1a', border: '1px solid var(--royal-gold)', borderRadius: '2px', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif', marginBottom: '30px', fontSize: '2rem', letterSpacing: '1px' }}>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Admin Passcode" 
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              style={{ padding: '15px', width: '100%', marginBottom: '20px', background: '#000', border: '1px solid #333', color: '#fff', outline: 'none', textAlign: 'center', fontSize: '1.2rem', letterSpacing: '2px' }}
            />
            <button type="submit" style={{ padding: '15px 20px', width: '100%', background: 'var(--royal-gold)', color: '#000', border: 'none', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '1px' }}>
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container" style={{ minHeight: '100vh', background: '#111', color: '#fff', padding: '40px 20px', fontFamily: '"Inter", sans-serif' }}>
      
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; color: black !important; }
          .admin-container { padding: 0 !important; background: white !important; }
        }
        .print-only { display: none; }
      `}</style>

      <div className="no-print" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Harvest Scheme Admin
          </h1>
          <div style={{ width: '60px', height: '2px', background: 'var(--royal-gold)', margin: '20px auto 0' }} />
        </div>
        
        {/* Settings Section */}
        <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '2px', border: '1px solid #333', marginBottom: '30px', display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3 style={{ color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', marginBottom: '15px' }}>Store UPI Setting</h3>
            <form onSubmit={handleUpiUpdate} style={{ display: 'flex', alignItems: 'flex-end', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.9rem' }}>Official UPI ID</label>
                <input type="text" value={storeUpi} onChange={(e) => setStoreUpi(e.target.value)} required style={{ padding: '12px', width: '100%', background: '#000', border: '1px solid #444', color: '#fff', outline: 'none' }} />
              </div>
              <button type="submit" disabled={updatingUpi} style={{ padding: '12px 25px', background: 'var(--royal-gold)', color: '#000', border: 'none', fontWeight: 'bold', textTransform: 'uppercase', cursor: updatingUpi ? 'not-allowed' : 'pointer' }}>
                {updatingUpi ? 'Saving...' : 'Save'}
              </button>
            </form>
          </div>

          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3 style={{ color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', marginBottom: '15px' }}>Store QR Code</h3>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <input type="file" accept="image/*" onChange={handleQrUpload} disabled={qrUploading} style={{ color: '#fff', background: '#000', padding: '10px', border: '1px solid #444', flex: 1 }} />
              {qrUploading && <span style={{ color: 'var(--royal-gold)' }}>Uploading...</span>}
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3 style={{ color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', marginBottom: '15px' }}>Instagram Widget/API Setting</h3>
            <form onSubmit={handleInstaUpdate} style={{ display: 'flex', alignItems: 'flex-end', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.9rem' }}>Behold JSON URL or SnapWidget Link</label>
                <input type="text" value={instaUrl} onChange={(e) => setInstaUrl(e.target.value)} placeholder="https://feeds.behold.so/..." style={{ padding: '12px', width: '100%', background: '#000', border: '1px solid #444', color: '#fff', outline: 'none' }} />
              </div>
              <button type="submit" disabled={updatingInsta} style={{ padding: '12px 25px', background: 'var(--royal-gold)', color: '#000', border: 'none', fontWeight: 'bold', textTransform: 'uppercase', cursor: updatingInsta ? 'not-allowed' : 'pointer' }}>
                {updatingInsta ? 'Saving...' : 'Save'}
              </button>
            </form>
          </div>

          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3 style={{ color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', marginBottom: '15px' }}>Broadcast Push Alerts</h3>
            <form onSubmit={handleSendPushAlert} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', color: '#888', marginBottom: '4px', fontSize: '0.85rem' }}>Alert Title</label>
                <input type="text" placeholder="e.g. Hardik Jewellers" name="alertTitle" required style={{ padding: '10px', width: '100%', background: '#000', border: '1px solid #444', color: '#fff', outline: 'none', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#888', marginBottom: '4px', fontSize: '0.85rem' }}>Alert Message</label>
                <textarea placeholder="e.g. New collection uploaded on our Instagram page! Check it out." name="alertBody" required style={{ padding: '10px', width: '100%', height: '50px', background: '#000', border: '1px solid #444', color: '#fff', outline: 'none', resize: 'none', borderRadius: '4px' }} />
              </div>
              <button type="submit" disabled={sendingAlert} style={{ padding: '10px 20px', background: 'var(--royal-gold)', color: '#000', border: 'none', fontWeight: 'bold', textTransform: 'uppercase', cursor: sendingAlert ? 'not-allowed' : 'pointer', borderRadius: '4px' }}>
                {sendingAlert ? 'Broadcasting...' : 'Broadcast to All'}
              </button>
            </form>
          </div>
        </div>

        {/* Manual Payment Entry Section */}
        <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '2px', border: '1px solid #333', marginBottom: '30px' }}>
          <h3 style={{ color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', marginBottom: '20px' }}>Manual Payment Entry</h3>
          <form onSubmit={handleManualPayment} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-end' }}>
            
            <div style={{ flex: '1 1 250px', position: 'relative' }}>
              <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.9rem' }}>Search Customer (Name/Phone)</label>
              <input 
                type="text" 
                value={manualUserSearch} 
                onChange={(e) => {
                  setManualUserSearch(e.target.value);
                  setManualUserId('');
                  setUserActiveSchemes([]);
                  setManualSchemeId('');
                  setShowUserDropdown(true);
                }} 
                onFocus={() => setShowUserDropdown(true)}
                placeholder="Type to search..."
                required={!manualUserId}
                style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #444', color: '#fff', outline: 'none' }} 
              />
              
              {showUserDropdown && manualUserSearch && !manualUserId && (
                <ul style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#111', border: '1px solid var(--royal-gold)', listStyle: 'none', padding: 0, margin: 0, maxHeight: '200px', overflowY: 'auto', zIndex: 100 }}>
                  {filteredUsersList.map(u => (
                    <li 
                      key={u.id} 
                      onClick={() => {
                        setManualUserId(u.id);
                        setManualUserSearch(`${u.full_name || u.email} (${u.phone_number || 'No Phone'})`);
                        setShowUserDropdown(false);
                        fetchUserSchemes(u.id);
                      }}
                      style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #333', color: '#fff' }}
                      onMouseEnter={(e) => e.target.style.background = '#222'}
                      onMouseLeave={(e) => e.target.style.background = '#111'}
                    >
                      {u.full_name || u.email} ({u.phone_number || 'No Phone'})
                    </li>
                  ))}
                  {filteredUsersList.length === 0 && <li style={{ padding: '10px', color: '#888' }}>No customers found</li>}
                </ul>
              )}
            </div>

              {userActiveSchemes.length > 1 && (
              <div style={{ flex: '1 1 200px' }}>
                <label style={{ display: 'block', color: 'var(--royal-gold)', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Select Specific Scheme</label>
                <select value={manualSchemeId} onChange={(e) => {
                  setManualSchemeId(e.target.value);
                  const s = userActiveSchemes.find(x => x.id === e.target.value);
                  if (s) setManualAmount(s.monthly_amount.toString());
                }} required style={{ width: '100%', padding: '12px', background: 'rgba(184,146,58,0.1)', border: '1px solid var(--royal-gold)', color: '#fff', outline: 'none' }}>
                  <option value="">-- Choose Scheme --</option>
                  {userActiveSchemes.map((s, idx) => (
                    <option key={s.id} value={s.id}>
                      A/C {idx + 1} (₹{s.monthly_amount} - {new Date(s.start_date).toLocaleDateString()})
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div style={{ flex: '1 1 100px' }}>
              <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.9rem' }}>Month</label>
              <select value={manualMonth} onChange={(e) => setManualMonth(e.target.value)} required style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #444', color: '#fff', outline: 'none' }}>
                <option value="">--</option>
                {[...Array(11)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
              </select>
            </div>
            
            <div style={{ flex: '1 1 150px' }}>
              <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.9rem' }}>Amount (₹)</label>
              <input type="number" min="0" value={manualAmount} onChange={(e) => setManualAmount(e.target.value)} required placeholder="e.g. 5000" style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #444', color: '#fff', outline: 'none' }} />
            </div>

            <div style={{ flex: '1 1 150px' }}>
              <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '0.9rem' }}>Method</label>
              <select value={manualMethod} onChange={(e) => setManualMethod(e.target.value)} required style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #444', color: '#fff', outline: 'none' }}>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
              </select>
            </div>

            <button type="submit" disabled={manualSubmitting} style={{ padding: '12px 25px', background: 'var(--royal-gold)', color: '#000', border: 'none', fontWeight: 'bold', textTransform: 'uppercase', cursor: manualSubmitting ? 'not-allowed' : 'pointer', height: '43px' }}>
              {manualSubmitting ? 'Adding...' : 'Add'}
            </button>
          </form>
        </div>

        {/* Searchable Customer List */}
        <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '2px', border: '1px solid #333' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
            <h3 style={{ color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif', fontSize: '1.5rem' }}>Active Customer Ledgers</h3>
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '10px 15px', background: '#000', border: '1px solid var(--royal-gold)', color: '#fff', outline: 'none', width: '300px' }}
            />
          </div>
          
          {loading ? <p style={{ color: '#888' }}>Loading customers...</p> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {filteredSchemes.length === 0 ? (
                <p style={{ color: '#888' }}>No customers found.</p>
              ) : filteredSchemes.map(scheme => {
                const user = scheme.custom_users;
                
                const approvedPayments = scheme.payments?.filter(p => p.status === 'approved') || [];
                const pendingPayments = scheme.payments?.filter(p => p.status === 'pending_approval') || [];
                
                const totalGold = approvedPayments.reduce((acc, curr) => acc + (Number(curr.gold_purchased) || 0), 0).toFixed(4);

                // Calculate A/C number
                const userSchemes = schemes.filter(s => s.user_id === scheme.user_id).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                const accIndex = userSchemes.findIndex(s => s.id === scheme.id) + 1;
                const accLabel = `A/C ${accIndex}`;

                return (
                  <div key={scheme.id} onClick={() => setSelectedScheme({...scheme, accIndex})} style={{ padding: '20px', background: '#000', border: '1px solid #333', borderRadius: '2px', cursor: 'pointer', transition: 'border-color 0.2s', position: 'relative' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--royal-gold)'} onMouseLeave={e => e.currentTarget.style.borderColor = '#333'}>
                    <div style={{ position: 'absolute', top: 0, right: 0, background: '#333', padding: '3px 8px', fontSize: '0.7rem', color: '#fff', fontWeight: 'bold', borderBottomLeftRadius: '2px' }}>
                      {accLabel} <span style={{ color: '#aaa', fontWeight: 'normal', marginLeft: '5px' }}>| Started: {new Date(scheme.start_date).toLocaleDateString()}</span>
                    </div>
                    <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '5px', paddingRight: '60px' }}>{user?.full_name || 'Unknown'}</h4>
                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '15px' }}>{user?.phone_number || 'No Phone'}</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <div>
                        <span style={{ color: '#666' }}>Monthly:</span>
                        <div style={{ color: 'var(--royal-gold)', fontWeight: 'bold' }}>₹{scheme.monthly_amount}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ color: '#666' }}>Total Gold:</span>
                        <div style={{ color: '#fff', fontWeight: 'bold' }}>{totalGold}g</div>
                      </div>
                    </div>
                    
                    {pendingPayments.length > 0 && (
                      <div style={{ marginTop: '15px', padding: '5px', background: 'rgba(184,146,58,0.1)', color: 'var(--royal-gold)', fontSize: '0.8rem', textAlign: 'center', border: '1px dashed var(--royal-gold)' }}>
                        {pendingPayments.length} Payment(s) Pending Approval!
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Ledger Modal (Printable) */}
      {selectedScheme && (
        <div className="no-print" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#1a1a1a', padding: '40px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', border: '1px solid var(--royal-gold)', borderRadius: '2px', position: 'relative' }}>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginBottom: '20px' }}>
              <button onClick={() => window.print()} style={{ padding: '8px 15px', background: 'var(--royal-gold)', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Print / Save PDF
              </button>
              <button onClick={() => setSelectedScheme(null)} style={{ padding: '8px 15px', background: 'transparent', color: '#888', border: '1px solid #444', cursor: 'pointer' }}>
                Close
              </button>
            </div>

            <LedgerContent 
              scheme={selectedScheme} 
              payments={selectedScheme.payments || []} 
              handleApproval={handleApproval}
              setSelectedScheme={setSelectedScheme}
            />

          </div>
        </div>
      )}

      {/* Appointment Inquiries Section */}
      <div className="no-print" style={{ maxWidth: '1200px', margin: '40px auto 0', padding: '30px', background: '#1a1a1a', borderRadius: '2px', border: '1px solid #333' }}>
        <h3 style={{ color: 'var(--royal-gold)', fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', marginBottom: '20px' }}>Book an Appointment Inquiries</h3>
        {!Array.isArray(inquiries) || inquiries.length === 0 ? (
          <p style={{ color: '#888' }}>No inquiries yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {inquiries.filter(Boolean).map((inq) => (
              <div key={inq.id || Math.random()} style={{ background: '#000', border: '1px solid #333', padding: '20px', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong style={{ color: '#fff', fontSize: '1.1rem' }}>{inq.name}</strong>
                  <span style={{ color: '#666', fontSize: '0.8rem' }}>{inq.date}</span>
                </div>
                <div style={{ color: 'var(--royal-gold)', marginBottom: '10px' }}>📞 {inq.phone}</div>
                <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '5px' }}><strong>Category:</strong> {inq.category}</div>
                {inq.message && (
                  <div style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '10px', padding: '10px', background: '#111', borderRadius: '2px' }}>
                    "{inq.message}"
                  </div>
                )}
                <button 
                  onClick={() => {
                    const newInqs = inquiries.filter(i => i.id !== inq.id);
                    localStorage.setItem('HARDIK_inquiries', JSON.stringify(newInqs));
                    setInquiries(newInqs);
                  }}
                  style={{ marginTop: '15px', background: 'transparent', color: '#dc3545', border: '1px solid #dc3545', padding: '5px 10px', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hidden Print-Only Render */}
      {selectedScheme && (
        <div className="print-only">
          <LedgerContent 
            scheme={selectedScheme} 
            payments={selectedScheme.payments || []} 
            handleApproval={() => {}}
            isPrintMode={true}
          />
        </div>
      )}
    </div>
  );
}

function LedgerContent({ scheme, payments, handleApproval, setSelectedScheme, isPrintMode = false }) {
  const user = scheme.custom_users;
  
  const startDate = new Date(scheme.start_date);
  const approvedPayments = payments.filter(p => p.status === 'approved');
  const monthsPaid = approvedPayments.length;
  
  const nextDueDate = new Date(startDate);
  nextDueDate.setMonth(nextDueDate.getMonth() + monthsPaid);
  
  const totalGold = approvedPayments.reduce((acc, curr) => acc + (Number(curr.gold_purchased) || 0), 0).toFixed(4);

  return (
    <div style={{ color: isPrintMode ? '#000' : '#fff' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: `2px solid ${isPrintMode ? '#000' : 'var(--royal-gold)'}`, paddingBottom: '20px' }}>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', margin: 0, textTransform: 'uppercase', letterSpacing: '2px', color: isPrintMode ? '#000' : 'var(--royal-gold)' }}>Hardik Jewellers</h2>
        
        {isPrintMode && (
          <div style={{ fontSize: '0.9rem', color: '#444', marginTop: '10px', lineHeight: '1.5' }}>
            <p style={{ margin: 0 }}>Opp. Old Bus Stand, Main Market, City - 123456</p>
            <p style={{ margin: 0 }}>Phone: +91 98929 11531 | Email: contact@hardikjewellers.com</p>
            <p style={{ margin: 0 }}>GSTIN: 24AAAAA0000A1Z5</p>
          </div>
        )}
        
        <p style={{ margin: '15px 0 0', fontSize: '1.2rem', letterSpacing: '5px', fontWeight: 'bold' }}>HARVEST SCHEME LEDGER {scheme.accIndex ? `- A/C ${scheme.accIndex}` : ''}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '1.1rem' }}>
        <div>
          <p style={{ margin: '0 0 5px' }}><strong>Customer Name:</strong> {user?.full_name || user?.email}</p>
          <p style={{ margin: '0 0 5px' }}><strong>Phone Number:</strong> {user?.phone_number || '-'}</p>
          <p style={{ margin: '0 0 5px' }}><strong>Scheme Start Date:</strong> {startDate.toLocaleDateString()}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: '0 0 5px' }}><strong>Monthly Amount:</strong> ₹{scheme.monthly_amount}</p>
          <p style={{ margin: '0 0 5px' }}><strong>Total Gold:</strong> {totalGold}g</p>
          {monthsPaid < 11 && (
            <p style={{ margin: '0 0 5px', color: isPrintMode ? '#000' : 'var(--royal-gold)' }}><strong>Next Due Date:</strong> {nextDueDate.toLocaleDateString()}</p>
          )}
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${isPrintMode ? '#ccc' : '#333'}` }}>
        <thead>
          <tr style={{ background: isPrintMode ? '#f5f5f5' : '#000', color: isPrintMode ? '#000' : 'var(--royal-gold)', textAlign: 'left' }}>
            <th style={{ padding: '12px', border: `1px solid ${isPrintMode ? '#ccc' : '#333'}` }}>Month</th>
            <th style={{ padding: '12px', border: `1px solid ${isPrintMode ? '#ccc' : '#333'}` }}>Date Paid</th>
            <th style={{ padding: '12px', border: `1px solid ${isPrintMode ? '#ccc' : '#333'}` }}>Amount</th>
            <th style={{ padding: '12px', border: `1px solid ${isPrintMode ? '#ccc' : '#333'}` }}>Gold Rate</th>
            <th style={{ padding: '12px', border: `1px solid ${isPrintMode ? '#ccc' : '#333'}` }}>Gold Acquired</th>
            {!isPrintMode && <th style={{ padding: '12px', border: `1px solid ${isPrintMode ? '#ccc' : '#333'}` }}>Status / Action</th>}
          </tr>
        </thead>
        <tbody>
          {[...Array(11)].map((_, i) => {
            const monthNum = i + 1;
            const payment = payments.find(p => p.month_number === monthNum);
            
            let statusText = "Unpaid";
            if (payment) {
              if (payment.status === 'approved') statusText = "Paid";
              else if (payment.status === 'pending_approval') statusText = "Pending Admin";
              else if (payment.status === 'rejected') statusText = "Rejected";
            }

            return (
              <tr key={monthNum} style={{ background: payment?.status === 'approved' ? (isPrintMode ? '#fff' : 'rgba(40,167,69,0.05)') : 'transparent' }}>
                <td style={{ padding: '12px', border: `1px solid ${isPrintMode ? '#ccc' : '#333'}` }}>Month {monthNum}</td>
                <td style={{ padding: '12px', border: `1px solid ${isPrintMode ? '#ccc' : '#333'}` }}>{payment?.payment_date ? new Date(payment.payment_date).toLocaleDateString() : '-'}</td>
                <td style={{ padding: '12px', border: `1px solid ${isPrintMode ? '#ccc' : '#333'}` }}>{payment ? `₹${payment.amount}` : '-'}</td>
                <td style={{ padding: '12px', border: `1px solid ${isPrintMode ? '#ccc' : '#333'}` }}>{payment?.gold_rate ? `₹${payment.gold_rate}/g` : '-'}</td>
                <td style={{ padding: '12px', border: `1px solid ${isPrintMode ? '#ccc' : '#333'}` }}>{payment?.gold_purchased ? `+${payment.gold_purchased}g` : '-'}</td>
                
                {!isPrintMode && (
                  <td style={{ padding: '12px', border: '1px solid #333' }}>
                    {payment?.status === 'pending_approval' ? (
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button onClick={() => { handleApproval(payment.id, 'approved'); setSelectedScheme(null); }} style={{ background: 'green', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Accept</button>
                        <button onClick={() => { handleApproval(payment.id, 'rejected'); setSelectedScheme(null); }} style={{ background: 'red', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Reject</button>
                        {payment.screenshot_url && <a href={payment.screenshot_url} target="_blank" rel="noreferrer" style={{ padding: '5px', background: '#444', color: '#fff', textDecoration: 'none' }}>View</a>}
                      </div>
                    ) : (
                      <span style={{ color: payment?.status === 'approved' ? '#28a745' : payment?.status === 'rejected' ? '#dc3545' : '#888' }}>
                        {statusText}
                      </span>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
          {/* Bonus Row */}
          <tr>
            <td style={{ padding: '12px', border: `1px solid ${isPrintMode ? '#ccc' : '#333'}`, fontWeight: 'bold' }}>Month 12 (BONUS)</td>
            <td colSpan={isPrintMode ? "4" : "5"} style={{ padding: '12px', border: `1px solid ${isPrintMode ? '#ccc' : '#333'}`, textAlign: 'center', fontWeight: 'bold', color: isPrintMode ? '#000' : 'var(--royal-gold)' }}>
              {monthsPaid >= 11 ? `BONUS UNLOCKED: ₹${scheme.monthly_amount}` : `Pending (${11 - monthsPaid} months left)`}
            </td>
          </tr>
        </tbody>
      </table>
      {isPrintMode && (
        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
          <div>_______________________<br/>Customer Signature</div>
          <div>_______________________<br/>Authorized Signatory</div>
        </div>
      )}
    </div>
  );
}
