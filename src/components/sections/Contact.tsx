import React from 'react';
import { CONTACT_PEOPLE, CONTACT_EMAILS, SOCIAL_LINKS, EVENT_LINKS } from '../../data/contact';
import { FloatingDecorations } from '../ambient/FloatingDecorations';
import { RollingText } from '../ui/RollingText';
import ScrambleText from '../ambient/ScrambleText';
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
      <FloatingDecorations
        items={[
          { text: '@csea_ceg', top: '15%', right: '6%', duration: 10 },
          { text: '192.168.1.1', top: '48%', right: '5%', duration: 13 },
          { text: '$ ping hackz', top: '80%', right: '10%', duration: 9 },
        ]}
      />

      <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div className="font-mono text-[13px] text-accent-green uppercase tracking-[0.15em] mb-3 flex items-center gap-2">
            {/* <span>// 08</span>
            <span>DIRECT COMMS</span> */}
            <ScrambleText text="DIRECT COMMS" as="span" className="text-[13px] text-accent-green uppercase tracking-[0.15em]" from="random" easing="linear"/>
          </div>
          {/* <h2 className="text-[clamp(32px,5vw,56px)] font-extrabold tracking-tight uppercase mb-6">REACH OUT</h2> */}
          <ScrambleText text="REACH OUT" as="h2" className="text-[clamp(32px,5vw,56px)] font-extrabold tracking-tight uppercase mb-6" from="random" easing="linear"/>
          <p style={{ maxWidth: '600px', fontSize: '15px' }}>
            Have logistical queries, sponsorship inquiries, or technical questions? Establish contact with the student organizing committee.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div
          className="grid grid-cols-[1.2fr_1fr] gap-16 max-[860px]:grid-cols-1 max-[860px]:gap-10"
        >
          {/* Left Column: Student Coordinators */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--accent-green)',
                letterSpacing: '0.15em',
                marginBottom: '20px',
              }}
            >
              [ STUDENT COORDINATORS ]
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {CONTACT_PEOPLE.map((person) => (
                <div
                  key={person.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 0',
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

            {/* Venue Details */}
            <div style={{ marginTop: '36px' }}>
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
              <p style={{ color: 'var(--text-primary)', fontSize: '15px', marginBottom: '8px' }}>
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

          {/* Right Column: Email & Socials */}
          <div>
            {/* Email Channels */}
            <div style={{ marginBottom: '40px' }}>
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
                    className="btn-hover-primary"
                  >
                    <span>&#9993;</span>
                    <span>{email}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Network Nodes */}
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
                [ CONNECT WITH CSEA-CEG ]
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '14px 18px',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-default)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'border-color 0.15s ease',
                    }}
                    className="btn-hover-outline"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {social.name === 'Instagram' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      )}
                      {social.name === 'LinkedIn' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      )}
                      {social.name === 'CSEA Official' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      )}
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '15px',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {social.name}
                      </span>
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        color: 'var(--accent-green)',
                      }}
                    >
                      {social.handle} &rarr;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


