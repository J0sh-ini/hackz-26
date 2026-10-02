import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS, FaqItem } from '../../data/faq';
import  ScrambleText  from '../ui/ScrambleText';
import TextType from '../ui/TextType';
import FoldText from '../ui/FoldText';
export const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const categories = Array.from(new Set(FAQS.map((item) => item.category)));

  return (
    <section
      id="faq"
      className="py-[100px] max-md:py-16 relative"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-page)',
        borderTop: '1px solid var(--border-default)',
      }}
    >
      <div className="w-full max-w-[860px] mx-auto px-6 max-md:px-4">
        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div className="font-mono text-[13px] text-accent-green mb-3 flex items-center gap-2">
            <ScrambleText text="Debrief & Intel" as="span" className="text-[13px] text-accent-green tracking-[0.15em]" from="random" easing="linear"/>
          </div>
          <ScrambleText text="FREQUENTLY ASKED QUESTIONS" as="h2" className="text-[clamp(16px,2.8vw,30px)] font-pixel uppercase mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-pixel)' }} from="random" easing="linear"/>
          <p style={{ fontSize: '16px', lineHeight:'1.5' }}>
            Everything you need to know regarding participation eligibility, marathon protocols, team formation, and registration guidelines.
          </p>
        </div>

        {/* Categorized Accordion Groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {categories.map((category) => {
            const categoryItems = FAQS.filter((item) => item.category === category);

            return (
              <div key={category}>
                {/* Category Header */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--accent-green)',
                    letterSpacing: '0.15em',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>//</span>
                  <span>{category}</span>
                </div>

                {/* Items in this category */}
                <div style={{ borderTop: '1px solid var(--border-default)' }}>
                  {categoryItems.map((item: FaqItem) => {
                    const isOpen = openId === item.id;

                    return (
                      <div
                        key={item.id}
                        className="faq-accordion-item"
                        style={{
                          borderBottom: '1px solid var(--border-default)',
                          borderLeft: isOpen ? '2px solid var(--accent-green)' : '2px solid transparent',
                          backgroundColor: isOpen ? 'rgba(0, 255, 65, 0.03)' : 'transparent',
                          boxShadow: isOpen ? 'inset 0 0 20px rgba(0, 255, 65, 0.02)' : 'none',
                          paddingLeft: isOpen ? '12px' : '0px',
                          transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        }}
                      >
                        <button
                          className="faq-accordion-trigger"
                          onClick={() => toggleItem(item.id)}
                          aria-expanded={isOpen}
                          style={{
                            width: '100%',
                            minHeight: '56px',
                            padding: '18px 8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '16px',
                            textAlign: 'left',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            WebkitTapHighlightColor: 'transparent',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: 'clamp(15px, 2.5vw, 17px)',
                              fontWeight: 600,
                              color: isOpen ? 'var(--accent-green)' : 'var(--text-primary)',
                              transition: 'color 0.15s ease',
                            }}
                          >
                            {/* {item.question} */}
                            <TextType text={item.question} as="span" className="font-heading text-[clamp(15px,2.5vw,17px)] font-semibold" typingSpeed={20}  pauseDuration={1000} loop={false} startOnVisible={true} />
                          </span>

                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '16px',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              color: isOpen ? 'var(--accent-green)' : 'var(--text-muted)',
                              // backgroundColor: isOpen ? 'rgba(0, 255, 65, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                              // border: `1px solid ${isOpen ? 'var(--accent-green)' : 'var(--border-default)'}`,
                              //padding: '4px 8px',
                              whiteSpace: 'nowrap',
                              userSelect: 'none',
                              // boxShadow: isOpen ? '0 0 10px rgba(0, 255, 65, 0.25)' : 'none',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {isOpen ? '[ − ]' : '[ + ]'}
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div
                                style={{
                                  padding: '0 8px 20px 8px',
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '14px',
                                  lineHeight: 1.65,
                                  color: '#a8a8a8',
                                }}
                              >
                                {/* {item.answer} */}
                                <FoldText text={item.answer} style={{
                                  padding: '0 8px 20px 8px',
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '14px',
                                  lineHeight: 1.65,
                                  color: '#a8a8a8',
                                }}/>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


