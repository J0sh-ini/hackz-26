import React from 'react';
import { CONTACT_PEOPLE, CONTACT_EMAILS, EVENT_LINKS } from '../../data/contact';
import { RollingText } from '../ui/RollingText';
import ScrambleText from '../ui/ScrambleText';
import TextType from '../ui/TextType';
export const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-[100px] max-md:py-16 relative"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-page)',
        borderTop: '1px solid var(--border-default)',
        overflow: 'hidden',
      }}
    >

      <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div className="font-mono text-[13px] text-accent-green mb-3 flex items-center gap-2" style={{justifyContent: 'center'}}>
            <ScrambleText text="Direct comms" as="span" className="text-[13px] text-accent-green  tracking-[0.15em]" from="random" easing="linear"/>
          </div>
          <ScrambleText text="REACH OUT" as="h2" className="text-[clamp(22px,3.8vw,38px)] font-pixel uppercase mb-6 leading-tight" style={{ fontFamily: 'var(--font-pixel)', textAlign: 'center' }} from="random" easing="linear"/>
          <p style={{ maxWidth: '600px', fontSize: '15px', margin: '0 auto', textAlign: 'center' }}>
            Have logistical queries, sponsorship inquiries, or technical questions? Establish contact with the student organizing committee.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div
          className="grid grid-cols-2 gap-16 max-[660px]:grid-cols-1 max-[660px]:gap-10"
        >
          {/* Left Column: Student Coordinators */}
          <div className="flex flex-col h-full">
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--accent-green)',
                letterSpacing: '0.15em',
                marginBottom: '16px',
              }}
            >
              [ STUDENT COORDINATORS ]
            </div>

            <div className="flex flex-col justify-between flex-1">
              {CONTACT_PEOPLE.map((person) => (
                <div
                  key={person.name}
                  className="flex items-center justify-between flex-1 py-1"
                  style={{
                    borderBottom: '1px solid var(--border-default)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {/* {person.name}
                     */}
                    <TextType text={person.name} as="span" className="font-heading text-[16px] font-semibold" typingSpeed={30}  pauseDuration={1000} loop={false} startOnVisible={true} />
                  </span>

                  <a
                    href={`tel:${person.rawPhone}`}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      letterSpacing: '0.05em',
                      minHeight: '44px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 8px',
                    }}
                    className="nav-link-item subtle-roll-link"
                  >
                    <span className="subtle-link-fill" aria-hidden="true" />
                    <span style={{ position: 'relative', zIndex: 2 }}>
                      {/* <RollingText
                        text={person.phone}
                        baseColor="var(--text-secondary)"
                        hoverColor="var(--accent-green)"
                        stagger={0.015}
                      /> */}
                      <TextType text={person.phone} as="span" className="font-mono text-[14px] text-text-secondary" typingSpeed={30}  pauseDuration={1000} loop={false} startOnVisible={true} />
                    </span>
                  </a>
                </div>
              ))}
            </div>

          </div>  

          {/* Right Column: Email & Socials */}
          <div className="flex flex-col justify-between h-full max-[660px]:gap-8">
            {/* Email Channels */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--accent-green)',
                  letterSpacing: '0.15em',
                  marginBottom: '16px',
                }}
              >
                [ OFFICIAL EMAIL CHANNELS ]
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {CONTACT_EMAILS.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '15px',
                      color: 'var(--accent-green)',
                      padding: '14px 18px',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-default)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'border-color 0.15s ease',
                    }}
                    className="btn-hover-primary max-md:justify-center"
                  >
                    <span>&#9993;</span>
                    <span>{email}</span>
                  </a>
                ))}
              </div>
            </div>
            {/* Venue Details */}
            <div className="mt-8 max-[660px]:mt-0">
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--accent-green)',
                  letterSpacing: '0.15em',
                  marginBottom: '10px',
                }}
              >
                [ EVENT VENUE ]
              </div>
              <p style={{ color: 'var(--text-primary)', fontSize: '15px', marginBottom: '8px',textAlign:'center' }}>
                CEG Campus, Anna University, Guindy, Chennai, Tamil Nadu, India
              </p>
              <a
                href={EVENT_LINKS.mapVenue}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--accent-green)',
                  letterSpacing: '0.08em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 8px',
                  gap: '6px',
                }}
                className="nav-link-item subtle-roll-link"
              >
                <span className="subtle-link-fill" aria-hidden="true" />
                <span style={{ position: 'relative', zIndex: 2 }}>
                  <RollingText
                    text="› VIEW VENUE ON GOOGLE MAPS"
                    baseColor="var(--accent-green)"
                    hoverColor="#ffffff"
                    stagger={0.012}
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


