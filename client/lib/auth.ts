import { ADMIN_EMAILS, verifyAdminCredentials } from "./firebase";

export enum UserRole {
  STUDENT = "student",
  ADMIN = "admin",
}

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  role: UserRole;
  joinDate: string;
  lastLogin: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: number;
}

const SESSION_KEY = "sdcAuthSession";
const SESSION_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Create a session for the user
 */
export const createSession = (user: Omit<User, "lastLogin">, token: string): AuthSession => {
  const session: AuthSession = {
    user: {
      ...user,
      lastLogin: new Date().toISOString(),
    },
    token,
    expiresAt: Date.now() + SESSION_EXPIRY,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

/**
 * Get the current session
 */
export const getSession = (): AuthSession | null => {
  const sessionStr = localStorage.getItem(SESSION_KEY);
  if (!sessionStr) return null;

  try {
    const session: AuthSession = JSON.parse(sessionStr);
    
    // Check if session has expired
    if (session.expiresAt < Date.now()) {
      clearSession();
      return null;
    }

    return session;
  } catch {
    clearSession();
    return null;
  }
};

/**
 * Clear the session
 */
export const clearSession = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getSession() !== null;
};

/**
 * Check if user is admin
 */
export const isAdmin = (): boolean => {
  const session = getSession();
  return session?.user.role === UserRole.ADMIN;
};

/**
 * Get current user
 */
export const getCurrentUser = (): User | null => {
  const session = getSession();
  return session?.user || null;
};

/**
 * Determine user role based on email
 */
export const getUserRole = (email: string): UserRole => {
  return ADMIN_EMAILS.includes(email) ? UserRole.ADMIN : UserRole.STUDENT;
};

/**
 * Verify admin login with email and password
 */
export const verifyAdminLogin = (email: string, password: string): boolean => {
  if (!ADMIN_EMAILS.includes(email)) return false;
  return verifyAdminCredentials(email, password);
};

/**
 * Simulate Gmail OAuth login (in production, use Firebase)
 */
export const loginWithGmail = async (email: string, name: string, picture?: string): Promise<User> => {
  const role = getUserRole(email);
  const user: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email,
    name,
    picture,
    role,
    joinDate: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };

  // Simulate token generation (in production, use real tokens)
  const token = btoa(`${email}:${user.id}:${Date.now()}`);
  
  createSession(user, token);
  return user;
};

/**
 * Simulate admin login
 */
export const loginAdmin = (email: string, password: string): User | null => {
  if (!verifyAdminLogin(email, password)) {
    return null;
  }

  const user: User = {
    id: `admin_${Date.now()}`,
    email,
    name: "SDC Admin",
    role: UserRole.ADMIN,
    joinDate: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };

  const token = btoa(`${email}:${user.id}:${Date.now()}:admin`);
  createSession(user, token);
  return user;
};
