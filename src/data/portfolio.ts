// Everything the calendar shows lives here. Each event repeats weekly on `day`
// (0 = Sunday … 6 = Saturday). Times are minutes after midnight.

export type CalendarId =
  | 'work'
  | 'research'
  | 'founder'
  | 'leadership'
  | 'projects'
  | 'education'
  | 'personal';

export type CalendarInfo = {
  id: CalendarId;
  name: string;
  color: string;
};

export const CALENDARS: CalendarInfo[] = [
  { id: 'work', name: 'Work', color: '#E0457B' },
  { id: 'research', name: 'Research', color: '#8E5CD9' },
  { id: 'founder', name: 'Founder', color: '#F08A24' },
  { id: 'leadership', name: 'Leadership', color: '#2FA36B' },
  { id: 'projects', name: 'Projects', color: '#2F7FE0' },
  { id: 'education', name: 'Education', color: '#14A3A8' },
  { id: 'personal', name: 'Personal', color: '#D9A21B' },
];

export const calendarById = (id: CalendarId) =>
  CALENDARS.find((c) => c.id === id) as CalendarInfo;

export type EventLink = { label: string; url: string };
export type EventAttachment = { name: string; path: string };

export type PortfolioEvent = {
  id: string;
  title: string;
  calendar: CalendarId;
  day: number;
  start?: number;
  end?: number;
  allDay?: boolean;
  location?: string;
  role?: string;
  period?: string;
  summary?: string;
  bullets?: string[];
  skills?: string[];
  links?: EventLink[];
  attachments?: EventAttachment[];
  embed?: 'strava';
};

const t = (h: number, m = 0) => h * 60 + m;

export const RESUME_URL =
  'https://drive.google.com/file/d/15Hld0A1rit7ox5sXsuvtpq2BOqPR_TTT/view?usp=sharing';

export const EVENTS: PortfolioEvent[] = [
  // ── All-day ──────────────────────────────────────────────
  {
    id: 'skills',
    title: 'Skills',
    calendar: 'education',
    day: 0,
    allDay: true,
    bullets: [
      'Languages: Python, Java, JavaScript, TypeScript, SQL, C++, C#, PHP, HTML/CSS, KAREL',
      'ML & AI: PyTorch, TensorFlow, Transformers, Diffusion Models, RNN/LSTM, NLP and sentiment analysis, Agentic AI',
      'Data: Tableau, Power BI, Excel, Pandas, Seaborn, Jupyter, MATLAB, SPSS',
      'Cloud: AWS, Google Cloud, Azure, Docker, REST APIs',
      'Product: Agile/Scrum, Jira, Trello, SDLC, Figma, Qualtrics',
      'Tools: Git, Arduino, Unity, RoboGuide, Adobe Illustrator, Cursor, Lovable',
    ],
  },
  {
    id: 'purdue',
    title: 'Purdue University',
    calendar: 'education',
    day: 1,
    allDay: true,
    location: 'West Lafayette, IN',
    role: 'B.S. Computer Science (Honors) & Artificial Intelligence',
    period: 'Graduated May 2026',
    bullets: [
      'Minors in Psychology and Critical Disability Studies',
      'Certificates in Entrepreneurship & Innovation, Data Science and LBC',
    ],
  },
  {
    id: 'awards',
    title: 'Awards',
    calendar: 'education',
    day: 6,
    allDay: true,
    bullets: [
      '2nd Place, Fall 2023 Purdue Undergraduate Research Expo',
      '2nd Place, Best Use of API at Stanford TreeHacks (CashFlow)',
      'Purdue Student Government Bricklayer Award',
      'Clarence Dammon Dean Scholarship',
      'Jandos Women in Science Programs Scholarship',
      'Purdue Majors & Minors Summer Scholarship',
    ],
  },

  // ── Sunday ───────────────────────────────────────────────
  {
    id: 'run',
    title: 'Go on a run',
    calendar: 'personal',
    day: 0,
    start: t(8),
    end: t(9),
    summary: 'How I clear my head before the week. Here is my recent Strava activity.',
    embed: 'strava',
  },
  {
    id: 'technical-projects',
    title: 'Technical Projects',
    calendar: 'projects',
    day: 0,
    start: t(10),
    end: t(12, 30),
    summary: 'The rest of what I have built, beyond the projects that have their own events.',
    bullets: [
      'Spotify recommender: collaborative filtering, RNN/LSTM and matrix factorization on the Million Playlist Dataset; 20% better accuracy, 60% more engagement',
      'S&P 500 forecasting: LSTM time-series model, 18% better trend accuracy',
      'Cricket ML model: predicts player performance with 80% accuracy',
      'LittleLuxuries: SEM forecasting on 33 years of Census data, finding search trends lead Consumer Confidence',
      'IMDb analysis: 16 datasets over 75 years, 100 top-grossing genres and 27 strong correlations',
    ],
    skills: ['Python', 'TensorFlow', 'Pandas', 'Seaborn', 'scikit-learn'],
    attachments: [{ name: 'technical-projects.txt', path: '/technical-projects.txt' }],
  },
  {
    id: 'cashflow',
    title: 'CashFlow · TreeHacks',
    calendar: 'projects',
    day: 0,
    start: t(14),
    end: t(15, 30),
    location: 'Stanford University',
    role: '2nd Place, Best Use of API',
    bullets: [
      'Full-stack platform for secure international payments',
      'Real-time fraud detection that cut fraud attempts 23%',
    ],
    skills: ['React', 'Firebase', 'Checkbook API'],
    links: [{ label: 'Devpost', url: 'https://devpost.com/software/cashflow-7xqoc4' }],
  },

  // ── Monday ───────────────────────────────────────────────
  {
    id: 'bofa',
    title: 'Bank of America',
    calendar: 'work',
    day: 1,
    start: t(9),
    end: t(11, 30),
    location: 'New York, NY',
    role: 'Technical Business Analyst III',
    period: 'May 2026 – Present',
    bullets: [
      'Own the product lifecycle for global FRTB commodity calculators, building Sensitivity-Based Approach capital models in SQL and Excel for delta, vega and curvature risk across US, UK and LATAM',
      'Write BRDs, roadmaps and functional specs that turn cross-border capital rules into prioritized backlogs and user stories',
      'Bridge ECM business partners and offshore engineering in India, running sprint planning across time zones',
      'Built automated SQL sourcing and comparison pipelines that audit multi-region market data, keeping capital-reporting inputs defect-free',
    ],
    skills: ['SQL', 'Excel', 'Agile', 'Jira'],
  },
  {
    id: 'innovateher',
    title: 'InnovateHer',
    calendar: 'founder',
    day: 1,
    start: t(13),
    end: t(15),
    location: 'Purdue University',
    role: 'Founder & President',
    period: 'Nov 2023 – Present',
    summary:
      "As a woman in CS, I started InnovateHer to make space for others like me. It grew into a women-centric hackathon and a campus-wide community.",
    bullets: [
      '36-hour hackathon run two years straight with 300+ participants each year',
      'Led 80 organizers and 50 mentors across 7 teams; 71+ projects built and 2 internships landed',
      'Raised $80K: $41K in year one and $39K in industry partnerships in year two, including Purdue CS',
      'Grew a 400+ member community; featured in The Purdue Exponent',
    ],
    links: [
      {
        label: 'The Purdue Exponent',
        url: 'https://www.purdueexponent.org/campus/women-coding-club-to-host-hackathon/article_297d44e4-cb8d-11ee-910a-f397edfebbde.html',
      },
      { label: 'Instagram', url: 'https://www.instagram.com/innovateherhacks/' },
      { label: 'Info site', url: 'https://innovateherhacks.my.canva.site/' },
    ],
    attachments: [{ name: 'innovateher.txt', path: '/innovateher.txt' }],
  },
  {
    id: 'github',
    title: 'Update GitHub',
    calendar: 'projects',
    day: 1,
    start: t(16),
    end: t(17),
    summary: 'Code for NEXUS, SignBridge, DConfusion and the rest lives here.',
    links: [{ label: 'github.com/pawar17', url: 'https://github.com/pawar17' }],
  },

  // ── Tuesday ──────────────────────────────────────────────
  {
    id: 'dvi',
    title: 'Disability Visibility India',
    calendar: 'founder',
    day: 2,
    start: t(8, 30),
    end: t(10),
    location: 'Mumbai, India',
    role: 'Founder & CEO',
    period: 'Oct 2021 – Present',
    summary:
      'A digital toolkit for families of people with disabilities in India that grew into a community. Still one of the most meaningful things I have built.',
    bullets: [
      'Coded the accessible resource and toolkit website, lifting outreach 70%',
      'Grew to a 15-person team in 6 months across 3 social platforms',
      'Built partnerships and ran 12 awareness events, raising community engagement 60% and volunteer participation 15%',
      'Lead monthly team meetings; 40% overall organizational growth',
    ],
    links: [
      { label: 'disability-visibility.com', url: 'https://www.disability-visibility.com/' },
      { label: 'YouTube feature', url: 'https://www.youtube.com/watch?v=ACmcNJJiRzo' },
      {
        label: 'Hindustan Times',
        url: 'https://www.hindustantimes.com/lifestyle/art-culture/are-our-city-eateries-inclusive-101645187672291.html',
      },
    ],
    attachments: [
      { name: 'disability-visibility-india.txt', path: '/disability-visibility-india.txt' },
    ],
  },
  {
    id: 'research',
    title: 'Research Lab Hours',
    calendar: 'research',
    day: 2,
    start: t(10, 30),
    end: t(12, 30),
    location: 'Purdue University',
    summary: 'ML research on misinformation, generative AI and child speech.',
    bullets: [
      'GRAIL Lab (Aug 2025 – Present): deepfake tagging, social sentiment on deepfakes, and an ML model for deepfake identification; coding 10 deepfakes a week into the lab database',
      'Child Automated Speech to Text (Jan 2023 – Aug 2024): tuned transformer speech models for 10% pipeline efficiency; PyTorch phoneme model improved child speech accuracy 12%',
      'C-Lab: generative AI for part mobility with a CAD-integrated point-cloud pipeline',
    ],
    skills: ['Python', 'PyTorch', 'Transformers', 'Diffusion models'],
    attachments: [{ name: 'research-projects.txt', path: '/research-projects.txt' }],
  },
  {
    id: 'panasonic',
    title: 'Panasonic North America',
    calendar: 'work',
    day: 2,
    start: t(14),
    end: t(16),
    location: 'Newark, NJ',
    role: 'Database Design & ML Intern',
    period: 'May – Aug 2025',
    bullets: [
      'Standardized tariff prediction across 15+ business units with a central database and ML forecasting model, improving accuracy 80%',
      'Integrated agentic AI for automated updates, raising data visibility 70% through Power BI dashboards',
      'Streamlined data pipelines and SOPs, cutting processing time 30% and enabling self-serve analytics for 16+ teams',
    ],
    skills: ['Python', 'SQL', 'Power BI', 'Agentic AI'],
  },

  // ── Wednesday ────────────────────────────────────────────
  {
    id: 'purduethink',
    title: 'PurdueThink Consulting',
    calendar: 'leadership',
    day: 3,
    start: t(8, 30),
    end: t(10, 30),
    location: 'Purdue University',
    role: 'Project Manager',
    period: 'Aug 2023 – Aug 2024',
    bullets: [
      "Led Boilerexams' expansion strategy with market research, user surveys and a professor pitch deck, taking it from student org to start-up",
      'Led a team of 5 restructuring Purdue Pilots Inc. and building its growth and marketing strategy',
      'Won 3 new client projects for the next semester',
    ],
  },
  {
    id: 'psg',
    title: 'Purdue Student Government',
    calendar: 'leadership',
    day: 3,
    start: t(11),
    end: t(13),
    location: 'Purdue University',
    role: 'Executive Director',
    bullets: [
      'Served on the DEI Committee for two years and led multiple initiatives',
      'As Executive Director, led a 13-member team and worked on student body legislation',
      'Launched campus-wide programs on accessibility, representation and inclusion',
      'Received the Bricklayer Award',
    ],
  },
  {
    id: 'datamine',
    title: 'The Data Mine × BASF',
    calendar: 'work',
    day: 3,
    start: t(14),
    end: t(15, 30),
    location: 'Purdue University',
    role: 'Project Manager & Teaching Assistant',
    period: 'Aug 2025 – Jan 2026',
    bullets: [
      'Directed 8 bi-weekly sprints for an 11-member BASF team, improving delivery efficiency 25%',
      'Linked students and the BASF mentor, cutting feedback turnaround 30%',
    ],
  },
  {
    id: 'nexus',
    title: 'NEXUS',
    calendar: 'projects',
    day: 3,
    start: t(16),
    end: t(17, 30),
    role: 'Assistive technology for children with cerebral palsy',
    bullets: [
      'User research with families and clinicians shaped one activity-based interface in place of fragmented assistive tech',
      'Raised functional independence from 10% to 80% for children with quadriplegic cerebral palsy',
      'Switch scanning, eye-gaze and head tracking input in a single app',
    ],
    skills: ['React', 'TypeScript', 'MediaPipe'],
    links: [
      { label: 'Live app', url: 'https://pawar17.github.io/Nexus/' },
      { label: 'Code', url: 'https://github.com/pawar17/Nexus' },
    ],
  },

  // ── Thursday ─────────────────────────────────────────────
  {
    id: 'fanuc',
    title: 'FANUC America',
    calendar: 'work',
    day: 4,
    start: t(9),
    end: t(11),
    location: 'Rochester Hills, MI',
    role: 'Paint Shop Dispense Engineering Intern',
    period: 'May – Aug 2024',
    bullets: [
      'Built a computer vision defect-detection system (Python, OpenCV, sensors), cutting inspection time 25%',
      'Engineered a KAREL anomaly model for real-time quality control on industrial robots, improving defect identification 15%',
      'Ran experiments, simulations and prototypes for a new product launch, speeding time-to-market 10%',
      'Wrote technical documentation and user guides that sped product rollouts 20%',
    ],
    skills: ['Python', 'OpenCV', 'KAREL', 'RoboGuide'],
  },
  {
    id: 'our',
    title: 'Office of Undergraduate Research',
    calendar: 'research',
    day: 4,
    start: t(11, 30),
    end: t(13),
    location: 'Purdue University',
    role: 'Research Assistant',
    period: 'Feb 2023 – May 2026',
    bullets: [
      'Built Tableau dashboards for the Spring Research Conference, standardizing reporting across 8+ departments',
      'Ran 20 qualitative interviews that informed 8 research study recommendations',
      'NLP sentiment analysis on 70+ survey responses drove 12 program improvements',
      'Qualtrics survey and Tableau dashboard across all Big Ten schools, used by 14+ institutions',
    ],
    skills: ['Python', 'NLP', 'Tableau', 'Qualtrics'],
  },
  {
    id: 'signbridge',
    title: 'SignBridge',
    calendar: 'projects',
    day: 4,
    start: t(14),
    end: t(15, 30),
    role: 'Two-way sign language translation',
    bullets: [
      'Bidirectional computer vision platform using MediaPipe Holistic and Transformer seq2seq models',
      'Under 200 ms latency for 3D landmark extraction and temporal modeling',
      'Independent research on deaf identity and multilingual sign language translation',
    ],
    skills: ['MediaPipe', 'Transformers', 'Python', 'TypeScript'],
    links: [
      { label: 'Live app', url: 'https://pawar17.github.io/SignBridge/' },
      { label: 'Code', url: 'https://github.com/pawar17/SignBridge' },
    ],
  },
  {
    id: 'campus-jobs',
    title: 'On-campus jobs',
    calendar: 'work',
    day: 4,
    start: t(16),
    end: t(17),
    location: 'Purdue University',
    bullets: [
      'Disability Resource Center (Aug 2023 – Aug 2024): converted course materials into Braille for 3 students across 7 classes',
      'Purdue Dining & Culinary (Oct 2022 – Feb 2023): served 1,000+ students a shift with a team of 15+',
    ],
    attachments: [{ name: 'on-campus-jobs.txt', path: '/on-campus-jobs.txt' }],
  },

  // ── Friday ───────────────────────────────────────────────
  {
    id: 'arduino',
    title: 'Arduino Projects',
    calendar: 'projects',
    day: 5,
    start: t(9, 30),
    end: t(11),
    summary:
      'I earned a Programming with Arduino certification at Purdue and love building with microcontrollers. Favorite so far: a musical box with sensors and a display.',
    skills: ['Arduino', 'C++', 'Sensors'],
    links: [
      {
        label: 'Certification',
        url: 'https://engineering.purdue.edu/Engr/Academics/Undergraduate/certificates/Milestones/Programming_with_Arduino/2024/Spring/lpMR2tC8I_WNEvN5iTTlDw.png/lpMR2tC8I_WNEvN5iTTlDw.png',
      },
      {
        label: 'Project videos',
        url: 'https://www.youtube.com/playlist?list=PLDjG7BISikRu_m3x5A4Ha9KvuqHsKhPYe',
      },
    ],
  },
  {
    id: 'dconfusion',
    title: 'DConfusion',
    calendar: 'research',
    day: 5,
    start: t(11, 30),
    end: t(13),
    role: 'R Package Developer',
    period: 'May 2025 – Present',
    summary:
      'An R package that converts commonly reported metrics into confusion-matrix entries, so studies can be compared fairly.',
    bullets: [
      'Standardized statistical measures, raising model comparison accuracy 15%',
      'Automated testing suite and CRAN documentation boosted developer efficiency 20%',
      'Structured repository linking literature reviews and package formulas, speeding workflows 25%',
    ],
    skills: ['R', 'Statistics', 'Package development'],
  },
  {
    id: 'coffee',
    title: 'Coffee chat with Aadya',
    calendar: 'personal',
    day: 5,
    start: t(15),
    end: t(16),
    location: 'New York, NY',
    summary:
      "Always happy to talk about product, accessibility or women in tech. Send me a note and let's find a time.",
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/aadyapawar/' },
      { label: 'Email', url: 'mailto:aadyapawar7104@gmail.com' },
      { label: 'Resume', url: RESUME_URL },
      { label: 'Formal portfolio', url: 'https://aadyapawar.my.canva.site/portfolio/' },
    ],
  },

  // ── Saturday ─────────────────────────────────────────────
  {
    id: 'certifications',
    title: 'Certifications',
    calendar: 'education',
    day: 6,
    start: t(9),
    end: t(10, 30),
    bullets: [
      'Purdue Milestones: Programming with Arduino',
      'Grow with Google: Data Analytics',
      'Grow with Google: Project Management',
      'Salesforce: Project Management Essentials',
      'Six Sigma Green Belt (in progress)',
    ],
    attachments: [{ name: 'certifications.txt', path: '/certifications.txt' }],
  },
  {
    id: 'mentoring',
    title: 'Mentoring',
    calendar: 'leadership',
    day: 6,
    start: t(11),
    end: t(12, 30),
    location: 'Purdue University',
    bullets: [
      'LaunchPad (Aug 2023 – Aug 2024): guided a student building a health app that pulled data from 3+ logging apps into personal dashboards, with a supervised ML model 23% more accurate',
      'Women in Science Programs (Aug 2024 – Aug 2025): one-on-one mentor to a first-year student in STEM, plus workshops and networking events',
    ],
  },
];

export const formatMinutes = (mins: number, withPeriod = true) => {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  const time = m === 0 ? `${h}` : `${h}:${String(m).padStart(2, '0')}`;
  return withPeriod ? `${time} ${period}` : time;
};

export const formatRange = (start: number, end: number) => {
  const samePeriod = start < 720 === end < 720;
  return `${formatMinutes(start, !samePeriod)} – ${formatMinutes(end)}`;
};
