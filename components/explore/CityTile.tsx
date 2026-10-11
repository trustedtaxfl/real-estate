import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Community } from "@/lib/communities";
import styles from "./ExploreReference.module.css";

/** Photo tile with the city name and an arrow, as drawn in the Explore mockup. */
export function CityTile({ community }: { community: Community }) {
  const { name, shortName, image, imageAlt } = community;
  const label = shortName ?? name;
  return (
    <div className={`${styles.city} ${image ? "" : styles.cityNoPhoto} ${label.length > 18 ? styles.cityLong : ""}`}>
      {image
        ? <Image src={image} alt={imageAlt ?? `${name}, Florida`} fill sizes="(max-width: 640px) 50vw, 25vw" />
        : <span className={styles.cityInitial} aria-hidden="true">{name.charAt(0)}</span>}
      <h3>{label}<ArrowRight aria-hidden="true" /></h3>
    </div>
  );
}
