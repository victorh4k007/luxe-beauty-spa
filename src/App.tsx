import React, { useState, useEffect, useRef, useCallback } from 'react';
import { services, testimonials, CONFIG, buildWhatsAppLink, buildWhatsAppGeneral, SERVICE_CATEGORIES } from './data/siteData';
import type { Service } from './data/siteData';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/about.css';
import './styles/services.css';
import './styles/whychoose.css';
import './styles/gallery.css';
import './styles/testimonials.css';
import './styles/contact.css';
import './styles/footer.css';

/* ═══════════════════════════════════════════════════════════════
   REVEAL HOOK — triggers .visible on IntersectionObserver
   ═══════════════════════════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ═══════════════════════════════════════════════════════════════
   ROOT APP
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  useReveal();
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <WhatsAppFAB />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { href: '#about',        label: 'About' },
  { href: '#services',     label: 'Services' },
  { href: '#why-choose',   label: 'Why Us' },
  { href: '#gallery',      label: 'Gallery' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact',      label: 'Contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="wrap nav__inner">
        {/* Logo */}
        <a href="#" className="nav__logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setOpen(false); }}>
          <span className="nav__gem">✦</span>
          <div className="nav__logo-text">
            <span className="nav__logo-name">Luxe Beauty</span>
            <span className="nav__logo-tag">Spa &amp; Wellness · Miami</span>
          </div>
        </a>

        {/* Desktop links */}
        <nav className="nav__links" aria-label="Page sections">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="nav__link" onClick={e => handleNavClick(e, l.href)}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={buildWhatsAppGeneral()}
          target="_blank" rel="noopener noreferrer"
          className="btn btn-gold btn-sm nav__cta"
        >
          Book via WhatsApp
        </a>

        {/* Burger */}
        <button className="nav__burger" onClick={() => setOpen(v => !v)} aria-label="Toggle menu" aria-expanded={open}>
          <span className={`nav__burger-bar ${open ? 'nav__burger-bar--open' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`nav__drawer ${open ? 'nav__drawer--open' : ''}`}>
        {NAV_LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            className="nav__drawer-link"
            style={{ animationDelay: `${i * 0.06 + 0.04}s` }}
            onClick={e => handleNavClick(e, l.href)}
          >
            {l.label}
          </a>
        ))}
        <a
          href={buildWhatsAppGeneral()}
          target="_blank" rel="noopener noreferrer"
          className="btn btn-gold nav__drawer-cta"
          style={{ animationDelay: '0.42s' }}
        >
          📲 Book via WhatsApp
        </a>
        <p className="nav__drawer-phone">
          <a href={`tel:${CONFIG.phone}`}>{CONFIG.phone}</a>
        </p>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=90"
          alt="Luxe Beauty Spa — Miami luxury spa interior"
          className="hero__img"
        />
        <div className="hero__overlay" />
        <div className="hero__grain" />
      </div>

      <div className="wrap hero__content">
        <div className="hero__text">
          <span className="hero__eyebrow">Miami's Premier Luxury Spa</span>
          <h1 className="hero__headline">
            Your Moment of<br />
            <em>Beauty</em> Starts Here.
          </h1>
          <p className="hero__sub">
            Brickell's most exclusive spa and wellness destination.<br />
            Premium treatments. Certified specialists. Unforgettable rituals.
          </p>
          <div className="hero__actions">
            <a
              href={buildWhatsAppGeneral()}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-gold btn-lg"
            >
              📲 Book Your Appointment
            </a>
            <a
              href="#services"
              className="btn btn-ghost-light btn-lg"
              onClick={e => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Explore Treatments
            </a>
          </div>
          <div className="hero__badges">
            <div className="hero__badge"><span>500+</span><small>5-Star Reviews</small></div>
            <div className="hero__badge-sep" />
            <div className="hero__badge"><span>15+</span><small>Luxury Treatments</small></div>
            <div className="hero__badge-sep" />
            <div className="hero__badge"><span>10+</span><small>Years in Miami</small></div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <div className="hero__scroll-mouse"><div className="hero__scroll-dot" /></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════════════════ */
function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="wrap about__grid">
        {/* Images */}
        <div className="about__images reveal">
          <div className="about__img-main-wrap">
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=85"
              alt="Premium facial treatment at Luxe Beauty Spa"
              className="about__img-main"
              loading="lazy"
            />
          </div>
          <div className="about__img-float">
            <img
              src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&q=85"
              alt="Relaxing hot stone massage"
              className="about__img-small"
              loading="lazy"
            />
          </div>
          <div className="about__award">
            <span className="about__award-gem">✦</span>
            <div>
              <strong>Best Luxury Spa</strong>
              <span>Miami 2024 & 2025</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="about__text">
          <span className="eyebrow reveal">Our Story</span>
          <h2 className="section-title reveal reveal-delay-1">
            A Sanctuary of Beauty<br />in the Heart of Brickell
          </h2>
          <div className="gold-rule reveal reveal-delay-2" />
          <p className="section-body reveal reveal-delay-2">
            Nestled in the prestigious Brickell Avenue, Luxe Beauty Spa was founded with a single conviction: true beauty is a ritual, not a routine. Since opening our doors, we have welcomed thousands of Miami's most discerning guests into a world of personalized, results-driven treatments crafted by world-class specialists.
          </p>
          <p className="section-body reveal reveal-delay-3" style={{ marginTop: '1.1rem' }}>
            Every detail — from our hand-curated product range to the warmth of our team — is designed to make you feel genuinely cared for. You don't come to Luxe for a service. You come for an experience.
          </p>

          <div className="about__stats reveal reveal-delay-3">
            {[
              { n: '5,000+', l: 'Guests Served' },
              { n: '98%',    l: 'Client Satisfaction' },
              { n: '5',      l: 'Expert Specialists' },
            ].map(s => (
              <div key={s.l} className="about__stat">
                <strong>{s.n}</strong>
                <span>{s.l}</span>
              </div>
            ))}
          </div>

          <a
            href={buildWhatsAppGeneral()}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost-dark reveal reveal-delay-4"
            style={{ marginTop: '2rem' }}
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════════════════════════ */
function ServicesSection() {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filtered = activeFilter === 'All'
    ? services
    : services.filter(s => s.category === activeFilter);

  return (
    <section className="services" id="services">
      {/* Section header */}
      <div className="wrap services__header">
        <span className="eyebrow reveal">Treatments Menu</span>
        <h2 className="section-title reveal reveal-delay-1">Our Luxury Treatments</h2>
        <div className="gold-rule c reveal reveal-delay-1" />
        <p className="section-body reveal reveal-delay-2" style={{ margin: '0 auto', textAlign: 'center' }}>
          Fifteen premium experiences crafted for beauty, healing, and deep sensory pleasure. Every treatment is personally designed for your skin, body and wellness goals.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="wrap services__filters reveal reveal-delay-2">
        {SERVICE_CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`svc-filter ${activeFilter === cat ? 'svc-filter--on' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="wrap services__grid">
        {filtered.map((svc, i) => (
          <ServiceCard key={svc.id} svc={svc} index={i} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ svc, index }: { svc: Service; index: number }) {
  const waLink = buildWhatsAppLink(svc.name, svc.price, svc.duration);

  return (
    <article className={`svc-card reveal reveal-delay-${Math.min(index % 3 + 1, 5)}`}>
      <a href={waLink} target="_blank" rel="noopener noreferrer" className="svc-card__img-link">
        <div className="svc-card__img-wrap">
          <img src={svc.image} alt={svc.name} loading="lazy" className="svc-card__img" />
          <div className="svc-card__img-overlay" />
          <div className="svc-card__hover-label">Book Now →</div>
        </div>
      </a>
      <div className="svc-card__body">
        <div className="svc-card__cat">{svc.category}</div>
        <h3 className="svc-card__name">{svc.name}</h3>
        <p className="svc-card__tagline">{svc.tagline}</p>
        <p className="svc-card__desc">{svc.description}</p>
        <div className="svc-card__footer">
          <div className="svc-card__meta">
            <span className="svc-card__price">${svc.price}</span>
            <span className="svc-card__dur">· {svc.duration} min</span>
          </div>
          <a
            href={waLink}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-gold btn-sm svc-card__btn"
          >
            📲 Book Now
          </a>
        </div>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WHY CHOOSE US
   ═══════════════════════════════════════════════════════════════ */
function WhyChooseSection() {
  const pillars = [
    {
      icon: '🏅',
      title: 'Award-Winning Specialists',
      desc: 'Our team holds CIDESCO and NCBTMB certifications and trains continually with global luxury brands. Real expertise, every visit.',
    },
    {
      icon: '🌿',
      title: 'Premium Product Lines',
      desc: 'We work exclusively with Dermalogica, La Mer, and La Prairie — because what we put on your skin matters as much as our technique.',
    },
    {
      icon: '✦',
      title: 'Fully Personalized Care',
      desc: 'Every treatment begins with a thorough consultation. No two guests are the same — your ritual is crafted specifically for you.',
    },
    {
      icon: '🕊️',
      title: 'A True Escape',
      desc: 'From the curated scent in the air to the warmth of our treatment rooms, every detail of your visit is designed to transport you.',
    },
    {
      icon: '📲',
      title: 'Effortless Booking',
      desc: 'Book any treatment directly via WhatsApp in seconds. Our team responds promptly and handles every detail for you.',
    },
    {
      icon: '⭐',
      title: '500+ Five-Star Reviews',
      desc: 'Our guests return, again and again, and bring their friends. The best evidence of quality is the loyalty of those we serve.',
    },
  ];

  return (
    <section className="why" id="why-choose">
      <div className="why__inner">
        <div className="wrap why__header">
          <span className="eyebrow reveal" style={{ color: 'var(--gold-lt)' }}>The Luxe Difference</span>
          <h2 className="section-title reveal reveal-delay-1" style={{ color: 'var(--white)' }}>
            Why Miami Chooses Luxe Beauty Spa
          </h2>
          <div className="gold-rule c reveal reveal-delay-1" />
        </div>
        <div className="wrap why__grid">
          {pillars.map((p, i) => (
            <div key={p.title} className={`why-card reveal reveal-delay-${Math.min(i % 3 + 1, 5)}`}>
              <div className="why-card__icon">{p.icon}</div>
              <h3 className="why-card__title">{p.title}</h3>
              <p className="why-card__desc">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="why__cta reveal">
          <a
            href={buildWhatsAppGeneral()}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-gold btn-lg"
          >
            📲 Book Your Experience
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GALLERY
   ═══════════════════════════════════════════════════════════════ */
const GALLERY = [
  { url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=700&q=85', alt: 'Relaxing massage therapy', span: 'tall' },
  { url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&q=85', alt: 'Luxury facial treatment' },
  { url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=700&q=85', alt: 'Hot stone massage ritual' },
  { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700&q=85', alt: 'Spa treatment room', span: 'wide' },
  { url: 'https://images.unsplash.com/photo-1583001930096-2b6e68a4a1b5?w=700&q=85', alt: 'Lash extension artistry' },
  { url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=700&q=85', alt: '24K gold body treatment' },
  { url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=700&q=85', alt: 'Luxe spa manicure' },
  { url: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=700&q=85', alt: 'HydraGlow facial', span: 'tall' },
];

function GallerySection() {
  return (
    <section className="gallery" id="gallery">
      <div className="wrap gallery__header">
        <span className="eyebrow reveal">Our World</span>
        <h2 className="section-title reveal reveal-delay-1">A Glimpse Inside Luxe</h2>
        <div className="gold-rule c reveal reveal-delay-1" />
        <p className="section-body reveal reveal-delay-2" style={{ margin: '0 auto', textAlign: 'center' }}>
          Follow us on Instagram{' '}
          <a href={CONFIG.instagram} target="_blank" rel="noopener noreferrer" className="gallery__ig-link">
            @luxebeautyspa
          </a>
        </p>
      </div>
      <div className="gallery__grid reveal reveal-delay-2">
        {GALLERY.map((img, i) => (
          <a
            key={i}
            href={CONFIG.instagram}
            target="_blank" rel="noopener noreferrer"
            className={`gallery__item ${img.span === 'tall' ? 'gallery__item--tall' : img.span === 'wide' ? 'gallery__item--wide' : ''}`}
          >
            <img src={img.url} alt={img.alt} loading="lazy" />
            <div className="gallery__item-hover">
              <span>📸</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  const prev = () => setActive(a => (a - 1 + testimonials.length) % testimonials.length);
  const next = useCallback(() => setActive(a => (a + 1) % testimonials.length), []);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="testim" id="testimonials">
      <div className="wrap testim__header">
        <span className="eyebrow reveal">Guest Experiences</span>
        <h2 className="section-title reveal reveal-delay-1">What Our Guests Say</h2>
        <div className="gold-rule c reveal reveal-delay-1" />
      </div>

      {/* Featured slider */}
      <div className="wrap testim__slider">
        <div className="testim__card reveal reveal-delay-2" key={active}>
          <div className="testim__stars">{'★'.repeat(t.rating)}</div>
          <blockquote className="testim__quote">"{t.text}"</blockquote>
          <div className="testim__author">
            <div className="testim__avatar" style={{ background: t.color }}>
              {t.initials}
            </div>
            <div>
              <div className="testim__name">{t.name}</div>
              <div className="testim__service">{t.service}</div>
            </div>
          </div>
        </div>

        <div className="testim__controls">
          <button className="testim__btn" onClick={prev} aria-label="Previous review">‹</button>
          <div className="testim__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testim__dot ${i === active ? 'testim__dot--on' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
          <button className="testim__btn" onClick={next} aria-label="Next review">›</button>
        </div>
      </div>

      {/* Summary strip */}
      <div className="wrap testim__strip">
        <div className="testim__strip-inner reveal reveal-delay-3">
          <div className="testim__metric">
            <strong>4.9</strong><span>Average Rating</span>
          </div>
          <div className="testim__divider" />
          <div className="testim__metric">
            <strong>500+</strong><span>Verified Reviews</span>
          </div>
          <div className="testim__divider" />
          <div className="testim__metric">
            <strong>98%</strong><span>Would Recommend</span>
          </div>
          <div className="testim__divider" />
          <a
            href={buildWhatsAppGeneral("Hello! I'd love to experience Luxe Beauty Spa. Can you help me book an appointment?")}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-gold"
          >
            📲 Join Our Happy Guests
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════════════ */
function ContactSection() {
  return (
    <section className="contact" id="contact">
      <div className="wrap contact__grid">
        {/* Info */}
        <div className="contact__info">
          <span className="eyebrow reveal">Find Us</span>
          <h2 className="section-title reveal reveal-delay-1">Visit Luxe Beauty Spa</h2>
          <div className="gold-rule reveal reveal-delay-2" />

          <ul className="contact__list">
            <li className="contact__item reveal reveal-delay-2">
              <span className="contact__icon">📍</span>
              <div>
                <strong>Address</strong>
                <p>1200 Brickell Avenue, Suite 1500<br />Miami, FL 33131</p>
                <a
                  href="https://maps.google.com/?q=1200+Brickell+Avenue+Miami+FL"
                  target="_blank" rel="noopener noreferrer"
                  className="contact__map-link"
                >
                  Open in Google Maps →
                </a>
              </div>
            </li>
            <li className="contact__item reveal reveal-delay-3">
              <span className="contact__icon">📞</span>
              <div>
                <strong>Phone</strong>
                <a href={`tel:${CONFIG.phone}`}>{CONFIG.phone}</a>
              </div>
            </li>
            <li className="contact__item reveal reveal-delay-3">
              <span className="contact__icon">✉️</span>
              <div>
                <strong>Email</strong>
                <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
              </div>
            </li>
            <li className="contact__item reveal reveal-delay-4">
              <span className="contact__icon">🕐</span>
              <div>
                <strong>Hours</strong>
                <table className="contact__hours">
                  <tbody>
                    {CONFIG.hours.map(h => (
                      <tr key={h.day}>
                        <td>{h.day}</td>
                        <td>{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </li>
          </ul>

          <div className="contact__actions reveal reveal-delay-4">
            <a
              href={buildWhatsAppGeneral()}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-wa"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Book via WhatsApp
            </a>
            <a href={`tel:${CONFIG.phone}`} className="btn btn-ghost-dark">
              📞 Call Us
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="contact__map-wrap reveal reveal-delay-2">
          <iframe
            title="Luxe Beauty Spa — Brickell, Miami"
            src={CONFIG.mapsEmbed}
            width="100%" height="100%"
            style={{ border: 0 }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */
function SiteFooter() {
  const year = new Date().getFullYear();
  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="wrap footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top:0, behavior:'smooth' }); }} className="footer__logo">
              <span className="footer__gem">✦</span>
              <div>
                <span className="footer__logo-name">Luxe Beauty</span>
                <span className="footer__logo-tag">Spa &amp; Wellness</span>
              </div>
            </a>
            <p className="footer__bio">
              Miami's most exclusive luxury spa and wellness destination — where beauty becomes a ritual.
            </p>
            <div className="footer__socials">
              <a href={CONFIG.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href={CONFIG.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href={buildWhatsAppGeneral()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer__social footer__social--wa">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer__col">
            <h4 className="footer__heading">Explore</h4>
            <nav>
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className="footer__link" onClick={e => scrollTo(l.href, e)}>{l.label}</a>
              ))}
            </nav>
          </div>

          {/* Services quick links */}
          <div className="footer__col">
            <h4 className="footer__heading">Treatments</h4>
            <nav>
              {['Facial Treatments','Massage Therapy','Body Treatments','Beauty Treatments'].map(s => (
                <a key={s} href="#services" className="footer__link" onClick={e => scrollTo('#services', e)}>{s}</a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__heading">Contact</h4>
            <div className="footer__contact">
              <p>📍 {CONFIG.address}<br />{CONFIG.city}</p>
              <p><a href={`tel:${CONFIG.phone}`}>{CONFIG.phone}</a></p>
              <p><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></p>
              <a href={buildWhatsAppGeneral()} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm" style={{ marginTop: '.75rem' }}>
                📲 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="wrap footer__bottom-inner">
          <p>© {year} Luxe Beauty Spa. All rights reserved.</p>
          <div className="footer__bottom-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
          <p>Designed &amp; developed by <span style={{ color: 'var(--gold)' }}>Victor Deavila Web Design</span></p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WHATSAPP FLOATING BUTTON
   ═══════════════════════════════════════════════════════════════ */
function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <a
      href={buildWhatsAppGeneral()}
      target="_blank" rel="noopener noreferrer"
      className={`wa-fab ${visible ? 'wa-fab--visible' : ''}`}
      aria-label="Book via WhatsApp"
      title="Book via WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="wa-fab__label">Book Now</span>
    </a>
  );
}
