import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { EVENT_LINKS } from '../../data/contact';
import { Button } from '../ui/Button';
import { RollingText } from '../ui/RollingText';
import {Link} from 'react-router-dom';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Get Involved', href: '#get-involved'},
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-height)',
        backgroundColor: 'var(--bg-page)',
        borderBottom: '1px solid var(--border-default)',
        zIndex: 1000,
      }}
    >
       {/* Brand / Logo */}
        

        <Link
          to="/#hero"
          className="absolute left-4 md:left-6 top-0 z-50 flex items-center h-full cursor-pointer pointer-events-auto"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--accent-green)',
            letterSpacing: '0.05em',
            maxWidth: '100%',
          }}
          onClick={() => {
            closeMobileMenu();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {/* <span style={{ color: 'var(--text-secondary)' }}>&gt;</span>
          <span>HackZ'26</span> */}
          <img
            src="/hackz-logo.webp"
            alt="HackZ'26"
            style={{ maxWidth: '100%', height: 'var(--header-height)', display: 'block', pointerEvents: 'none' }}
          />
        </Link>
      <div className="relative w-full max-w-[1200px] mx-auto px-6 max-md:px-4 h-full flex items-center justify-between pointer-events-none">
        {/* Desktop Nav Links (Centered) */}
        <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.href}
                to={'/'+link.href}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: isActive ? 'var(--accent-green)' : 'var(--text-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 8px',
                }}
                className="nav-link-item subtle-roll-link"
              >
                <span className="subtle-link-fill" aria-hidden="true" />
                <span style={{ position: 'relative', zIndex: 2 }}>
                  <RollingText
                    text={link.label}
                    baseColor={isActive ? 'var(--accent-green)' : 'var(--text-primary)'}
                    hoverColor="var(--accent-green)"
                    stagger={0.015}
                  />
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Register Button (Right corner) */}
        <div className="hidden lg:flex items-end ml-auto gap-3 pointer-events-auto">
          {/* <Button
                  variant="primary"
                  onClick={() => {
                    closeMobileMenu();
                    navigate('/#get-involved');
                  }}  
                  style={{
                    padding: '8px 16px',
                    minHeight: '38px',
                    fontSize: '12px',
                    minWidth: '120px',
                  }}
                >
                JOIN THE TEAM
                </Button> */}
                  <Button
                    variant="outline"
                    href={EVENT_LINKS.registration}
                    isExternal
                    style={{
                      padding: '8px 16px',
                      minHeight: '38px',
                      fontSize: '12px',
                    }}
                  >
                    [ REGISTER ]
                  </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          className="flex lg:hidden flex-col justify-center items-center w-11 h-11 gap-[5px] cursor-pointer p-0 ml-auto pointer-events-auto"
          style={{ background: 'none', border: 'none' }}
        >
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '2px',
              backgroundColor: 'var(--text-primary)',
              transition: 'transform 0.2s ease',
              transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '2px',
              backgroundColor: 'var(--text-primary)',
              opacity: mobileMenuOpen ? 0 : 1,
              transition: 'opacity 0.2s ease',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '2px',
              backgroundColor: 'var(--text-primary)',
              transition: 'transform 0.2s ease',
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              top: 'var(--header-height)',
              backgroundColor: 'var(--bg-page)',
              zIndex: 9998,
              display: 'flex',
              flexDirection: 'column',
              padding: '32px 24px',
              borderTop: '1px solid var(--border-default)',
            }}
          >
            <nav
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginTop: '16px',
              }}
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={'/'+link.href}
                  onClick={closeMobileMenu}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '24px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    minHeight: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:'center',
                    borderBottom: '1px solid var(--border-default)',
                    // paddingLeft: '28px',
                  }}
                  className="mobile-nav-item subtle-roll-link"
                >
                  <span className="subtle-link-fill" aria-hidden="true" />
                  <div style={{ color: 'var(--accent-green)', marginRight: '10px', fontSize: '24px', position: 'absolute', zIndex: 2,left:0}}>
                    //
                  </div>
                  <span style={{ position: 'relative', zIndex: 2 }}>
                    <RollingText
                      text={link.label}
                      baseColor="var(--text-primary)"
                      hoverColor="var(--accent-green)"
                      stagger={0.015}
                    />
                  </span>
                  <div style={{ color: 'var(--accent-green)', marginRight: '10px', fontSize: '24px', position: 'absolute', zIndex: 2,right:'0' }}>
                    //
                  </div>
                </Link>
              ))}
              <div style={{ marginTop: '24px' }}>
                <Button
                  variant="primary"
                  href={EVENT_LINKS.registration}
                  isExternal
                  fullWidth
                  onClick={closeMobileMenu}
                >
                  [ REGISTER NOW ]
                </Button>
                {/* <Button
                  variant="primary"
                  onClick={() => {
                    closeMobileMenu();
                    navigate('/#get-involved');
                  }}  
                  fullWidth
                >
                  JOIN US
                </Button> */}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
