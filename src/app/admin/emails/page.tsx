'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logout, getAccessToken } from '@/lib/auth';
import { Mail, RefreshCw, Send, Loader2, LogOut } from 'lucide-react';

export default function EmailDashboard() {
  const [needsAuth, setNeedsAuth] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setNeedsAuth(false);
        setUser(user);
        setToken(token);
        fetchEmails(token);
      },
      () => {
        setNeedsAuth(true);
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
        fetchEmails(result.accessToken);
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setNeedsAuth(true);
    setUser(null);
    setToken(null);
    setEmails([]);
  };

  const fetchEmails = async (accessToken: string | null = token) => {
    if (!accessToken) return;
    setLoading(true);
    setError(null);
    try {
      // Get list of messages
      const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();
      
      if (!data.messages) {
        setEmails([]);
        return;
      }

      // Fetch details for each message
      const detailedMessages = await Promise.all(
        data.messages.map(async (msg: any) => {
          const detailRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          return await detailRes.json();
        })
      );

      setEmails(detailedMessages);
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch emails.');
    } finally {
      setLoading(false);
    }
  };

  const getHeader = (headers: any[], name: string) => {
    return headers?.find((h: any) => h.name === name)?.value || 'Unknown';
  };

  return (
    <div className="flex min-h-screen flex-col bg-light-tan">
      <main className="flex-grow pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-anton text-4xl uppercase tracking-wide text-midnight-moss flex items-center gap-3">
              <Mail className="h-8 w-8 text-safety-orange" /> Gmail Dashboard
            </h1>
            <p className="mt-2 font-barlow text-gray-700">Manage your business emails directly from the app.</p>
          </div>
          {!needsAuth && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 font-barlow font-semibold text-gray-700 hover:bg-gray-300 transition-colors"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-red-700 font-barlow">
            {error}
          </div>
        )}

        {needsAuth ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm border border-primary/10">
            <Mail className="h-16 w-16 text-primary/20 mb-6" />
            <h2 className="mb-4 font-anton text-2xl uppercase tracking-wide text-midnight-moss">Sign In Required</h2>
            <p className="mb-8 font-barlow text-lg text-gray-600 max-w-md mx-auto">
              You need to authenticate with Google to access your Gmail inbox and send emails from this dashboard.
            </p>
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="gsi-material-button flex items-center gap-3 rounded bg-white border border-gray-300 px-4 py-2 shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {isLoggingIn ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
              ) : (
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              )}
              <span className="font-roboto text-sm font-medium text-gray-700">Sign in with Google</span>
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* INBOX */}
            <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-primary/10">
              <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="font-anton text-2xl uppercase tracking-wide text-midnight-moss">Recent Emails</h2>
                <button
                  onClick={() => fetchEmails()}
                  disabled={loading}
                  className="flex items-center gap-2 text-safety-orange hover:text-orange-hot disabled:opacity-50 transition-colors"
                >
                  <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {loading && emails.length === 0 ? (
                <div className="flex h-40 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-safety-orange" />
                </div>
              ) : emails.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {emails.map((email) => (
                    <div key={email.id} className="py-4 hover:bg-gray-50 px-2 rounded transition-colors group cursor-pointer">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-barlow font-bold text-midnight-moss truncate pr-4">
                          {getHeader(email.payload.headers, 'From').replace(/"/g, '')}
                        </span>
                        <span className="font-barlow text-sm text-gray-500 whitespace-nowrap">
                          {new Date(getHeader(email.payload.headers, 'Date')).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <p className="font-barlow text-gray-700 line-clamp-1">
                        {getHeader(email.payload.headers, 'Subject') || '(No Subject)'}
                      </p>
                      <p className="font-barlow text-sm text-gray-500 mt-1 line-clamp-1">
                        {email.snippet}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 font-barlow text-gray-500">
                  No recent emails found.
                </div>
              )}
            </div>

            {/* SEND EMAIL */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-primary/10 h-fit">
              <h2 className="mb-6 font-anton text-2xl uppercase tracking-wide text-midnight-moss border-b border-gray-100 pb-4">Compose</h2>
              <ComposeEmailForm accessToken={token!} onSent={() => fetchEmails()} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ComposeEmailForm({ accessToken, onSent }: { accessToken: string; onSent: () => void }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !subject || !body) return;

    // Must confirm destructive/mutating action
    if (!window.confirm(`Send this email to ${to}?`)) return;

    setSending(true);
    try {
      const emailContent = [
        `To: ${to}`,
        `Subject: ${subject}`,
        'Content-Type: text/plain; charset=utf-8',
        '',
        body
      ].join('\r\n');

      // Encode base64url
      const encodedEmail = btoa(unescape(encodeURIComponent(emailContent)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ raw: encodedEmail }),
      });

      if (!res.ok) {
        throw new Error('Failed to send email');
      }

      alert('Email sent successfully!');
      setTo('');
      setSubject('');
      setBody('');
      onSent();
    } catch (err) {
      console.error(err);
      alert('Failed to send email.');
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSend} className="space-y-4">
      <div className="space-y-1">
        <label className="font-barlow text-sm font-bold uppercase tracking-wider text-midnight-moss">To</label>
        <input 
          type="email" 
          required 
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full rounded-lg border-2 border-primary/10 bg-white p-3 font-barlow text-sm outline-none transition-colors focus:border-safety-orange"
          placeholder="client@example.com"
        />
      </div>
      <div className="space-y-1">
        <label className="font-barlow text-sm font-bold uppercase tracking-wider text-midnight-moss">Subject</label>
        <input 
          type="text" 
          required 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-lg border-2 border-primary/10 bg-white p-3 font-barlow text-sm outline-none transition-colors focus:border-safety-orange"
          placeholder="Work Order Update"
        />
      </div>
      <div className="space-y-1">
        <label className="font-barlow text-sm font-bold uppercase tracking-wider text-midnight-moss">Message</label>
        <textarea 
          required 
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full rounded-lg border-2 border-primary/10 bg-white p-3 font-barlow text-sm outline-none transition-colors focus:border-safety-orange resize-none"
          placeholder="Type your message here..."
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-safety-orange py-3 font-anton text-lg uppercase tracking-wider text-midnight-moss transition-colors hover:bg-orange-hot disabled:opacity-50"
      >
        {sending ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> Sending...</>
        ) : (
          <><Send className="h-5 w-5" /> Send Email</>
        )}
      </button>
    </form>
  );
}
