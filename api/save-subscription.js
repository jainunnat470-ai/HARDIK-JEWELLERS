import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://acdgcflrpscatbqrkget.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZGdjZmxycHNjYXRicXJrZ2V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1NDQwNjcsImV4cCI6MjEwNTEyMDA2N30.ea07qYlZy4amiC5rEeJH7i58wLuq1zrPsDOiqOY4jyU';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { subscription } = req.body || {};
    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: 'Invalid subscription object' });
    }

    const bucketName = 'payment_screenshots';
    const fileName = 'push_subscriptions.json';

    let subscriptions = [];
    const { data, error } = await supabase.storage.from(bucketName).download(fileName);
    if (!error && data) {
      try {
        const text = await data.text();
        subscriptions = JSON.parse(text || '[]');
      } catch (e) {
        subscriptions = [];
      }
    }

    const subStr = JSON.stringify(subscription);
    const exists = subscriptions.some(s => JSON.stringify(s) === subStr || s.endpoint === subscription.endpoint);

    if (!exists) {
      subscriptions.push(subscription);
      const jsonBuffer = Buffer.from(JSON.stringify(subscriptions, null, 2), 'utf-8');
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, jsonBuffer, { contentType: 'application/json', upsert: true });

      if (uploadError) {
        console.error('Failed to upload push subscriptions:', uploadError);
        return res.status(500).json({ error: uploadError.message });
      }
    }

    return res.status(200).json({ success: true, count: subscriptions.length });
  } catch (err) {
    console.error('Save subscription handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
