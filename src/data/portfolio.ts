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
      'Certificates in Entrepreneurship & Innovation and Data Science',
    ],
  },
  {
    id: 'awards',
    title: 'Awards & Honors',
    calendar: 'education',
    day: 6,
    allDay: true,
    bullets: [
      '2nd Place, Purdue Undergraduate Research Expo',
      '2nd Place, Best Use of API at Stanford TreeHacks (CashFlow)',
      'Purdue Student Government Bricklayer Award',
      'Clarence Dammon Dean Scholarship',
      'Jandos Women in Science Scholarship',
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
    summary:
      'Eleven projects across accessibility, fintech, ML and hardware. The attachment has the full list with stacks and links.',
    skills: ['React', 'TypeScript', 'Python', 'TensorFlow', 'PyTorch', 'Tableau'],
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
      'International payments app with a multi-currency wallet and currency conversion',
      'Real-time fraud detection that cut fraud attempts 23%',
    ],
    skills: ['React', 'Firebase', 'Node.js', 'Checkbook API'],
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
      'Own requirements for global FRTB commodity capital calculators modeling delta, vega and curvature risk across US, UK and LATAM',
      'Turn cross-border capital rules into BRDs, backlogs and user stories; run sprint planning with engineers in India',
      'Built SQL pipelines that audit multi-region market data feeds, keeping capital-reporting inputs defect-free',
    ],
    skills: ['SQL', 'Agile', 'Jira', 'Requirements'],
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
      "As a woman in CS, I started InnovateHer to make space for others like me. It became Purdue's first women-centric hackathon.",
    bullets: [
      '36-hour hackathon run two years straight: 300+ participants, 71+ projects, 2 internships landed',
      'Raised $80K ($41K in year one, $39K in year two)',
      'Led 80 organizers and 50 mentors across 7 teams; grew a 400+ member community',
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
      'Coded the accessible resource website from scratch',
      'Grew to a 15-person team in 6 months across 3 social platforms',
      'Ran 12 awareness events with partner organizations, lifting community engagement 60%',
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
    summary: 'Four research projects in ML, accessibility and statistics.',
    bullets: [
      'GRAIL Lab: deepfake detection and social sentiment on manipulated media',
      'DConfusion: R package converting reported metrics into confusion-matrix entries',
      'C-Lab: generative AI for part mobility, CAD-integrated point-cloud pipeline (17% faster data prep)',
      'Child Automated Speech to Text: phoneme model that improved child speech accuracy 12%',
    ],
    skills: ['Python', 'PyTorch', 'R', 'Transformers', 'Diffusion models'],
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
      'Built an ML tariff-forecasting model and central database for 15+ business units, improving prediction accuracy 80%',
      'Rebuilt data pipelines with Power BI and agentic AI workflows, cutting processing time 30% for 16+ self-serve teams',
    ],
    skills: ['Python', 'SQL', 'Power BI', 'ML'],
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
    role: 'Consultant, then Project Manager',
    period: 'Aug 2023 – Aug 2024',
    bullets: [
      'Led market research and user surveys that moved Boilerexams from student org to startup',
      'Guided a team restructuring Purdue Pilots Inc. and delivered strategic recommendations',
      'Won 3 new client projects',
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
      'Ran 8 bi-weekly sprints for an 11-student team delivering a data project for BASF, improving delivery efficiency 25%',
      'Single link between students and the BASF mentor, cutting feedback turnaround 30%',
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
      'One activity-based interface shaped by research with clinicians and families',
      'Switch scanning, eye-gaze and head tracking input in a single app',
      'Raised functional independence from 10% to 80% in a family pilot',
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
      'Built an OpenCV and sensor defect-detection system for robotic sealant application, cutting inspection time 25%',
      'Added a KAREL anomaly model that improved defect identification 15%',
    ],
    skills: ['OpenCV', 'Python', 'KAREL', 'Robotics'],
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
      'Ran 20 user interviews and NLP sentiment analysis on 70+ survey responses, driving 12 program improvements',
      'Built a Qualtrics and Tableau reporting tool adopted by research offices at 14+ Big Ten schools',
    ],
    skills: ['Qualtrics', 'Tableau', 'NLP'],
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
      'Sign to text, speech to sign and sign to sign for ASL, ISL and BSL',
      'Real-time hand tracking in the browser with MediaPipe',
    ],
    skills: ['MediaPipe', 'Python', 'TypeScript'],
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
    summary:
      'Research assistant, Disability Resource Center intern (course materials into Braille and accessible formats), Purdue Dining, and The Data Mine.',
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
      'I earned a Programming with Arduino certification at Purdue and love building with microcontrollers. Favorite so far: a musical box with sensors, an LCD and three play modes.',
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
      'Forage: Goldman Sachs Engineering, Citi Global Consumer Banking',
    ],
    attachments: [{ name: 'certifications.txt', path: '/certifications.txt' }],
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
