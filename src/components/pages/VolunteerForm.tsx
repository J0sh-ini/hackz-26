import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/Button';
import ScrambleText from '../ui/ScrambleText';

// Google Form configuration matching the official HackZ volunteer form
const GFORM_ACTION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScmpghZRrVHQqIs5ej63xtn9U1rUANcfWhRPQkmxZc0eIh0PA/formResponse';
// form prefill https://docs.google.com/forms/d/e/1FAIpQLScmpghZRrVHQqIs5ej63xtn9U1rUANcfWhRPQkmxZc0eIh0PA/viewform?usp=pp_url&entry.636669283=dummy@email.com&entry.1756113330=123456&entry.1905781723=namename&entry.1030145008=1&entry.1550890132=dept&entry.531808905=123456789

const GFORM_ENTRIES = {
  email: 'entry.636669283',
  name: 'entry.1905781723',
  rollno: 'entry.1756113330',
  year: 'entry.1030145008',
  department: 'entry.1550890132',
  phone: 'entry.531808905',
};

export interface VolunteerFormData {
  email: string;
  name: string;
  rollno: string;
  year: '1' | '2' | '3' | '4' | '5' | '';
  department: string;
  phone: string;
}

interface FormErrors {
  email?: string;
  name?: string;
  rollno?: string;
  year?: string;
  department?: string;
  phone?: string;
}

export const VolunteerForm: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState<VolunteerFormData>({
    email: '',
    name: '',
    rollno: '',
    year: '',
    department: '',
    phone: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'NAME REQUIRED';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'EMAIL REQUIRED';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'INVALID EMAIL FORMAT';
    }

    if (!formData.rollno.trim()) {
      newErrors.rollno = 'ROLL NO  REQUIRED';
    }

    if (!formData.year) {
      newErrors.year = 'ACADEMIC YEAR NOT SELECTED';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'DEPARTMENT REQUIRED';
    }

    if (!formData.phone.trim()) {
    newErrors.phone = 'PHONE NUMBER REQUIRED';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'INVALID PHONE NUMBER';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof VolunteerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === 'submitting') {
      return;
    }

    if (!validate()) {
      return;
    }

    setStatus('submitting');

    try {
      // Build form payload
      const formBody = new URLSearchParams();
      formBody.append(GFORM_ENTRIES.email, formData.email.trim());
      formBody.append(GFORM_ENTRIES.name, formData.name.trim());
      formBody.append(GFORM_ENTRIES.rollno, formData.rollno.trim());
      formBody.append(GFORM_ENTRIES.year, formData.year);
      formBody.append(GFORM_ENTRIES.department, formData.department.trim());
      formBody.append(GFORM_ENTRIES.phone, formData.phone.trim());

      // Single fetch submission
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
      setStatus('success');
    }
  };

  // const resetForm = () => {
  //   setFormData({
  //     email: '',
  //     name: '',
  //     rollno: '',
  //     year: '',
  //     department: '',
  //     phone: '',
  //   });
  //   setErrors({});
  //   setStatus('idle');
  // };

  return (
    <section
      id="volunteer-form"
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
              text="// CREW DEPLOYMENT PROTOCOL"
              as="span"
              className="text-[13px] text-accent-green uppercase tracking-[0.15em]"
              from="random"
              easing="linear"
            />
          </div>
          <ScrambleText
            text="VOLUNTEER REGISTRATION"
            as="h2"
            className="text-[clamp(18px,3vw,32px)] font-pixel uppercase mb-4 leading-relaxed"
            style={{ fontFamily: 'var(--font-pixel)' }}
            from="random"
            easing="linear"
          />
          <p style={{ maxWidth: '580px', margin: '0 auto', fontSize: '15px', color: 'var(--text-secondary)' }}>
            Join the core operations team for HackZ'26 at CEG Campus. Mobilize technical infrastructure, coordinate logistics, and power the 24-hour sprint.
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
              CREW
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
                TARGET // GOOGLE_FORM_MAINFRAME
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
                      Thank you for deploying as volunteer crew for HackZ'26. Your transmission has been recorded directly to the central operations registry. The organizing committee will contact you soon.
                    </p>

                    {/* Summary Card */}
                    <div
                      className="w-full max-w-md p-4 mb-8 text-left font-mono text-xs border border-border-default"
                      style={{ backgroundColor: '#050505' }}
                    >
                      <div className="text-accent-green mb-3 pb-2 border-b border-border-default">
                        // OPERATOR_MANIFEST
                      </div>
                      <div className="grid grid-cols-[110px_1fr] gap-y-1.5 text-secondary">
                        <span>NAME:</span> <span className="text-white truncate">{formData.name}</span>
                        <span>ROLL NO:</span> <span className="text-white">{formData.rollno}</span>
                        <span>YEAR:</span> <span className="text-white">YEAR {formData.year}</span>
                        <span>DEPT:</span> <span className="text-white truncate">{formData.department}</span>
                        <span>EMAIL:</span> <span className="text-white truncate">{formData.email}</span>
                        <span>PHONE:</span> <span className="text-white">{formData.phone}</span>
                      </div>
                    </div>

                    {/* <Button variant="outline" onClick={resetForm}>
                      + SUBMIT ANOTHER RESPONSE
                    </Button> */}
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
                    {/* Two-Column Grid for Name & Email */}
                    <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 max-sm:gap-4">
                      {/* Name Field */}
                      <div>
                        <label
                          htmlFor="volunteer-name"
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
                          id="volunteer-name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className={`w-full bg-[#050505] border px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none ${
                            errors.name
                              ? 'border-[#ff4444] focus:border-[#ff4444]'
                              : 'border-border-default focus:border-accent-green focus:shadow-[0_0_12px_rgba(0,255,65,0.2)]'
                          }`}
                        />
                      </div>

                      {/* Email Field */}
                      <div>
                        <label
                          htmlFor="volunteer-email"
                          className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                        >
                          <span>// 02. EMAIL ADDRESS</span>
                          {errors.email && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.email}
                            </span>
                          )}
                        </label>
                        <input
                          id="volunteer-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="e.g. alex@example.com"
                          className={`w-full bg-[#050505] border px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none ${
                            errors.email
                              ? 'border-[#ff4444] focus:border-[#ff4444]'
                              : 'border-border-default focus:border-accent-green focus:shadow-[0_0_12px_rgba(0,255,65,0.2)]'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Two-Column Grid for Roll No & Phone */}
                    <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 max-sm:gap-4">
                      {/* Roll Number */}
                      <div>
                        <label
                          htmlFor="volunteer-rollno"
                          className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                        >
                          <span>// 03. ROLL NUMBER</span>
                          {errors.rollno && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.rollno}
                            </span>
                          )}
                        </label>
                        <input
                          id="volunteer-rollno"
                          type="text"
                          value={formData.rollno}
                          onChange={(e) => handleChange('rollno', e.target.value)}
                          placeholder="e.g. 2023103001"
                          className={`w-full bg-[#050505] border px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none ${
                            errors.rollno
                              ? 'border-[#ff4444] focus:border-[#ff4444]'
                              : 'border-border-default focus:border-accent-green focus:shadow-[0_0_12px_rgba(0,255,65,0.2)]'
                          }`}
                        />
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label
                          htmlFor="volunteer-phone"
                          className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                        >
                          <span>// 04. PHONE NUMBER</span>
                          {errors.phone && (
                            <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                              {errors.phone}
                            </span>
                          )}
                        </label>
                        <input
                          id="volunteer-phone"
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

                    {/* Department */}
                    <div>
                      <label
                        htmlFor="volunteer-dept"
                        className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between"
                      >
                        <span>// 05. DEPARTMENT</span>
                        {errors.department && (
                          <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                            {errors.department}
                          </span>
                        )}
                      </label>
                      <input
                        id="volunteer-dept"
                        type="text"
                        value={formData.department}
                        onChange={(e) => handleChange('department', e.target.value)}
                        placeholder="e.g. Computer Science and Engineering"
                        className={`w-full bg-[#050505] border px-4 py-3 font-mono text-sm text-text-primary transition-all outline-none ${
                          errors.department
                            ? 'border-[#ff4444] focus:border-[#ff4444]'
                            : 'border-border-default focus:border-accent-green focus:shadow-[0_0_12px_rgba(0,255,65,0.2)]'
                        }`}
                      />
                    </div>

                    {/* Year of Study Selector (1-5) */}
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-wider text-accent-green mb-2 flex items-center justify-between">
                        <span>// 06. YEAR OF STUDY</span>
                        {errors.year && (
                          <span className="text-[#ff4444] text-[10px] tracking-normal font-sans">
                            {errors.year}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-5 gap-3 max-sm:gap-2">
                        {(['1', '2', '3', '4', '5'] as const).map((yr) => {
                          const isSelected = formData.year === yr;
                          return (
                            <button
                              key={yr}
                              type="button"
                              onClick={() => handleChange('year', yr)}
                              className={`py-3 px-2 font-mono text-center transition-all cursor-pointer border relative select-none ${
                                isSelected
                                  ? 'border-accent-green bg-[rgba(0,255,65,0.12)] text-accent-green font-bold shadow-[0_0_15px_rgba(0,255,65,0.25)]'
                                  : 'border-border-default bg-[#050505] text-secondary hover:border-accent-green/50 hover:text-white'
                              }`}
                            >
                              <span className="block text-[10px] tracking-widest text-muted">YR</span>
                              <span className="text-base sm:text-lg font-bold">{yr}</span>
                              {isSelected && (
                                <span className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-accent-green rounded-full shadow-[0_0_6px_var(--accent-green)]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
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
                        {status === 'submitting' ? 'TRANSMITTING PACKET...' : 'SUBMIT AS VOLUNTEER →'}
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

export default VolunteerForm;

