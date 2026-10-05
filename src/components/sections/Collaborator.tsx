import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambleText from '../ui/ScrambleText';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_PARAGRAPHS = [
  "Information Security Education and Awareness (ISEA) is an initiative of Ministry of Electronics and Information Technology (MeitY), Government of India for generating human resources in the area of Information Security and creating general awareness on Cyber Hygiene/Cyber Security among the masses.",
  "ISEA Project (started in 2005 and currently in its third phase since Oct. 2023 onwards) is aimed at human resources development for safe, trusted, and secure cyber space.",
  "ISEA collabs with premier academic institutions, research organizations, and industry partners to provide a comprehensive platform for students and professionals to enhance their skills in cybersecurity and contribute to the nation's digital security landscape.",
  "We,the Computer Science and Engineering Association (CSEA) of College of Engineering Guindy, Anna University are proud to collaborate with ISEA to bring you HackZ'26, a hackathon that not only challenges your technical skills but also emphasizes the importance of cybersecurity in today's digital world."
];

export const Collaborator: React.FC = () => {

  return (
    <section
      id="collaborator"
      className="py-[100px] max-md:py-16 relative"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-page)',
        borderTop: '1px solid var(--border-default)',
        overflow: 'hidden',
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4 flex flex-col items-center justify-center" style={{ zIndex: 10 }}>
        
            <div className="font-mono text-[13px] text-accent-green mb-3 flex items-center gap-2 justify-center">
              <ScrambleText text="In collaboration with" as="span" className="text-[13px] text-accent-green font-mono tracking-[0.15em]" from="random" easing="linear"/>
            </div>

            <h2 className="text-[clamp(22px,3.8vw,38px)] font-pixel uppercase mb-6 leading-tight text-center" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-pixel)' }}>
              <ScrambleText text="ISEA" as="span" className="text-[clamp(22px,3.8vw,38px)] font-pixel uppercase tracking-normal" style={{ fontFamily: 'var(--font-pixel)' }} from="random" easing="linear"/>
            </h2>

            {/* Body Text with Vertical Border Accent */}
            <div
              style={{
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                maxWidth: '720px'
              }}
              className='text-justify'
            >
              {ABOUT_PARAGRAPHS.map((text, idx) => (
                <span
                  key={idx}
                  //remomve third para in mobile? so long texts..
                  className={idx === 2 ? 'max-md:hidden' : ''}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
    </section>
  );
};

