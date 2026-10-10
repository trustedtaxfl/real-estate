import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";
import styles from "./reference.module.css";

/** Footer from the inner-page mockups: logo, nav, brokerage marks, then the copyright row. */
export function ReferenceFooter({ policies = false }: { policies?: boolean }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <Link href="/" className={styles.footerLogo} aria-label="Paul E the Realtor — Home">
          <Image src="/home-reference/logo-horizontal.png" alt="PaulEtheRealtor. Real Estate. Real Expertise. Real Results." width={1794} height={410} sizes="220px" />
        </Link>
        <nav className={styles.footerNav} aria-label="Footer navigation">
          {nav.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className={styles.footerMarks}>
          <Image src="/home-reference/dalton-wade.png" alt="Dalton Wade Real Estate Group" width={2305} height={582} sizes="170px" />
          <EqualHousingMark />
        </div>
        <p className={styles.footerLegal}>
          <span>© 2026 {site.name}</span><span>All Rights Reserved.</span>
          {policies && <><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-of-use">Terms of Use</Link></>}
        </p>
        <p className={styles.footerLine}>{site.footerLine}</p>
      </div>
    </footer>
  );
}

function EqualHousingMark() {
  return (
    <svg className={styles.eho} viewBox="0 0 40 44" role="img" aria-label="Equal Housing Opportunity">
      <path d="M20 2 2 13v4.5h3.2V33h29.6V17.5H38V13z" fill="currentColor" />
      <rect x="10" y="17" width="20" height="12.5" fill="#fff" />
      <rect x="13" y="19.8" width="14" height="2.6" fill="currentColor" />
      <rect x="13" y="24.4" width="14" height="2.6" fill="currentColor" />
      <text x="20" y="38.4" textAnchor="middle" fontSize="4.3" fontWeight="700" fill="currentColor" fontFamily="Arial, sans-serif">EQUAL HOUSING</text>
      <text x="20" y="43.2" textAnchor="middle" fontSize="4.3" fontWeight="700" fill="currentColor" fontFamily="Arial, sans-serif">OPPORTUNITY</text>
    </svg>
  );
}
