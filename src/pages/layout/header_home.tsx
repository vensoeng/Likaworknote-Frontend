

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  CircleUserRound,
  ExternalLink,
  ArrowUpRight,
  HeartHandshake,
  ArrowUp,
} from "lucide-react";
import '../../assets/css/home.css';

import '../../assets/css/admin/header.css';
import '../../assets/css/from.css';

export function HomeNav() {
    const {DEFAULT_AVATAR} = useAuth();
    return(
        <nav className="home-navbar">
            <div className="home-navbar-box df-s">
            <NavLink to='/' className="brand">
                <div className="brand-icon">
                <img className="img-c" src={DEFAULT_AVATAR} alt="Likaworknote." />
                </div>
                <span>
                Lika<span>worknote</span>
                </span>
            </NavLink>

            <NavLink to='/login' className="nav-login btn">
                <span>ចូលគណនី</span> <CircleUserRound size={16} />
            </NavLink>
            </div>
        </nav>
    )
}

export function HomeFooter() {
    const {DEFAULT_AVATAR} = useAuth();
    return(
        <footer className="site-footer">

            {/* Footer CTA */}
            <div className="footer-cta">
            <div className="footer-cta-content">
                <div className="footer-cta-icon">
                <HeartHandshake size={28} />
                </div>

                <div>
                <span className="footer-cta-label">
                    JOIN OUR COMMUNITY
                </span>

                <h2>ចូលរួមជាមួយ Likaworknote</h2>

                <p>
                    ចូលរួមសាកល្បង ប្រើប្រាស់ និងជួយអភិវឌ្ឍ
                    គម្រោង Open Source នេះឱ្យកាន់តែប្រសើរឡើង។
                </p>
                </div>
            </div>

            <a
                href="https://github.com/vensoeng/Likaworknote-Frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-cta-button"
            >
                ចូលរួមជាមួយយើង
                <ArrowUpRight size={18} />
            </a>
            </div>

            {/* Main Footer */}
            <div className="footer-main">

            {/* Brand */}
            <div className="footer-column footer-about">
                <NavLink to="/" className="footer-brand">
                <div className="footer-brand-icon">
                    <img src={DEFAULT_AVATAR} alt="Likaworknote" />
                </div>

                <span>
                    Lika<span>worknote</span>
                </span>
                </NavLink>

                <p className="footer-about-text">
                Likaworknote គឺជាកម្មវិធីសម្រាប់គ្រប់គ្រង
                និងតាមដានភារកិច្ចប្រចាំថ្ងៃ ជួយឱ្យការងារ
                របស់អ្នកមានរបៀបរៀបរយ និងមានប្រសិទ្ធភាព។
                </p>

                <div className="footer-open-source">
                <span>Open Source Project · Early Access</span>
                </div>

                <div className="footer-socials">
                <a href="https://www.facebook.com/vensoeng"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M280.5 426.5C214.5 418.5 168 371 168 309.5C168 284.5 177 257.5 192 239.5C185.5 223 186.5 188 194 173.5C214 171 241 181.5 257 196C276 190 296 187 320.5 187C345 187 365 190 383 195.5C398.5 181.5 426 171 446 173.5C453 187 454 222 447.5 239C463.5 258 472 283.5 472 309.5C472 371 425.5 417.5 358.5 426C375.5 437 387 461 387 488.5L387 540.5C387 555.5 399.5 564 414.5 558C505 523.5 576 433 576 321C576 179.5 461 64 319.5 64C178 64 64 179.5 64 321C64 432 134.5 524 229.5 558.5C243 563.5 256 554.5 256 541L256 501C249 504 240 506 232 506C199 506 179.5 488 165.5 454.5C160 441 154 433 142.5 431.5C136.5 431 134.5 428.5 134.5 425.5C134.5 419.5 144.5 415 154.5 415C169 415 181.5 424 194.5 442.5C204.5 457 215 463.5 227.5 463.5C240 463.5 248 459 259.5 447.5C268 439 274.5 431.5 280.5 426.5z"/></svg>
                </a>

                <a href="https://t.me/vensoeng"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 72C183 72 72 183 72 320C72 457 183 568 320 568C457 568 568 457 568 320C568 183 457 72 320 72zM435 240.7C431.3 279.9 415.1 375.1 406.9 419C403.4 437.6 396.6 443.8 390 444.4C375.6 445.7 364.7 434.9 350.7 425.7C328.9 411.4 316.5 402.5 295.4 388.5C270.9 372.4 286.8 363.5 300.7 349C304.4 345.2 367.8 287.5 369 282.3C369.2 281.6 369.3 279.2 367.8 277.9C366.3 276.6 364.2 277.1 362.7 277.4C360.5 277.9 325.6 300.9 258.1 346.5C248.2 353.3 239.2 356.6 231.2 356.4C222.3 356.2 205.3 351.4 192.6 347.3C177.1 342.3 164.7 339.6 165.8 331C166.4 326.5 172.5 322 184.2 317.3C256.5 285.8 304.7 265 328.8 255C397.7 226.4 412 221.4 421.3 221.2C423.4 221.2 427.9 221.7 430.9 224.1C432.9 225.8 434.1 228.2 434.4 230.8C434.9 234 435 237.3 434.8 240.6z"/></svg>
                </a>

                </div>
            </div>

            {/* Explore */}
            <div className="footer-column">
                <h3>ស្វែងយល់បន្ថែម</h3>

                <ul className="footer-links">
                <li><a href="/">ទំព័រដើម</a></li>
                <li><a href="/#features">មុខងារកម្មវិធី</a></li>
                <li><a href="/#steps">របៀបប្រើប្រាស់</a></li>
                <li><a href="/#about">អំពី Likaworknote</a></li>
                </ul>
            </div>

            {/* Resources */}
            <div className="footer-column">
                <h3>ធនធាន និងព័ត៌មាន</h3>

                <ul className="footer-links">
                <li>
                    <a href="https://github.com/vensoeng"
                    target="_blank" rel="noopener noreferrer">
                    GitHub Repository <ExternalLink size={13} />
                    </a>
                </li>

                <li>
                    <a href="https://t.me/vensoeng"
                    target="_blank" rel="noopener noreferrer">
                    Report an Issue <ExternalLink size={13} />
                    </a>
                </li>

                <li>
                    <a href='/login'>ចូលគណនី</a>
                </li>
                </ul>
            </div>

            {/* Community */}
            <div className="footer-column footer-community">
                <h3>ចូលរួម និងគាំទ្រ</h3>

                <p>
                គម្រោង Open Source រីកចម្រើនបានដោយសារការចូលរួម
                និងការគាំទ្រពីសហគមន៍។
                </p>

                <div className="app-badges">
                <a href="https://facebook.com/vensoeng" className="app-badge">
                    <img className="img-c" src="https://vensoengapi.vercel.app/storage/data/url/1787909952206.webp" alt="Get it on Facebook page." />
                </a>
                <a href="https://facebook.com/vensoeng" className="app-badge">
                    <img className="img-c" src="https://vensoengapi.vercel.app/storage/data/url/1787910092758.webp" alt="Get it on Facebook Telegram." />
                </a>
                </div>
            </div>

            </div>

            {/* Bottom */}
            <div className="footer-bottom">
            <span>
                © {new Date().getFullYear()} Likaworknote.
                All rights reserved.
            </span>

            <button
                className="footer-back-top"
                onClick={() => window.scrollTo({
                top: 0,
                behavior: "smooth"
                })}
                aria-label="Back to top"
            >
                ត្រឡប់ទៅខាងលើ
                <ArrowUp size={15} />
            </button>
            </div>
        </footer>
    )
}
