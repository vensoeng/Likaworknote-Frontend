import React from "react";
import '../assets/css/about_use.css';

type Feature = {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    number: "01",
    title: "ការគ្រប់គ្រងភារកិច្ច",
    description:
      "បង្កើត រៀបចំ កែប្រែ និងគ្រប់គ្រងការងារប្រចាំថ្ងៃរបស់អ្នកនៅក្នុងកន្លែងតែមួយ។",
    icon: <ClipboardIcon />,
  },
  {
    number: "02",
    title: "ការបែងចែកប្រភេទការងារ",
    description:
      "បែងចែកការងារតាមប្រភេទ ដូចជា ការងារក្រុមហ៊ុន ការងារផ្ទាល់ខ្លួន គម្រោង និងការសិក្សា។",
    icon: <LayersIcon />,
  },
  {
    number: "03",
    title: "ការតាមដានវឌ្ឍនភាព",
    description:
      "មើលភាគរយនៃការងារដែលបានបញ្ចប់ និងតាមដានស្ថានភាពការងារនីមួយៗ។",
    icon: <ChartIcon />,
  },
  {
    number: "04",
    title: "ការកំណត់ថ្ងៃផុតកំណត់",
    description:
      "កំណត់ថ្ងៃបញ្ចប់ការងារ ដើម្បីជួយរៀបចំផែនការ និងគ្រប់គ្រងពេលវេលា។",
    icon: <CalendarIcon />,
  },
  {
    number: "05",
    title: "ផ្ទាំងសង្ខេបការងារ",
    description:
      "មើលទិដ្ឋភាពទូទៅនៃភារកិច្ច និងវឌ្ឍនភាពការងាររបស់អ្នកបានយ៉ាងងាយស្រួល។",
    icon: <GridIcon />,
  },
];

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="4.5" width="14" height="17" rx="2" />
      <path d="M9 4.5V3h6v1.5M8.5 10h7M8.5 14h7M8.5 18h4" />
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19V5M4 19h17" />
      <path d="m7 15 4-4 3 2 6-7" />
      <path d="M16 6h4v4" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" />
      <rect x="13" y="10" width="8" height="11" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}
function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function AboutUsWebPage() {
  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-container about-hero-grid">
          <div className="about-hero-copy">
            <span className="about-eyebrow">
              <span className="eyebrow-dot" />
              ABOUT LIKAWORKNOTE
            </span>
            <h1>
              រៀបចំការងារឱ្យមានរបៀបរៀបរយ
              <span> និងមានប្រសិទ្ធភាពជាងមុន។</span>
            </h1>
            <p>
              Likaworknote ជួយអ្នកបង្កើត រៀបចំ និងតាមដានភារកិច្ចប្រចាំថ្ងៃ
              ដើម្បីឱ្យអ្នកអាចមើលឃើញការងាររបស់ខ្លួនបានកាន់តែច្បាស់ និងងាយស្រួលគ្រប់គ្រង។
            </p>
            <div className="about-hero-actions">
              <a className="about-button about-button-primary" href="/guide">
                ស្វែងយល់ពីរបៀបប្រើប្រាស់ <ArrowUpRight />
              </a>
              <a className="about-text-link" href="#our-mission">
                ស្វែងយល់បន្ថែម
              </a>
            </div>
            <div className="about-project-meta">
              <span className="meta-pill">OPEN SOURCE PROJECT</span>
              <span className="meta-separator" />
              <span className="meta-muted">EARLY ACCESS</span>
            </div>
          </div>

          <div className="about-hero-visual">
            {/* Replace this placeholder with your LikaWorkNote dashboard image. */}
            <div className="image-placeholder hero-image-placeholder">
              <div className="placeholder-window">
                <div className="placeholder-window-top">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="placeholder-dashboard">
                  <div className="placeholder-sidebar">
                    <i /><i /><i /><i />
                  </div>
                  <div className="placeholder-main">
                    <div className="placeholder-heading" />
                    <div className="placeholder-stats">
                      <i /><i /><i />
                    </div>
                    <div className="placeholder-task">
                      <b /><span /><em />
                    </div>
                    <div className="placeholder-task">
                      <b /><span /><em />
                    </div>
                    <div className="placeholder-task">
                      <b /><span /><em />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-floating-note">
              <span className="floating-check">✓</span>
              <span>
                <strong>រៀបចំបានល្អជាងមុន</strong>
                <small>តាមដានការងាររបស់អ្នក</small>
              </span>
            </div>
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="about-section mission-section" id="our-mission">
        <div className="about-container mission-grid">
          <div className="section-intro">
            <span className="about-eyebrow">OUR MISSION</span>
            <h2>
              ការគ្រប់គ្រងការងារ
              <span> មិនគួរមានភាពស្មុគស្មាញទេ។</span>
            </h2>
          </div>
          <div className="mission-copy">
            <p>
              យើងជឿជាក់ថា ការងារដែលត្រូវបានរៀបចំយ៉ាងល្អ
              ជួយឱ្យយើងមើលឃើញអ្វីដែលត្រូវធ្វើ និងដឹងពីវឌ្ឍនភាពរបស់ខ្លួន។
            </p>
            <p>
              បេសកកម្មរបស់ Likaworknote គឺបង្កើតឧបករណ៍សាមញ្ញ និងមានប្រយោជន៍
              ដែលជួយអ្នកប្រើប្រាស់រៀបចំការងារប្រចាំថ្ងៃ គ្រប់គ្រងពេលវេលា
              និងតាមដានការទទួលខុសត្រូវរបស់ខ្លួនបានកាន់តែប្រសើរ។
            </p>
            <div className="mission-signature">
              <span className="signature-mark">
                <img src="/android-chrome-192x192.png" className="img-c" alt="likaworknote-logo" />
              </span>
              <span>
                <strong>Likaworknote</strong>
                <small>Organize. Track. Improve.</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="about-section features-section">
        <div className="about-container">
          <div className="section-heading centered-heading">
            <span className="about-eyebrow">WHAT WE OFFER</span>
            <h2>អ្វីដែល Likaworknote អាចជួយអ្នកបាន</h2>
            <p>
              មុខងារសំខាន់ៗដែលជួយឱ្យការរៀបចំ និងតាមដានការងារប្រចាំថ្ងៃកាន់តែងាយស្រួល។
            </p>
          </div>
          <div className="about-feature-grid">
            {features.map((feature) => (
              <article className="about-feature-card" key={feature.number}>
                <div className="feature-card-top">
                  <span className="feature-icon">{feature.icon}</span>
                  <span className="feature-number">{feature.number}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="about-section vision-section">
        <div className="about-container vision-grid">
          <div className="vision-copy">
            <span className="about-eyebrow">OUR VISION</span>
            <h2>
              កែលម្អរបៀបធ្វើការ
              <span> មួយជំហានម្ដងៗ។</span>
            </h2>
            <p>
              យើងមានចក្ខុវិស័យក្នុងការអភិវឌ្ឍ Likaworknote
              ឱ្យក្លាយជាឧបករណ៍គ្រប់គ្រងភារកិច្ចដែលងាយស្រួល និងអាចប្រើប្រាស់បានជាក់ស្តែង។
              យើងចង់ជួយមនុស្សឱ្យរៀបចំការងារ បង្កើតទម្លាប់ល្អ
              និងមានទិដ្ឋភាពច្បាស់លាស់អំពីអ្វីដែលខ្លួនកំពុងធ្វើ។
            </p>
          </div>
          <div className="vision-image-wrap">
            {/* Replace with an illustration or a second product screenshot if desired. */}
            <div className="image-placeholder vision-image-placeholder">
              <img src="/likaworknote_storyboard.gif" className="img-c" alt="likaworknote storyboard" />
            </div>
          </div>
        </div>
      </section>

      {/* OPEN SOURCE */}
      <section className="about-section community-section">
        <div className="about-container community-card">
          <div className="community-copy">
            <span className="about-eyebrow">OPEN SOURCE & COMMUNITY</span>
            <h2>គម្រោងដែលរីកចម្រើនតាមរយៈការចូលរួម</h2>
            <p>
              Likaworknote គឺជាគម្រោង Open Source ដែលបច្ចុប្បន្នកំពុងស្ថិតក្នុងដំណាក់កាល Early Access។
              យើងស្វាគមន៍អ្នកប្រើប្រាស់ក្នុងការសាកល្បង ចែករំលែកបទពិសោធន៍
              រាយការណ៍បញ្ហា និងផ្តល់យោបល់ ដើម្បីជួយកែលម្អគម្រោងនេះជាបន្តបន្ទាប់។
            </p>
            <a
              className="about-button about-button-light"
              href="https://t.me/likaworknote_bot"
              target="_blank"
              rel="noreferrer"
            >
              ចូលរួមជាមួយយើង <ArrowUpRight />
            </a>
          </div>
          <div className="community-decoration" aria-hidden="true">
            <div className="community-ring ring-one" />
            <div className="community-ring ring-two" />
            <div className="community-center">
                <img src="/android-chrome-192x192.png" className="img-c" alt="likaworknote-logo" />
            </div>
            <span className="community-star star-one">✦</span>
            <span className="community-star star-two">✧</span>
            <span className="community-star star-three">✦</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <div className="about-container about-cta">
          <span className="about-eyebrow">START WITH LIKAWORKNOTE</span>
          <h2>ត្រៀមខ្លួនរៀបចំការងាររបស់អ្នកហើយឬនៅ?</h2>
          <p>
            ចាប់ផ្តើមសាកល្បង Likaworknote និងស្វែងរកវិធីគ្រប់គ្រងការងារដែលសមស្របនឹងអ្នក។
          </p>
          <div className="about-cta-actions">
            <a
              className="about-button about-button-primary"
              href="https://t.me/likaworknote_bot"
              target="_blank"
              rel="noreferrer"
            >
              ស្នើសុំគណនី <ArrowUpRight />
            </a>
            <a className="about-button about-button-outline" href="/guide">
              មើលមគ្គុទ្ទេសក៍
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
