export interface ContactPerson {
  name: string;
  phone: string;
  rawPhone: string;
}

export const CONTACT_PEOPLE: ContactPerson[] = [
  { name: 'Jaison JV', phone: '+91 90256 01119', rawPhone: '+919025601119' },
  { name: 'Varsha S', phone: '+91 80562 46330', rawPhone: '+918056246330' },
  { name: 'Nethra B', phone: '+91 63812 02110', rawPhone: '+916381202110' },
  { name: 'Dhanush T', phone: '+91 81248 68540', rawPhone: '+918124868540' },
  { name: 'Roopa Varshini R', phone: '+91 90926 15584', rawPhone: '+919092615584' },
];

export const CONTACT_EMAILS = [
  'hackz.csea@gmail.com',
  'cseaceg27@gmail.com',
];

export const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/csea_ceg',
    handle: '@csea_ceg',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/csea-ceg',
    handle: 'csea-ceg',
  },
  {
    name: 'Website',
    url: 'https://cseaceg.org.in/',
    handle: 'cseaceg.org.in',
  },
];

export const EVENT_LINKS = {
  registration: 'https://unstop.com/p/hackz24-computer-science-and-engineering-association-csea-ceg-anna-university-1171819',
  mentorForm: 'https://forms.gle/QaDpNALP7UzXy12L8',
  volunteerForm: 'https://forms.gle/t7aqN92m7XERujow9',
  mapVenue: 'https://maps.app.goo.gl/JL1mG5KUfTrLS6Pg6',
  temenos: 'https://www.temenos.com/',
  unstop: 'https://unstop.com/',
};
