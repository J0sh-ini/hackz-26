import { NodeNetwork } from '../ambient/NodeNetwork';
import { Hero } from '../sections/Hero';
import { StatsMarquee } from '../sections/StatsMarquee';
import { About } from '../sections/About';
import { Tracks } from '../sections/Tracks';
import { Sponsors } from '../sections/Sponsors';
import { Prizes } from '../sections/Prizes';
import { Timeline } from '../sections/Timeline';
import { GetInvolved } from '../sections/GetInvolved';
import { Faq } from '../sections/Faq';
import { Contact } from '../sections/Contact';
import {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
export default function HomePage(){
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = hash.replace('#', '');
      // Timeout ensures DOM elements are fully rendered before scrolling
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash]);
    return (
        <>
        {/* Main Content Layout */}
      <main>
        {/* [01] Hero Section */}
        <div>

        <Hero />
        </div>
    <div>
      <NodeNetwork opacity={1} />

        {/* [02] Marquee Stats Strip */}
        <StatsMarquee />

        {/* [03] About Section */}
        <About />

        {/* Terminal Divider
        <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4">
          <SectionDivider label="TRACKS PROTOCOL" />
          </div> */}

        {/* [04] Mission Tracks */}
        <Tracks />

        {/* Terminal Divider
        <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4">
        <SectionDivider label="STRATEGIC PARTNERS" />
        </div> */}

        {/* [05] Sponsors */}
        <Sponsors />

        {/* [06] Prizes Bounty */}
        <Prizes />

        {/* [07] Sequence of Events Timeline */}
        <Timeline />

        {/* Terminal Divider
        <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4">
        <SectionDivider label="DEPLOYMENT FORCES" />
        </div> */}

        {/* [08] Get Involved CTAs */}
        <GetInvolved />

        {/* [09] Volunteer Registration Form */}
        {/* <VolunteerForm /> */}

        {/* Terminal Divider
        <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4">
        <SectionDivider label="KNOWLEDGE BASE" />
        </div> */}

        {/* [09] FAQs Accordion */}
        <Faq />

        {/* Terminal Divider
        <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4">
        <SectionDivider label="TRANSMISSION LINKS" />
        </div> */}

        {/* [10] Contact & Socials */}
        <Contact />
        </div>
      </main>

        </>
    );
}