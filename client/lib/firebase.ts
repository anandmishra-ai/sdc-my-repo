// Firebase configuration
// For production, use environment variables
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB1234567890abcdefghijklmnopqrstuvwx",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sdc-skill-dev.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sdc-skill-dev",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sdc-skill-dev.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890",
};

// Admin configuration - should be moved to backend in production
export const ADMIN_EMAILS = [import.meta.env.VITE_ADMIN_EMAIL || "anand@741042@gmail.com"];
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "sdc@sscbs@anand";

// Admin can be verified via email - in production use proper backend auth
export const verifyAdminCredentials = (email: string, password: string): boolean => {
  return email === (import.meta.env.VITE_ADMIN_EMAIL || "anand@741042@gmail.com") &&
         password === (import.meta.env.VITE_ADMIN_PASSWORD || "sdc@sscbs@anand");
};
