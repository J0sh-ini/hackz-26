export interface FaqItem {
  id: string;
  category: 'TRACKS' | 'ELIGIBILITY' | 'FORMAT' | 'REGISTRATION';
  question: string;
  answer: string;
  bold?: string;
}

export const FAQS: FaqItem[] = [
  {
    id: 'eligibility-1',
    category: 'ELIGIBILITY',
    question: 'Who is eligible to participate in HackZ \'26?',
    answer: 'All current undergraduate and postgraduate students enrolled in recognized institutions across India are eligible. Cross-college and cross-disciplinary teams are fully permitted.',
  },
  {
    id: 'eligibility-2',
    category: 'ELIGIBILITY',
    question: 'Can I register or compete solo?',
    answer: 'No. Solo registrations are not permitted. Hackathons foster collaborative problem-solving; hence, teams must consist of a minimum of 2 members and a maximum of 4 members.',
  },
  {
    id: 'eligibility-3',
    category: 'ELIGIBILITY',
    question: 'Is college student status mandatory?',
    answer: 'Yes. All participants must provide valid college identification or institutional verification during registration and on-site reporting at CEG Campus.',
  },
  {
    id: 'tracks-1',
    category: 'TRACKS',
    question: 'Can our solution span across multiple tracks, and how should we nominate our category?',
    answer: 'Teams must designate a single primary track during submission so that their project is assigned to the appropriate domain jury. However, cross-disciplinary innovations are strongly encouraged. Your prototype will be benchmarked under your nominated primary track, with interdisciplinary depth factored positively.',
  },
  {
    id: 'tracks-2',
    category: 'TRACKS',
    question: 'Should the problem addressed and the proposed solution be entirely focused on security?',
    answer: 'No. Security should be an important component of the proposed solution, but it must not be the sole focus. Participants are expected to identify a real-world problem and develop an innovative, practical solution to address it. The proposed solution must incorporate a security component that addresses relevant security risks or vulnerabilities as part of the overall solution.',
    bold: 'Submissions that focus exclusively on security or fail to incorporate a security component into the proposed solution will be rejected.'
  },
  {
    id: 'tracks-3',
    category: 'TRACKS',
    question: 'Are specific problem statements assigned within each track, or do teams define their own challenge?',
    answer: 'HackZ \'26 operates on an open-innovation model within the scope of each thematic track. Teams possess the creative autonomy to identify any authentic, real-world industry or societal problem statement within their chosen domain. The overarching prerequisite is that the architecture must integrate an active security, digital trust, or cyber-hygiene layer.',
  },
  {
    id: 'format-1',
    category: 'FORMAT',
    question: 'What is the structure of the event (Online, On-Site, or Hybrid)?',
    answer: 'HackZ \'26 follows a hybrid two-round protocol. Round 1 (Ideation & Solution Blueprint) takes place entirely online. Shortlisted finalist teams advance to Round 2, which is an intensive 24-hour in-person prototype sprint hosted at the CEG Campus, Anna University, Chennai.',
  },
  {
    id: 'format-2',
    category: 'FORMAT',
    question: 'Are there direct networking & mentorship opportunities?',
    answer: 'Absolutely. Throughout the 24-hour on-site marathon, senior software architects, industry mentors from Temenos, and leading tech professionals will conduct round-table reviews, technical check-ins, and direct networking sessions.',
  },
  {
    id: 'registration-1',
    category: 'REGISTRATION',
    question: 'How do we register our team?',
    answer: 'Registrations are hosted exclusively on Unstop. The team lead registers first, creates the squad, and sends the invite link to teammates to complete team formation before submitting.',
  },
  {
    id: 'registration-2',
    category: 'REGISTRATION',
    question: 'Is there any registration fee involved?',
    answer: 'Round 1 ideation submission is 100% free of cost for all applicants. Teams shortlisted for the Round 2 on-site finals pay a nominal fee of ₹500 per participant to cover on-site food, high-speed networking facilities, and event kits.',
  },
];
