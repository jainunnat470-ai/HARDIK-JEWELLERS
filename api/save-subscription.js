import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://oxvoolcroplivsoocuum.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94dm9vbGNyb3BsaXZzb29jdXVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2MTQ0MzMsImV4cCI6MjEwMzE5MDQzM30.HT37vbhsjLYLsf1cCGWY5rlaTP5P9laj19jJ4qwoq5U';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { subscription } = req.body || {};
    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: 'Invalid subscription object' });
    }

    const bucketName = 'payment_screenshots';
    const fileName = 'push_subscriptions.json';

    // Download existing subscriptions
    const { data, error } = await supabase.storage.from(bucketName).download(fileName);
    let subscriptions = [];
    if (!error && data) {
      const text = await data.text();
      try {
        subscriptions = JSON.parse(text || '[]');
      } catch (e) {
        subscriptions = [];
      }
    }

    // Check if endpoint already exists
    const exists = subscriptions.some(s => s.endpoint === subscription.endpoint);
    if (!exists) {
      subscriptions.push(subscription);
      const fileBlob = Buffer.from(JSON.stringify(subscriptions, null, 2));
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, fileBlob, {
          contentType: 'application/json',
          upsert: true
        });

      if (uploadError) {
        console.error('Error uploading subscriptions to storage:', uploadError);
        return res.status(500).json({ error: uploadError.message });
      }
    }

    return res.status(200).json({ success: true, count: subscriptions.length });
  } catch (err) {
    console.error('Save subscription server error:', err);
    return res.status(500).json({ error: err.message });
  }
}
