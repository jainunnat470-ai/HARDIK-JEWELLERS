import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://xfkcnmhophacnluofauu.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma2NubWhvcGhhY25sdW9mYXV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5OTI2NzcsImV4cCI6MjEwMzU2ODY3N30.gqApRPsnJeFcOVk1XQnQiw_GSii3W1FszzfsBud4K-Y';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

webpush.setVapidDetails(
  'mailto:admin@laxmijewellers.in',
  'BEXW6qmnlL19TYxTUbLNgawyJPLEe0dWursfi25_AxGvbBRu--RSdGIFU0OMfdd5mV5yOfSF19V7B0Jdwro497Y',
  'Yxtf05ComhKSB__lTPZZxajsk9bdPJebVk6qoxdNzKM'
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { gold24k, gold22k } = req.body;
    
    // Download current subscription file from Supabase storage bucket
    const { data, error } = await supabase.storage
      .from('payment_screenshots')
      .download('push_subscriptions.json');

    if (error || !data) {
      return res.status(200).json({ success: true, sentCount: 0, message: 'No subscriptions recorded yet.' });
    }

    const fileText = await data.text();
    let subscriptions = [];
    try {
      subscriptions = JSON.parse(fileText || '[]');
    } catch (e) {
      subscriptions = [];
    }

    const { customTitle, customBody } = req.body;

    const is24kHidden = !gold24k || gold24k === 0 || gold24k === "0";
    const defaultBody = is24kHidden 
      ? `\uD83D\uDD14 Live Gold Rate Alert: 22K Gold is currently at \u20B9${gold22k}/g. Tap to view details.`
      : `\uD83D\uDD14 Live Gold Rate Alert: 24K Gold is currently at \u20B9${gold24k}/g | 22K Gold is at \u20B9${gold22k}/g. Tap to view details.`;

    const payload = JSON.stringify({
      title: customTitle || 'Laxmi Jewellers',
      body: customBody || defaultBody
    });

    const sendPromises = subscriptions.map((sub) => {
      return webpush.sendNotification(sub, payload).catch((err) => {
        console.error('Failed to notify client endpoint:', sub.endpoint, err.message);
        return null;
      });
    });

    await Promise.all(sendPromises);
    return res.status(200).json({ success: true, sentCount: subscriptions.length });
  } catch (err) {
    console.error('Push server handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
