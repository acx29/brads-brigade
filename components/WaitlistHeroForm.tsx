'use client';
import { useState } from 'react';

export default function WaitlistHeroForm() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setJoined(true);
  }

  if (joined) {
    return (
      <div className="flex h-14 max-w-[560px] items-center gap-3 rounded-lg border border-[#C9D4BE] bg-[#EFF3EA] px-4">
        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#4A6B3A] text-[#FCFBF9]">
          <CheckIcon />
        </span>
        <span className="text-lg font-medium text-[#33492A]">You’re on the list. We’ll be in touch.</span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex max-w-[560px] flex-col gap-3 lg:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email address"
        className="h-14 flex-1 rounded-lg border border-[#D8D1C5] bg-white px-4 text-lg"
      />
      <button
        type="submit"
        className="h-14 whitespace-nowrap rounded-lg bg-[#B03A2B] px-6 text-lg font-semibold text-[#FCFBF9] transition-colors hover:bg-[#96301F]"
      >
        Join the waitlist
      </button>
    </form>
  );
}

export function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
