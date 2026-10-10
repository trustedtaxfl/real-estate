import { ArrowRight, CalendarDays, Mail, Phone } from "lucide-react";
import { scheduleHref, site } from "@/lib/site";
import styles from "./reference.module.css";

interface ReferenceCtaProps {
  eyebrow: string;
  title: string;
  body: string;
  /** Show the phone and email under the button (the Let's Talk mockup leaves them out). */
  contact?: boolean;
}

/** Navy "Let's Talk About Your Goals" band from the inner-page mockups. */
export function ReferenceCta({ eyebrow, title, body, contact = true }: ReferenceCtaProps) {
  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      <div className={styles.ctaInner}>
        <div className={styles.ctaCopy}>
          <p className={styles.ctaEyebrow}>{eyebrow}</p>
          <h2 id="cta-title">{title}</h2>
          <p>{body}</p>
        </div>
        <div className={styles.ctaActions}>
          <a href={scheduleHref()} className={styles.ctaButton} data-analytics="cta-schedule">
            <CalendarDays aria-hidden="true" />Schedule a Consultation<ArrowRight aria-hidden="true" />
          </a>
          {contact && (
            <div className={styles.ctaContact}>
              <a href={site.phoneHref}><Phone aria-hidden="true" />{site.phone}</a>
              <a href={`mailto:${site.email}`}><Mail aria-hidden="true" />{site.email}</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
