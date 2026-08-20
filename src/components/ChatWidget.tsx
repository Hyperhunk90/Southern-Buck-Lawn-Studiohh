'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, User } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { trackEvent } from '@/lib/ga';

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
  chunks?: GroundingChunk[];
};

type GroundingChunk = {
  web?: { uri?: string; title?: string };
  maps?: { uri?: string; title?: string };
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Howdy! I'm BUCKIE, the Southern Buck Lawn Assistant. Do you have any questions about our lawn care services, property preservation, or need some landscaping advice?",
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Build history payload
      const history = messages.slice(1).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text, history }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Chat is temporarily unavailable.');
      
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: data.text,
        chunks: data.chunks
      };
      
      setMessages((prev) => [...prev, botMsg]);
      trackEvent('chat_response', { assistant: 'buckie' });
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: err instanceof Error ? err.message : 'Chat is temporarily unavailable. Please call or request a quote.',
      };
      setMessages((prev) => [...prev, errorMsg]);
      trackEvent('chat_error', { assistant: 'buckie' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(true);
          trackEvent('chat_open', { assistant: 'buckie' });
        }}
        className={`fixed bottom-24 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-safety-orange text-midnight-moss shadow-2xl transition-colors hover:bg-orange-hot ${isOpen ? 'hidden' : ''}`}
        aria-label="Open chat assistant"
      >
        <Image src="/icon.png" alt="Buckie Mascot" width={40} height={40} className="object-contain drop-shadow-md" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 flex h-[600px] max-h-[85vh] w-[400px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-primary/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-midnight-moss px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 overflow-hidden items-center justify-center rounded-full bg-safety-orange text-midnight-moss">
                  <Image src="/icon.png" alt="Buckie Mascot" width={32} height={32} className="object-contain" />
                </div>
                <div>
                  <h3 className="font-anton text-lg tracking-wider">BUCKIE</h3>
                  <p className="font-barlow text-xs text-sage">Powered by Gemini</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-light-tan p-5 font-barlow text-sm flex flex-col gap-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-end gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center overflow-hidden justify-center rounded-full ${m.role === 'user' ? 'bg-primary text-white' : 'bg-safety-orange text-midnight-moss'}`}>
                      {m.role === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Image src="/icon.png" alt="Buckie Mascot" width={24} height={24} className="object-contain" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 shadow-sm ${
                        m.role === 'user'
                          ? 'rounded-br-none bg-primary text-white'
                          : 'rounded-bl-none bg-white text-midnight-moss border border-primary/5'
                      }`}
                    >
                      <div className="markdown-body">
                        <Markdown>{m.text}</Markdown>
                      </div>
                      
                      {/* Render Grounding Links if available */}
                      {m.chunks && m.chunks.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200 text-xs">
                          <p className="font-bold text-gray-500 mb-2 uppercase tracking-wider text-[10px]">Sources:</p>
                          <ul className="flex flex-col gap-1.5">
                            {m.chunks.map((chunk, i) => {
                              if (chunk.web) {
                                return (
                                  <li key={i}>
                                    <a href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-safety-orange hover:underline truncate block">
                                      {chunk.web.title}
                                    </a>
                                  </li>
                                );
                              } else if (chunk.maps) {
                                return (
                                  <li key={i}>
                                    <a href={chunk.maps.uri} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-safety-orange hover:underline truncate block">
                                      {chunk.maps.title || 'View on Google Maps'}
                                    </a>
                                  </li>
                                );
                              }
                              return null;
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-2 max-w-[85%]">
                  <div className="flex h-8 w-8 flex-shrink-0 overflow-hidden items-center justify-center rounded-full bg-safety-orange text-midnight-moss">
                    <Image src="/icon.png" alt="Buckie Mascot" width={24} height={24} className="object-contain" />
                  </div>
                  <div className="rounded-2xl rounded-bl-none bg-white px-4 py-4 shadow-sm border border-primary/5 text-midnight-moss flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-safety-orange" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <div className="border-t border-primary/10 bg-white p-4">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={800}
                  placeholder="Ask a question..."
                  className="flex-1 rounded-xl border border-primary/20 bg-light-tan px-4 py-3 font-barlow text-sm outline-none transition-colors focus:border-safety-orange"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-safety-orange text-midnight-moss transition-colors hover:bg-orange-hot disabled:pointer-events-none disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
