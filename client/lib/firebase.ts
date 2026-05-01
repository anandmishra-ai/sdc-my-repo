// Firebase configuration
// For production, use environment variables
export const firebaseConfig = {
  apiKey: "AIzaSyB1234567890abcdefghijklmnopqrstuvwx",
  authDomain: "sdc-skill-dev.firebaseapp.com",
  projectId: "sdc-skill-dev",
  storageBucket: "sdc-skill-dev.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
};

// Admin configuration
export const ADMIN_EMAILS = ["anand@741042@gmail.com"];
export const ADMIN_PASSWORD = "sdc@sscbs@anand";

// Admin can be verified via email - in production use proper backend auth
export const verifyAdminCredentials = (email: string, password: string): boolean => {
  return email === "anand@741042@gmail.com" && password === "sdc@sscbs@anand";
};

// User roles
export enum UserRole {
  STUDENT = "student",
  ADMIN = "admin",
}
