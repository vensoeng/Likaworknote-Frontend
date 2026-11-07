
import React from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  ListTodo,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import '../assets/css/home.css';

interface HomeProps {
  telegramUsername?: string;
  loginPath?: string;
}

const Home: React.FC<HomeProps> = ({telegramUsername = "likaworknote_bot",loginPath = "/login",}) => {
  const requestMessage =
    "/start សួស្តី ខ្ញុំចង់ស្នើសុំគណនី Likaworknote សម្រាប់សាកល្បងប្រើប្រាស់។";

  const handleRequestAccount = () => {
    const telegramUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(
      requestMessage
    )}`;

    window.open(telegramUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="home-page">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={15} />
            <span>Simple · Smart · Productive</span>
          </div>

          <h1>
            គ្រប់គ្រងការងាររបស់អ្នក
            <br />
            <span>ឱ្យកាន់តែមានប្រសិទ្ធភាព។</span>
          </h1>

          <p className="hero-description">
            Likaworknote ជួយអ្នកគ្រប់គ្រង និងតាមដានភារកិច្ចប្រចាំថ្ងៃ
            បានយ៉ាងងាយស្រួល មានរបៀបរៀបរយ និងឆ្លាតវៃ។
          </p>

          <div className="hero-actions">
            <button
              className="primary-button"
              onClick={handleRequestAccount}
            >
              ស្នើសុំគណនី
              <ArrowRight size={18} />
            </button>

            <NavLink to={loginPath} className="secondary-button">
              ចូលគណនី
            </NavLink>
          </div>

          <div className="hero-trust">
            <ShieldCheck size={17} />
            <span>Open Source Project · Early Access</span>
          </div>

        </div>

        {/* Product Preview */}
        <div className="hero-preview">
          <div className="preview-glow" />

          <div className="preview-card">
            <div className="preview-header">
              <div>
                <span className="preview-label">MY WORKSPACE</span>
                <h3>ការងាររបស់ខ្ញុំ</h3>
              </div>

              <div className="preview-avatar">S</div>
            </div>

            <div className="preview-summary">
              <div className="summary-item">
                <span>ការងារសរុប</span>
                <strong>12</strong>
              </div>

              <div className="summary-item">
                <span>កំពុងធ្វើ</span>
                <strong>05</strong>
              </div>

              <div className="summary-item">
                <span>បានបញ្ចប់</span>
                <strong>07</strong>
              </div>
            </div>

            <div className="preview-task-heading">
              <strong>ភារកិច្ចថ្មីៗ</strong>
              <span>View all</span>
            </div>

            <div className="preview-task">
              <div className="task-icon task-blue">
                <ListTodo size={18} />
              </div>
              <div className="task-info">
                <strong>រៀបចំគម្រោងថ្មី</strong>
                <span><Clock3 size={13} /> Today</span>
              </div>
              <span className="task-status status-progress">កំពុងធ្វើ</span>
            </div>

            <div className="preview-task">
              <div className="task-icon task-purple">
                <Zap size={18} />
              </div>
              <div className="task-info">
                <strong>ពិនិត្យការងារប្រចាំថ្ងៃ</strong>
                <span><Clock3 size={13} /> Tomorrow</span>
              </div>
              <span className="task-status status-pending">រង់ចាំ</span>
            </div>

            <div className="preview-task">
              <div className="task-icon task-green">
                <CheckCircle2 size={18} />
              </div>
              <div className="task-info">
                <strong>បញ្ចប់ការងារចាស់</strong>
                <span><Clock3 size={13} /> Completed</span>
              </div>
              <span className="task-status status-done">រួចរាល់</span>
            </div>

            <div className="preview-footer">
              <div className="footer-progress">
                <span>វឌ្ឍនភាពការងារ</span>
                <strong>70%</strong>
              </div>
              <div className="progress-track">
                <div className="progress-value" />
              </div>
            </div>
          </div>

          <div className="floating-note note-one">
            <CheckCircle2 size={18} />
            <span>ការងារបានបញ្ចប់!</span>
          </div>

          <div className="floating-note note-two">
            <Users size={18} />
            <span>គ្រប់គ្រងភារកិច្ចរបស់អ្នក</span>
          </div>
            
        </div>

      </section>

      {/* Three Steps */}
      <section className="steps-section">
        <div className="section-heading">
          <span className="section-eyebrow">GET STARTED</span>
          <h2>ចាប់ផ្តើមប្រើប្រាស់ Likaworknote</h2>
          <p>
            ងាយស្រួលក្នុងការចាប់ផ្តើមប្រើប្រាស់ ត្រឹមតែប៉ុន្មានជំហានប៉ុណ្ណោះ។
          </p>
        </div>

        <div className="steps-grid">
          {/* Step 1 */}
          <article className="step-card">
            <div className="step-number">01</div>

            <div className="step-icon icon-blue">
              <ClipboardCheck size={25} />
            </div>

            <h3>ស្គាល់ Likaworknote</h3>

            <p>
              គ្រប់គ្រង និងតាមដានភារកិច្ចប្រចាំថ្ងៃរបស់អ្នក
              ប្រកបដោយភាពឆ្លាតវៃ និងមានប្រសិទ្ធភាព។
            </p>

            <div className="step-img">
              <img className="img-c" src="/li1.png" alt="likaworknote step1" />
            </div>

            <div className="step-bottom">
              <span>Organize your work</span>
            </div>
          </article>

          {/* Step 2 */}
          <article className="step-card featured-card">
            <div className="step-number">02</div>

            <div className="early-access">
              <Sparkles size={13} />
              EARLY ACCESS
            </div>

            <div className="step-icon icon-purple">
              <Send size={25} />
            </div>

            <h3>ស្នើសុំគណនី</h3>

            <p>
              Likaworknote ជាកម្មវិធី Open Source ក្នុងដំណាក់កាលសាកល្បង
              សម្រាប់អ្នកប្រើប្រាស់ ២០ នាក់ដំបូង។
            </p>

            <p className="step-extra">
              ទាក់ទងមកយើងតាម Telegram ដើម្បីស្នើសុំគណនី។
            </p>

            <div className="step-img">
              <img className="img-c" src="/li2.png" alt="likaworknote step1" />
            </div>

            <button
              className="step-button telegram-button"
              onClick={handleRequestAccount}
            >
              <Send size={17} />
              ស្នើសុំគណនីតាម Telegram
            </button>
          </article>

          {/* Step 3 */}
          <article className="step-card">
            <div className="step-number">03</div>

            <div className="step-icon icon-green">
              <ShieldCheck size={25} />
            </div>

            <h3>ចូលគណនីរបស់អ្នក</h3>

            <p>
              ប្រសិនបើអ្នកបានទទួលគណនីរួចហើយ
              សូមចូលប្រើប្រាស់កម្មវិធី ដើម្បីចាប់ផ្តើមគ្រប់គ្រងភារកិច្ចរបស់អ្នក។
            </p>

            <div className="step-img">
              <img className="img-c" src="/li3.png" alt="likaworknote step1" />
            </div>

            <NavLink to={loginPath} className="step-button login-button">
              ចូលគណនី
            </NavLink>
          </article>
        </div>
      </section>

    </main>
  );
};

export default Home;
