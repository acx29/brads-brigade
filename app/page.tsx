import Image from 'next/image';
import WaitlistHeroForm from '@/components/WaitlistHeroForm';
import WaitlistFinalForm from '@/components/WaitlistFinalForm';

const steps = [
  {
    title: 'Add your trucks to your garage',
    body: 'Photos, specs, and event-ready status for every piece of apparatus you own.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B03A2B" strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  {
    title: 'Keep documents current',
    body: 'Hold-harmless forms, insurance, registration. We track expirations so you don’t have to.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B03A2B" strokeWidth="2" strokeLinecap="round">
        <rect x="5" y="3" width="14" height="18" rx="2" /><line x1="9" y1="9" x2="15" y2="9" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Register for musters in a few clicks',
    body: 'You, your truck, and how it’s getting there. No more paper packets.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B03A2B" strokeWidth="2" strokeLinecap="round">
        <rect x="4" y="5" width="16" height="16" rx="2" /><line x1="4" y1="10" x2="20" y2="10" /><line x1="9" y1="3" x2="9" y2="7" /><line x1="15" y1="3" x2="15" y2="7" />
      </svg>
    ),
  },
  {
    title: 'Track what your chapter raises for MDA',
    body: 'Season goals and friendly leaderboards, chapter by chapter.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B03A2B" strokeWidth="2" strokeLinecap="round">
        <line x1="6" y1="20" x2="6" y2="12" /><line x1="12" y1="20" x2="12" y2="6" /><line x1="18" y1="20" x2="18" y2="15" />
      </svg>
    ),
  },
];

const chapterChecks = [
  'Manage your roster of members and their apparatus',
  'See every registered truck and its document status before the muster',
  'Send reminders for expiring paperwork and open registrations',
];

function Check({ className = '' }: { className?: string }) {
  return (
    <span className={'flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full border-2 border-[#D98A6E] text-[#D98A6E] ' + className}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#DED7CA] bg-white shadow-[0_1px_3px_rgba(32,27,22,.06),0_12px_32px_rgba(32,27,22,.07)] transition-all duration-200 hover:scale-[1.025] hover:shadow-[0_16px_48px_rgba(32,27,22,.25)]">
      <div className="flex h-[42px] items-center gap-2 border-b border-[#E5DFD3] bg-[#F2EEE6] px-4">
        <span className="h-[11px] w-[11px] rounded-full bg-[#D9D2C4]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#D9D2C4]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#D9D2C4]" />
        <span className="ml-3 flex h-6 flex-1 items-center rounded-md border border-[#E5DFD3] bg-[#FCFBF9] px-3 font-mono text-[13px] text-[#9A9288]">{url}</span>
      </div>
      {children}
    </div>
  );
}

function StatusChip({ tone, children }: { tone: 'green' | 'amber' | 'plain'; children: React.ReactNode }) {
  const styles = {
    green: 'text-[#33492A] bg-[#EFF3EA] border-[#C9D4BE]',
    amber: 'text-[#9A6B1F] bg-[#F7F0DF] border-[#E3D3AC]',
    plain: 'text-[#57514A] border-[#C9C1B2]',
  }[tone];
  return <span className={'inline-block rounded-full border px-2.5 py-1 text-center text-[11px] font-semibold ' + styles}>{children}</span>;
}

function DashboardMock() {
  return (
    <div className="flex h-[300px] bg-[#FCFBF9] text-left lg:h-[400px]">
      <div className="hidden w-[158px] flex-shrink-0 border-r border-[#E5DFD3] bg-[#F6F3EC] py-4 sm:block">
        <div className="px-4 pb-3.5 font-serif text-base">Brad{'’'}s Brigade</div>
        <div className="border-r-2 border-[#B03A2B] bg-[#FCFBF9] px-4 py-2 text-[13px] font-semibold text-[#B03A2B]">Overview</div>
        {['My Garage', 'Musters', 'Documents', 'My Chapter'].map((i) => (
          <div key={i} className="px-4 py-2 text-[13px] text-[#57514A]">{i}</div>
        ))}
      </div>
      <div className="min-w-0 flex-1 p-4 lg:px-5">
        <div className="mb-3.5 font-serif text-[21px]">Good morning, Walt</div>
        <div className="mb-4 grid grid-cols-3 gap-2.5">
          <div className="rounded-lg border border-[#E5DFD3] bg-[#F6F3EC] p-3">
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#7A7268]">Next muster</div>
            <div className="text-sm font-semibold">Hudson Valley</div>
            <div className="text-xs text-[#57514A]">June 14 &middot; Registered</div>
          </div>
          <div className="rounded-lg border border-[#E5DFD3] bg-[#F6F3EC] p-3">
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#7A7268]">Documents</div>
            <div className="text-sm font-semibold text-[#9A6B1F]">1 expiring soon</div>
            <div className="text-xs text-[#57514A]">Insurance &middot; 30 days</div>
          </div>
          <div className="rounded-lg border border-[#E5DFD3] bg-[#F6F3EC] p-3">
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#7A7268]">Chapter MDA total</div>
            <div className="text-sm font-semibold text-[#B03A2B]">$4,850 / $6,000</div>
            <div className="mt-2 h-[5px] rounded bg-[#E5DFD3]"><div className="h-[5px] w-[81%] rounded bg-[#B03A2B]" /></div>
          </div>
        </div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#7A7268]">Upcoming musters</div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between rounded-lg border border-[#E5DFD3] bg-white px-3 py-2.5">
            <div>
              <div className="text-[13px] font-semibold">Hudson Valley Antique Muster</div>
              <div className="text-xs text-[#7A7268]">June 14 &middot; Kingston, NY</div>
            </div>
            <StatusChip tone="green">Registered</StatusChip>
          </div>
          <div className="hidden items-center justify-between rounded-lg border border-[#E5DFD3] bg-white px-3 py-2.5 lg:flex">
            <div>
              <div className="text-[13px] font-semibold">Great Lakes Summer Muster</div>
              <div className="text-xs text-[#7A7268]">July 19 &middot; Erie, PA</div>
            </div>
            <StatusChip tone="plain">Open</StatusChip>
          </div>
        </div>
      </div>
    </div>
  );
}

function GarageMock() {
  return (
    <div className="h-[300px] bg-[#FCFBF9] p-4 text-left lg:h-[400px] lg:px-5">
      <div className="mb-3.5 flex items-center justify-between">
        <div className="font-serif text-[21px]">My Garage</div>
        <span className="rounded-md bg-[#B03A2B] px-3.5 py-2 text-[13px] font-semibold text-[#FCFBF9]">Add a truck</span>
      </div>
      <div className="grid grid-cols-2 gap-3.5">
        <div className="overflow-hidden rounded-[10px] border border-[#E5DFD3] bg-white">
          <Image src="/images/garage-ford.jpg" alt="Red Ford pumper" width={600} height={400} className="h-[110px] w-full object-cover lg:h-[150px]" />
          <div className="p-3 lg:px-3.5">
            <div className="text-sm font-semibold">1950s Ford pumper</div>
            <div className="mb-2 mt-0.5 text-xs text-[#7A7268]">Pumper &middot; Engine No. 5</div>
            <StatusChip tone="green">Event ready</StatusChip>
          </div>
        </div>
        <div className="overflow-hidden rounded-[10px] border border-[#E5DFD3] bg-white">
          <Image src="/images/garage-mack.jpg" alt="Mack pumper in a field" width={600} height={400} className="h-[110px] w-full object-cover lg:h-[150px]" />
          <div className="p-3 lg:px-3.5">
            <div className="text-sm font-semibold">1960s Mack pumper</div>
            <div className="mb-2 mt-0.5 text-xs text-[#7A7268]">Pumper &middot; Engine No. 3</div>
            <StatusChip tone="amber">Insurance expires soon</StatusChip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      {/* Nav */}
      <nav className="border-b border-[#ECE7DE] bg-[#FCFBF9]">
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 lg:h-20 lg:px-16">
          <span className="font-serif text-[25px] tracking-tight lg:text-[28px]">Brad’s Brigade</span>
          <div className="flex items-center gap-9">
            <a href="#how" className="hidden text-[17px] font-medium transition-colors hover:text-[#B03A2B] lg:block">How it works</a>
            <a href="#mission" className="hidden text-[17px] font-medium transition-colors hover:text-[#B03A2B] lg:block">Mission</a>
            <a href="#chapters" className="hidden text-[17px] font-medium transition-colors hover:text-[#B03A2B] lg:block">For chapters</a>
            <a href="#join" className="rounded-lg bg-[#B03A2B] px-4 py-3 text-base font-semibold text-[#FCFBF9] transition-colors hover:bg-[#96301F] lg:px-5 lg:py-3.5 lg:text-[17px]">
              Join the waitlist
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-11 lg:grid-cols-[1.02fr_1fr] lg:gap-[72px] lg:px-16 lg:py-[88px]">
        <div>
          <h1 className="mb-4 font-serif text-[38px] leading-[1.18] tracking-tight lg:mb-6 lg:text-[62px] lg:leading-[1.12]" style={{ textWrap: 'pretty' }}>
            The home base for firetruck musters.{' '}
            <span className="transition-colors duration-150 hover:text-[#B03A2B]">Inspiring the next generation of firefighters.</span>
          </h1>
          <p className="mb-6 max-w-[56ch] text-lg leading-relaxed text-[#57514A] lg:mb-9 lg:text-xl" style={{ textWrap: 'pretty' }}>
            Brad’s Brigade brings firetruck enthusiasts, muster organizers, and chapter officers together in one
            place, raising awareness and money for the Muscular Dystrophy Association.
          </p>
          <WaitlistHeroForm />
        </div>
        <figure className="order-first lg:order-none">
          <Image
            src="/images/hero.jpg" alt="Restored pumper at a muster" width={1600} height={1067} priority
            className="h-[230px] w-full rounded-xl border border-[#E3DCD1] object-cover transition-all duration-200 hover:scale-[1.025] hover:shadow-[0_16px_48px_rgba(32,27,22,.25)] lg:h-[470px]"
          />
          <figcaption className="mt-3 text-base text-[#7A7268]">Every truck has a story. Yours belongs in the Brigade.</figcaption>
        </figure>
      </header>

      {/* How it works */}
      <section id="how" className="border-t border-[#ECE7DE]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 lg:px-16 lg:py-24">
          <div className="mb-3 text-base font-semibold uppercase tracking-[0.12em] text-[#B03A2B] lg:mb-4">How it works</div>
          <h2 className="mb-8 font-serif text-[32px] tracking-tight lg:mb-14 lg:text-5xl">Everything for the season, in one place</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-11">
            {steps.map((s) => (
              <div key={s.title}>
                <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[10px] bg-[#F4EFE6]">{s.icon}</div>
                <h3 className="mb-2.5 text-[19px] font-semibold leading-[1.3] lg:min-h-[55px] lg:text-[21px]">{s.title}</h3>
                <p className="text-[17px] leading-relaxed text-[#57514A] lg:text-lg" style={{ textWrap: 'pretty' }}>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-5 rounded-xl border border-[#E3DCD1] bg-[#F4EFE6] p-6 lg:mt-14 lg:flex-row lg:items-center lg:gap-7 lg:px-10 lg:py-9">
            <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-[10px] border border-[#E3DCD1] bg-[#FCFBF9]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B03A2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v12" /><path d="M8 11l4 4 4-4" /><path d="M4 19h16" />
              </svg>
            </div>
            <div>
              <h3 className="mb-2 text-[19px] font-semibold lg:text-[22px]">Upload your paperwork once. We handle the rest.</h3>
              <p className="max-w-[80ch] text-[17px] leading-relaxed text-[#57514A] lg:text-lg" style={{ textWrap: 'pretty' }}>
                No more sending hold-harmless forms, insurance, and registrations across different inboxes. Your
                documents live in one place, and every event you register for sees the same current copy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product preview */}
      <section className="border-t border-[#ECE7DE] bg-[#F6F3EC]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 lg:px-16 lg:py-24">
          <h2 className="mb-3 font-serif text-4xl tracking-tight lg:mb-5 lg:text-[56px]">Built with simplicity in mind</h2>
          <p className="mb-8 max-w-[64ch] text-lg leading-relaxed text-[#57514A] lg:mb-14 lg:text-xl">
            Add a truck, upload a form, or register for a muster in minutes.
          </p>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <BrowserFrame url="bradsbrigade.com/dashboard"><DashboardMock /></BrowserFrame>
              <p className="mt-4 text-[17px] text-[#57514A] lg:text-lg">Musters coming up, documents expiring, and your chapter’s MDA total, at a glance.</p>
            </div>
            <div>
              <BrowserFrame url="bradsbrigade.com/garage"><GarageMock /></BrowserFrame>
              <p className="mt-4 text-[17px] text-[#57514A] lg:text-lg">Every truck you own: photos, specs, and whether it’s ready for the next event.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="border-t border-[#ECE7DE]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 lg:grid-cols-[1.15fr_1fr] lg:gap-[72px] lg:px-16 lg:py-24">
          <div>
            <div className="mb-3 text-base font-semibold uppercase tracking-[0.12em] text-[#B03A2B] lg:mb-4">Mission</div>
            <h2 className="mb-5 font-serif text-[32px] tracking-tight lg:mb-6 lg:text-5xl" style={{ textWrap: 'pretty' }}>
              The fire service and MDA go back to the 1950s
            </h2>
            <div className="flex flex-col gap-5 text-lg leading-[1.65] text-[#3D3830] lg:text-[19px]" style={{ textWrap: 'pretty' }}>
              <p>
                Firefighters have stood beside families facing muscular dystrophy for more than seventy years, raising
                money at stations, parades, and county fairs across the country. It’s one of the longest-running
                traditions in the fire service.
              </p>
              <p>Musters can carry that tradition forward. Bringing out apparatus for the public can help raise awareness and create change.</p>
              <p>
                Brad’s Brigade gives every chapter a simple way to set a goal for the season, count what its musters
                raise for MDA, and watch the total grow together, in one place.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:gap-5">
            {[
              ['50', 'SPAAMFAA chapters'],
              ['XX', 'Trucks in members\u2019 garages'],
              ['$XX', 'Raised for MDA'],
            ].map(([n, label]) => (
              <div key={label} className="rounded-xl border border-[#E3DCD1] bg-white px-7 py-6 lg:px-8 lg:py-7">
                <div className="font-serif text-4xl leading-none text-[#B03A2B] lg:text-[44px]">{n}</div>
                <div className="mt-2 text-lg font-medium">{label}</div>
              </div>
            ))}
            <p className="text-base text-[#7A7268]">Placeholder figures for illustration. Live totals will appear at launch.</p>
          </div>
        </div>
      </section>

      {/* For chapters */}
      <section id="chapters" className="bg-[#24201B] text-[#F4EFE7]">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-16 lg:py-24">
          <div>
            <div className="mb-3 text-base font-semibold uppercase tracking-[0.12em] text-[#D98A6E] lg:mb-4">For chapters</div>
            <h2 className="mb-5 font-serif text-[32px] tracking-tight lg:mb-6 lg:text-5xl">Run your chapter’s season without the paperwork chase</h2>
            <p className="mb-7 max-w-[64ch] text-lg leading-[1.65] text-[#C9C1B4] lg:mb-9 lg:text-[19px]" style={{ textWrap: 'pretty' }}>
              Chapter officers get a view built for them: manage your roster, see every registered truck and its
              document status before the muster, and send reminders when something’s about to expire.
            </p>
            <div className="mb-9 flex flex-col gap-4 lg:mb-11 lg:gap-[18px]">
              {chapterChecks.map((c) => (
                <div key={c} className="flex items-center gap-3.5">
                  <Check />
                  <span className="text-lg text-[#E8E1D5]">{c}</span>
                </div>
              ))}
            </div>
            <a
              href="mailto:hello@bradsbrigade.com"
              className="inline-flex items-center rounded-lg border-2 border-[#F4EFE7] px-6 py-3.5 text-lg font-semibold text-[#F4EFE7] transition-colors hover:bg-[#F4EFE7] hover:text-[#24201B]"
            >
              Talk to us about your chapter
            </a>
          </div>
          <Image
            src="/images/chapters.jpg" alt="Chapter apparatus in evening light" width={1600} height={1067}
            className="h-[260px] w-full rounded-xl object-cover object-[center_40%] transition-all duration-200 hover:scale-[1.025] hover:shadow-[0_16px_48px_rgba(0,0,0,.45)] lg:h-[460px]"
          />
        </div>
      </section>

      {/* Final CTA */}
      <section id="join" className="bg-[#F6F3EC]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 text-center lg:px-16 lg:py-[104px]">
          <h2 className="mb-4 font-serif text-[32px] tracking-tight lg:text-5xl">Be first in line when your chapter goes live</h2>
          <p className="mb-7 text-lg text-[#57514A] lg:mb-11 lg:text-[19px]">We’ll send an email once it’s ready.</p>
          <WaitlistFinalForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ECE7DE] bg-[#FCFBF9]">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-5 py-10 lg:flex-row lg:items-start lg:gap-10 lg:px-16 lg:py-14">
          <div>
            <div className="mb-3.5 font-serif text-[25px]">Brad’s Brigade</div>
            <p className="max-w-[52ch] text-[17px] text-[#57514A]">
              Built for the SPAAMFAA community. Proceeds benefit the Muscular Dystrophy Association.
            </p>
          </div>
          <div className="flex gap-7 lg:pt-1.5">
            <a href="#" className="text-[17px] text-[#57514A] transition-colors hover:text-[#B03A2B]">Privacy</a>
            <a href="mailto:hello@bradsbrigade.com" className="text-[17px] text-[#57514A] transition-colors hover:text-[#B03A2B]">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
