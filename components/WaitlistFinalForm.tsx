'use client';
import { useState } from 'react';
import { CheckIcon } from './WaitlistHeroForm';

export default function WaitlistFinalForm() {
  const [email, setEmail] = useState('');
  const [chapter, setChapter] = useState('');
  const [owns, setOwns] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, chapter, ownsApparatus: owns }),
    });
    setJoined(true);
  }

  if (joined) {
    return (
      <div className="mx-auto flex h-14 max-w-[620px] items-center justify-center gap-3 rounded-lg border border-[#C9D4BE] bg-[#EFF3EA]">
        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#4A6B3A] text-[#FCFBF9]">
          <CheckIcon />
        </span>
        <span className="text-lg font-medium text-[#33492A]">You’re on the list. We’ll be in touch.</span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto flex max-w-[620px] flex-col gap-4 text-left">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        aria-label="Email address"
        className="h-14 rounded-lg border border-[#D8D1C5] bg-white px-4 text-lg"
      />
      <input
        type="text"
        value={chapter}
        onChange={(e) => setChapter(e.target.value)}
        placeholder="Your chapter (optional)"
        aria-label="Your chapter"
        className="h-14 rounded-lg border border-[#D8D1C5] bg-white px-4 text-lg"
      />
      <div className="flex items-center gap-7 px-0.5 py-1">
        <span className="text-lg font-medium">Do you own apparatus?</span>
        {['Yes', 'No'].map((opt) => (
          <label key={opt} className="flex cursor-pointer items-center gap-2.5 text-lg">
            <input
              type="radio"
              name="owns"
              checked={owns === opt}
              onChange={() => setOwns(opt)}
              className="h-[22px] w-[22px] cursor-pointer accent-[#B03A2B]"
            />
            {opt}
          </label>
        ))}
      </div>
      <button
        type="submit"
        className="h-14 rounded-lg bg-[#B03A2B] text-lg font-semibold text-[#FCFBF9] transition-colors hover:bg-[#96301F]"
      >
        Join the waitlist
      </button>
    </form>
  );
}
