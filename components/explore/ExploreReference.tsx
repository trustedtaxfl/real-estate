import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Hammer } from "lucide-react";
import { ReferenceHeader } from "@/components/reference/ReferenceHeader";
import { ReferenceCta } from "@/components/reference/ReferenceCta";
import { ReferenceFooter } from "@/components/reference/ReferenceFooter";
import { CityTile } from "@/components/explore/CityTile";
import { ExploreCommunityGrid } from "@/components/explore/ExploreCommunityGrid";
import { exploreCommunities } from "@/lib/communities";
import { pathways, type PathwaySlug } from "@/lib/pathways";
import homeStyles from "@/components/home/ReferenceHome.module.css";
import styles from "./ExploreReference.module.css";

/** Explore Central Florida, built from the Page 2 mockup. */
export function ExploreReference() {
  return (
    <div className={homeStyles.page}>
      <a className={homeStyles.skipLink} href="#main-content">Skip to content</a>
      <ReferenceHeader current="/explore" />

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="explore-hero-title">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Explore Central Florida</p>
              <h1 id="explore-hero-title">Communities.<br />Lifestyles.<br /><span>Opportunities.</span></h1>
              <p className={styles.heroLede}>Your guide to buying, building and living<br className={styles.desktopBreak} /> in Central Florida.</p>
            </div>
            <p className={styles.heroScript}><span>A Brighter</span><span>Tomorrow</span><span>Lives Here.</span></p>
          </div>
        </section>

        <section className={styles.journey} aria-labelledby="journey-title">
          <div className={styles.journeyIntro}>
            <div>
              <p className={styles.eyebrowDark}>Your Real Estate Journey</p>
              <h2 id="journey-title">Four Paths. One Trusted Guide.</h2>
            </div>
            <p className={styles.journeyLede}>No matter where you are in your real estate journey, I provide guidance, strategy and support to help you move forward with confidence.</p>
          </div>
          <div className={styles.paths}>
            {pathways.map(p => (
              <article key={p.slug} id={p.slug} className={styles.path}>
                <span className={styles.pathIcon}><PathIcon slug={p.slug} /></span>
                <h3>{p.title}</h3>
                <p className={styles.pathHeadline}>{p.headline}</p>
                <p>{p.body}</p>
                <Link href={`/lets-talk?interest=${encodeURIComponent(p.interest)}#contact`} className={styles.pathLink}>
                  Learn More <ArrowRight aria-hidden="true" /><span className="sr-only"> about {p.title.toLowerCase()}</span>
                </Link>
              </article>
            ))}
          </div>
          <blockquote className={styles.quote}>
            <p>“It’s not just about finding a house — it’s about finding the right place for your next chapter.”</p>
            <footer>— Paul E.</footer>
          </blockquote>
        </section>

        <section id="communities" className={styles.communities} aria-labelledby="communities-title">
          <div className={styles.communitiesIntro}>
            <div>
              <p className={styles.eyebrowDark}>Explore the Communities</p>
              <h2 id="communities-title">Discover Central Florida</h2>
            </div>
            <p>Each community offers its own unique lifestyle, amenities and opportunities.<br className={styles.desktopBreak} /> Click on a city below to learn more and see available homes.</p>
          </div>
          <Suspense fallback={<div className={styles.cities}>{exploreCommunities.map(c => <CityTile key={c.slug} community={c} />)}</div>}>
            <ExploreCommunityGrid />
          </Suspense>
        </section>

        <ReferenceCta
          eyebrow="Not sure which area is right for you?"
          title="Let’s Talk About Your Goals"
          body="I’ll help you compare areas, understand your options and create a plan that fits your lifestyle."
        />
      </main>

      <ReferenceFooter />
    </div>
  );
}

/** Solid icons to match the mockup; the hammer stays a line icon as drawn there. */
function PathIcon({ slug }: { slug: PathwaySlug }) {
  if (slug === "new-construction") return <Hammer aria-hidden="true" />;
  const paths: Record<Exclude<PathwaySlug, "new-construction">, string> = {
    buy: "M12 2.6 1.6 11.4l1.3 1.5L4.6 11.5V21h5.6v-6.2h3.6V21h5.6v-9.5l1.7 1.4 1.3-1.5z",
    sell: "M2.6 12.5V3.8c0-.7.5-1.2 1.2-1.2h8.7c.3 0 .6.1.9.4l8 8c.5.5.5 1.2 0 1.7l-8.7 8.7c-.5.5-1.2.5-1.7 0l-8-8a1.2 1.2 0 0 1-.4-.9zM7.8 5.6a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4z",
    relocate: "M12 1.8a7.6 7.6 0 0 0-7.6 7.6c0 5.6 7.6 12.8 7.6 12.8s7.6-7.2 7.6-12.8A7.6 7.6 0 0 0 12 1.8zm0 4.6a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
  };
  return <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true"><path d={paths[slug]} /></svg>;
}
