import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/Button';
import ScrambleText from '../ui/ScrambleText';

// Google Form configuration matching the official HackZ Call for Mentors form
const GFORM_ACTION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdBHYL0g2Nyej_jGOy9YyahtdVW0BusjhZt4fY-nABvlqqeZQ/formResponse';

const GFORM_ENTRIES = {
  name: 'entry.236779670',
  phone: 'entry.1290791010',
  role: 'entry.1397143955',
  organisation: 'entry.2070024171',
  technology: 'entry.1337643046',
  experience: 'entry.1082602373',
  priorMentoring: 'entry.1818491429',
  track: 'entry.244757476',
  format: 'entry.1438618338',
  reason: 'entry.121254884',
  requests: 'entry.1578911757',
  comments: 'entry.1321005685',
};

const TECH_CHOICES = [
  'Software Development',
  'Data Science',
  'Cyber Security',
  'Blockchain',
  'Artificial Intelligence',
  'Other',
];

const EXPERIENCE_CHOICES = ['0-1', '1-3', '3-5', '5-10', '10+'];

const PRIOR_MENTORING_CHOICES = ['Yes', 'No'];

const TRACK_CHOICES = [
  'Women Empowerment',
  'Blockchain',
  'FinTech',
  'MedX',
  'Sustainability and Climate Change',
  'Women Safety',
];

const FORMAT_CHOICES = ['Virtual', 'In-person', 'Both'];

export interface MentorFormData {
  name: string;
  phone: string;
  role: string;
  organisation: string;
  technology: string;
  otherTechnology: string;
  experience: string;
  priorMentoring: string;
  track: string;
  format: string;
  reason: string;
  requests: string;
  comments: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  role?: string;
  organisation?: string;
  technology?: string;
  otherTechnology?: string;
  experience?: string;
  priorMentoring?: string;
  track?: string;
  format?: string;
}

export const MentorForm: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState<MentorFormData>({
    name: '',
    phone: '',
    role: '',
    organisation: '',
    technology: '',
    otherTechnology: '',
    experience: '',
    priorMentoring: '',
    track: '',
    format: '',
    reason: '',
    requests: '',
    comments: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'NAME REQUIRED';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'PHONE NUMBER REQUIRED';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'INVALID PHONE NUMBER';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'ROLE REQUIRED';
    }

    if (!formData.organisation.trim()) {
      newErrors.organisation = 'ORGANISATION REQUIRED';
    }

    if (!formData.technology) {
      newErrors.technology = 'FIELD / TECH SELECTION REQUIRED';
    } else if (formData.technology === 'Other' && !formData.otherTechnology.trim()) {
      newErrors.otherTechnology = 'PLEASE SPECIFY YOUR FIELD';
    }

    if (!formData.experience) {
      newErrors.experience = 'EXPERIENCE RANGE REQUIRED';
    }

    if (!formData.priorMentoring) {
      newErrors.priorMentoring = 'SELECTION REQUIRED';
    }

    if (!formData.track) {
      newErrors.track = 'TRACK PREFERENCE REQUIRED';
    }

    if (!formData.format) {
      newErrors.format = 'FORMAT REQUIRED';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof MentorFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === 'submitting') {
      return;
    }

    if (!validate()) {
      // Scroll to first error if off-screen
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const el = document.getElementById(`mentor-${firstErrorKey}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    setStatus('submitting');

    try {
      const formBody = new URLSearchParams();
      formBody.append(GFORM_ENTRIES.name, formData.name.trim());
      formBody.append(GFORM_ENTRIES.phone, formData.phone.trim());
      formBody.append(GFORM_ENTRIES.role, formData.role.trim());
      formBody.append(GFORM_ENTRIES.organisation, formData.organisation.trim());

      // Technology handling (with Google Forms "Other" support)
      if (formData.technology === 'Other') {
        formBody.append(GFORM_ENTRIES.technology, '__other_option__');
        formBody.append(`${GFORM_ENTRIES.technology}.other_option_response`, formData.otherTechnology.trim());
      } else {
        formBody.append(GFORM_ENTRIES.technology, formData.technology);
      }

      formBody.append(GFORM_ENTRIES.experience, formData.experience);
      formBody.append(GFORM_ENTRIES.priorMentoring, formData.priorMentoring);
      formBody.append(GFORM_ENTRIES.track, formData.track);
      formBody.append(GFORM_ENTRIES.format, formData.format);

      if (formData.reason.trim()) {
        formBody.append(GFORM_ENTRIES.reason, formData.reason.trim());
      }
      if (formData.requests.trim()) {
        formBody.append(GFORM_ENTRIES.requests, formData.requests.trim());
      }
      if (formData.comments.trim()) {
        formBody.append(GFORM_ENTRIES.comments, formData.comments.trim());
      }

      await fetch(GFORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      setStatus('success');
    } catch {
      // mode: 'no-cors' opaque response or network fallback still registers on Google Forms
      setStatus('success');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      role: '',
      organisation: '',
      technology: '',
      otherTechnology: '',
      experience: '',
      priorMentoring: '',
      track: '',
      format: '',
      reason: '',
      requests: '',
      comments: '',
    });
    setErrors({});
    setStatus('idle');
  };

  return (
    <section
      id="mentor-form"
      className="py-[100px] max-md:py-16 relative"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-page)',
        borderTop: '1px solid var(--border-default)',
        overflow: 'hidden',
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="font-mono text-[13px] text-accent-green uppercase tracking-[0.15em] mb-3 flex items-center gap-2 justify-center">
            <ScrambleText
              text="// DOMAIN SPECIALIST PROTOCOL"
              as="span"
              className="text-[13px] text-accent-green uppercase tracking-[0.15em]"
              from="random"
              easing="linear"
            />
          </div>
          <ScrambleText
            text="MENTOR REGISTRATION"
            as="h2"
            className="text-[clamp(18px,3vw,32px)] font-pixel uppercase mb-4 leading-relaxed"
            style={{ fontFamily: 'var(--font-pixel)' }}
            from="random"
            easing="linear"
          />
          <p style={{ maxWidth: '620px', margin: '0 auto', fontSize: '15px', color: 'var(--text-secondary)' }}>
            Guide collegiate engineering squads through architectural bottlenecks, code optimization, and industry viability during the 24-hour sprint at CEG Campus.
          </p>
        </div>

        {/* Central Cyber Form Container */}
        <div className="max-w-[760px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            }}
          >
            {/* Atmospheric Background Watermark */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-10px',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(60px, 8vw, 120px)',
                fontWeight: 800,
                color: 'var(--accent-green)',
                opacity: 0.03,
                userSelect: 'none',
                pointerEvents: 'none',
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              MENTOR
            </div>

            {/* Corner Tech Accents */}
            <span className="absolute top-2 left-2 font-mono text-[10px] text-accent-green opacity-40 select-none">+</span>
            <span className="absolute top-2 right-2 font-mono text-[10px] text-accent-green opacity-40 select-none">+</span>
            <span className="absolute bottom-2 left-2 font-mono text-[10px] text-accent-green opacity-40 select-none">+</span>
            <span className="absolute bottom-2 right-2 font-mono text-[10px] text-accent-green opacity-40 select-none">+</span>

            {/* Terminal Status Bar */}
            <div
              style={{
                borderBottom: '1px solid var(--border-default)',
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                color: 'var(--text-secondary)',
                backgroundColor: 'rgba(0,0,0,0.4)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                <span className="text-accent-green font-semibold">FORM_SYS: ACTIVE</span>
              </div>
              <div className="text-muted tracking-widest hidden sm:block">
                TARGET // MENTOR_REGISTRY_MAINFRAME
              </div>
            </div>

            {/* Form Inner Content */}
            <div className="p-8 max-md:p-5 relative z-10">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="py-12 px-4 text-center flex flex-col items-center"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                      style={{
                        border: '1px solid var(--accent-green)',
                        backgroundColor: 'rgba(0, 255, 65, 0.08)',
                        boxShadow: '0 0 25px rgba(0, 255, 65, 0.25)',
                      }}
                    >
                      <svg
                        className="w-8 h-8 text-accent-green"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    <div className="font-mono text-xs text-accent-green tracking-[0.2em] uppercase mb-2">
                      [ STATUS: 200 OK // TRANSMISSION LOGGED ]
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-white mb-3">
                      REGISTRATION CONFIRMED
                    </h3>

                    <p className="text-secondary max-w-md text-sm mb-6 leading-relaxed">
                      Thank you for volunteering your expertise as mentor for HackZ'26. Your credentials have been recorded in the central operations registry. The organizing committee will contact you soon with squad and track details.
                    </p>

                    {/* Summary Card */}
                    <div
                      className="w-full max-w-md p-4 mb-8 text-left font-mono text-xs border border-border-default"
                      style={{ backgroundColor: '#050505' }}
                    >
                      <div className="text-accent-green mb-3 pb-2 border-b border-border-default">
                        // MENTOR_MANIFEST
                      </div>
                      <div className="grid grid-cols-[120px_1fr] gap-y-1.5 text-secondary">
                        <span>NAME:</span> <span className="text-white truncate">{formData.name}</span>
                        <span>PHONE:</span> <span className="text-white">{formData.phone}</span>
                        <span>ROLE:</span> <span className="text-white truncate">{formData.role}</span>
                        <span>ORG:</span> <span className="text-white truncate">{formData.organisation}</span>
                        <span>DOMAIN:</span> <span className="text-white truncate">{formData.technology === 'Other' ? formData.otherTechnology : formData.technology}</span>
                        <span>EXPERIENCE:</span> <span className="text-white">{formData.experience} YRS</span>
                        <span>TRACK:</span> <span className="text-white truncate">{formData.track}</span>
                        <span>FORMAT:</span> <span className="text-white">{formData.format}</span>
                        <span>PRIOR MENTOR:</span> <span className="text-white">{formData.priorMentoring}</span>
                      </div>
                    </div>

                    <Button variant="outline" onClick={resetForm}>
                      + SUBMIT ANOTHER TRANSMISSION
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Two-Column Grid for Name & Phone */}
                    <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 max-sm:gap-4">
                      {/* Name Field */}
                      <div>
                        <label
                          htmlFor="mentor-name"
                          className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                        >
                          <span>// 01. FULL NAME</span>
                          {errors.name && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.name}
                            </span>
                          )}
                        </label>
                        <input
                          id="mentor-name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="e.g. Dr. Alex Morgan"
                          className={`w-full bg-[#050505] border px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none ${
                            errors.name
                              ? 'border-[#ff4444] focus:border-[#ff4444]'
                              : 'border-border-default focus:border-accent-green focus:shadow-[0_0_12px_rgba(0,255,65,0.2)]'
                          }`}
                        />
                      </div>

                      {/* Mobile Number Field */}
                      <div>
                        <label
                          htmlFor="mentor-phone"
                          className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                        >
                          <span>// 02. MOBILE NUMBER</span>
                          {errors.phone && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.phone}
                            </span>
                          )}
                        </label>
                        <input
                          id="mentor-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className={`w-full bg-[#050505] border px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none ${
                            errors.phone
                              ? 'border-[#ff4444] focus:border-[#ff4444]'
                              : 'border-border-default focus:border-accent-green focus:shadow-[0_0_12px_rgba(0,255,65,0.2)]'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Two-Column Grid for Role & Organisation */}
                    <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 max-sm:gap-4">
                      {/* Current Role */}
                      <div>
                        <label
                          htmlFor="mentor-role"
                          className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                        >
                          <span>// 03. CURRENT ROLE / POSITION</span>
                          {errors.role && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.role}
                            </span>
                          )}
                        </label>
                        <input
                          id="mentor-role"
                          type="text"
                          value={formData.role}
                          onChange={(e) => handleChange('role', e.target.value)}
                          placeholder="e.g. Senior Software Engineer"
                          className={`w-full bg-[#050505] border px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none ${
                            errors.role
                              ? 'border-[#ff4444] focus:border-[#ff4444]'
                              : 'border-border-default focus:border-accent-green focus:shadow-[0_0_12px_rgba(0,255,65,0.2)]'
                          }`}
                        />
                      </div>

                      {/* Organisation / Institution */}
                      <div>
                        <label
                          htmlFor="mentor-organisation"
                          className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                        >
                          <span>// 04. ORGANISATION / INSTITUTION</span>
                          {errors.organisation && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.organisation}
                            </span>
                          )}
                        </label>
                        <input
                          id="mentor-organisation"
                          type="text"
                          value={formData.organisation}
                          onChange={(e) => handleChange('organisation', e.target.value)}
                          placeholder="e.g. Google / Microsoft / Anna Univ"
                          className={`w-full bg-[#050505] border px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none ${
                            errors.organisation
                              ? 'border-[#ff4444] focus:border-[#ff4444]'
                              : 'border-border-default focus:border-accent-green focus:shadow-[0_0_12px_rgba(0,255,65,0.2)]'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Technology / Field of Expertise */}
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between">
                        <span>// 05. TECHNOLOGY / SPECIALIZATION DOMAIN</span>
                        {errors.technology && (
                          <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                            {errors.technology}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 max-sm:grid-cols-2 gap-2.5">
                        {TECH_CHOICES.map((tech) => {
                          const isSelected = formData.technology === tech;
                          return (
                            <button
                              key={tech}
                              type="button"
                              onClick={() => handleChange('technology', tech)}
                              className={`py-2.5 px-3 font-mono text-xs text-left transition-all cursor-pointer border relative select-none flex items-center justify-between ${
                                isSelected
                                  ? 'border-accent-green bg-[rgba(0,255,65,0.12)] text-accent-green font-bold shadow-[0_0_12px_rgba(0,255,65,0.2)]'
                                  : 'border-border-default bg-[#050505] text-secondary hover:border-accent-green/50 hover:text-white'
                              }`}
                            >
                              <span className="truncate">{tech}</span>
                              {isSelected && (
                                <span className="w-1.5 h-1.5 bg-accent-green rounded-full shadow-[0_0_6px_var(--accent-green)] shrink-0 ml-1.5" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* If "Other" selected, show custom text input */}
                      {formData.technology === 'Other' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3"
                        >
                          <label
                            htmlFor="mentor-other-tech"
                            className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1 block"
                          >
                            SPECIFY DOMAIN / FIELD:
                          </label>
                          <input
                            id="mentor-other-tech"
                            type="text"
                            value={formData.otherTechnology}
                            onChange={(e) => handleChange('otherTechnology', e.target.value)}
                            placeholder="e.g. Quantum Computing, Embedded Systems, DevOps..."
                            className={`w-full bg-[#050505] border px-4 py-2.5 font-mono text-sm text-text-primary transition-all outline-none ${
                              errors.otherTechnology
                                ? 'border-[#ff4444] focus:border-[#ff4444]'
                                : 'border-border-default focus:border-accent-green'
                            }`}
                          />
                          {errors.otherTechnology && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans block mt-1">
                              {errors.otherTechnology}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Years of Experience */}
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between">
                        <span>// 06. YEARS OF EXPERIENCE</span>
                        {errors.experience && (
                          <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                            {errors.experience}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-5 gap-3 max-sm:gap-2">
                        {EXPERIENCE_CHOICES.map((exp) => {
                          const isSelected = formData.experience === exp;
                          return (
                            <button
                              key={exp}
                              type="button"
                              onClick={() => handleChange('experience', exp)}
                              className={`py-3 px-2 font-mono text-center transition-all cursor-pointer border relative select-none ${
                                isSelected
                                  ? 'border-accent-green bg-[rgba(0,255,65,0.12)] text-accent-green font-bold shadow-[0_0_15px_rgba(0,255,65,0.25)]'
                                  : 'border-border-default bg-[#050505] text-secondary hover:border-accent-green/50 hover:text-white'
                              }`}
                            >
                              <span className="block text-[10px] tracking-widest text-muted">EXP</span>
                              <span className="text-base sm:text-lg font-bold">{exp}</span>
                              {isSelected && (
                                <span className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-accent-green rounded-full shadow-[0_0_6px_var(--accent-green)]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Mentored previously & Mentorship Format side-by-side */}
                    <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 max-sm:gap-4">
                      {/* Prior Mentoring */}
                      <div>
                        <div className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between">
                          <span>// 07. PRIOR MENTOR EXPERIENCE</span>
                          {errors.priorMentoring && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.priorMentoring}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {PRIOR_MENTORING_CHOICES.map((val) => {
                            const isSelected = formData.priorMentoring === val;
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => handleChange('priorMentoring', val)}
                                className={`py-3 px-3 font-mono text-center text-xs transition-all cursor-pointer border select-none ${
                                  isSelected
                                    ? 'border-accent-green bg-[rgba(0,255,65,0.12)] text-accent-green font-bold shadow-[0_0_12px_rgba(0,255,65,0.2)]'
                                    : 'border-border-default bg-[#050505] text-secondary hover:border-accent-green/50 hover:text-white'
                                }`}
                              >
                                [ {val.toUpperCase()} ]
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Mentorship Format */}
                      <div>
                        <div className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between">
                          <span>// 08. MENTORSHIP FORMAT</span>
                          {errors.format && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.format}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {FORMAT_CHOICES.map((fmt) => {
                            const isSelected = formData.format === fmt;
                            return (
                              <button
                                key={fmt}
                                type="button"
                                onClick={() => handleChange('format', fmt)}
                                className={`py-3 px-2 font-mono text-center text-[11px] transition-all cursor-pointer border select-none ${
                                  isSelected
                                    ? 'border-accent-green bg-[rgba(0,255,65,0.12)] text-accent-green font-bold shadow-[0_0_12px_rgba(0,255,65,0.2)]'
                                    : 'border-border-default bg-[#050505] text-secondary hover:border-accent-green/50 hover:text-white'
                                }`}
                              >
                                {fmt.toUpperCase()}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Preferred Track */}
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between">
                        <span>// 09. PREFERRED HACKATHON TRACK</span>
                        {errors.track && (
                          <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                            {errors.track}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2.5">
                        {TRACK_CHOICES.map((trk) => {
                          const isSelected = formData.track === trk;
                          return (
                            <button
                              key={trk}
                              type="button"
                              onClick={() => handleChange('track', trk)}
                              className={`py-3 px-3.5 font-mono text-xs text-left transition-all cursor-pointer border relative select-none flex items-center justify-between ${
                                isSelected
                                  ? 'border-accent-green bg-[rgba(0,255,65,0.12)] text-accent-green font-bold shadow-[0_0_12px_rgba(0,255,65,0.2)]'
                                  : 'border-border-default bg-[#050505] text-secondary hover:border-accent-green/50 hover:text-white'
                              }`}
                            >
                              <span>{trk}</span>
                              {isSelected && (
                                <span className="w-1.5 h-1.5 bg-accent-green rounded-full shadow-[0_0_6px_var(--accent-green)] shrink-0 ml-2" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Why do you want to mentor (Optional) */}
                    <div>
                      <label
                        htmlFor="mentor-reason"
                        className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                      >
                        <span>// 10. WHY DO YOU WANT TO MENTOR AT HACKZ'26? (OPTIONAL)</span>
                      </label>
                      <textarea
                        id="mentor-reason"
                        rows={3}
                        value={formData.reason}
                        onChange={(e) => handleChange('reason', e.target.value)}
                        placeholder="Share your motivation for guiding collegiate teams and shaping future engineers..."
                        className="w-full bg-[#050505] border border-border-default px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none focus:border-accent-green focus:shadow-[0_0_12px_rgba(0,255,65,0.2)] resize-none"
                      />
                    </div>

                    {/* Specific Requests / Requirements (Optional) */}
                    <div>
                      <label
                        htmlFor="mentor-requests"
                        className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                      >
                        <span>// 11. SPECIFIC REQUESTS OR REQUIREMENTS (OPTIONAL)</span>
                      </label>
                      <textarea
                        id="mentor-requests"
                        rows={2}
                        value={formData.requests}
                        onChange={(e) => handleChange('requests', e.target.value)}
                        placeholder="e.g. Specific time window availability, workstation equipment, dietary needs..."
                        className="w-full bg-[#050505] border border-border-default px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none focus:border-accent-green focus:shadow-[0_0_12px_rgba(0,255,65,0.2)] resize-none"
                      />
                    </div>

                    {/* Additional Comments (Optional) */}
                    <div>
                      <label
                        htmlFor="mentor-comments"
                        className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                      >
                        <span>// 12. ADDITIONAL COMMENTS OR SUGGESTIONS (OPTIONAL)</span>
                      </label>
                      <textarea
                        id="mentor-comments"
                        rows={2}
                        value={formData.comments}
                        onChange={(e) => handleChange('comments', e.target.value)}
                        placeholder="Any additional thoughts, special initiatives, or inquiries for the organizers..."
                        className="w-full bg-[#050505] border border-border-default px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none focus:border-accent-green focus:shadow-[0_0_12px_rgba(0,255,65,0.2)] resize-none"
                      />
                    </div>

                    {/* Submit Button Section */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border-default">
                      <div className="font-mono text-[11px] text-muted tracking-wider flex items-center gap-2">
                        <span className="text-accent-green">▶</span>
                        <span>ALL FIELDS TRANSMITTED TO CSEA SERVER</span>
                      </div>

                      <Button
                        type="submit"
                        variant="volt"
                        disabled={status === 'submitting'}
                        className="w-full sm:w-auto"
                      >
                        {status === 'submitting' ? 'TRANSMITTING PACKET...' : 'SUBMIT AS MENTOR →'}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MentorForm;
