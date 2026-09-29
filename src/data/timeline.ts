export interface TimelineEvent {
  id: string;
  dateStr: string;
  shortDate: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'upcoming';
  badge?: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'round-1-open',
    dateStr: '2026-10-14',
    shortDate: 'OCT 14',
    title: 'Registrations Open & Round 1 submissions open',
    description: 'Registrations for HackZ\'26 officially begin, inviting participants to embark on an innovative journey. Participants will submit their ideation solutions to any problem statement within the specified domains, allowing them to showcase their creativity and problem-solving approach.',
    status: 'completed',
  },
  {
    id: 'round-1-close',
    dateStr: '2026-11-14',
    shortDate: 'NOV 14',
    title: 'Conclusion of Round 1 Submissions',
    description: 'Round 1 submissions close as teams submit their ideation solutions. Judges will carefully evaluate each submission based on the clarity, innovation, and feasibility of the proposed ideas, setting the stage for the next phase.',
    status: 'completed',
  },
  {
    id: 'finalists-announced',
    dateStr: '2026-11-28',
    shortDate: 'NOV 28',
    title: 'Shortlisted Finalists Announcement',
    description: 'The list of finalists advancing to Round 2 will be announced. These teams have impressed the judges with their ideation and will proceed to tackle more complex challenges in the final round.',
    status: 'completed',
  },
  {
    id: 'problem-statements',
    dateStr: '2026-12-02',
    shortDate: 'DEC 2',
    title: 'Release of Round 2 Problem Statements',
    description: 'New and intricate problem statements will be released for the second round. The finalists will now be challenged to develop their ideas into tangible solutions, working on real-world problems across impactful domains.',
    status: 'completed',
  },
  {
    id: 'hackathon-start',
    dateStr: '2026-12-12',
    shortDate: 'DEC 12',
    title: 'Commencement of 24-Hour Hackathon',
    description: 'The final round kicks off with the 24-hour hackathon. Finalist teams will work tirelessly to develop working prototypes, refining their solutions under time constraints while displaying teamwork and technical prowess.',
    status: 'active',
    badge: 'LIVE PROTOCOL',
  },
  {
    id: 'hackathon-end',
    dateStr: '2026-12-13',
    shortDate: 'DEC 13',
    title: 'Marathon Concludes & Awards Ceremony',
    description: 'The hackathon concludes with the submission of final solutions. The judges will evaluate the projects, and the winners will be announced, celebrating innovative ideas and impactful contributions to society.',
    status: 'upcoming',
  },
];
