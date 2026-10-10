import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Hammer, House, Mail, MapPin, MapPinned, Phone, Users } from "lucide-react";
import { ReferenceHeader } from "@/components/reference/ReferenceHeader";
import { ReferenceCta } from "@/components/reference/ReferenceCta";
import { ReferenceFooter } from "@/components/reference/ReferenceFooter";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialLinks } from "@/components/site/SocialLinks";
import { isExternal, scheduleHref, site } from "@/lib/site";
import homeStyles from "@/components/home/ReferenceHome.module.css";
import styles from "./LetsTalkReference.module.css";

const ways = [
  { slug: "buy", title: "Buy a Home", line: "Let’s find the right home for your lifestyle.", Icon: House },
  { slug: "sell", title: "Sell a Home", line: "Get top value with a strategic plan.", Icon: ForSaleIcon },
  { slug: "new-construction", title: "New Construction", line: "Expert guidance from blueprint to closing.", Icon: Hammer },
  { slug: "relocate", title: "Relocate to Florida", line: "A smoother move starts with the right partner.", Icon: MapPinned },
];

/** Let's Talk, built from the Page 4 mockup. */
export function LetsTalkReference() {
  const schedule = scheduleHref();
  const direct = [
    { Icon: Phone, title: site.phone, body: "Call or Text", href: site.phoneHref, analytics: "phone-click" },
    { Icon: Mail, title: site.email, body: "Email Me", href: `mailto:${site.email}` },
    { Icon: CalendarDays, title: "Schedule a Consultation", body: "Pick a time that works for you", href: schedule, analytics: "schedule-consultation" },
    { Icon: MapPin, title: site.location, body: site.serviceArea },
  ];

  return (
    <div className={homeStyles.page}>
      <a className={homeStyles.skipLink} href="#main-content">Skip to content</a>
      <ReferenceHeader current="/lets-talk" />

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="talk-hero-title">
          <Image className={styles.heroImage} src="/lets-talk/hero.jpg" alt="Paul E. in a tan blazer beside Lake Eola and the Orlando skyline" fill priority sizes="(max-width: 639px) 1px, 100vw" />
          {/* Phones show a full-resolution crop around Paul, served as-is so it stays sharp at the tall phone crop. */}
          <Image className={styles.heroImageMobile} src="/lets-talk/hero-mobile.jpg" alt="" fill unoptimized loading="lazy" />
          <div className={styles.heroCopy}>
            <p className={styles.eyebrowGold}>Let’s Talk</p>
            <h1 id="talk-hero-title">Your Next Chapter<br /><span>Starts Here.</span></h1>
            <p className={styles.heroLede}>Whether you’re buying, selling, building, or relocating, I’m here to help. Let’s talk about your goals and create a plan that works for you.</p>
            <p className={styles.heroTagline} aria-hidden="true">People. Places. Possibilities.</p>
          </div>
          <p className={styles.heroScript} aria-hidden="true"><span>Let’s</span><span>Make It</span><span>Happen.</span></p>
        </section>

        <section id="contact" className={styles.contact} aria-labelledby="contact-title">
          <div className={styles.formCol}>
            <p className={styles.eyebrow}>Get in Touch</p>
            <h2 id="contact-title">Send a Message</h2>
            <p className={styles.formIntro}>Fill out the form below and I’ll get back to you as soon as possible.</p>
            <ContactForm variant="reference" />
          </div>

          <div className={styles.directCol}>
            <h3 className={styles.eyebrow}>Prefer to Connect Directly?</h3>
            <ul className={styles.direct}>
              {direct.map(({ Icon, title, body, href, analytics }) => {
                const inner = <><span className={styles.directIcon}><Icon aria-hidden="true" /></span><span><strong>{title}</strong><span>{body}</span></span></>;
                return (
                  <li key={title}>
                    {href
                      ? <a href={href} target={isExternal(href) ? "_blank" : undefined} rel={isExternal(href) ? "noopener noreferrer" : undefined} data-analytics={analytics}>{inner}</a>
                      : <div>{inner}</div>}
                  </li>
                );
              })}
              <li>
                <div>
                  <span className={styles.directIcon}><Users aria-hidden="true" /></span>
                  <span>
                    <strong>Let’s Stay Connected</strong>
                    <span>Follow for the latest listings, market updates and more</span>
                    <SocialLinks className={styles.socials} iconClassName={styles.socialIcon} />
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <aside className={styles.asideCol} aria-label="Service area">
            <figure className={styles.areaCard}>
              <Image src="/home-reference/orlando.jpg" alt="Lake Eola fountain and the downtown Orlando skyline" fill sizes="(max-width: 999px) 100vw, 26vw" />
              <figcaption><MapPin aria-hidden="true" /><span>Central Florida<br />and Beyond</span></figcaption>
            </figure>
            <div className={styles.reach}>
              <MapPin aria-hidden="true" />
              <div>
                <h3>Local Expertise.<br />Nationwide Reach.</h3>
                <p>Based in Orlando and specializing in Central Florida, I also work with buyers, sellers, and investors relocating from across the country.</p>
              </div>
            </div>
          </aside>
        </section>

        <section className={styles.ways} aria-labelledby="ways-title">
          <h2 id="ways-title" className="sr-only">Ways I can help</h2>
          <ul>
            {ways.map(({ slug, title, line, Icon }) => (
              <li key={slug}>
                <Link href={`/explore#${slug}`}>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{line}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <ReferenceCta
          eyebrow="Ready to make a move?"
          title="Let’s Talk About Your Goals."
          body="Every great move starts with a conversation."
          contact={false}
        />
      </main>

      <ReferenceFooter policies />
    </div>
  );
}

/** Hanging "For Sale" sign, as drawn in the mockup. */
function ForSaleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" {...props}>
      <path d="M3.5 22V3.5h17" /><path d="M8.5 3.5v3M17.5 3.5v3" />
      <rect x="6.5" y="6.5" width="13" height="10" rx=".6" />
      <text x="13" y="11" textAnchor="middle" fontSize="3.6" fontWeight="700" fill="currentColor" stroke="none" fontFamily="Arial, sans-serif">FOR</text>
      <text x="13" y="15.1" textAnchor="middle" fontSize="3.6" fontWeight="700" fill="currentColor" stroke="none" fontFamily="Arial, sans-serif">SALE</text>
    </svg>
  );
}
