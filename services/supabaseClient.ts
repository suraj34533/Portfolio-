import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance: SupabaseClient | null = null;

// Custom storage adapter that falls back to memory if localStorage fails
const safeLocalStorage = {
    getItem: (key: string): string | null => {
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    },
    setItem: (key: string, value: string): void => {
        try {
            localStorage.setItem(key, value);
        } catch {
            // Ignore write errors in strict environments
        }
    },
    removeItem: (key: string): void => {
        try {
            localStorage.removeItem(key);
        } catch {
            // Ignore errors
        }
    },
};

/**
 * Defensive Supabase client initialization.
 * 
 * fixes: "Server Error" in WhatsApp WebView
 * explanation: 
 * 1. Wraps initialization in a function to prevent top-level failures.
 * 2. Uses a safe storage adapter because WhatsApp/Instagram in-app browsers 
 *    often block access to `localStorage`, causing the default client to crash.
 * 3. Disables `detectSessionInUrl` to prevent URL parsing errors during hydration.
 */
export const getSupabase = (): SupabaseClient => {
    if (supabaseInstance) return supabaseInstance;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Supabase keys are missing! Check your .env.local file.');
        // Return a dummy client or throw, but here we throw to alert dev
        throw new Error('Supabase Configuration Missing');
    }

    try {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                storage: safeLocalStorage, // Use our safe wrapper
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: false, // Critical for WebViews to avoid redirect/url parsing issues
            },
        });
    } catch (error) {
        console.warn('Failed to initialize Supabase with persistence, falling back to memory-only mode.', error);
        // Fallback: No persistence, just fire-and-forget for the form
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false
            }
        });
    }

    return supabaseInstance;
};

// Default export for backward compatibility if helpful, but getSupabase is preferred.
export default getSupabase();
