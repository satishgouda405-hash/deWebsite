import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Globe, PinIcon } from 'lucide-react';
import Swal from 'sweetalert2';

gsap.registerPlugin(ScrollTrigger);

interface FloatingInputProps {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
  textarea?: boolean;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

function FloatingInput({
  label,
  type = 'text',
  name,
  required,
  textarea,
  value,
  onChange,
  error,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          focused || hasValue
            ? 'top-0 text-[12px] text-[#bc9364]'
            : 'top-1/2 -translate-y-1/2 text-[14px] text-[#8a8a8a]'
        }`}
      >
        {label}
        {required && <span className="text-[#ea868f] ml-1">*</span>}
      </label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          className={`w-full bg-transparent pt-6 pb-2 text-[16px] text-[#f5f2eb] outline-none border-b resize-none transition-colors duration-300 ${
            error ? 'border-[#ea868f]' : focused ? 'border-[#bc9364]' : 'border-[#2a2a2a]'
          }`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-transparent pt-6 pb-2 text-[16px] text-[#f5f2eb] outline-none border-b transition-colors duration-300 ${
            error ? 'border-[#ea868f]' : focused ? 'border-[#bc9364]' : 'border-[#2a2a2a]'
          }`}
        />
      )}
      {error && <span className="text-[12px] text-[#ea868f] mt-1 block">{error}</span>}
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sessionType: '',
    date: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email address';
    if (!formData.sessionType) newErrors.sessionType = 'Please select a session type';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    Swal.fire({
      title: 'Message Sent',
      text: "We'll be in touch within 24 hours to discuss your vision.",
      icon: 'success',
      confirmButtonText: 'Close',
      confirmButtonColor: '#bc9364',
      background: '#141414',
      color: '#f5f2eb',
      iconColor: '#bc9364',
      customClass: {
        popup: 'border border-[#2a2a2a] rounded-none',
        title: 'font-display text-[20px]',
        confirmButton: 'uppercase tracking-[0.1em] text-[14px]',
      },
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      sessionType: '',
      date: '',
      message: '',
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-[140px]"
      style={{
        background:
          'linear-gradient(135deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%)',
      }}
    >
      <div className="container-luxe">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-20 lg:gap-20">
          {/* Left Column */}
          <div ref={leftRef}>
            <span className="label-style text-[#bc9364] block mb-5">
              GET IN TOUCH
            </span>
            <h2 className="font-display text-[48px] md:text-[64px] text-[#f5f2eb] mb-10">
              Begin Your Session
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#8a8a8a] max-w-[380px]">
              Tell us about your vision. We'll respond within 24 hours to begin
              crafting your experience.
            </p>

            <div className="mt-[60px] space-y-4">
              <a
                href="mailto:hello@lumeine.studio"
                className="block text-[18px] text-[#bc9364] hover:text-[#d4b896] transition-colors"
              >
                hello@lumeine.studio
              </a>
              <span className="block text-[16px] text-[#8a8a8a]">
                +33 1 42 86 82 82
              </span>
              <span className="block text-[14px] text-[#8a8a8a]">
                12 Rue de la Paix, Paris 75002
              </span>
            </div>

            <div className="flex gap-6 mt-10">
              <a href="#" className="text-[13px] uppercase text-[#8a8a8a] hover:text-[#bc9364] transition-colors flex items-center gap-2">
                <Instagram size={14} /> Instagram
              </a>
              <a href="#" className="text-[13px] uppercase text-[#8a8a8a] hover:text-[#bc9364] transition-colors flex items-center gap-2">
                <Globe size={14} /> Behance
              </a>
              <a href="#" className="text-[13px] uppercase text-[#8a8a8a] hover:text-[#bc9364] transition-colors flex items-center gap-2">
                <PinIcon size={14} /> Pinterest
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={rightRef}>
            <form onSubmit={handleSubmit} className="space-y-[30px]">
              <FloatingInput
                label="Full Name"
                name="name"
                required
                value={formData.name}
                onChange={(val) => setFormData({ ...formData, name: val })}
                error={errors.name}
              />
              <FloatingInput
                label="Email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={(val) => setFormData({ ...formData, email: val })}
                error={errors.email}
              />
              <FloatingInput
                label="Phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(val) => setFormData({ ...formData, phone: val })}
              />

              {/* Session Type Select */}
              <div className="relative">
                <label className="block text-[12px] text-[#bc9364] mb-2">
                  Session Type
                </label>
                <select
                  name="sessionType"
                  value={formData.sessionType}
                  onChange={(e) =>
                    setFormData({ ...formData, sessionType: e.target.value })
                  }
                  className={`w-full bg-transparent pb-2 text-[16px] text-[#f5f2eb] outline-none border-b transition-colors duration-300 ${
                    errors.sessionType
                      ? 'border-[#ea868f]'
                      : 'border-[#2a2a2a]'
                  }`}
                >
                  <option value="" className="bg-[#141414]">
                    Select...
                  </option>
                  <option value="editorial" className="bg-[#141414]">
                    Editorial Portraiture
                  </option>
                  <option value="commercial" className="bg-[#141414]">
                    Commercial Campaign
                  </option>
                  <option value="event" className="bg-[#141414]">
                    Event Coverage
                  </option>
                  <option value="fineart" className="bg-[#141414]">
                    Fine Art Commission
                  </option>
                  <option value="other" className="bg-[#141414]">
                    Other
                  </option>
                </select>
                {errors.sessionType && (
                  <span className="text-[12px] text-[#ea868f] mt-1 block">
                    {errors.sessionType}
                  </span>
                )}
              </div>

              {/* Date */}
              <div className="relative">
                <label className="block text-[12px] text-[#bc9364] mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full bg-transparent pb-2 text-[16px] text-[#f5f2eb] outline-none border-b border-[#2a2a2a] transition-colors duration-300 focus:border-[#bc9364] [color-scheme:dark]"
                />
              </div>

              <FloatingInput
                label="Message"
                name="message"
                textarea
                value={formData.message}
                onChange={(val) => setFormData({ ...formData, message: val })}
              />

              <button
                type="submit"
                className="w-full h-[60px] bg-[#bc9364] text-[#0a0a0a] text-[16px] font-medium uppercase tracking-[0.1em] hover:bg-[#d4b896] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] transition-all duration-300"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
