export interface ContactPerson {
  name: string;
  phone: string;
  rawPhone: string;
}

export const CONTACT_PEOPLE: ContactPerson[] = [
  { name: 'Sunil Kumar', phone: '+91 63831 23505', rawPhone: '+916383123505' },
  { name: 'Smrithi Prakash', phone: '+91 80728 69255', rawPhone: '+918072869255' },
  { name: 'Sharan', phone: '+91 95856 12262', rawPhone: '+919585612262' },
  { name: 'Varsha', phone: '+91 63829 52323', rawPhone: '+916382952323' },
];

export const CONTACT_EMAILS = [
  'hackz.csea@gmail.com',
  'cseaceg25@gmail.com',
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
    name: 'CSEA Official',
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
