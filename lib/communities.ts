/**
 * The twelve featured communities on the Explore page.
 *
 * Copy is transcribed verbatim from the client's "Explore Central Florida -
 * Expanded Community Tile Copy" PDF, including its punctuation. Paul confirmed
 * this city list on 2026-10-10; the Page 2 mockup's list (Winter Park, DeLand,
 * Deltona, Winter Haven) is not used.
 *
 * `image` is optional: a community without a photo renders a designed navy
 * panel, and the Explore grid only lists communities that have one.
 */
export interface Community {
  slug: string;
  name: string;
  /** Short display name for tight tiles and buttons. */
  shortName?: string;
  tagline: string;
  county: string;
  location: string;
  knownFor: string;
  housing: string;
  lifestyle: string;
  gettingAround: string;
  realEstateNote: string;
  /** The "Ask Paul" prompt that ends each expanded panel. */
  ask: string;
  image?: string;
  imageAlt?: string;
  /** True for the four communities previewed on the Home page. */
  featured?: boolean;
}

export const communities: Community[] = [
  {
    slug: "orlando",
    image: "/home-reference/orlando.jpg",
    imageAlt: "Downtown Orlando skyline and the Lake Eola fountain",
    name: "Orlando",
    tagline: "City Energy. Endless Opportunity.",
    county: "Orange County",
    location:
      "At the center of the Central Florida region, with convenient access to major employment centers, entertainment districts, Orlando International Airport and surrounding communities.",
    knownFor:
      "Downtown Orlando, entertainment, dining, arts and culture, lakes, employment opportunities and a wide variety of distinctive neighborhoods.",
    housing:
      "Everything from downtown condos and townhomes to historic properties, established neighborhoods, newer communities and luxury homes.",
    lifestyle:
      "Orlando offers one of Central Florida's widest lifestyle ranges - from active urban living to quiet residential neighborhoods just minutes from the city.",
    gettingAround:
      "Major highways connect Orlando to the surrounding region, while SunRail and LYNX provide additional transportation options. Orlando International Airport makes regional and national travel especially convenient.",
    realEstateNote:
      "Orlando isn't one single housing market. Neighborhoods can differ significantly in price, housing style, commute and lifestyle, making the right location just as important as the home itself.",
    ask: "Not sure which part of Orlando fits you?",
    featured: true,
  },
  {
    slug: "kissimmee",
    image: "/home-reference/kissimmee.jpg",
    imageAlt: "Palm-lined lakefront with a fountain in Kissimmee",
    name: "Kissimmee",
    tagline: "Close to the Magic. Built for More.",
    county: "Osceola County",
    location:
      "Located in Osceola County, immediately south of Orlando and within convenient reach of the region's major attractions and employment corridors.",
    knownFor:
      "Historic Downtown Kissimmee, Lake Tohopekaliga, Kissimmee Lakefront Park and proximity to the Orlando tourism corridor.",
    housing:
      "Established neighborhoods, single-family homes, townhomes, condos and substantial newer development throughout the greater Kissimmee area.",
    lifestyle:
      "A combination of established local community life, lakefront recreation and convenient access to Central Florida's entertainment destinations.",
    gettingAround:
      "Kissimmee offers road access throughout Osceola and Orange counties along with SunRail service. Downtown also has local transportation connections to major destinations.",
    realEstateNote:
      "\"Kissimmee\" covers a very large area. Location can make a major difference in commute times, community feel and proximity to Orlando attractions and employment centers.",
    ask: "Thinking about Kissimmee?",
    featured: true,
  },
  {
    slug: "lake-nona",
    image: "/home-reference/lake-nona.jpg",
    imageAlt: "Lake Nona Town Center with palms and the Wave Hotel",
    name: "Lake Nona",
    tagline: "Innovation. Wellness. What's Next.",
    county: "Orange County",
    location:
      "In southeast Orlando, directly adjacent to Orlando International Airport and convenient to major Central Florida roadways.",
    knownFor:
      "Medical City, health and life sciences, technology, public art, wellness, modern amenities and master-planned development.",
    housing:
      "Newer single-family homes, townhomes, apartments and multiple distinct master-planned neighborhoods with varying amenities and price points.",
    lifestyle:
      "Lake Nona is a large master-planned community built around living, working, learning, recreation, health and innovation, with trails, parks, restaurants, events, healthcare and commercial destinations.",
    gettingAround:
      "Convenient to Orlando International Airport and southeast Orlando, with major roads connecting residents to the broader metro area.",
    realEstateNote:
      "New-construction buyers should compare individual Lake Nona communities, builders, HOA structures, amenities, incentives and included features rather than focusing only on the advertised base price.",
    ask: "Interested in Lake Nona or Medical City?",
    featured: true,
  },
  {
    slug: "apopka",
    image: "/home-reference/apopka.jpg",
    imageAlt: "Apopka lakefront walkway, fountain and clock tower",
    name: "Apopka",
    tagline: "Natural Beauty. Strong Growth.",
    county: "Orange County",
    location:
      "Northwest of Orlando in Orange County, providing access to northwest Orlando, Lake County and surrounding Central Florida communities.",
    knownFor:
      "Natural areas, parks, Lake Apopka, outdoor recreation and expanding residential development.",
    housing:
      "A mixture of established neighborhoods, larger homesites, traditional subdivisions and growing new-construction communities.",
    lifestyle:
      "Apopka can appeal to buyers looking for more space and an outdoors-oriented environment while remaining within the Greater Orlando region.",
    gettingAround:
      "Primarily vehicle-based, with State Road 429 providing an important connection to other parts of Central Florida.",
    realEstateNote:
      "With continued growth, buyers should consider future development, infrastructure, commute and what is planned around a neighborhood - not just what exists today.",
    ask: "Want to explore Apopka?",
    featured: true,
  },
  {
    slug: "st-cloud",
    image: "/explore/st-cloud.jpg",
    imageAlt: "Sunset over a lakefront pier and gazebo in St. Cloud",
    name: "St. Cloud",
    tagline: "Small-Town Feel. Big Possibilities.",
    county: "Osceola County",
    location:
      "In Osceola County, southeast of Kissimmee and south of the Lake Nona/Narcoossee corridor.",
    knownFor:
      "Its historic roots, East Lake Tohopekaliga, residential growth and expanding new-home communities.",
    housing:
      "Established neighborhoods alongside a significant and growing selection of newer subdivisions and new construction.",
    lifestyle:
      "St. Cloud maintains an established community identity while experiencing substantial residential growth.",
    gettingAround:
      "Major routes include U.S. 192, Florida's Turnpike and the Narcoossee corridor. Transportation and congestion are important considerations as the area grows.",
    realEstateNote:
      "St. Cloud is especially important for new-construction buyers. Compare builders, incentives, HOA/CDD costs, lot premiums, included features and commute - not simply base prices.",
    ask: "Considering new construction in St. Cloud?",
  },
  {
    slug: "clermont",
    image: "/explore/clermont.jpg",
    imageAlt: "Aerial view of downtown Clermont and its lakefront marina",
    name: "Clermont",
    tagline: "Hills, Lakes and a Higher Quality of Life.",
    county: "Lake County",
    location:
      "Located west of Orlando in Lake County, with access to Central Florida through major corridors including State Road 50 and U.S. 27.",
    knownFor:
      "Rolling hills, lakes, Lake Minneola, trails, outdoor recreation and Clermont's strong cycling and endurance-sports culture.",
    housing:
      "Established neighborhoods, lake-area homes, gated communities and extensive newer residential and new-construction options.",
    lifestyle:
      "Clermont offers a distinctive combination of hills, lakes, trails, outdoor activity and a growing downtown/waterfront environment.",
    gettingAround:
      "Primarily vehicle-oriented, with State Road 50 and U.S. 27 providing important regional connections.",
    realEstateNote:
      "Clermont covers a sizable area, so buyers should consider commute, elevation, lake access, new development and proximity to daily conveniences - not simply the Clermont mailing address.",
    ask: "Could Clermont fit your lifestyle?",
  },
  {
    slug: "horizon-west",
    image: "/explore/horizon-west.jpg",
    imageAlt: "Palm-lined lakeside shops at Hamlin in Horizon West",
    name: "Horizon West",
    tagline: "New Homes. Connected Living.",
    county: "Orange County",
    location:
      "In southwest Orange County, south of Winter Garden and west of the Walt Disney World area.",
    knownFor:
      "Newer master-planned communities, village-style development, parks, trails and rapid residential growth.",
    housing:
      "New-construction and newer single-family homes, townhomes and planned neighborhoods ranging from entry-level options to upscale communities.",
    lifestyle:
      "Horizon West was designed around interconnected villages, neighborhood centers and a Town Center concept, creating a distinctly newer suburban environment.",
    gettingAround:
      "State Road 429 is a major regional connection, while local roads connect Horizon West with Winter Garden, Windermere and the attractions area.",
    realEstateNote:
      "This is one of the website's most important areas for new-construction clients. Builder, village, HOA/CDD structure, lot location and future surrounding development should all be evaluated before choosing a home.",
    ask: "Want help comparing Horizon West builders?",
  },
  {
    slug: "windermere-dr-phillips",
    image: "/explore/dr-phillips.jpg",
    imageAlt: "Restaurant Row in Dr. Phillips at dusk, with palm-lined streets and outdoor dining",
    name: "Windermere / Dr. Phillips",
    shortName: "Windermere / Dr. Phillips",
    tagline: "Established. Refined. Exceptionally Located.",
    county: "Orange County",
    location:
      "Both are in southwest Orange County. Windermere is centered among the area's lakes and the Butler Chain, while Dr. Phillips sits closer to the I-4, Universal and International Drive corridors.",
    knownFor:
      "Windermere: lakes, boating, the Butler Chain of Lakes, established residential communities and small-town character. Dr. Phillips: Restaurant Row, established communities, dining, recreation and convenient access to southwest Orlando entertainment and employment centers.",
    housing:
      "Established single-family neighborhoods, gated communities, waterfront and luxury properties, townhomes and condos depending on the specific area.",
    lifestyle:
      "Windermere offers a quieter, lake-centered residential environment. Dr. Phillips provides a more centrally connected lifestyle with restaurants, shopping and entertainment close by.",
    gettingAround:
      "Both provide access to southwest Orlando. Windermere is primarily vehicle-oriented, while Dr. Phillips offers convenient road connections toward I-4, downtown Orlando and the attractions corridor.",
    realEstateNote:
      "These areas can appear similar on a map but offer distinctly different lifestyles. Buyers should compare lake access, neighborhood character, HOA requirements, commute and proximity to dining and entertainment.",
    ask: "Not sure which one fits you better?",
  },
  {
    slug: "davenport",
    image: "/explore/davenport.jpg",
    imageAlt: "Davenport town center sign, fountain and palm-lined street",
    name: "Davenport",
    tagline: "Space to Grow. A Place to Belong.",
    county: "Polk County",
    location:
      "In northeast Polk County, southwest of Orlando and near the I-4/U.S. 27 corridor.",
    knownFor:
      "Residential growth, new construction and convenient access to the southwest Orlando tourism and employment corridor.",
    housing:
      "Newer subdivisions, new construction, townhomes and established single-family neighborhoods.",
    lifestyle:
      "Primarily suburban and residential, with continued growth bringing additional communities, services and amenities to the area.",
    gettingAround:
      "U.S. 27 and Interstate 4 are the area's primary regional transportation corridors. Most daily travel is vehicle-dependent.",
    realEstateNote:
      "\"Davenport\" can describe a broad search area. Buyers should pay close attention to the home's exact location, commute, HOA/CDD costs, community amenities and intended property use.",
    ask: "Considering Davenport?",
  },
  {
    slug: "oviedo",
    image: "/explore/oviedo.jpg",
    imageAlt: "Aerial view of the lake and fountain at Oviedo on the Park",
    name: "Oviedo",
    tagline: "Parks, Character and Connected Living.",
    county: "Seminole County",
    location:
      "Northeast of Orlando in Seminole County, convenient to the University of Central Florida and eastern Orlando employment areas.",
    knownFor:
      "Established residential neighborhoods, parks, outdoor recreation, community character and its well-known historic downtown identity.",
    housing:
      "Established single-family neighborhoods, gated communities, townhomes and newer residential development.",
    lifestyle:
      "Oviedo offers an established suburban environment with parks, trails, recreation and community-oriented amenities.",
    gettingAround:
      "State Road 417 provides regional access, with local connections toward UCF, Winter Springs and eastern Orlando.",
    realEstateNote:
      "Oviedo tends to offer a different experience from Central Florida's large new-construction corridors. Buyers should compare established-home condition, neighborhood character, lot size and commute alongside price.",
    ask: "Want to see whether Oviedo fits your move?",
  },
  {
    slug: "sanford",
    image: "/explore/sanford.jpg",
    imageAlt: "Tree-lined riverwalk and marina in downtown Sanford",
    name: "Sanford",
    tagline: "Historic Roots. A Bright Future.",
    county: "Seminole County",
    location:
      "In northern Seminole County on the southern shore of Lake Monroe, with convenient access to I-4 and State Road 417.",
    knownFor:
      "Historic Downtown Sanford, brick-lined streets, Victorian architecture, Lake Monroe, RiverWalk, restaurants, breweries, arts and community events.",
    housing:
      "Historic homes, established residential neighborhoods, townhomes, condos and newer communities throughout the surrounding Sanford market.",
    lifestyle:
      "Sanford combines a genuine historic downtown with waterfront recreation and an active restaurant, arts and entertainment scene.",
    gettingAround:
      "I-4 and SR 417 provide regional access, and Sanford's location places it between Greater Orlando and the Daytona/Atlantic Coast direction.",
    realEstateNote:
      "Sanford gives buyers several very different options - from historic properties near downtown to conventional suburban communities - so property age, condition and neighborhood location deserve careful comparison.",
    ask: "Curious about Historic Sanford or surrounding communities?",
  },
  {
    slug: "winter-garden",
    image: "/explore/winter-garden.jpg",
    imageAlt: "Shops and flower baskets along Plant Street in Winter Garden",
    name: "Winter Garden",
    tagline: "Historic Charm. Modern Living.",
    county: "Orange County",
    location:
      "West of Orlando in Orange County, providing access to both established West Orange County communities and rapidly growing areas to the south.",
    knownFor:
      "Historic Downtown Winter Garden, Plant Street, the West Orange Trail, local restaurants, community events and its blend of historic and newer development.",
    housing:
      "Historic homes, established subdivisions, townhomes, newer communities and upscale residential options.",
    lifestyle:
      "Winter Garden combines a walkable historic downtown with restaurants, events, trails and suburban residential living.",
    gettingAround:
      "Convenient to State Road 50, Florida's Turnpike and State Road 429, with the West Orange Trail providing recreational pedestrian and bicycle connectivity.",
    realEstateNote:
      "Winter Garden includes very different housing environments. Buyers should distinguish between historic/established Winter Garden and newer development extending toward Horizon West.",
    ask: "Want to compare Winter Garden and Horizon West?",
  },
];

export const featuredCommunities = communities.filter((c) => c.featured);

export const communityFacts: { key: keyof Community; label: string }[] = [
  { key: "location", label: "Location" },
  { key: "knownFor", label: "Known For" },
  { key: "housing", label: "Housing" },
  { key: "lifestyle", label: "Lifestyle" },
  { key: "gettingAround", label: "Getting Around" },
  { key: "realEstateNote", label: "Real Estate Note" },
];

/** Explore grid order, as listed in the client's community copy PDF. */
const exploreOrder = [
  "orlando", "kissimmee", "clermont", "winter-garden", "st-cloud", "apopka",
  "lake-nona", "horizon-west", "davenport", "oviedo", "sanford", "windermere-dr-phillips",
];

/** Communities shown on the Explore grid, in the PDF's order: only those with a supplied photo. */
export const exploreCommunities = exploreOrder
  .map((slug) => communities.find((c) => c.slug === slug))
  .filter((c): c is Community => !!c?.image);
