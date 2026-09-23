import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { supabase } from './lib/supabase'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Helper utility to convert VAPID public key string into Uint8Array format
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Function to upload new background push subscription objects to Supabase storage
async function saveSubscriptionToStorage(subscription) {
  const bucketName = 'payment_screenshots';
  const fileName = 'push_subscriptions.json';
  
  try {
    const { data, error } = await supabase.storage.from(bucketName).download(fileName);
    let subscriptions = [];
    if (!error && data) {
      const text = await data.text();
      try {
        subscriptions = JSON.parse(text);
      } catch (e) {
        subscriptions = [];
      }
    }
    
    const subStr = JSON.stringify(subscription);
    const exists = subscriptions.some(s => JSON.stringify(s) === subStr || s.endpoint === subscription.endpoint);
    
    if (!exists) {
      subscriptions.push(subscription);
      const fileBlob = new Blob([JSON.stringify(subscriptions)], { type: 'application/json' });
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, fileBlob, { upsert: true });
      
      if (uploadError) {
        console.error('Failed to sync push subscription details:', uploadError.message);
      } else {
        console.log('Background push subscription details synced to Supabase storage.');
      }
    } else {
      console.log('Push subscription details already synced.');
    }
  } catch (err) {
    console.error('Error handling background push synchronization:', err);
  }
}

// Register PWA Service Worker (with active Push/Notification API integration)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('PWA Service Worker registered successfully', reg);
        
        // Request Notification permissions
        if ('Notification' in window) {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              console.log('Notification permission granted.');
              if ('PushManager' in window && reg.pushManager) {
                const applicationServerKey = urlB64ToUint8Array('BEXW6qmnlL19TYxTUbLNgawyJPLEe0dWursfi25_AxGvbBRu--RSdGIFU0OMfdd5mV5yOfSF19V7B0Jdwro497Y');
                reg.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: applicationServerKey
                }).then((subscription) => {
                  console.log('Client subscribed to push notification engine:', subscription);
                  saveSubscriptionToStorage(subscription);
                }).catch((err) => {
                  console.warn('Push manager subscription failed:', err.message);
                });
              }
            }
          });
        }
      })
      .catch((err) => console.error('PWA Service Worker registration failed', err));
  });
}
