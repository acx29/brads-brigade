import { getSupabaseAdmin } from '@/lib/supabase';
import { sendWaitlistConfirmation } from '@/lib/email';

// Shape check only: one "@", no whitespace, a dot in the domain part.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_CHAPTER_LENGTH = 120;

// Both forms POST this shape. The hero form sends only `email`; the final form
// sends all three, with `ownsApparatus` as 'Yes' | 'No' | null.
type WaitlistBody = {
  email?: unknown;
  chapter?: unknown;
  ownsApparatus?: unknown;
};

export async function POST(req: Request) {
  let body: WaitlistBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: 'Invalid email address' }, { status: 400 });
  }

  const chapter =
    typeof body.chapter === 'string' && body.chapter.trim().length > 0
      ? body.chapter.trim().slice(0, MAX_CHAPTER_LENGTH)
      : null;

  const ownsApparatus =
    body.ownsApparatus === 'Yes' ? true : body.ownsApparatus === 'No' ? false : null;

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (err) {
    console.error('waitlist: Supabase client not configured', err);
    return Response.json({ ok: false, error: 'Signup is not configured' }, { status: 500 });
  }

  const { error: insertError } = await supabase
    .from('waitlist')
    .insert({ email, chapter, owns_apparatus: ownsApparatus });

  if (insertError) {
    // Postgres 23505 = unique_violation: this email is already on the list.
    // Treat as success so the form shows its normal confirmation, merge in any
    // new details (a hero-form signup later completed via the final form), and
    // do not send a second confirmation email.
    if (insertError.code === '23505') {
      const patch: { chapter?: string; owns_apparatus?: boolean } = {};
      if (chapter !== null) patch.chapter = chapter;
      if (ownsApparatus !== null) patch.owns_apparatus = ownsApparatus;

      if (Object.keys(patch).length > 0) {
        const { error: updateError } = await supabase.from('waitlist').update(patch).eq('email', email);
        if (updateError) console.error('waitlist: update of existing signup failed', updateError);
      }
      return Response.json({ ok: true, duplicate: true });
    }

    console.error('waitlist: insert failed', insertError);
    return Response.json({ ok: false, error: 'Could not save signup' }, { status: 500 });
  }

  // The row is saved at this point. An email failure is logged but does not
  // turn a successful signup into an error for the visitor.
  try {
    await sendWaitlistConfirmation(email);
  } catch (err) {
    console.error('waitlist: confirmation email failed', err);
  }

  return Response.json({ ok: true });
}
