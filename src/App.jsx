import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useInView,
  animate,
} from "framer-motion";
import {
  Menu,
  X,
  Check,
  MapPin,
  Phone,
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Navigation,
  CalendarDays,
  UtensilsCrossed,
  Shirt,
  Crown,
  Droplets,
  SprayCan,
  Maximize2,
  Store,
  Users,
  Megaphone,
} from "lucide-react";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";
import DIMS from "./flyers.json";

/* ====================================================================
   CONFIG — change contact details and event dates here
   ==================================================================== */
const BRAND = "ICE Innovation Multi Global Concept";
const WHATSAPP = "2347061934493"; // international format, no + or spaces
const PHONE_DISPLAY = "0706 193 4493";
const PHONE_TEL = "+2347061934493";
const VENUE = "Redemption City, Mowe, Ogun State";
const TIKTOK = "https://www.tiktok.com/@iceinnovationglobalnig";
const EVENT_START = new Date("2026-11-27T00:00:00+01:00"); // Lagos time
const EVENT_END = new Date("2026-11-30T00:00:00+01:00");
const MAP_QUERY = encodeURIComponent(
  "Redemption City, Mowe, Ogun State, Nigeria",
);
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const flyer = (id) => `/flyers/${id}.webp`;
const CHAT = wa(
  "Hello ICE Innovation Multi Global Concept, I would like to know more about the Biggest Trade Fair (Nov 27–29, 2026).",
);
const EXHIBIT = wa(
  "Hello ICE Innovation Multi Global Concept, I would like to exhibit at the Biggest Trade Fair, Business & Exhibition (Nov 27–29, 2026).",
);

/* ====================================================================
   CONTENT — taken from the flyers you sent
   ==================================================================== */
const EXHIBITORS = [
  {
    id: "plan-b-bistro",
    name: "Plan B Bistro",
    cat: "Food & Drinks",
    line: "Your food bustop. Every bite feels like home.",
    items: [],
  },
  {
    id: "just-food-essentials",
    name: "Just Food Essentials",
    cat: "Food & Drinks",
    line: "Raw foods",
    items: [
      "Grains",
      "Beans",
      "Spices",
      "Flours",
      "Nuts & seeds",
      "Healthy food essentials",
    ],
  },
  {
    id: "mobola",
    name: "Mobola Foodies and More",
    cat: "Food & Drinks",
    line: "Tasty drinks, happy moments.",
    items: ["Zobo drinks", "Tigernut drinks"],
  },
  {
    id: "tasty-bite-cuisine",
    name: "Tasty Bite Cuisine",
    cat: "Food & Drinks",
    line: "Fresh and tasty.",
    items: ["Fruit parfait", "Healthy treats"],
  },
  {
    id: "christie-joy-world",
    name: "Christie Joy World",
    cat: "Food & Drinks",
    line: "Food and more.",
    items: [
      "Food products",
      "Local & continental dishes",
      "Packaged foods",
      "Food ingredients",
      "Gifts & hampers",
    ],
  },
  {
    id: "peejay4usmart",
    name: "Peejay4usmart",
    cat: "Food & Drinks",
    line: "Baking and catering.",
    items: [
      "Catering services",
      "Small chops & snacks",
      "Desserts for all events",
    ],
  },
  {
    id: "thrift-by-joke",
    name: "Thrift by Joke",
    cat: "Fashion",
    line: "Quality thrift wears for every style.",
    items: ["Tops", "Jeans", "Dresses", "Bags", "Shoes"],
  },
  {
    id: "rtwbyewa",
    name: "RTWBYEWA",
    cat: "Fashion",
    line: "Bubu gown, Ankara, Adire materials and more.",
    items: [
      "Bubu gowns",
      "Ankara fabrics",
      "Adire materials",
      "Ready to wear",
      "Unisex outfits",
      "Accessories",
    ],
  },
  {
    id: "folathreads",
    name: "Folathreads",
    cat: "Fashion",
    line: "Fashion for every occasion.",
    items: [
      "Custom outfits",
      "Ready to wear",
      "Corporate attire",
      "Aso-ebi & occasions",
      "Fashion accessories",
    ],
  },
  {
    id: "rancywears",
    name: "Rancywears",
    cat: "Fashion",
    line: "Fashion for every occasion.",
    items: [
      "Custom outfits",
      "Ready to wear",
      "Corporate attire",
      "Aso-ebi & occasions",
      "Fashion accessories",
    ],
  },
  {
    id: "babydrew",
    name: "Babydrew Fashion Wear",
    cat: "Fashion",
    line: "Wholesale vendor.",
    items: [
      "Ladies wear",
      "Trendy outfits",
      "Quality fashion",
      "Affordable prices",
    ],
  },
  {
    id: "718hairng",
    name: "718Hairng",
    cat: "Hair",
    line: "Human hair, wigs and more.",
    items: ["Human hair", "Wigs", "Bundles", "Lace wigs", "Hair accessories"],
  },
  {
    id: "gods-own-product",
    name: "God's Own Product",
    cat: "Hair",
    line: "Healthy hair, confident you.",
    items: ["Shampoo", "Conditioner", "Hair care for all hair types"],
  },
  {
    id: "everythinghairwithtomi",
    name: "EverythingHairWithTomi",
    cat: "Hair",
    line: "Wigs & hair collections.",
    items: ["Braided wigs", "Frontals & closures", "Human hair wigs"],
  },
  {
    id: "babzbellus-empire",
    name: "Babzbellus Empire",
    cat: "Hair",
    line: "Hair, accessories and tees.",
    items: ["Human hair (wigs & bundles)", "Hair accessories", "New park tees"],
  },
  {
    id: "queenzi-skin-care",
    name: "Queenzi Skin Care",
    cat: "Beauty & Care",
    line: "Skin care for face and body.",
    items: [
      "Face care",
      "Body care",
      "Lightening lotion",
      "Caramel lotion",
      "Snow white lotion",
    ],
  },
  {
    id: "ezer-pearl",
    name: "Ezer Pearl Cosmetics / Nisa Fix",
    cat: "Beauty & Care",
    line: "Cosmetics and cleaning.",
    items: ["Household cleaning products", "Lipcare products"],
  },
  {
    id: "bshine-scent-hub",
    name: "BShine Scent Hub",
    cat: "Fragrance",
    line: "Perfumes, fragrances and more.",
    items: [
      "Original perfumes",
      "Body mists",
      "Luxury fragrances",
      "Gift sets",
    ],
  },
  {
    id: "scent-by-dm",
    name: "Scent by DM",
    cat: "Fragrance",
    line: "Perfume and air freshener.",
    items: ["Perfumes", "Air fresheners"],
  },
].map((e) => ({ ...e, w: DIMS[e.id][0], h: DIMS[e.id][1] }));

const CAT_NAMES = [
  "Food & Drinks",
  "Fashion",
  "Hair",
  "Beauty & Care",
  "Fragrance",
];
const CATEGORIES = [
  {
    name: "Food & Drinks",
    icon: UtensilsCrossed,
    text: "Zobo and tigernut drinks, fruit parfait, local and continental dishes, small chops, baking, catering and raw foods.",
    pics: ["mobola", "tasty-bite-cuisine"],
  },
  {
    name: "Fashion",
    icon: Shirt,
    text: "Thrift wears, bubu gowns, Ankara and Adire, custom outfits, aso-ebi, corporate attire and wholesale ladies wear.",
    pics: ["rtwbyewa", "thrift-by-joke"],
  },
  {
    name: "Hair",
    icon: Crown,
    text: "Human hair, wigs and bundles, braided wigs, frontals and closures, shampoo, conditioner and hair accessories.",
    pics: ["718hairng", "everythinghairwithtomi"],
  },
  {
    name: "Beauty & Care",
    icon: Droplets,
    text: "Face and body care, lightening, caramel and snow white lotions, lip care and household cleaning products.",
    pics: ["queenzi-skin-care", "ezer-pearl"],
  },
  {
    name: "Fragrance",
    icon: SprayCan,
    text: "Original perfumes, body mists, luxury fragrances, gift sets and air fresheners.",
    pics: ["bshine-scent-hub", "scent-by-dm"],
  },
];

const FEATURED = [
  "plan-b-bistro",
  "thrift-by-joke",
  "queenzi-skin-care",
  "718hairng",
  "folathreads",
  "bshine-scent-hub",
  "mobola",
  "rtwbyewa",
].map((id) => EXHIBITORS.find((e) => e.id === id));

const DAYS = [0, 1, 2].map((k) => {
  const d = new Date(EVENT_START.getTime() + k * 864e5 + 12 * 36e5);
  return {
    n: k + 1,
    num: d.toLocaleDateString("en-GB", {
      day: "numeric",
      timeZone: "Africa/Lagos",
    }),
    weekday: d.toLocaleDateString("en-GB", {
      weekday: "long",
      timeZone: "Africa/Lagos",
    }),
    month: d.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
      timeZone: "Africa/Lagos",
    }),
  };
});

/* ====================================================================
   MOTION HELPERS — every element reveals when IT scrolls into view
   ==================================================================== */
const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: (i % 4) * 0.08,
    },
  }),
};
const reveal = (i = 0) => ({
  variants: itemVariants,
  custom: i,
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "-40px" },
});
const fromLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};
const fromRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};

/* Smooth scroll that behaves the same on every phone and desktop */
const NAV_OFFSET = 64;
function smoothScrollTo(hash) {
  const id = hash.replace("#", "");
  const el = id === "top" ? null : document.getElementById(id);
  if (id !== "top" && !el) return;
  const getTarget = () =>
    id === "top"
      ? 0
      : Math.max(
          0,
          el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET,
        );
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: getTarget(), behavior: "instant" });
    return;
  }
  const startY = window.scrollY;
  const duration = Math.min(
    1100,
    Math.max(500, Math.abs(getTarget() - startY) * 0.5),
  );
  const ease = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  let t0 = null;
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };
  const cleanup = () => {
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("wheel", cancel);
  };
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("wheel", cancel, { passive: true });
  const step = (now) => {
    if (cancelled) return cleanup();
    if (t0 === null) t0 = now;
    const p = Math.min(1, (now - t0) / duration);
    window.scrollTo({
      top: startY + (getTarget() - startY) * ease(p),
      behavior: "instant",
    });
    if (p < 1) requestAnimationFrame(step);
    else cleanup();
  };
  requestAnimationFrame(step);
}
const goTo = (e, hash, after) => {
  e.preventDefault();
  smoothScrollTo(hash);
  history.replaceState(null, "", hash);
  after?.();
};

/* ====================================================================
   SMALL PIECES
   ==================================================================== */
function SectionHead({ eyebrow, title, sub, dark = false, className = "" }) {
  return (
    <motion.div
      {...reveal(0)}
      className={`mb-10 max-w-3xl sm:mb-14 ${className}`}
    >
      <p
        className={`eyebrow mb-3 flex items-center gap-3 ${dark ? "!text-gold-400" : ""}`}
      >
        <span className="h-px w-10 bg-gold-500" /> {eyebrow}
      </p>
      <h2
        className={`font-display text-[2.6rem] leading-[0.95] sm:text-6xl lg:text-7xl ${dark ? "text-ivory-50" : "text-maroon-900"}`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-5 max-w-xl text-base leading-relaxed ${dark ? "text-ivory-100/70" : "text-maroon-900/65"}`}
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}

function Logo({ size = "h-10 w-10" }) {
  return (
    <img
      src="/logo-mark.svg"
      alt={`${BRAND} logo`}
      className={`${size} rounded-xl`}
    />
  );
}

function Wordmark() {
  return (
    <span className="flex flex-col leading-none">
      <span className="font-display text-[1.7rem] tracking-wide">
        ICE INNOVATION
      </span>
      <span className="mt-0.5 text-[8.5px] font-semibold uppercase tracking-[0.3em] opacity-70">
        Multi Global Concept
      </span>
    </span>
  );
}

function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function Countdown() {
  const now = useNow();
  const diff = EVENT_START.getTime() - now;
  if (diff <= 0) {
    return (
      <div className="inline-flex items-center gap-3 rounded-full border border-gold-400/50 bg-maroon-800/60 px-5 py-3 text-sm font-semibold text-gold-300">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-400" />
        </span>
        {now < EVENT_END.getTime()
          ? "The fair is happening now"
          : "Thank you for joining us. See you at the next one"}
      </div>
    );
  }
  const parts = [
    ["Days", Math.floor(diff / 864e5)],
    ["Hours", Math.floor((diff / 36e5) % 24)],
    ["Mins", Math.floor((diff / 6e4) % 60)],
    ["Secs", Math.floor((diff / 1e3) % 60)],
  ];
  return (
    <div
      className="grid w-full max-w-md grid-cols-4 gap-2 sm:gap-3"
      role="timer"
      aria-label="Countdown to the trade fair"
    >
      {parts.map(([l, v]) => (
        <div
          key={l}
          className="rounded-xl border border-gold-500/35 bg-maroon-800/50 py-3 text-center backdrop-blur"
        >
          <div className="font-display text-4xl leading-none text-gold-300 tabular-nums sm:text-5xl">
            {String(v).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory-100/55">
            {l}
          </div>
        </div>
      ))}
    </div>
  );
}

function CountUp({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (x) => setV(Math.round(x)),
    });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}</span>;
}

/* ====================================================================
   NAV
   ==================================================================== */
function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links = [
    ["The Fair", "#fair"],
    ["Categories", "#categories"],
    ["Exhibitors", "#exhibitors"],
    ["Why ICE", "#why"],
    ["Contact", "#contact"],
  ];
  const light = solid && !open;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${light ? "border-b border-gold-500/30 bg-ivory-50/90 text-maroon-900 shadow-sm backdrop-blur-xl" : open ? "bg-maroon-950 text-ivory-50" : "text-ivory-50"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-8">
        <a
          href="#top"
          onClick={(e) => goTo(e, "#top")}
          className="flex items-center gap-2.5"
          aria-label={BRAND}
        >
          <Logo />
          <Wordmark />
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(([l, h]) => (
            <a
              key={l}
              href={h}
              onClick={(e) => goTo(e, h)}
              className={`text-sm font-medium transition ${light ? "text-maroon-900/75 hover:text-maroon-700" : "text-ivory-100/80 hover:text-gold-300"}`}
            >
              {l}
            </a>
          ))}
          <a
            href={EXHIBIT}
            target="_blank"
            rel="noreferrer"
            className={light ? "btn-maroon !py-2.5" : "btn-gold !py-2.5"}
          >
            <Store size={16} /> Exhibit with us
          </a>
        </nav>
        <button
          className="grid h-10 w-10 place-items-center rounded-full lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-maroon-950 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-6 pt-2">
              {links.map(([l, h]) => (
                <a
                  key={l}
                  href={h}
                  onClick={(e) => goTo(e, h, () => setOpen(false))}
                  className="rounded-xl px-3 py-3 font-display text-3xl tracking-wide text-ivory-50 active:bg-maroon-800"
                >
                  {l}
                </a>
              ))}
              <div className="flex justify-center gap-6">
                <a
                href={EXHIBIT}
                target="_blank"
                rel="noreferrer"
                className="btn-gold mt-3"
              >
                <Store size={16} /> Exhibit with us
              </a>
              <a
                href={CHAT}
                target="_blank"
                rel="noreferrer"
                className="btn-outline mt-2"
              >
                 Chat with us
              </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ====================================================================
   HERO + 3D COVERFLOW CAROUSEL
   ==================================================================== */
function Hero() {
  return (
    <section
      id="top"
      className="diamonds relative flex min-h-screen items-center overflow-hidden bg-maroon-950 pb-14 pt-24 text-ivory-50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(217,165,33,0.22)_0%,transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(155,36,80,0.45)_0%,transparent_55%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="min-w-0"
        >
          <motion.p
            variants={itemVariants}
            className="eyebrow !text-gold-400 mb-3 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gold-500" /> ICE Innovation Multi
            Global Concept presents
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="font-script text-6xl leading-none text-gold-300 sm:text-7xl"
          >
            Biggest
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="gold-text -mt-1 font-display text-[4.8rem] leading-[0.88] sm:text-[8rem] lg:text-[8.5rem] xl:text-[9.5rem]"
          >
            TRADEFAIR
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-2 inline-block rounded-md bg-maroon-700 px-4 py-1.5 font-display text-xl tracking-[0.12em] text-ivory-50 sm:text-2xl"
          >
            Business &amp; Exhibition
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap gap-3 text-sm"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-4 py-2 font-bold text-maroon-950">
              <CalendarDays size={16} /> Nov 27 – 29, 2026
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/50 px-4 py-2 font-semibold text-gold-200">
              <MapPin size={16} /> Redemption City, Mowe
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-7">
            <Countdown />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="hidden md:block mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <a
              href={CHAT}
              target="_blank"
              rel="noreferrer"
              className="btn-gold"
            >
              <FaWhatsapp size={18} /> Chat on WhatsApp
            </a>
            <a
              href="#exhibitors"
              onClick={(e) => goTo(e, "#exhibitors")}
              className="btn-outline"
            >
              Meet the exhibitors <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>

        <Coverflow />
      </div>
    </section>
  );
}

function Coverflow() {
  const n = FEATURED.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = useCallback(() => setI((v) => (v + 1) % n), [n]);
  const prev = () => setI((v) => (v - 1 + n) % n);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [paused, next]);
  const offset = (k) => {
    let d = (((k - i) % n) + n) % n;
    if (d > n / 2) d -= n;
    return d;
  };
  const stateFor = (o) => {
    const a = Math.abs(o);
    const s = Math.sign(o);
    if (a === 0) return { x: "0%", scale: 1, rotateY: 0, opacity: 1 };
    if (a === 1)
      return { x: `${o * 66}%`, scale: 0.82, rotateY: -s * 24, opacity: 0.92 };
    if (a === 2)
      return { x: `${o * 56}%`, scale: 0.66, rotateY: -s * 32, opacity: 0.4 };
    return { x: `${s * 110}%`, scale: 0.5, rotateY: -s * 40, opacity: 0 };
  };
  const cur = FEATURED[i];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative min-w-0"
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        dragSnapToOrigin
        onDragEnd={(_, info) => {
          if (info.offset.x < -50) next();
          else if (info.offset.x > 50) prev();
        }}
        className="relative h-[27rem] cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing sm:h-[34rem] lg:h-[37rem]"
        style={{ perspective: 1200 }}
      >
        {FEATURED.map((f, k) => {
          const o = offset(k);
          const a = Math.abs(o);
          return (
            <motion.button
              key={f.id}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Show ${f.name}`}
              tabIndex={a > 1 ? -1 : 0}
              animate={stateFor(o)}
              transition={{ type: "spring", stiffness: 130, damping: 20 }}
              style={{
                zIndex: 30 - a * 10,
                pointerEvents: a > 2 ? "none" : "auto",
              }}
              className="absolute bottom-3 left-1/2 top-3 -ml-[7.5rem] w-60 sm:-ml-[8.5rem] sm:w-[17rem] lg:-ml-[9rem] lg:w-[18rem]"
            >
              <img
                src={flyer(f.id)}
                alt={`${f.name} flyer`}
                draggable={false}
                className="h-full w-full rounded-2xl border-2 border-gold-500/70 bg-maroon-900 object-cover object-top shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]"
              />
            </motion.button>
          );
        })}
      </motion.div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400">
                {cur.cat}
              </p>
              <p className="truncate font-display text-2xl leading-tight text-ivory-50">
                {cur.name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden gap-1.5 sm:flex">
            {FEATURED.map((f, k) => (
              <button
                key={f.id}
                onClick={() => setI(k)}
                aria-label={`Slide ${k + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-6 bg-gold-400" : "w-2 bg-ivory-100/25"}`}
              />
            ))}
          </div>
          <button
            onClick={prev}
            aria-label="Previous"
            className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/50 text-gold-300 transition hover:bg-gold-400/10"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/50 text-gold-300 transition hover:bg-gold-400/10"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ====================================================================
   MARQUEE
   ==================================================================== */
function Marquee() {
  const row = [...EXHIBITORS, ...EXHIBITORS];
  return (
    <div className="overflow-hidden bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 py-3.5">
      <div className="flex w-max animate-marquee gap-8">
        {row.map((e, k) => (
          <span
            key={k}
            className="flex items-center gap-8 font-display text-2xl tracking-wider text-maroon-950"
          >
            {e.name}
            <span className="h-2 w-2 rotate-45 bg-maroon-800" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ====================================================================
   THE FAIR — dates + stats
   ==================================================================== */
function Fair() {
  const stats = [
    [EXHIBITORS.length, "Brands featured"],
    [CAT_NAMES.length, "Categories"],
    [3, "Days"],
    [1, "Venue"],
  ];
  return (
    <section
      id="fair"
      className="relative overflow-hidden bg-ivory-50 py-12 md:py-16 sm:py-24"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="min-w-0">
          <SectionHead
            eyebrow="The fair"
            title="Three days to shop, network and experience"
            sub={`Join us at ${VENUE} for the Biggest Trade Fair, Business & Exhibition. Come shop, taste and support the brands you love.`}
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {stats.map(([n, l], i) => (
              <motion.div
                key={l}
                {...reveal(i)}
                className="rounded-2xl border border-gold-500/40 bg-white p-4 text-center shadow-sm"
              >
                <div className="font-display text-5xl leading-none text-maroon-800">
                  <CountUp to={n} />
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-maroon-900/55">
                  {l}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            {...reveal(2)}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
           <div className="flex justify-center gap-4">
             <a
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn-maroon"
            >
              <Navigation size={16} /> Get directions
            </a>
            <a
              href={CHAT}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-maroon-800/30 px-7 py-3.5 text-sm font-bold text-maroon-800 transition hover:bg-maroon-800/5"
            >
              <FaWhatsapp size={16} /> Ask a question
            </a>
           </div>
          </motion.div>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          {DAYS.map((d, i) => (
            <motion.div
              key={d.n}
              {...reveal(i)}
              className="group flex overflow-hidden rounded-2xl border border-gold-500/40 bg-white shadow-[0_10px_30px_-18px_rgba(86,15,40,0.5)] transition-transform hover:-translate-y-1"
            >
              <div className="grid w-28 shrink-0 place-items-center bg-maroon-800 py-5 text-center sm:w-36">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400">
                    Day {d.n}
                  </p>
                  <p className="gold-text font-display text-6xl leading-none sm:text-7xl">
                    {d.num}
                  </p>
                </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center border-l-2 border-dashed border-gold-500/50 p-4 sm:p-6">
                <p className="font-display text-3xl leading-none text-maroon-900 sm:text-4xl">
                  {d.weekday}
                </p>
                <p className="mt-1 text-sm text-maroon-900/60">{d.month}</p>
                <p className="mt-3 flex items-center gap-2 text-sm font-medium text-maroon-800">
                  <MapPin size={15} className="shrink-0 text-gold-600" />{" "}
                  <span className="min-w-0">Redemption City, Mowe</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
   CATEGORIES — horizontal snap carousel
   ==================================================================== */
function Categories() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const by = (d) =>
    ref.current?.scrollBy({
      left: d * Math.min(ref.current.clientWidth * 0.8, 420),
      behavior: "smooth",
    });
  return (
    <section
      id="categories"
      className="diamonds relative overflow-hidden bg-maroon-900 py-16 text-ivory-50 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="flex items-end justify-between gap-6">
          <SectionHead
            dark
            eyebrow="What you'll find"
            title="Five worlds, one fair"
            sub="Swipe through the categories to see what's waiting for you."
            className="!mb-8 sm:!mb-10"
          />
          <div className="mb-8 hidden gap-2 sm:flex sm:mb-10">
            <button
              onClick={() => by(-1)}
              aria-label="Scroll left"
              className="grid h-12 w-12 place-items-center rounded-full border border-gold-400/50 text-gold-300 transition hover:bg-gold-400/10"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => by(1)}
              aria-label="Scroll right"
              className="grid h-12 w-12 place-items-center rounded-full border border-gold-400/50 text-gold-300 transition hover:bg-gold-400/10"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <motion.div {...reveal(1)}>
        <div
          ref={ref}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-4 px-4 pb-4 sm:scroll-pl-8 sm:gap-6 sm:px-8 xl:px-[max(2rem,calc((100vw-80rem)/2+2rem))] xl:scroll-pl-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {CATEGORIES.map((c, k) => {
            const brands = EXHIBITORS.filter((e) => e.cat === c.name);
            return (
              <article
                key={c.name}
                className="relative flex w-[84%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-gold-500/35 bg-gradient-to-br from-maroon-800 to-maroon-950 p-6 sm:w-[24rem] sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-400 text-maroon-950">
                    <c.icon size={22} />
                  </span>
                  <span className="font-display text-6xl leading-none text-gold-400/25">
                    {String(k + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-4xl leading-none text-gold-300">
                  {c.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-ivory-100/50">
                  {brands.length} brands
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ivory-100/75">
                  {c.text}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {brands.map((b) => (
                    <span
                      key={b.id}
                      className="rounded-full border border-gold-400/30 px-3 py-1 text-xs text-gold-200"
                    >
                      {b.name}
                    </span>
                  ))}
                </div>
                <div className="relative mt-6 h-40">
                  {c.pics.map((p, j) => (
                    <img
                      key={p}
                      src={flyer(p)}
                      alt=""
                      loading="lazy"
                      className={`absolute top-0 h-40 w-28 rounded-xl border-2 border-gold-500/60 object-cover object-top shadow-xl ${j === 0 ? "left-[22%] -rotate-6" : "left-[48%] rotate-6"}`}
                    />
                  ))}
                </div>
                <a
                  href="#exhibitors"
                  onClick={(e) => goTo(e, "#exhibitors")}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 hover:text-gold-200"
                >
                  See exhibitors <ArrowRight size={15} />
                </a>
              </article>
            );
          })}
        </div>
        <div className="mx-auto mt-4 h-1 w-[calc(100%-2rem)] max-w-7xl overflow-hidden rounded-full bg-ivory-100/10 sm:w-[calc(100%-4rem)]">
          <div
            className="h-full rounded-full bg-gold-400 transition-[width] duration-150"
            style={{ width: `${20 + progress * 80}%` }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ====================================================================
   EXHIBITORS WALL + LIGHTBOX
   ==================================================================== */
function Exhibitors() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(null);
  const list =
    cat === "All" ? EXHIBITORS : EXHIBITORS.filter((e) => e.cat === cat);
  const n = list.length;
  const close = () => setOpen(null);
  const step = useCallback(
    (d) => setOpen((v) => (v === null ? v : (v + d + n) % n)),
    [n],
  );
  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);
  const cur = open !== null ? list[open] : null;
  return (
    <section id="exhibitors" className="relative bg-ivory-100 py-10 md:py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <SectionHead
          eyebrow="Exhibitors"
          title="Meet the brands"
          sub="Tap any flyer to see what each brand is bringing to the fair."
        />

        <motion.div
          {...reveal(1)}
          className="no-scrollbar -mx-4 mb-6 md:mb-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          role="tablist"
          aria-label="Exhibitor categories"
        >
          {["All", ...CAT_NAMES].map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition ${cat === c ? "border-maroon-800 bg-maroon-800 text-gold-300 shadow-md" : "border-maroon-800/20 bg-white text-maroon-900/70 hover:border-gold-500"}`}
            >
              {c}
              <span className="ml-1.5 text-xs opacity-60">
                {c === "All"
                  ? EXHIBITORS.length
                  : EXHIBITORS.filter((e) => e.cat === c).length}
              </span>
            </button>
          ))}
        </motion.div>

        <div
          key={cat}
          className="columns-2 gap-3 sm:gap-5 md:columns-3 lg:columns-4"
        >
          {list.map((e, k) => (
            <motion.button
              key={e.id}
              {...reveal(k)}
              onClick={() => setOpen(k)}
              aria-label={`Open ${e.name}`}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-gold-500/40 bg-maroon-900 text-left shadow-[0_10px_30px_-18px_rgba(86,15,40,0.6)] sm:mb-5"
            >
              <img
                src={flyer(e.id)}
                alt={`${e.name} flyer`}
                loading="lazy"
                width={e.w}
                height={e.h}
                style={{ aspectRatio: `${e.w}/${e.h}` }}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-950/95 via-maroon-950/70 to-transparent p-3 pt-10 sm:p-4 sm:pt-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400">
                  {e.cat}
                </p>
                <p className="flex items-center justify-between gap-2 font-display text-lg leading-tight text-ivory-50 sm:text-xl">
                  <span className="min-w-0">{e.name}</span>
                  <Maximize2 size={14} className="shrink-0 opacity-70" />
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {cur && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[70] overflow-y-auto bg-maroon-950/95 p-3 backdrop-blur-sm sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={cur.name}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="fixed right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-ivory-50/15 text-ivory-50 hover:bg-ivory-50/25 sm:right-6 sm:top-6"
            >
              <X />
            </button>
            <button
              onClick={(ev) => {
                ev.stopPropagation();
                step(-1);
              }}
              aria-label="Previous"
              className="fixed left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ivory-50/15 text-ivory-50 hover:bg-ivory-50/25 sm:left-6"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={(ev) => {
                ev.stopPropagation();
                step(1);
              }}
              aria-label="Next"
              className="fixed right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ivory-50/15 text-ivory-50 hover:bg-ivory-50/25 sm:right-6"
            >
              <ChevronRight />
            </button>
            <motion.div
              key={cur.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(ev) => ev.stopPropagation()}
              className="mx-auto my-8 grid w-full max-w-4xl gap-5 overflow-hidden rounded-3xl border border-gold-500/40 bg-maroon-900 p-4 text-ivory-50 sm:p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-8"
            >
              <img
                src={flyer(cur.id)}
                alt={`${cur.name} flyer`}
                className="mx-auto max-h-[70vh] w-auto max-w-full rounded-2xl border border-gold-500/50 object-contain md:max-h-[80vh]"
              />
              <div className="min-w-0 md:py-4">
                <p className="eyebrow !text-gold-400">{cur.cat}</p>
                <h3 className="mt-2 font-display text-4xl leading-none text-gold-300 sm:text-5xl">
                  {cur.name}
                </h3>
                <p className="mt-3 text-ivory-100/75">{cur.line}</p>
                {cur.items.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {cur.items.map((t) => (
                      <li
                        key={t}
                        className="flex items-start gap-2.5 text-sm text-ivory-100/85"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-gold-400"
                        />{" "}
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-5 flex items-center gap-2 text-sm text-ivory-100/60">
                  <CalendarDays size={15} className="shrink-0 text-gold-400" />{" "}
                  Nov 27–29, 2026 · Redemption City, Mowe
                </p>
                <a
                  href={wa(
                    `Hello ICE Innovation Multi Global Concept, I saw ${cur.name} on your website. I would like to know more about their stand at the Trade Fair.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold mt-6 w-full sm:w-auto"
                >
                  <FaWhatsapp size={17} /> Ask about this stand
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ====================================================================
   WHY ICE
   ==================================================================== */
function Why() {
  const blocks = [
    {
      icon: Users,
      t: "One address for shoppers",
      d: "Food, fashion, hair, skin care and fragrance, all under one fair. Come with friends and spend the day.",
      cta: ["Plan your visit", CHAT],
    },
    {
      icon: Megaphone,
      t: "A stage for your brand",
      d: "Every exhibitor is promoted with a branded flyer and shared on our TikTok page, so people know you'll be there.",
      cta: ["Exhibit with us", EXHIBIT],
    },
    {
      icon: Store,
      t: "Shop. Network. Experience.",
      d: "Meet the people behind the brands, taste, try and connect with other business owners in one place.",
      cta: ["Follow on TikTok", TIKTOK],
    },
  ];
  return (
    <section
      id="why"
      className="diamonds relative overflow-hidden bg-maroon-950 py-16 text-ivory-50 sm:py-24"
    >
      <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-gold-500/15 blur-[120px]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-8">
        <SectionHead
          dark
          eyebrow="Why ICE Innovation"
          title="We bring businesses and buyers together"
          sub="ICE Innovation Multi Global Concept puts brands in front of people who are ready to shop."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {blocks.map(({ icon: Icon, t, d, cta }, i) => (
            <motion.div
              key={t}
              {...reveal(i)}
              className="flex min-w-0 flex-col rounded-3xl border border-gold-500/30 bg-gradient-to-b from-maroon-800/60 to-maroon-900/40 p-7"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-400 text-maroon-950">
                  <Icon size={26} />
                </span>
                <span className="font-display text-6xl leading-none text-gold-400/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 font-display text-3xl leading-none text-gold-300">
                {t}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory-100/70">
                {d}
              </p>
              <a
                href={cta[1]}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 hover:text-gold-200"
              >
                {cta[0]} <ArrowUpRight size={15} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
   CONTACT + MAP
   ==================================================================== */
function Contact() {
  const cards = [
    { icon: FaWhatsapp, label: "WhatsApp", value: PHONE_DISPLAY, href: CHAT },
    {
      icon: Phone,
      label: "Call us",
      value: PHONE_DISPLAY,
      href: `tel:${PHONE_TEL}`,
    },
    { icon: MapPin, label: "Venue", value: VENUE, href: MAP_LINK },
    {
      icon: FaTiktok,
      label: "TikTok",
      value: "@iceinnovationglobalnig",
      href: TIKTOK,
    },
  ];
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ivory-50 py-12 md:py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <SectionHead
          eyebrow="Visit & contact"
          title="See you at Redemption City"
          sub="Message us on WhatsApp for questions about the fair, or to exhibit your brand."
        />
        <div className="grid grid-cols-1 items-stretch gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
            {cards.map(({ icon: Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                {...reveal(i)}
                href={href}
                target={href.startsWith("tel") ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex w-full min-w-0 items-center gap-3 rounded-2xl border border-gold-500/40 bg-white p-4 shadow-sm transition hover:border-maroon-700 sm:gap-4 sm:p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-maroon-800 text-gold-300 sm:h-12 sm:w-12">
                  <Icon size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-widest text-maroon-900/45 sm:text-xs">
                    {label}
                  </span>
                  <span className="block break-words font-display text-xl leading-snug sm:text-2xl">
                    {value}
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-maroon-900/30 transition group-hover:text-maroon-700"
                />
              </motion.a>
            ))}
            <motion.div
              {...reveal(4)}
              className="flex flex-col gap-3 sm:flex-row"
            >
              {/* <a
                href={CHAT}
                target="_blank"
                rel="noreferrer"
                className="btn-maroon !whitespace-normal flex-1 !px-5 !py-4 text-center text-sm sm:text-base"
              >
                <FaWhatsapp size={20} className="shrink-0" /> Chat on WhatsApp
              </a>
              <a
                href={EXHIBIT}
                target="_blank"
                rel="noreferrer"
                className="btn-gold !whitespace-normal flex-1 !px-5 !py-4 text-center text-sm sm:text-base"
              >
                <Store size={18} className="shrink-0" /> Exhibit with us
              </a> */}
            </motion.div>
          </div>

          <motion.div
            {...fromRight}
            className="relative h-80 min-w-0 overflow-hidden rounded-3xl border-2 border-gold-500/50 bg-ivory-200 shadow-xl sm:h-[26rem] lg:h-auto lg:min-h-[30rem]"
          >
            <iframe
              title="Redemption City, Mowe — location of the Biggest Trade Fair"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
            />
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn-maroon absolute bottom-3 left-3 !px-4 !py-2 text-xs shadow-xl sm:bottom-4 sm:left-4 sm:!px-5 sm:!py-2.5"
            >
              <Navigation size={14} /> Get directions
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
   FOOTER + FLOATING BUTTONS
   ==================================================================== */
function Footer() {
  return (
    <footer className="bg-maroon-950 py-10 text-ivory-100/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 text-center sm:px-8">
        <a
          href="#top"
          onClick={(e) => goTo(e, "#top")}
          className="flex items-center gap-2.5 text-ivory-50"
        >
          <Logo />
          <Wordmark />
        </a>
        <p className="text-sm">
          Biggest Trade Fair, Business &amp; Exhibition · Nov 27–29, 2026
        </p>
        <p className="max-w-md text-sm">
          {VENUE} ·{" "}
          <a
            href={`tel:${PHONE_TEL}`}
            className="whitespace-nowrap hover:text-gold-300"
          >
            {PHONE_DISPLAY}
          </a>
        </p>
        {/* Builder Credit */}
        <p className="mt-2 text-xs sm:text-sm opacity-80 flex items-center justify-center gap-2">
          <img
              src="/logos.jpg"
              alt="Elvionweb Logo"
              className="w-8 h-8 object-contain"
          />
          Built by{" "}
          <a
            href="https://www.elvionweb.com"
        target="_blank"
          rel="noopener noreferrer"
        className="font-semibold underline underline-offset-4 hover:opacity-100 transition-opacity"
          >
          Elvionweb
          </a>
          </p>
        <p className="text-xs text-ivory-100/40">
          © {new Date().getFullYear()} {BRAND}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  return (
    <a
      href={CHAT}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.5)] transition hover:scale-110"
    >
      <span className="absolute inset-0 animate-pulseRing rounded-full bg-[#25D366]" />
      <FaWhatsapp className="relative" size={28} />
    </a>
  );
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-gold-600 via-gold-300 to-gold-500"
    />
  );
}

/* ====================================================================
   APP
   ==================================================================== */
export default function App() {
  return (
    <>
      <ProgressBar />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Fair />
        <Categories />
        <Exhibitors />
        <Why />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
