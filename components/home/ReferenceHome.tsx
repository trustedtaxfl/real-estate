"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Handshake, House, KeyRound, MapPin, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ReferenceHeader } from "@/components/reference/ReferenceHeader";
import { idx, scheduleHref, site } from "@/lib/site";
import styles from "./ReferenceHome.module.css";

const asset = (name: string) => `/home-reference/${name}`;
const services = [
  { title: "New Construction", image: "new-construction", icon: House, lines: ["Expert guidance. Builder insight.", "Your best interest."], slug: "new-construction" },
  { title: "Buy a Home", image: "buy-a-home", icon: KeyRound, lines: ["A smooth, informed", "buying experience."], slug: "buy" },
  { title: "Sell Your Home", image: "sell-your-home", icon: House, lines: ["Strategic marketing.", "Maximum exposure.", "Real results."], slug: "sell" },
  { title: "Relocate to Florida", image: "relocate-to-florida", icon: MapPin, lines: ["From out of state to home.", "I make your move easier."], slug: "relocate" },
];
const places = [
  { name: "Orlando", slug: "orlando", tagline: "City Life. Endless Possibilities." },
  { name: "Kissimmee", slug: "kissimmee", tagline: "Family Friendly. Close to It All." },
  { name: "Lake Nona", slug: "lake-nona", tagline: "Modern Living. A Healthier You." },
  { name: "Apopka", slug: "apopka", tagline: "Small-Town Charm. Big Potential." },
];

export function ReferenceHome() {
  const [mode, setMode] = useState("Buy");
  const [searchSummary, setSearchSummary] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const parts = [mode, String(data.get("location") || "Central Florida"), data.get("price"), data.get("beds"), data.get("baths")].filter(Boolean);
    setSearchSummary(parts.join(" · "));
    setSearchOpen(true);
  }

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <ReferenceHeader current="/" searchHref="#search" />

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroArt} aria-hidden="true" />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Central Florida Real Estate</p>
              <h1 id="hero-title">Find Your Place<br />in Central <span>Florida.</span></h1>
              <p className={styles.heroTagline}>Homes. Opportunity. A Brighter Tomorrow.</p>
              <Link href="/lets-talk" className={styles.goldButton}>Let’s Find Yours <ArrowRight aria-hidden="true" /></Link>
            </div>
            <div className={styles.heroPortrait}>
              {/* Served as-is: the source photo is soft, so re-compressing it would blur it further. */}
              <Image src={asset("paul-hero.webp")} alt="Paul E. in a tan jacket at Lake Eola" fill sizes="(max-width: 640px) 60vw, (max-width: 1024px) 45vw, 420px" priority unoptimized />
            </div>
            <p className={styles.heroScript}><span>More Than</span><span>a House…</span><span>A Place to Belong.</span></p>
          </div>
        </section>

        <section className={styles.services} aria-label="How I can help">
          {services.map(({ title, image, icon: Icon, lines, slug }) => (
            <article className={styles.service} key={slug}>
              <div className={styles.servicePhoto}><Image src={asset(`${image}.jpg`)} alt={title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw" /></div>
              <span className={styles.serviceIcon}><Icon aria-hidden="true" /></span>
              <h2>{title}</h2>
              <p>{lines.map((line, i) => <span key={i}>{line}</span>)}</p>
              <Link href={`/explore#${slug}`}>Learn More <ArrowRight aria-hidden="true" /><span className="sr-only"> about {title.toLowerCase()}</span></Link>
            </article>
          ))}
        </section>

        <section id="search" className={styles.searchSection} aria-labelledby="search-title">
          <div className={styles.searchIntro}>
            <p className={styles.eyebrow}>Start Your Search Today</p>
            <h2 id="search-title">Find Homes<br />in Central Florida</h2>
            <p>Search thousands of homes, new construction<br className={styles.desktopBreak} /> and upcoming listings — all in one place.</p>
          </div>
          <div className={styles.searchWidget}>
            <div className={styles.tabs} aria-label="Listing type">
              {["Buy", "Rent", "New Construction"].map(tab => <button type="button" key={tab} aria-pressed={mode === tab} onClick={() => setMode(tab)}>{tab}</button>)}
            </div>
            <form className={styles.searchForm} onSubmit={search}>
              <label className={styles.location}><MapPin aria-hidden="true" /><span className="sr-only">City, Neighborhood, ZIP or School</span><input name="location" placeholder="City, Neighborhood, ZIP or School" /></label>
              <label><span className="sr-only">Maximum price</span><select name="price" key={mode} defaultValue=""><option value="">Price</option><option value={mode === "Rent" ? "Up to $1,500/month" : "Up to $300,000"}>{mode === "Rent" ? "$1,500/mo" : "$300,000"}</option><option value={mode === "Rent" ? "Up to $2,500/month" : "Up to $500,000"}>{mode === "Rent" ? "$2,500/mo" : "$500,000"}</option><option value={mode === "Rent" ? "Up to $4,000/month" : "Up to $750,000"}>{mode === "Rent" ? "$4,000/mo" : "$750,000"}</option><option value={mode === "Rent" ? "$4,000+/month" : "$1,000,000+"}>{mode === "Rent" ? "$4,000+/mo" : "$1,000,000+"}</option></select></label>
              <label><span className="sr-only">Bedrooms</span><select name="beds" defaultValue=""><option value="">Beds</option><option>1+ beds</option><option>2+ beds</option><option>3+ beds</option><option>4+ beds</option><option>5+ beds</option></select></label>
              <label><span className="sr-only">Bathrooms</span><select name="baths" defaultValue=""><option value="">Baths</option><option>1+ baths</option><option>2+ baths</option><option>3+ baths</option><option>4+ baths</option></select></label>
              <button className={styles.goldButton} type="submit"><Search aria-hidden="true" /> Search Homes</button>
            </form>
            <div className={styles.quickLinks}><a href={idx.homeUrl}>New Listings</a><Link href="/explore#new-construction">New Construction</Link><a href={idx.homeUrl}>Open Houses</a></div>
          </div>
        </section>

        <section className={styles.explore} aria-labelledby="explore-title">
          <div className={styles.exploreIntro}>
            <p className={styles.eyebrow}>Explore Central Florida</p>
            <h2 id="explore-title">Live Where<br />Opportunity Grows</h2>
            <p>From vibrant cities to charming communities,<br className={styles.desktopBreak} /> Central Florida has a place for everyone.</p>
            <Link className={styles.outlineButton} href="/explore">Explore Central Florida <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className={styles.places}>
            {places.map(place => <Link key={place.slug} href={`/explore?community=${place.slug}#communities`} className={styles.place}><div className={`${styles.placePhoto} ${place.slug === "lake-nona" ? styles.placeLakeNona : place.slug === "apopka" ? styles.placeApopka : ""}`}><Image src={asset(`${place.slug}.jpg`)} alt={`${place.name}, Central Florida`} fill sizes="(max-width: 640px) 50vw, 25vw" /><h3>{place.name}</h3></div><p>{place.tagline}</p></Link>)}
          </div>
        </section>

        <section className={styles.meet} aria-labelledby="meet-title">
          <div className={styles.meetPhoto}><Image src="/paul/paul-headshot.jpg" alt="Paul E., your Central Florida Realtor" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 36vw" /></div>
          <div className={styles.meetCopy}>
            <p className={styles.meetEyebrow}>Meet</p><h2 id="meet-title">PAUL E.</h2>
            <p className={styles.meetTagline}>Realtor. Advisor. Your Advocate.</p>
            <p className={styles.biography}>With over 5 years of experience, I help buyers, sellers, and relocating clients navigate Central Florida with confidence. I specialize in new construction, relocation, and strategic negotiations — always putting my clients’ goals first. Real estate isn’t just what I do, it’s how I serve.</p>
            <Link href="/about" className={styles.goldButton}>Meet Paul <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className={styles.values}>
            <div><Handshake aria-hidden="true" /><p><strong>Client-Focused</strong><span>Always your best interests.</span></p></div>
            <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinejoin="round" aria-hidden="true"><path d="M3 21h18" /><rect x="4" y="13" width="4" height="8" /><rect x="10" y="9" width="4" height="12" /><rect x="16" y="4" width="4" height="17" /></svg><p><strong>Strategic Approach</strong><span>Data-driven. Results-oriented.</span></p></div>
            <div><MapPin aria-hidden="true" /><p><strong>Local Expertise</strong><span>Central Florida is home.</span></p></div>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="cta-title">
          <div className={styles.ctaInner}>
            <div className={styles.ctaCopy}><h2 id="cta-title">Ready to Make a Move?</h2><p>Let’s talk about your goals and create a plan that works for you.</p></div>
            <div className={styles.ctaButtonWrap}><a href={scheduleHref()} className={styles.goldButton}>Schedule a Consultation <ArrowRight aria-hidden="true" /></a></div>
            <div className={styles.brokerage}><Image src={asset("dalton-wade-white.png")} alt="Dalton Wade Real Estate Group" width={2305} height={582} sizes="240px" /><p>Powered by People. Driven by Results.</p></div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.legal}><span>© 2026 Paul E.</span><span>Realtor. &nbsp;All Rights Reserved.</span><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-of-use">Terms of Use</Link><a href="https://www.hud.gov/program_offices/fair_housing_equal_opp" target="_blank" rel="noopener noreferrer">Fair Housing</a></div>
          <p className={styles.signature}>Serving Central Florida<Image src={asset("florida-shape.png")} alt="" width={42} height={42} /></p>
        </div>
      </footer>
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Find your Central Florida home</DialogTitle><DialogDescription>Your preferences: {searchSummary}</DialogDescription></DialogHeader>
          <p className="text-sm leading-relaxed">Continue to Paul’s brokerage website to search current listings and apply your filters, or send these preferences to Paul for a personalized home search.</p>
          <a className={styles.dialogButton} href={idx.homeUrl} target="_blank" rel="noopener noreferrer">Browse live listings <ArrowRight size={16} /></a>
          <a className="text-sm underline" href={`mailto:${site.email}?subject=${encodeURIComponent("My Central Florida home search")}&body=${encodeURIComponent(`Hi Paul, I’m interested in finding a home with these preferences:\n\n${searchSummary}`)}`}>Send my preferences to Paul</a>
        </DialogContent>
      </Dialog>
    </div>
  );
}
