/**
 * The website's original content. It is loaded into the CMS the first time the
 * database is set up (see src/migrations), and is also used as a safety net if
 * the CMS can't be reached.
 */

const INSTAGRAM = 'https://www.instagram.com/othmanboularas/'
const EMAIL = 'othmanboularas@gmail.com'

const img = (path: string) => ({ file: null, path })

export const siteDefaults = {
  headerLogo: img('/assets/othman-logo-light.png'),
  headerLogoAlt: 'Othman Boularas official logo',
  nav: [
    { label: 'About', link: '#about', highlight: false },
    { label: 'Achievements', link: '#achievements', highlight: false },
    { label: 'Journey', link: '#journey', highlight: false },
    { label: 'Media', link: '#press', highlight: false },
    { label: 'Gallery', link: '#gallery', highlight: false },
    { label: 'Sponsorship', link: '/sponsorship', highlight: false },
    { label: 'Connect', link: '#contact', highlight: true },
  ],
  copyrightName: 'Othman Boularas',
  footerTagline: 'QATAR 🇶🇦 · TAEKWONDO POOMSAE',
  brandCredit: {
    text: 'Brand identity concept © Othman Boularas ·',
    linkLabel: 'View brand guidelines',
    document: img('/assets/brand-guidelines.pdf'),
    suffix:
      '. Korean calligraphic artwork is a concept mockup pending final vector artwork and linguistic review.',
  },
}

export const homeDefaults = {
  seo: {
    metaTitle: 'Othman Boularas | Qatar Taekwondo Athlete',
    metaDescription:
      'Official athlete portfolio of Othman Boularas — Qatar Taekwondo Poomsae world gold medalist, sixth-dan black belt and international competitor.',
  },
  hero: {
    signature: img('/assets/othman-logo-light.png'),
    signatureAlt: 'Othman Boularas official Korean calligraphy logo',
    background: img('/assets/athlete-1000371282.webp'),
    brandLine: 'Qatari excellence · Korean discipline · Global ambition',
    eyebrow: 'Qatar National Team · Taekwondo Poomsae',
    firstName: 'OTHMAN',
    lastName: 'BOULARAS',
    intro:
      'World gold medalist. International competitor. A journey defined by precision, discipline, and the pride of representing Qatar.',
    primaryButton: { label: 'Explore Achievements ↗', link: '#achievements' },
    secondaryButton: { label: 'Become a Sponsor ↗', link: '/sponsorship' },
    sideText: 'DOHA · QATAR / WORLD STAGE',
  },
  highlights: {
    ribbon: [
      { word: 'Discipline' },
      { word: 'Balance' },
      { word: 'Strength' },
      { word: 'Focus' },
      { word: 'Excellence' },
    ],
    stats: [
      { value: '2018', label: 'World Beach Gold' },
      { value: '6th', label: 'Dan Black Belt' },
      { value: '#4', label: 'World Ranking · 2023 (Historical)' },
      { value: '5th', label: 'Hong Kong · 2024' },
    ],
    affiliationsTitle: 'REPRESENTING QATAR · OFFICIAL SPORTING BODIES',
    affiliations: [
      {
        name: 'Qatar Olympic Committee',
        url: 'https://www.olympic.qa/',
        logo: img('/assets/qatar-olympic-logo.png'),
        logoAlt: 'Qatar Olympic Committee logo',
      },
      {
        name: 'Qatar Taekwondo, Judo & Karate Federation',
        url: 'https://www.olympic.qa/index.php/qatar-taekwondo-judo-karate-federation',
        logo: img('/assets/federation-logo.png'),
        logoAlt: 'Qatar Taekwondo Judo and Karate Federation logo',
      },
    ],
    affiliationsNote:
      'Sporting affiliations only. Logo display does not imply sponsorship or endorsement.',
  },
  about: {
    photo: img('/assets/athlete-1000371281.webp'),
    caption: 'A life in movement · Since 1998',
    eyebrow: '01 / The Athlete',
    heading: 'BUILT BY\nDISCIPLINE.',
    paragraphs: [
      {
        text: '**Othman Boularas** is a Qatari Taekwondo Poomsae athlete and sixth-dan black belt who has represented Qatar on the international stage. His journey began at Al Arabi Sports Club in 1998, growing into a career marked by world and Asian championship success.',
      },
      {
        text: "In 2018, he won gold in the men's over-30 individual event at the World Taekwondo Beach Championships in Greece — a landmark moment for Qatar. His career continues to reflect the artistry, control and competitive spirit of Poomsae.",
      },
    ],
    details: [
      { label: 'Nationality', value: 'Qatar 🇶🇦' },
      { label: 'Discipline', value: 'Taekwondo · Poomsae' },
      { label: 'Martial Arts Rank', value: '6th Dan Black Belt' },
      { label: 'Journey Began', value: '1998 · Al Arabi SC' },
    ],
    buttonLabel: 'Official Olympic Profile ↗',
    buttonLink: 'https://www.olympic.qa/index.php/othman-boularras',
  },
  achievements: {
    eyebrow: '02 / Career Highlights',
    heading: 'THE RECORD.',
    intro:
      "International podium finishes, historic milestones and performances against the world's best.",
    cards: [
      {
        tag: 'Gold · World Championship',
        year: '2018',
        title: 'World Beach Taekwondo Champion',
        description: "Men's over-30 individual Poomsae · Rhodes, Greece",
        featured: true,
      },
      {
        tag: 'Bronze · World-Level Event',
        year: '2021',
        title: 'Online World Poomsae Challenge 3',
        description: 'Under-40 bronze medal · International online championship',
        featured: false,
      },
      {
        tag: 'World Championship Finish',
        year: '2024',
        title: '5th Place · Hong Kong',
        description: 'World Taekwondo Poomsae Championships',
        featured: false,
      },
      {
        tag: 'Asian Championship',
        year: '2019',
        title: 'Asian Bronze · Indonesia',
        description: 'Continental podium finish reported by Qatar News Agency',
        featured: false,
      },
      {
        tag: 'Asian Championship',
        year: '2020',
        title: 'Asian Bronze · Lebanon',
        description: 'Continental podium finish reported by Qatar News Agency',
        featured: false,
      },
      {
        tag: 'World Standing · Historical',
        year: '#04',
        title: 'World Ranking · May 2023',
        description: 'Ranking milestone reported by the Qatar Olympic Committee',
        featured: false,
      },
    ],
  },
  record: {
    eyebrow: '03 / Federation-certified results',
    heading: 'THE COMPLETE\nRECORD.',
    intro:
      'Selected achievements transcribed from the Qatar Taekwondo, Judo & Karate Federation letter dated 25 November 2024. Event classifications follow the letter.',
    groups: [
      {
        title: 'World competitions',
        column: 'left',
        results:
          '2018 — World Beach Championship: Gold\n2021 — World Online Championship: Bronze\n2023 — World Online Championship: Bronze\n2022 — World Championship: 5th\n2020 — World Championship: 5th',
      },
      {
        title: 'Asian competitions',
        column: 'left',
        results:
          '2018 — Asian Championship: Bronze\n2021 — Asian Championship: Bronze\n2022 — Asian Championship: Bronze\n2016 — Asian Championship: 5th',
      },
      {
        title: 'Arab & Gulf competitions',
        column: 'right',
        results:
          '2003 — Gulf Championship: Gold\n2014 — Arab Championship: Silver\n2020 — Arab Championship: Gold\n2005 — Arab Championship: Silver\n2005 — Arab Police Championship: Bronze\n2008 — Arab Police Championship: Bronze',
      },
      {
        title: 'International opens',
        column: 'right',
        results: '2015, 2016, 2017, 2021, 2023 — Gold\n2023 — Bronze\n2004, 2014, 2019 — Bronze',
      },
      {
        title: 'World Presidents Cup',
        column: 'right',
        results: '2020, 2023 — Silver',
      },
    ],
    documents: [
      { label: 'Federation letter · Page 1 ↗', document: img('/assets/federation-letter-page-1.png') },
      { label: 'Federation letter · Page 2 ↗', document: img('/assets/federation-letter-page-2.png') },
    ],
    note: 'Some championship names and results may require confirmation of their official English translations before external publication.',
  },
  journey: {
    eyebrow: '03 / The Journey',
    heading: 'EVERY STEP\nMATTERS.',
    events: [
      {
        time: '1998',
        title: 'The beginning',
        text: 'Started practicing Taekwondo at Al Arabi Sports Club in Qatar.',
      },
      {
        time: '2018',
        title: 'Historic world gold',
        text: "Won the World Beach Taekwondo Championships in Greece, men's over-30 individual event.",
      },
      {
        time: '2019–2021',
        title: 'Continental and world podiums',
        text: 'Asian bronze medals and a bronze at the 2021 online World Poomsae Challenge 3.',
      },
      {
        time: '2023',
        title: 'Recognition at the highest level',
        text: 'Reported fourth in world rankings and earned the sixth-dan black belt in South Korea.',
      },
      {
        time: '2024',
        title: "Among the world's best",
        text: 'Fifth place at the World Taekwondo Poomsae Championships in Hong Kong.',
      },
    ],
  },
  quote: {
    kicker: 'EXCELLENCE BEYOND THE MAT',
    label: 'THE MINDSET',
    quote: 'PRECISION IN EVERY MOVEMENT.\nPRIDE IN EVERY PERFORMANCE.',
    attribution: 'OTHMAN BOULARAS · TEAM QATAR',
  },
  press: {
    eyebrow: '04 / In The Spotlight',
    heading: 'MEDIA &\nRECOGNITION.',
    items: [
      {
        source: 'QATAR OLYMPIC COMMITTEE · 2018',
        title: 'World Beach Championship Gold ↗',
        url: 'https://www.olympic.qa/index.php/media-center/boularas-wins-gold-medal-world-taekwondo-beach-championships',
      },
      {
        source: 'QATAR NEWS AGENCY · 2021',
        title: 'World Poomsae Bronze ↗',
        url: "https://qna.org.qa/en/news/news-details?date=1%2F11%2F2021&id=0037-qatar%27s-national-team-player-othman-boularas-wins-bronze-medal-at-world-taekwondo-championship",
      },
      {
        source: 'QATAR OLYMPIC COMMITTEE · 2023',
        title: 'Fourth in World Rankings ↗',
        url: 'https://www.olympic.qa/index.php/media-center/qatars-boularas-advances-fourth-place-world-taekwondo-rankings',
      },
    ],
    note: 'Achievements are attributed to their original reporting dates. Historical rankings are not current rankings.',
  },
  sponsorBanner: {
    eyebrow: '05 / Corporate partnerships',
    heading: 'YOUR BRAND.\nOUR JOURNEY.',
    text: 'Partner with an international athlete representing Qatar. Explore tailored packages, campaign collaborations, appearances and community impact.',
    buttonLabel: 'Explore Sponsorship ↗',
    buttonLink: '/sponsorship',
  },
  gallery: {
    eyebrow: 'Authentic performance',
    heading: 'THE ATHLETE\nIN MOTION.',
    intro: 'Competition, precision and performance — captured on the mat.',
    photos: [1279, 1280, 1281, 1282, 1283, 1284].map((n, i) => ({
      image: img(`/assets/athlete-100037${n}.webp`),
      alt: `Othman Boularas Taekwondo competition photograph ${i + 1}`,
      caption: 'Performance / Poomsae',
    })),
  },
  featured: {
    eyebrow: '06 / Selected moments',
    heading: 'FEATURED\nMOMENTS.',
    intro:
      'Six highlights from Othman’s competition photography. Individual Instagram posts can be linked as soon as their exact URLs are provided.',
    profileUrl: INSTAGRAM,
    buttonLabel: 'Instagram @othmanboularas ↗',
    cards: [
      ['1282', 'World championship moments', 'International competition highlights'],
      ['1280', 'Poomsae in motion', 'Technique, precision and performance'],
      ['1284', 'Representing Qatar', 'Pride in every performance'],
      ['1281', 'The discipline behind success', 'Training and preparation'],
      ['1283', 'The athlete journey', 'Moments from the competition floor'],
      ['1279', 'Beyond the mat', 'Follow the latest athlete updates'],
    ].map(([n, title, text]) => ({
      image: img(`/assets/athlete-100037${n}.webp`),
      category: 'Featured athlete moment',
      title,
      text,
      postUrl: '',
    })),
    note: 'These are original athlete photographs, not verified Instagram post embeds. Cards without their own Instagram post link open the official Instagram profile.',
  },
  contact: {
    eyebrow: '05 / Partnerships · Media · Community',
    heading: 'BE PART OF\nTHE JOURNEY.',
    text: 'For sponsorships, collaborations, interviews and speaking opportunities, connect through the official athlete channels.',
    buttonLabel: 'Email for Partnerships ↗',
    email: EMAIL,
    emailSubject: 'Othman Boularas - Business Enquiry',
    socials: [
      { label: 'Instagram @othmanboularas ↗', url: INSTAGRAM },
      { label: 'Email Othman ↗', url: `mailto:${EMAIL}` },
      { label: 'World Taekwondo ↗', url: 'https://www.worldtaekwondo.org/' },
    ],
    note: `For sponsorship and media enquiries: ${EMAIL}`,
  },
}

export const sponsorshipDefaults = {
  seo: {
    metaTitle: 'Sponsorship | Othman Boularas',
    metaDescription:
      'Corporate sponsorship and athlete partnership opportunities with Qatar Taekwondo athlete Othman Boularas.',
  },
  top: {
    backLabel: '← BACK TO ATHLETE SITE',
    ribbonLeft: 'Excellence Beyond the Mat',
    ribbonRight: 'Qatar × Korea × World',
  },
  hero: {
    background: img('/assets/athlete-1000371283.webp'),
    eyebrow: 'Official athlete partnership opportunities · Qatar',
    heading: 'PARTNER\nWITH PURPOSE.',
    text: 'Align your brand with a world gold medalist, a historic top-four world-ranking achievement and a sporting journey shaped by discipline, ambition and international competition.',
    buttonLabel: 'Start a Sponsorship Conversation ↗',
    logos: [
      { image: img('/assets/qatar-olympic-logo.png'), alt: 'Qatar Olympic Committee emblem' },
      {
        image: img('/assets/federation-logo.png'),
        alt: 'Qatar Taekwondo Judo and Karate Federation emblem',
      },
    ],
    logosNote:
      'Sporting bodies shown for affiliation and historical achievement verification only; not listed as commercial sponsors.',
  },
  numbers: {
    items: [
      { value: '2018', label: 'World Beach Taekwondo Gold' },
      { value: '#4', label: 'Historical World Ranking · 2023' },
      { value: '2024', label: 'World Poomsae Championship · 5th Place' },
    ],
  },
  partnership: {
    eyebrow: 'Partnership value',
    heading: 'MORE THAN\nA LOGO.',
    text: 'Potential partnerships can combine athlete storytelling, social content, brand campaigns, sports demonstrations, corporate appearances and youth-focused initiatives. Deliverables, exclusivity, rights and pricing are agreed individually.',
    tiers: [
      {
        eyebrow: '01 / Supporter',
        title: 'Community Partner',
        featured: false,
        points: 'Support athlete development\nSelected acknowledgements\nCommunity engagement options',
      },
      {
        eyebrow: '02 / Featured',
        title: 'Performance Partner',
        featured: true,
        points: 'Co-created digital campaigns\nBrand storytelling opportunities\nEvent and appearance options',
      },
      {
        eyebrow: '03 / Premium',
        title: 'Principal Partner',
        featured: false,
        points: 'Tailored long-term collaboration\nCampaign and activation planning\nNegotiated category exclusivity',
      },
    ],
    footnote:
      'Illustrative packages only. No audience metrics, sponsorship rights, endorsement or guaranteed exposure are asserted.',
  },
  collaborate: {
    eyebrow: 'Ways to collaborate',
    heading: 'BUILT AROUND\nYOUR BRAND.',
    text: 'Sports & wellness · Technology · Travel · Education · Lifestyle · Corporate social responsibility · Youth development.',
  },
  inquiry: {
    eyebrow: 'Commercial enquiries',
    heading: "LET'S BUILD\nSOMETHING MEANINGFUL.",
    text: 'Complete the form to prepare a sponsorship enquiry email. Your email app will open for you to review and send it. No information is stored on this website.',
    recipientEmail: EMAIL,
    interests: [
      { label: 'Principal Partner' },
      { label: 'Performance Partner' },
      { label: 'Community Partner' },
      { label: 'Custom Collaboration' },
    ],
    messagePlaceholder: 'Tell us about your brand, objectives and timing...',
    buttonLabel: 'Prepare Sponsorship Enquiry ↗',
  },
  footerText:
    'Othman Boularas · Qatar · Sponsorship enquiries are subject to agreement and applicable federation rules.',
}
