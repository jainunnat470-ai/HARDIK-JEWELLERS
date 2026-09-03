import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://oxvoolcroplivsoocuum.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94dm9vbGNyb3BsaXZzb29jdXVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2MTQ0MzMsImV4cCI6MjEwMzE5MDQzM30.HT37vbhsjLYLsf1cCGWY5rlaTP5P9laj19jJ4qwoq5U';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

webpush.setVapidDetails(
  'mailto:admin@hardikjewellers.in',
  'BEXW6qmnlL19TYxTUbLNgawyJPLEe0dWursfi25_AxGvbBRu--RSdGIFU0OMfdd5mV5yOfSF19V7B0Jdwro497Y',
  'Yxtf05ComhKSB__lTPZZxajsk9bdPJebVk6qoxdNzKM'
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { gold22k, gold18k, silver, customTitle, customBody } = req.body || {};

    // Download subscriptions from Supabase storage
    const { data, error } = await supabase.storage
      .from('payment_screenshots')
      .download('push_subscriptions.json');

    if (error || !data) {
      return res.status(200).json({ success: true, sentCount: 0, message: 'No subscriptions yet.' });
    }

    const fileText = await data.text();
    let subscriptions = [];
    try {
      subscriptions = JSON.parse(fileText || '[]');
    } catch (e) {
      subscriptions = [];
    }

    // Build default rate message - show only 22K and Silver
    let defaultBody;
    if (gold22k) {
      defaultBody = `\uD83D\uDD14 Today's Gold Rate: 22K = \u20B9${gold22k}/g`;
      if (silver) defaultBody += ` | Silver = \u20B9${silver}/g`;
      defaultBody += `. Tap to view latest rates.`;
    } else {
      defaultBody = `\uD83D\uDD14 New update from Hardik Jewellers! Check today's gold rates.`;
    }

    const payload = JSON.stringify({
      title: customTitle || 'Hardik Jewellers',
      body: customBody || defaultBody
    });

    let sent = 0;
    await Promise.allSettled(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(sub, payload);
          sent++;
        } catch (err) {
          console.error('Push failed for:', sub.endpoint, err.message);
        }
      })
    );

    return res.status(200).json({ success: true, sentCount: sent, total: subscriptions.length });
  } catch (err) {
    console.error('Push handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
