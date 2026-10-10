import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, MessageSquareMore, ClipboardPen, Settings, Users } from "lucide-react";
import { ReferenceHeader } from "@/components/reference/ReferenceHeader";
import { ReferenceCta } from "@/components/reference/ReferenceCta";
import { ReferenceFooter } from "@/components/reference/ReferenceFooter";
import homeStyles from "@/components/home/ReferenceHome.module.css";
import styles from "./AboutReference.module.css";

const steps = [
  { title: "Listen First", body: "Understand your goals and needs.", Icon: MessageSquareMore },
  { title: "Build the Strategy", body: "Create a plan tailored to you.", Icon: ClipboardPen },
  { title: "Explain the Process", body: "Make sure you know what’s happening.", Icon: Users },
  { title: "Stay Involved", body: "Remain engaged from start to closing.", Icon: Settings },
  { title: "Adjust When Needed", body: "Respond when circumstances change.", Icon: BarsIcon },
];

const moments = [
  { src: "/paul/client-moment-1.jpg", alt: "Paul with a young family holding a Said Yes to the Address sign", position: "center 40%" },
  { src: "/paul/client-moment-3.jpg", alt: "Paul and clients celebrating a sold home in a Maronda Homes frame", position: "center 30%" },
  { src: "/paul/client-moment-2.jpg", alt: "Paul with clients holding a Just Sold sign at closing", position: "center 30%" },
  { src: "/paul/client-moment-5.jpg", alt: "A family holding a Just Sold sign and flowers with Paul", position: "center 35%" },
  { src: "/paul/client-moment-6.jpg", alt: "Paul with a client holding a Said Yes to the Address sign in their new home", position: "center 35%" },
];

const pillars = [
  { title: "Family First", body: "Faith, family and balance keep me grounded.", Icon: Users },
  { title: "Youth Sports", body: "Coaching and mentoring the next generation.", Icon: BasketballIcon },
  { title: "Stronger Communities", body: "Investing my time to make a positive impact beyond real estate.", Icon: Heart },
];

/** About Paul, built from the Page 3 mockup. */
export function AboutReference() {
  return (
    <div className={homeStyles.page}>
      <a className={homeStyles.skipLink} href="#main-content">Skip to content</a>
      <ReferenceHeader current="/about" />

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="about-hero-title">
          <div className={styles.heroPhoto}>
            <Image src="/about/paul-hero.jpg" alt="Paul E. in a blue blazer outside a Central Florida home" fill priority sizes="(max-width: 999px) 100vw, 70vw" />
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrowGold}>About Paul</p>
            <h1 id="about-hero-title">More Than a Realtor.<br /><span>A True Advocate.</span></h1>
            <span className={styles.rule} aria-hidden="true" />
            <p className={styles.heroLede}>I help buyers, sellers, and relocating clients navigate Central Florida with confidence. From new construction to established neighborhoods, I’m committed to making the process simple, informed and rewarding.</p>
            <Link href="/lets-talk" className={`${homeStyles.goldButton} ${styles.heroButton}`}>Let’s Talk <ArrowRight aria-hidden="true" /></Link>
          </div>
          <p className={styles.heroScript} aria-hidden="true"><span>People.</span><span>Places.</span><span>Possibilities.</span></p>
        </section>

        <section className={styles.story} aria-labelledby="story-title">
          <div className={styles.storyMain}>
            <p className={styles.eyebrow}>My Story</p>
            <h2 id="story-title">Rooted in Real Estate.<br />Driven by People.</h2>
            <p className={styles.storyBody}>I’m a second-generation Realtor with over 5 years of experience, serving buyers, sellers, and relocating clients across Central Florida. Real estate has always been part of my life, and I’ve seen firsthand how the right guidance can change lives. My goal is simple — to educate, advocate and deliver results while making the experience as stress-free as possible. I don’t stop until my clients are happy.</p>
            <div className={styles.howIWork}>
              <h3 className={styles.eyebrow}>How I Work</h3>
              <ol className={styles.steps}>
                {steps.map(({ title, body, Icon }) => (
                  <li key={title}>
                    <span className={styles.stepIcon}><Icon aria-hidden="true" /></span>
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <figure className={styles.construction}>
            <Image src="/paul/paul-construction.jpg" alt="Paul in a hard hat at a new-construction framing site" fill sizes="(max-width: 999px) 100vw, 32vw" />
            <figcaption>
              <strong>New Construction Expertise</strong>
              <span className={styles.rule} aria-hidden="true" />
              <span>Guiding you from blueprints to keys.</span>
            </figcaption>
          </figure>
        </section>

        <section className={styles.moments} aria-labelledby="moments-title">
          <div className={styles.momentsIntro}>
            <div>
              <p className={styles.eyebrow}>Client Moments</p>
              <h2 id="moments-title">Real Clients. Real Moments.</h2>
            </div>
            <p>Every move has a story. Here are a few of the amazing clients I’ve been fortunate to be part of.</p>
          </div>
          <ul className={styles.momentGrid}>
            {moments.map(m => (
              <li key={m.src}><Image src={m.src} alt={m.alt} fill sizes="(max-width: 640px) 50vw, 20vw" style={{ objectPosition: m.position }} /></li>
            ))}
          </ul>
        </section>

        <section className={styles.community} aria-labelledby="community-title">
          <div className={styles.communityCopy}>
            <p className={styles.eyebrow}>More Than Real Estate</p>
            <h2 id="community-title">A Life Rooted in Community.</h2>
            <p>I’m proud to call Central Florida home. When I’m not working with clients, you’ll find me spending time with family, mentoring young athletes, and giving back to the community. Real estate allows me to do what I love — help people create a better future, right here in the places we call home.</p>
          </div>
          <ul className={styles.pillars}>
            {pillars.map(({ title, body, Icon }) => (
              <li key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        </section>

        <ReferenceCta
          eyebrow="Ready to make a move?"
          title="Let’s Talk About Your Goals."
          body="Whether you’re buying, selling, building or relocating, I’m here to help."
        />
      </main>

      <ReferenceFooter policies />
    </div>
  );
}

function BarsIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...props}><rect x="4" y="13" width="4" height="8" rx=".6" /><rect x="10" y="9" width="4" height="12" rx=".6" /><rect x="16" y="4" width="4" height="17" rx=".6" /></svg>;
}

function BasketballIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="9.5" /><path d="M12 2.5v19M2.5 12h19" /><path d="M5.3 5.3c2.9 2.6 2.9 10.8 0 13.4M18.7 5.3c-2.9 2.6-2.9 10.8 0 13.4" />
    </svg>
  );
}
