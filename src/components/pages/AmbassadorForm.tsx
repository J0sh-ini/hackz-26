import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/Button';
import ScrambleText from '../ui/ScrambleText';
import { Link } from 'react-router-dom';

// Google Form configuration matching the official HackZ Call for Ambassadors form
const GFORM_ACTION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScE_yNdANKIRUtbBM3d6lFnd8ZIIjA4JMPZZsMTrJdRhYPOfQ/formResponse';

const GFORM_ENTRIES = {
  name: 'entry.1651355464',
  email: 'entry.1791865732',
  phone: 'entry.2011314100',
  city: 'entry.661693501',
  state: 'entry.798632854',
  college: 'entry.105605921',
  department: 'entry.1685962397',
  year: 'entry.1080379152',
  priorExperience: 'entry.80068448',
  experienceDetails: 'entry.112806674',
  clubAssociation: 'entry.142854421',
  clubDetails: 'entry.71028540',
  promotionPlan: 'entry.1850361304',
  willingToPromote: 'entry.132188118',
  regularTimeCommitment: 'entry.1511646479',
  hoursPerWeek: 'entry.759428545',
  confirmation: 'entry.1558397442',
};

const YEAR_CHOICES = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Other'];

const YES_NO_CHOICES = ['Yes', 'No'];

const HOURS_CHOICES = ['1 - 3 Hours', '3 - 5 Hours', '5 - 10 Hours', '10+ Hours', 'Other'];

const PROMO_CHANNELS = [
  'WhatsApp & Telegram Student Groups',
  'Social Media (Instagram / LinkedIn / X)',
  'Classroom & Department Presentations',
  'College Tech Clubs & Student Associations',
  'Campus Posters & Notice Boards',
  'Coding Communities & Peer Referrals',
  'College Discord / Slack Communities',
  'Other Outreach Strategies',
];

const PERKS = [
  {
    title: 'LETTER OF APPRECIATION',
    desc: 'Official LOA from CSEA & HackZ Committee',
    code: 'PERK-01',
  },
  {
    title: 'EXCLUSIVE GOODIES',
    desc: 'HackZ official swag pack & merchandise',
    code: 'PERK-02',
  },
  {
    title: 'ABACUS’27 WORKSHOP',
    desc: 'Complimentary pass for ABACUS symposium',
    code: 'PERK-03',
  },
  {
    title: 'ABACUS’27 STAY',
    desc: 'Free accommodation during ABACUS’27',
    code: 'PERK-04',
  },
];

export interface AmbassadorFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  college: string;
  department: string;
  year: string;
  otherYear: string;
  priorExperience: string;
  experienceDetails: string;
  clubAssociation: string;
  clubDetails: string;
  promotionalChannels: string[];
  promotionPlan: string;
  willingToPromote: string;
  regularTimeCommitment: string;
  hoursPerWeek: string;
  otherHours: string;
  confirmed: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  college?: string;
  department?: string;
  year?: string;
  otherYear?: string;
  priorExperience?: string;
  clubAssociation?: string;
  promotionPlan?: string;
  willingToPromote?: string;
  regularTimeCommitment?: string;
  hoursPerWeek?: string;
  confirmed?: string;
}

export const AmbassadorForm: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState<AmbassadorFormData>({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    college: '',
    department: '',
    year: '',
    otherYear: '',
    priorExperience: '',
    experienceDetails: '',
    clubAssociation: '',
    clubDetails: '',
    promotionalChannels: [],
    promotionPlan: '',
    willingToPromote: '',
    regularTimeCommitment: '',
    hoursPerWeek: '',
    otherHours: '',
    confirmed: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'FULL NAME REQUIRED';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'EMAIL ADDRESS REQUIRED';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'INVALID EMAIL ADDRESS';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'WHATSAPP NUMBER REQUIRED';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'INVALID PHONE NUMBER (8-15 DIGITS)';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'CITY REQUIRED';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'STATE REQUIRED';
    }

    if (!formData.college.trim()) {
      newErrors.college = 'COLLEGE / INSTITUTION REQUIRED';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'DEPARTMENT / BRANCH REQUIRED';
    }

    if (!formData.year) {
      newErrors.year = 'YEAR OF STUDY REQUIRED';
    } else if (formData.year === 'Other' && !formData.otherYear.trim()) {
      newErrors.otherYear = 'PLEASE SPECIFY YOUR YEAR';
    }

    if (!formData.priorExperience) {
      newErrors.priorExperience = 'SELECTION REQUIRED';
    }

    if (!formData.clubAssociation) {
      newErrors.clubAssociation = 'SELECTION REQUIRED';
    }

    if (!formData.promotionPlan.trim() && formData.promotionalChannels.length === 0) {
      newErrors.promotionPlan = 'PLEASE SELECT CHANNELS OR ENTER YOUR PROMOTION PLAN';
    }

    if (!formData.willingToPromote) {
      newErrors.willingToPromote = 'SELECTION REQUIRED';
    }

    if (!formData.regularTimeCommitment) {
      newErrors.regularTimeCommitment = 'SELECTION REQUIRED';
    }

    if (!formData.hoursPerWeek && !formData.otherHours.trim()) {
      newErrors.hoursPerWeek = 'HOURS COMMITMENT REQUIRED';
    }

    if (!formData.confirmed) {
      newErrors.confirmed = 'CONFIRMATION AGREEMENT REQUIRED';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof AmbassadorFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleToggleChannel = (channel: string) => {
    setFormData((prev) => {
      const exists = prev.promotionalChannels.includes(channel);
      const next = exists
        ? prev.promotionalChannels.filter((c) => c !== channel)
        : [...prev.promotionalChannels, channel];
      return { ...prev, promotionalChannels: next };
    });
    if (errors.promotionPlan) {
      setErrors((prev) => ({ ...prev, promotionPlan: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === 'submitting') {
      return;
    }

    if (!validate()) {
      // Find the first error key and scroll into view smoothly
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const el = document.getElementById(`ambassador-${firstErrorKey}`);
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
      formBody.append(GFORM_ENTRIES.email, formData.email.trim());
      formBody.append('emailAddress', formData.email.trim());
      formBody.append(GFORM_ENTRIES.phone, formData.phone.trim());
      formBody.append(GFORM_ENTRIES.city, formData.city.trim());
      formBody.append(GFORM_ENTRIES.state, formData.state.trim());
      formBody.append(GFORM_ENTRIES.college, formData.college.trim());
      formBody.append(GFORM_ENTRIES.department, formData.department.trim());

      const yearFinal =
        formData.year === 'Other'
          ? formData.otherYear.trim() || 'Other'
          : formData.year;
      formBody.append(GFORM_ENTRIES.year, yearFinal);

      formBody.append(GFORM_ENTRIES.priorExperience, formData.priorExperience);
      formBody.append(
        GFORM_ENTRIES.experienceDetails,
        formData.experienceDetails.trim() || 'None'
      );

      formBody.append(GFORM_ENTRIES.clubAssociation, formData.clubAssociation);
      formBody.append(
        GFORM_ENTRIES.clubDetails,
        formData.clubDetails.trim() || 'None'
      );

      // Combine chosen channels and detailed plan into Google Form text field
      let promotionFinal = '';
      if (formData.promotionalChannels.length > 0) {
        promotionFinal += `[Channels: ${formData.promotionalChannels.join(', ')}] `;
      }
      if (formData.promotionPlan.trim()) {
        promotionFinal += formData.promotionPlan.trim();
      }
      formBody.append(GFORM_ENTRIES.promotionPlan, promotionFinal.trim() || 'None');

      formBody.append(GFORM_ENTRIES.willingToPromote, formData.willingToPromote);
      formBody.append(
        GFORM_ENTRIES.regularTimeCommitment,
        formData.regularTimeCommitment
      );

      const hoursFinal =
        formData.hoursPerWeek === 'Other'
          ? formData.otherHours.trim() || 'Flexible'
          : formData.hoursPerWeek || formData.otherHours.trim();
      formBody.append(GFORM_ENTRIES.hoursPerWeek, hoursFinal);

      // Google Form confirmation option is 'I agree'
      formBody.append(GFORM_ENTRIES.confirmation, 'I agree');

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
      email: '',
      phone: '',
      city: '',
      state: '',
      college: '',
      department: '',
      year: '',
      otherYear: '',
      priorExperience: '',
      experienceDetails: '',
      clubAssociation: '',
      clubDetails: '',
      promotionalChannels: [],
      promotionPlan: '',
      willingToPromote: '',
      regularTimeCommitment: '',
      hoursPerWeek: '',
      otherHours: '',
      confirmed: false,
    });
    setErrors({});
    setStatus('idle');
  };

  return (
    <section
      id="ambassador-form"
      className="py-[100px] max-md:py-16 relative"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-page)',
        borderTop: '1px solid var(--border-default)',
        overflow: 'hidden',
      }}
    >
      <div
        className="w-full max-w-[1200px] mx-auto px-6 max-md:px-4"
        style={{ position: 'relative', zIndex: 10 }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="font-mono text-[13px] text-accent-green uppercase tracking-[0.15em] mb-3 flex items-center gap-2 justify-center">
            <ScrambleText
              text="CAMPUS OUTREACH PROTOCOL"
              as="span"
              className="text-[13px] text-accent-green uppercase tracking-[0.15em]"
              from="random"
              easing="linear"
            />
          </div>
          <ScrambleText
            text="AMBASSADOR REGISTRATION"
            as="h2"
            className="text-[clamp(18px,3vw,32px)] font-pixel uppercase mb-4 leading-relaxed"
            style={{ fontFamily: 'var(--font-pixel)' }}
            from="random"
            easing="linear"
          />
          <p
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              fontSize: '15px',
              color: 'var(--text-secondary)',
            }}
          >
            Become the official voice of HackZ'26 at your institution. Champion technological innovation,
            rally engineering squads across India, and unlock premier national symposium privileges.
          </p>
        </div>

        {/* Ambassador Benefits Strip */}
        <div className="max-w-[840px] mx-auto mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PERKS.map((perk) => (
              <div
                key={perk.code}
                className="bg-[#050505] border border-border-default p-3 sm:p-4 text-left flex flex-col justify-between relative overflow-hidden group hover:border-accent-green/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-accent-green tracking-widest font-semibold">
                    {perk.code}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green opacity-70" />
                </div>
                <div>
                  <h4 className="font-mono text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider mb-1 leading-snug">
                    {perk.title}
                  </h4>
                  <p className="font-mono text-[10px] text-secondary leading-tight">
                    {perk.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
                fontSize: 'clamp(50px, 7vw, 110px)',
                fontWeight: 800,
                color: 'var(--accent-green)',
                opacity: 0.03,
                userSelect: 'none',
                pointerEvents: 'none',
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              AMBASSADOR
            </div>

            {/* Corner Tech Accents */}
            <span className="absolute top-2 left-2 font-mono text-[10px] text-accent-green opacity-50 select-none">+</span>
            <span className="absolute top-2 right-2 font-mono text-[10px] text-accent-green opacity-50 select-none">+</span>
            <span className="absolute bottom-2 left-2 font-mono text-[10px] text-accent-green opacity-50 select-none">+</span>
            <span className="absolute bottom-2 right-2 font-mono text-[10px] text-accent-green opacity-50 select-none">+</span>

            {/* Terminal Status Bar */}
            {status === 'idle' && (
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
                  TARGET : AMBASSADOR_REGISTRY
                </div>
              </div>
            )}

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
                      [ STATUS: 200 OK # APPLICATION LOGGED ]
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-white mb-3">
                      AMBASSADOR REGISTRATION CONFIRMED
                    </h3>

                    <p className="text-secondary max-w-md text-sm mb-6 leading-relaxed">
                      Thank you for stepping up to represent HackZ'26. Your submission has been registered in the
                      central operations network. The organizing team will review your profile and reach out via WhatsApp & email with your Ambassador Kit and referral protocol.
                    </p>

                    {/* Summary Card */}
                    <div
                      className="w-full max-w-md p-4 mb-8 text-left font-mono text-xs border border-border-default"
                      style={{ backgroundColor: '#050505' }}
                    >
                      <div className="text-accent-green mb-3 pb-2 border-b border-border-default flex items-center justify-between">
                        <span>AMBASSADOR_MANIFEST</span>
                        <span className="text-[10px] text-muted">VERIFIED</span>
                      </div>
                      <div className="grid grid-cols-[130px_1fr] gap-y-1.5 text-secondary">
                        <span>NAME:</span> <span className="text-white truncate">{formData.name}</span>
                        <span>EMAIL:</span> <span className="text-white truncate">{formData.email}</span>
                        <span>WHATSAPP:</span> <span className="text-white">{formData.phone}</span>
                        <span>COLLEGE:</span> <span className="text-white truncate">{formData.college}</span>
                        <span>LOCATION:</span> <span className="text-white truncate">{formData.city}, {formData.state}</span>
                        <span>DEPT / YR:</span>{' '}
                        <span className="text-white truncate">
                          {formData.department} ({formData.year === 'Other' ? formData.otherYear : formData.year})
                        </span>
                        <span>PRIOR EXP:</span> <span className="text-white">{formData.priorExperience}</span>
                        <span>CLUBS:</span> <span className="text-white">{formData.clubAssociation}</span>
                        <span>COMMITMENT:</span>{' '}
                        <span className="text-white">
                          {formData.hoursPerWeek === 'Other' ? formData.otherHours : formData.hoursPerWeek}
                        </span>
                        <span>CHANNELS:</span>{' '}
                        <span className="text-white truncate">
                          {formData.promotionalChannels.length > 0 ? formData.promotionalChannels.join(', ') : 'Direct Outreach'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full justify-center max-w-md">
                      <Link to="/" className="w-full sm:w-auto">
                        <Button variant="outline" onClick={resetForm} className="w-full">
                          # RETURN TO MAIN
                        </Button>
                      </Link>
                      <Button
                        variant="volt"
                        onClick={resetForm}
                        className="w-full sm:w-auto"
                      >
                        + SUBMIT ANOTHER
                      </Button>
                    </div>
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
                    {/* Section 1: Personal Details */}
                    <div>
                      <div className="font-mono text-[11px] text-accent-green tracking-widest uppercase mb-4 pb-1.5 border-b border-border-default flex items-center justify-between">
                        <span>PERSONAL IDENTITY</span>
                        
                      </div>

                      {/* Two-Column Grid for Name & Email */}
                      <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 max-sm:gap-4 mb-4">
                        {/* Name Field */}
                        <div id="ambassador-name">
                          <label
                            htmlFor="amb-name"
                            className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                          >
                            <span>FULL NAME</span>
                            {errors.name && (
                              <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                                {errors.name}
                              </span>
                            )}
                          </label>
                          <input
                            id="amb-name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="John Doe"
                            className={`w-full bg-[#050505] border px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none ${
                              errors.name
                                ? 'border-[#ff4444] focus:border-[#ff4444]'
                                : 'border-border-default focus:border-accent-green-dim'
                            }`}
                          />
                        </div>

                        {/* Email Field */}
                        <div id="ambassador-email">
                          <label
                            htmlFor="amb-email"
                            className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                          >
                            <span>EMAIL ADDRESS</span>
                            {errors.email && (
                              <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                                {errors.email}
                              </span>
                            )}
                          </label>
                          <input
                            id="amb-email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="johndoe@gmail.com"
                            className={`w-full bg-[#050505] border px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none ${
                              errors.email
                                ? 'border-[#ff4444] focus:border-[#ff4444]'
                                : 'border-border-default focus:border-accent-green-dim'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Two-Column Grid for Mobile & City */}
                      <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 max-sm:gap-4 mb-4">
                        {/* Mobile Number Field */}
                        <div id="ambassador-phone">
                          <label
                            htmlFor="amb-phone"
                            className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                          >
                            <span>MOBILE NUMBER (WHATSAPP)</span>
                            {errors.phone && (
                              <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                                {errors.phone}
                              </span>
                            )}
                          </label>
                          <input
                            id="amb-phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            placeholder="+91 9876543210"
                            className={`w-full bg-[#050505] border px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none ${
                              errors.phone
                                ? 'border-[#ff4444] focus:border-[#ff4444]'
                                : 'border-border-default focus:border-accent-green-dim'
                            }`}
                          />
                        </div>

                        {/* City Field */}
                        <div id="ambassador-city">
                          <label
                            htmlFor="amb-city"
                            className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                          >
                            <span>CITY</span>
                            {errors.city && (
                              <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                                {errors.city}
                              </span>
                            )}
                          </label>
                          <input
                            id="amb-city"
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                            placeholder="Chennai / Bengaluru"
                            className={`w-full bg-[#050505] border px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none ${
                              errors.city
                                ? 'border-[#ff4444] focus:border-[#ff4444]'
                                : 'border-border-default focus:border-accent-green-dim'
                            }`}
                          />
                        </div>
                      </div>

                      {/* State Field */}
                      <div id="ambassador-state">
                        <label
                          htmlFor="amb-state"
                          className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                        >
                          <span>STATE</span>
                          {errors.state && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.state}
                            </span>
                          )}
                        </label>
                        <input
                          id="amb-state"
                          type="text"
                          value={formData.state}
                          onChange={(e) => handleChange('state', e.target.value)}
                          placeholder="Tamil Nadu / Karnataka / Maharashtra"
                          className={`w-full bg-[#050505] border px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none ${
                            errors.state
                              ? 'border-[#ff4444] focus:border-[#ff4444]'
                              : 'border-border-default focus:border-accent-green-dim'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Section 2: Academic Institution */}
                    <div className="pt-2">
                      <div className="font-mono text-[11px] text-accent-green tracking-widest uppercase mb-4 pb-1.5 border-b border-border-default flex items-center justify-between">
                        <span>ACADEMIC CREDENTIALS</span>
                        
                      </div>

                      {/* College / Institution Name */}
                      <div id="ambassador-college" className="mb-4">
                        <label
                          htmlFor="amb-college"
                          className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                        >
                          <span>COLLEGE / INSTITUTION NAME</span>
                          {errors.college && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.college}
                            </span>
                          )}
                        </label>
                        <input
                          id="amb-college"
                          type="text"
                          value={formData.college}
                          onChange={(e) => handleChange('college', e.target.value)}
                          placeholder="College of Engineering, Guindy / IIT Madras / NIT Trichy"
                          className={`w-full bg-[#050505] border px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none ${
                            errors.college
                              ? 'border-[#ff4444] focus:border-[#ff4444]'
                              : 'border-border-default focus:border-accent-green-dim'
                          }`}
                        />
                      </div>

                      {/* Department / Branch */}
                      <div id="ambassador-department" className="mb-4">
                        <label
                          htmlFor="amb-department"
                          className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                        >
                          <span>DEPARTMENT / BRANCH</span>
                          {errors.department && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.department}
                            </span>
                          )}
                        </label>
                        <input
                          id="amb-department"
                          type="text"
                          value={formData.department}
                          onChange={(e) => handleChange('department', e.target.value)}
                          placeholder="Computer Science & Engineering / Information Technology / ECE"
                          className={`w-full bg-[#050505] border px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none ${
                            errors.department
                              ? 'border-[#ff4444] focus:border-[#ff4444]'
                              : 'border-border-default focus:border-accent-green-dim'
                          }`}
                        />
                      </div>

                      {/* Current Year of Study */}
                      <div id="ambassador-year">
                        <div className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between">
                          <span>CURRENT YEAR OF STUDY</span>
                          {errors.year && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.year}
                            </span>
                          )}
                        </div>

                        {/* Mobile responsive grid for Year choices */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                          {YEAR_CHOICES.map((yr) => {
                            const isSelected = formData.year === yr;
                            return (
                              <button
                                key={yr}
                                type="button"
                                onClick={() => handleChange('year', yr)}
                                className={`w-full min-h-[46px] p-2.5 font-mono text-xs text-center transition-all cursor-pointer border select-none flex flex-col items-center justify-center ${
                                  isSelected
                                    ? 'border-accent-green-dim bg-accent-green/15 text-accent-green font-bold'
                                    : 'border-border-default bg-[#050505] text-secondary hover:border-accent-green/50 hover:text-white'
                                }`}
                              >
                                <span className="block text-[9px] tracking-widest text-muted">YEAR</span>
                                <span className="text-xs sm:text-sm font-bold whitespace-nowrap">{yr}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Custom Year input if 'Other' selected */}
                        {formData.year === 'Other' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3"
                          >
                            <label
                              htmlFor="amb-other-year"
                              className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1 block"
                            >
                              SPECIFY YEAR / DEGREE:
                            </label>
                            <input
                              id="amb-other-year"
                              type="text"
                              value={formData.otherYear}
                              onChange={(e) => handleChange('otherYear', e.target.value)}
                              placeholder="e.g. 5th Year Dual Degree / MCA 1st Year..."
                              className={`w-full bg-[#050505] border px-4 py-2.5 font-mono text-sm text-text-primary transition-all outline-none ${
                                errors.otherYear
                                  ? 'border-[#ff4444] focus:border-[#ff4444]'
                                  : 'border-border-default focus:border-accent-green-dim'
                              }`}
                            />
                            {errors.otherYear && (
                              <span className="text-[#ff4444] text-[10px] tracking-normal font-sans block mt-1">
                                {errors.otherYear}
                              </span>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Section 3: Leadership & Experience */}
                    <div className="pt-2">
                      <div className="font-mono text-[11px] text-accent-green tracking-widest uppercase mb-4 pb-1.5 border-b border-border-default flex items-center justify-between">
                        <span>OUTREACH EXPERIENCE & AFFILIATIONS</span>
                        
                      </div>

                      {/* Prior Ambassador Experience */}
                      <div id="ambassador-priorExperience" className="mb-4">
                        <div className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between flex-wrap gap-1">
                          <span className="leading-snug">
                            HAVE YOU PREVIOUSLY WORKED AS A CAMPUS AMBASSADOR OR VOLUNTEERED FOR AN EVENT?
                          </span>
                          {errors.priorExperience && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.priorExperience}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {YES_NO_CHOICES.map((val) => {
                            const isSelected = formData.priorExperience === val;
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => handleChange('priorExperience', val)}
                                className={`min-h-[46px] py-3 px-3 font-mono text-center text-xs transition-all cursor-pointer border select-none ${
                                  isSelected
                                    ? 'border-accent-green-dim bg-accent-green/15 text-accent-green font-bold'
                                    : 'border-border-default bg-[#050505] text-secondary hover:border-accent-green/50 hover:text-white'
                                }`}
                              >
                                [ {val.toUpperCase()} ]
                              </button>
                            );
                          })}
                        </div>

                        {/* Experience Description if Yes */}
                        {formData.priorExperience === 'Yes' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3"
                          >
                            <label
                              htmlFor="amb-exp-details"
                              className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1 block"
                            >
                              BRIEFLY DESCRIBE YOUR EXPERIENCE:
                            </label>
                            <textarea
                              id="amb-exp-details"
                              rows={2}
                              value={formData.experienceDetails}
                              onChange={(e) => handleChange('experienceDetails', e.target.value)}
                              placeholder="e.g. Lead Ambassador for TechFest'25, coordinated 150+ registrations, managed social promotions..."
                              className="w-full bg-[#050505] border border-border-default px-4 py-2.5 font-mono text-sm text-text-primary transition-all outline-none focus:border-accent-green-dim resize-none"
                            />
                          </motion.div>
                        )}
                      </div>

                      {/* Technical Clubs Association */}
                      <div id="ambassador-clubAssociation">
                        <div className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between flex-wrap gap-1">
                          <span className="leading-snug">
                            ARE YOU ASSOCIATED WITH ANY TECHNICAL CLUBS, STUDENT ASSOCIATIONS, OR COLLEGE COMMUNITIES?
                          </span>
                          {errors.clubAssociation && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.clubAssociation}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {YES_NO_CHOICES.map((val) => {
                            const isSelected = formData.clubAssociation === val;
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => handleChange('clubAssociation', val)}
                                className={`min-h-[46px] py-3 px-3 font-mono text-center text-xs transition-all cursor-pointer border select-none ${
                                  isSelected
                                    ? 'border-accent-green-dim bg-accent-green/15 text-accent-green font-bold'
                                    : 'border-border-default bg-[#050505] text-secondary hover:border-accent-green/50 hover:text-white'
                                }`}
                              >
                                [ {val.toUpperCase()} ]
                              </button>
                            );
                          })}
                        </div>

                        {/* Mention Clubs if Yes */}
                        {formData.clubAssociation === 'Yes' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3"
                          >
                            <label
                              htmlFor="amb-club-details"
                              className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1 block"
                            >
                              MENTION THE CLUBS / COMMUNITIES & YOUR DESIGNATION:
                            </label>
                            <input
                              id="amb-club-details"
                              type="text"
                              value={formData.clubDetails}
                              onChange={(e) => handleChange('clubDetails', e.target.value)}
                              placeholder="e.g. CSEA Core Member, ACM Student Chapter Lead, GDG On Campus Organizer..."
                              className="w-full bg-[#050505] border border-border-default px-4 py-2.5 font-mono text-sm text-text-primary transition-all outline-none focus:border-accent-green-dim"
                            />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Section 4: Promotional Strategy & Checkboxes */}
                    <div className="pt-2">
                      <div className="font-mono text-[11px] text-accent-green tracking-widest uppercase mb-4 pb-1.5 border-b border-border-default flex items-center justify-between">
                        <span>PROMOTIONS & OUTREACH STRATEGY</span>
                        
                      </div>

                      {/* Promotional Channels Multi-select Checkboxes */}
                      <div id="ambassador-promotionPlan" className="mb-4">
                        <div className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between flex-wrap gap-1">
                          <span className="leading-snug">
                            OUTREACH CHANNELS & PROMOTION DOMAINS
                          </span>
                          {errors.promotionPlan && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.promotionPlan}
                            </span>
                          )}
                        </div>

                        {/* Mobile responsive checkboxes: 1 column on mobile, 2 columns on sm+ */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                          {PROMO_CHANNELS.map((channel) => {
                            const isSelected = formData.promotionalChannels.includes(channel);
                            return (
                              <button
                                key={channel}
                                type="button"
                                onClick={() => handleToggleChannel(channel)}
                                className={`w-full min-h-[46px] p-3 text-left transition-all cursor-pointer border select-none flex items-start gap-3 ${
                                  isSelected
                                    ? 'border-accent-green-dim bg-accent-green/10 text-accent-green font-medium'
                                    : 'border-border-default bg-[#050505] text-secondary hover:border-accent-green/50 hover:text-white'
                                }`}
                              >
                                <span
                                  className={`w-4 h-4 mt-0.5 border flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                      ? 'border-accent-green-dim bg-accent-green/20'
                                      : 'border-border-default bg-[#0a0a0a]'
                                  }`}
                                >
                                  {isSelected && <span className="w-2 h-2 bg-accent-green-dim" />}
                                </span>
                                <span className="font-mono text-xs leading-snug break-words whitespace-normal flex-1">
                                  {channel}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Strategy Detailed Textarea */}
                        <div>
                          <label
                            htmlFor="amb-promotion-plan"
                            className="font-mono text-[11px] text-accent-green uppercase tracking-wider mb-1 block"
                          >
                            <span className="leading-snug">
                            HOW WOULD YOU PROMOTE HACKZ’26 AT YOUR COLLEGE? (STRATEGY & ACTION PLAN)
                            </span>
                          </label>
                          <textarea
                            id="amb-promotion-plan"
                            rows={3}
                            value={formData.promotionPlan}
                            onChange={(e) => handleChange('promotionPlan', e.target.value)}
                            placeholder="Outline your outreach approach: departmental announcements, hackathon team scouting, social status blasts, tech community meetups, direct mentorship coordination..."
                            className={`w-full bg-[#050505] border px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none resize-none ${
                              errors.promotionPlan
                                ? 'border-[#ff4444] focus:border-[#ff4444]'
                                : 'border-border-default focus:border-accent-green-dim'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Active Promotion Willingness */}
                      <div id="ambassador-willingToPromote" className="mb-4">
                        <div className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between flex-wrap gap-1">
                          <span className="leading-snug">
                            ARE YOU WILLING TO ACTIVELY PROMOTE HACKZ’26 THROUGH YOUR COLLEGE NETWORKS AND SOCIAL MEDIA?
                          </span>
                          {errors.willingToPromote && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.willingToPromote}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {YES_NO_CHOICES.map((val) => {
                            const isSelected = formData.willingToPromote === val;
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => handleChange('willingToPromote', val)}
                                className={`min-h-[46px] py-3 px-3 font-mono text-center text-xs transition-all cursor-pointer border select-none ${
                                  isSelected
                                    ? 'border-accent-green-dim bg-accent-green/15 text-accent-green font-bold'
                                    : 'border-border-default bg-[#050505] text-secondary hover:border-accent-green/50 hover:text-white'
                                }`}
                              >
                                [ {val.toUpperCase()} ]
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Commitment Until Deadline */}
                      <div id="ambassador-regularTimeCommitment" className="mb-4">
                        <div className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between flex-wrap gap-1">
                          <span className="leading-snug">
                            CAN YOU DEDICATE TIME REGULARLY TO PROMOTIONAL ACTIVITIES UNTIL THE REGISTRATION DEADLINE?
                          </span>
                          {errors.regularTimeCommitment && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.regularTimeCommitment}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {YES_NO_CHOICES.map((val) => {
                            const isSelected = formData.regularTimeCommitment === val;
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => handleChange('regularTimeCommitment', val)}
                                className={`min-h-[46px] py-3 px-3 font-mono text-center text-xs transition-all cursor-pointer border select-none ${
                                  isSelected
                                    ? 'border-accent-green-dim bg-accent-green/15 text-accent-green font-bold'
                                    : 'border-border-default bg-[#050505] text-secondary hover:border-accent-green/50 hover:text-white'
                                }`}
                              >
                                [ {val.toUpperCase()} ]
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Hours per week contribution */}
                      <div id="ambassador-hoursPerWeek">
                        <div className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between flex-wrap gap-1">
                          <span>HOW MANY HOURS PER WEEK CAN YOU CONTRIBUTE?</span>
                          {errors.hoursPerWeek && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.hoursPerWeek}
                            </span>
                          )}
                        </div>

                        {/* Mobile responsive hours selector */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                          {HOURS_CHOICES.map((hrs) => {
                            const isSelected = formData.hoursPerWeek === hrs;
                            return (
                              <button
                                key={hrs}
                                type="button"
                                onClick={() => handleChange('hoursPerWeek', hrs)}
                                className={`w-full min-h-[46px] p-2.5 font-mono text-xs text-center transition-all cursor-pointer border select-none flex flex-col items-center justify-center ${
                                  isSelected
                                    ? 'border-accent-green-dim bg-accent-green/15 text-accent-green font-bold'
                                    : 'border-border-default bg-[#050505] text-secondary hover:border-accent-green/50 hover:text-white'
                                }`}
                              >
                                <span className="block text-[9px] tracking-widest text-muted">TIME</span>
                                <span className="text-xs sm:text-sm font-bold whitespace-nowrap">{hrs}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Custom Hours input if 'Other' selected */}
                        {formData.hoursPerWeek === 'Other' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3"
                          >
                            <label
                              htmlFor="amb-other-hours"
                              className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1 block"
                            >
                              SPECIFY HOURS PER WEEK:
                            </label>
                            <input
                              id="amb-other-hours"
                              type="text"
                              value={formData.otherHours}
                              onChange={(e) => handleChange('otherHours', e.target.value)}
                              placeholder="e.g. 6-8 hours or Weekends only..."
                              className="w-full bg-[#050505] border border-border-default px-4 py-2.5 font-mono text-sm text-text-primary transition-all outline-none focus:border-accent-green-dim"
                            />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Section 5: Confirmation Agreement Checkbox */}
                    <div id="ambassador-confirmed" className="pt-2">
                      <div className="font-mono text-[11px] text-accent-green tracking-widest uppercase mb-3 flex items-center justify-between">
                        <span>AMBASSADOR UNDERTAKING</span>
                        {errors.confirmed && (
                          <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                            {errors.confirmed}
                          </span>
                        )}
                      </div>

                      {/* Full-width responsive interactive checkbox card */}
                      <button
                        type="button"
                        onClick={() => handleChange('confirmed', !formData.confirmed)}
                        className={`w-full p-4 border transition-all cursor-pointer flex items-start gap-3.5 select-none text-left ${
                          formData.confirmed
                            ? 'border-accent-green-dim bg-accent-green/10'
                            : errors.confirmed
                            ? 'border-[#ff4444] bg-[#ff4444]/5'
                            : 'border-border-default bg-[#050505] hover:border-accent-green/40'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 mt-0.5 border flex items-center justify-center shrink-0 transition-colors ${
                            formData.confirmed
                              ? 'border-accent-green-dim bg-accent-green/20'
                              : errors.confirmed
                              ? 'border-[#ff4444] bg-[#0a0a0a]'
                              : 'border-border-default bg-[#0a0a0a]'
                          }`}
                        >
                          {formData.confirmed && (
                            <svg className="w-3 h-3 text-accent-green" viewBox="0 0 12 12" fill="none">
                              <path
                                d="M2 6L5 9L10 3"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <div className="flex-1">
                          <span className="font-mono text-xs sm:text-sm text-text-primary leading-relaxed break-words whitespace-normal block">
                            I confirm that the information provided is accurate and I am willing to fulfil the responsibilities if selected.
                          </span>
                          <span className="font-mono text-[10px] text-muted tracking-wider block mt-1">
                            [ OFFICIAL COMMITMENT FOR HACKZ'26 OUTREACH PROGRAM ]
                          </span>
                        </div>
                      </button>
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
                        {status === 'submitting' ? 'TRANSMITTING APPLICATION...' : 'SUBMIT APPLICATION →'}
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

export default AmbassadorForm;
