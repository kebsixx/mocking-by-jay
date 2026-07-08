import { useState, useEffect, useRef } from "react";

/* ───────────────────────────────────────────
   ScrollReveal — IntersectionObserver hook
   ─────────────────────────────────────────── */
function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ───────────────────────────────────────────
   ScrollReveal wrapper component
   ─────────────────────────────────────────── */
function Reveal({ children, className = "", delay = 0, threshold }) {
  const [ref, visible] = useScrollReveal(threshold);
  return (
    <div
      ref={ref}
      className={`transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ───────────────────────────────────────────
   Navbar — floating glass pill
   ─────────────────────────────────────────── */
function Navbar({ onOpenBooking }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "About", href: "#about" },
    { label: "Artists", href: "#artists" },
    { label: "Studio", href: "#studio" },
    { label: "Music", href: "#music" },
  ];

  const handleBookClick = () => {
    setMenuOpen(false);
    onOpenBooking?.();
  };

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-4 w-[calc(100%-32px)] max-w-3xl">
      <div className="flex items-center justify-between px-5 py-3 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <a
          href="#"
          className="text-sm font-semibold tracking-tight text-white/90 select-none">
          Mocking<span className="text-red-accent">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-xs font-medium text-muted rounded-full transition-all duration-300 hover:text-white hover:bg-white/5">
              {link.label}
            </a>
          ))}
          <button
            onClick={handleBookClick}
            className="ml-1 px-4 py-1.5 text-xs font-medium bg-red-accent text-white rounded-full transition-all duration-300 hover:bg-red-deep active:scale-[0.97]">
            Book
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1 p-2"
          aria-label="Toggle menu">
          <span
            className={`block w-5 h-[1.5px] bg-muted transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[5.5px]" : ""}`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-muted transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-muted transition-all duration-300 ${menuOpen ? "-rotate-45 translate-y-[-5.5px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 top-0 z-[-1] flex flex-col items-center justify-center gap-6 bg-ink/90 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}>
        {[...links, { label: "Book", href: "#book", highlight: true }].map(
          (link, i) =>
            link.highlight ? (
              <button
                key={link.label}
                onClick={() => {
                  setMenuOpen(false);
                  onOpenBooking?.();
                }}
                className={`text-lg font-medium text-red-accent transition-all duration-500 ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${150 + i * 80}ms` }}>
                {link.label}
              </button>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-lg font-medium text-white/80 hover:text-white transition-all duration-500 ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${150 + i * 80}ms` }}>
                {link.label}
              </a>
            ),
        )}
      </div>
    </nav>
  );
}

/* ───────────────────────────────────────────
   Hero
   ─────────────────────────────────────────── */
function Hero({ onOpenBooking }) {
  const [ref, visible] = useScrollReveal(0.01);
  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-dvh flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-red-accent/5 blur-[120px] pointer-events-none" />
      <div
        className={`relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible
            ? "translate-y-0 opacity-100 blur-0"
            : "translate-y-12 opacity-0 blur-[2px]"
        }`}>
        <span className="inline-block px-3 py-1 mb-6 text-[10px] font-medium tracking-[0.2em] uppercase text-red-accent border border-red-accent/20 rounded-full bg-red-accent/5">
          Independent Label
        </span>
        <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-bold tracking-tighter leading-[1.05] text-white mb-6 max-w-5xl">
          Mocking by <span className="text-red-accent">Jay</span>
        </h1>
        <p className="text-base md:text-lg text-muted leading-relaxed max-w-xl mb-10">
          Urban. Independent. Real. We build spaces for artists to create
          without limits and push culture forward.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="group relative px-8 py-3.5 rounded-full bg-red-accent text-white text-sm font-semibold transition-all duration-300 hover:bg-red-deep active:scale-[0.97] shadow-[0_0_20px_rgba(220,38,38,0.15)]">
            Book an Artist
            <span className="inline-flex items-center justify-center w-6 h-6 ml-2 rounded-full bg-white/15 group-hover:bg-white/20 transition-all duration-300">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>
          <a
            href="#artists"
            className="px-8 py-3.5 rounded-full text-sm font-medium text-white/70 border border-white/10 transition-all duration-300 hover:text-white hover:border-white/20 active:scale-[0.97]">
            Our Artists
          </a>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-2">
        <span className="text-[10px] font-medium tracking-[0.15em] uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-linear-to-b from-muted-2 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   About the Label
   ─────────────────────────────────────────── */
const values = [
  {
    label: "Artists First",
    desc: "Every decision starts with the creator. Their vision leads, we follow.",
  },
  {
    label: "Real Sound",
    desc: "No formulas. No trends. Just honest music that moves people.",
  },
  {
    label: "Built Different",
    desc: "Independent roots, global reach. We move at our own pace.",
  },
];

function AboutSection() {
  return (
    <section id="about" className="relative px-6 pb-32 max-w-6xl mx-auto">
      <Reveal>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 mb-5 text-[10px] font-medium tracking-[0.2em] uppercase text-red-accent border border-red-accent/20 rounded-full bg-red-accent/5">
            The Vision
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            More than a label. A movement.
          </h2>
          <p className="text-muted leading-relaxed max-w-2xl mx-auto">
            Mocking by Jay was built on the belief that real music comes from
            real freedom. We don't box our artists in. We give them the space,
            the tools, and the trust to create work that matters. From
            underground studios to sold-out stages, we're here to push culture
            forward.
          </p>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {values.map((v, i) => (
          <Reveal key={v.label} delay={i * 100}>
            <div className="p-8 rounded-2xl bg-surface border border-white/5 hover:border-red-accent/20 transition-all duration-500 group">
              <div className="w-8 h-[1.5px] bg-red-accent/60 mb-5" />
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-accent transition-colors duration-300">
                {v.label}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   Artist Roster
   ─────────────────────────────────────────── */
const artists = [
  {
    name: "Kai Lennox",
    genre: "Hip-Hop / Trap",
    tag: "Rising",
    img: "https://picsum.photos/seed/kai-lennox/600/700",
  },
  {
    name: "Mira Valent",
    genre: "R&B / Soul",
    tag: "Featured",
    img: "https://picsum.photos/seed/mira-valent/600/700",
  },
  {
    name: "Lex Vaughn",
    genre: "Drill / UK Rap",
    tag: "New Signing",
    img: "https://picsum.photos/seed/lex-vaughn/600/700",
  },
  {
    name: "Noor Ashraf",
    genre: "Alternative Hip-Hop",
    tag: "Latest Album",
    img: "https://picsum.photos/seed/noor-ashraf/600/700",
  },
  {
    name: "Cruz Mendez",
    genre: "Latin Trap",
    tag: "On Tour",
    img: "https://picsum.photos/seed/cruz-mendez/600/700",
  },
];

function ArtistRoster() {
  return (
    <section id="artists" className="relative px-6 pb-32 max-w-6xl mx-auto">
      <Reveal>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 mb-5 text-[10px] font-medium tracking-[0.2em] uppercase text-red-accent border border-red-accent/20 rounded-full bg-red-accent/5">
            The Roster
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Artists shaping the sound
          </h2>
          <p className="text-muted leading-relaxed max-w-xl mx-auto">
            From rising talent to established voices. Each artist brings
            something raw and real to the table.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {artists.map((artist, i) => (
          <Reveal key={artist.name} delay={i * 80}>
            <div className="group relative rounded-2xl bg-surface border border-white/5 overflow-hidden hover:border-red-accent/20 transition-all duration-500">
              {/* Image */}
              <div className="aspect-4/5 overflow-hidden">
                <img
                  src={artist.img}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  loading="lazy"
                />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-trom-ink via-ink/20 to-transparent pointer-events-none" />
              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-red-accent/80">
                    {artist.genre}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-red-accent/40" />
                  <span className="text-[10px] font-medium text-muted-2">
                    {artist.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {artist.name}
                </h3>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   Studio Sessions
   ─────────────────────────────────────────── */
function StudioSection({ onOpenBooking }) {
  return (
    <section id="studio" className="relative px-6 pb-32 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <Reveal>
          <div>
            <span className="inline-block px-3 py-1 mb-5 text-[10px] font-medium tracking-[0.2em] uppercase text-red-accent border border-red-accent/20 rounded-full bg-red-accent/5">
              Studio
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              World-class sessions.
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Our studio is equipped with top-tier analog and digital gear.
              Whether you are tracking, mixing, or producing, you get the space
              and tools to bring your vision to life.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                "SSL Console & outboard gear",
                "Isolated live room & vocal booth",
                "Pro Tools HDX + Ableton Live",
                "On-site engineer support",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-muted">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-accent shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center px-6 py-3 rounded-full bg-red-accent text-white text-sm font-semibold transition-all duration-300 hover:bg-red-deep active:scale-[0.97]">
              Book Studio Time
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="aspect-4/3 rounded-2xl overflow-hidden border border-white/5 bg-surface">
            <img
              src="https://picsum.photos/seed/mocking-studio/800/600"
              alt="Studio session"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   Featured Music
   ─────────────────────────────────────────── */
const tracks = [
  {
    title: "Midnight Run",
    artist: "Kai Lennox",
    plays: "1.2M",
    color: "from-red-accent/20",
  },
  {
    title: "Velvet",
    artist: "Mira Valent",
    plays: "892K",
    color: "from-white/10",
  },
  {
    title: "Block Star",
    artist: "Lex Vaughn",
    plays: "2.4M",
    color: "from-red-accent/20",
  },
  {
    title: "Waves",
    artist: "Noor Ashraf",
    plays: "654K",
    color: "from-white/10",
  },
];

function MusicSection({ onOpenBooking }) {
  return (
    <section id="music" className="relative px-6 pb-32 max-w-6xl mx-auto">
      <Reveal>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 mb-5 text-[10px] font-medium tracking-[0.2em] uppercase text-red-accent border border-red-accent/20 rounded-full bg-red-accent/5">
            Latest Drops
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Hear what is moving
          </h2>
          <p className="text-muted leading-relaxed max-w-xl mx-auto">
            Fresh tracks from our roster. Updated weekly.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {tracks.map((track, i) => (
          <Reveal key={track.title} delay={i * 80}>
            <div
              className={`group flex items-center gap-4 p-5 rounded-2xl bg-surface border border-white/5 hover:border-red-accent/20 transition-all duration-500`}>
              {/* Album art placeholder */}
              <div
                className={`w-14 h-14 rounded-lg bg-linear-to-br ${track.color} to-surface-2 shrink-0 flex items-center justify-center border border-white/5`}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-2 group-hover:text-red-accent transition-colors duration-300">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white truncate group-hover:text-red-accent transition-colors duration-300">
                  {track.title}
                </h4>
                <p className="text-xs text-muted-2">{track.artist}</p>
              </div>
              {/* Plays + play button */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-muted-2 font-mono">
                  {track.plays}
                </span>
                <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-accent transition-all duration-300 group/btn active:scale-[0.92]">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-muted-2 group-hover/btn:text-white transition-colors duration-300 ml-px">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="text-center">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-2 hover:text-red-accent transition-colors duration-300">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            Listen on SoundCloud
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ───────────────────────────────────────────
   Booking Modal
   ─────────────────────────────────────────── */
const eventTypes = [
  "Live Performance",
  "Studio Feature",
  "Collaboration",
  "Event Appearance",
  "Private Booking",
  "Other",
];

function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState("form"); // form | done
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    message: "",
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep("done");
  };

  const handleClose = () => {
    setStep("form");
    setForm({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      date: "",
      message: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  const isValid = form.name && form.email && form.eventType;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-surface border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors duration-200"
          aria-label="Close modal">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {step === "form" ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Book an Artist
              </h2>
              <p className="text-sm text-muted">
                Tell us about your project. We will get back to you within 48
                hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-2 mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-xl bg-ink-3 border border-white/10 text-sm text-white placeholder-muted-2/50 focus:outline-none focus:border-red-accent/50 focus:ring-1 focus:ring-red-accent/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-2 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@email.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-ink-3 border border-white/10 text-sm text-white placeholder-muted-2/50 focus:outline-none focus:border-red-accent/50 focus:ring-1 focus:ring-red-accent/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-2 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl bg-ink-3 border border-white/10 text-sm text-white placeholder-muted-2/50 focus:outline-none focus:border-red-accent/50 focus:ring-1 focus:ring-red-accent/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-2 mb-1.5">
                    Event Type *
                  </label>
                  <select
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-ink-3 border border-white/10 text-sm text-white focus:outline-none focus:border-red-accent/50 focus:ring-1 focus:ring-red-accent/20 transition-all duration-200 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23737373' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                    }}>
                    <option value="" disabled>
                      Select type
                    </option>
                    {eventTypes.map((t) => (
                      <option key={t} value={t} className="bg-ink-3">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-2 mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-ink-3 border border-white/10 text-sm text-white focus:outline-none focus:border-red-accent/50 focus:ring-1 focus:ring-red-accent/20 transition-all duration-200"
                  style={{ colorScheme: "dark" }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-2 mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell us about your event or project..."
                  className="w-full px-4 py-2.5 rounded-xl bg-ink-3 border border-white/10 text-sm text-white placeholder-muted-2/50 focus:outline-none focus:border-red-accent/50 focus:ring-1 focus:ring-red-accent/20 transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className={`w-full py-3 rounded-full text-sm font-semibold transition-all duration-300 active:scale-[0.98] ${
                  isValid
                    ? "bg-red-accent text-white hover:bg-red-deep shadow-[0_0_20px_rgba(220,38,38,0.15)]"
                    : "bg-white/5 text-muted-2 cursor-not-allowed"
                }`}>
                Send Booking Request
              </button>
            </form>
          </>
        ) : (
          /* Success state */
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-red-accent/10 flex items-center justify-center mx-auto mb-6">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-accent">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Request Sent!
            </h2>
            <p className="text-sm text-muted mb-8 max-w-sm mx-auto">
              Thanks for reaching out. We will review your request and get back
              to you within 48 hours.
            </p>
            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/15 transition-all duration-300">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────
   Book CTA section (final call to action)
   ─────────────────────────────────────────── */
function BookCTA({ onOpenBooking }) {
  const [ref, visible] = useScrollReveal(0.15);
  return (
    <section
      id="book"
      ref={ref}
      className="relative px-6 pb-32 max-w-4xl mx-auto text-center">
      <div
        className={`relative p-12 md:p-16 rounded-3xl bg-linear-to-b from-surface to-ink-3 border border-white/5 overflow-hidden transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}>
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-red-accent/8 blur-[100px] pointer-events-none" />
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 mb-5 text-[10px] font-medium tracking-[0.2em] uppercase text-red-accent border border-red-accent/20 rounded-full bg-red-accent/5">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Book an Artist
          </h2>
          <p className="text-muted max-w-lg mx-auto mb-8 leading-relaxed">
            Whether it is a live show, studio feature, or collaboration - reach
            out and let us make something happen.
          </p>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center px-8 py-3.5 rounded-full bg-red-accent text-white text-sm font-semibold transition-all duration-300 hover:bg-red-deep active:scale-[0.97] shadow-[0_0_25px_rgba(220,38,38,0.2)]">
            Start Booking
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   Footer
   ─────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="relative px-6 pb-10 max-w-6xl mx-auto">
      <div className="pt-10 border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-muted-2">
            <span className="font-semibold text-white/50">Mocking by Jay</span>{" "}
            &copy; {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-6">
            {["Instagram", "Twitter / X", "SoundCloud", "YouTube"].map(
              (social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs text-muted-2 hover:text-red-accent transition-colors duration-300">
                  {social}
                </a>
              ),
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-2">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            Mocking by Jay Records
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────────────────────────
   App — main assembly
   ─────────────────────────────────────────── */
export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-ink overflow-x-hidden">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />
      <main>
        <Hero onOpenBooking={() => setBookingOpen(true)} />
        <AboutSection />
        <ArtistRoster />
        <StudioSection onOpenBooking={() => setBookingOpen(true)} />
        <MusicSection onOpenBooking={() => setBookingOpen(true)} />
        <BookCTA onOpenBooking={() => setBookingOpen(true)} />
      </main>
      <Footer />
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
