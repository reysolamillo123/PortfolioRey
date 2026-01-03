import React, { useState } from 'react';
import './App.css';
import ProfileCard from './ProfileCard';
import LogoLoop from './LogoLoop';
import TextType from './TextType';
import SpotlightCard from './SpotlightCard';
import ImageModal from './ImageModal';
import Carousel from './Carousel';
import useScrollAnimation from './useScrollAnimation';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiJavascript, SiHtml5, SiDjango, SiFlutter, SiLaravel} from 'react-icons/si';
import cert1 from './src/assets/images/cert/Cert 1.png';
import cert2 from './src/assets/images/cert/Cert 2.png';
import cert3 from './src/assets/images/cert/Cert 3.png';
import cert4 from './src/assets/images/cert/Cert 4.png';
import cert5 from './src/assets/images/cert/Cert 5.png';
import cert6 from './src/assets/images/cert/Cert 6.png';
import badge1 from './src/assets/images/badge/badge1.png';
import badge2 from './src/assets/images/badge/badge2.png';
import badge3 from './src/assets/images/badge/badge3.png';
import badge4 from './src/assets/images/badge/badge4.png';
import reyImage from './src/assets/images/project/REY.jpg';
import aura1 from './src/assets/images/project/Aurapharm/Aura1.png';
import aura2 from './src/assets/images/project/Aurapharm/Aura2.png';
import aura3 from './src/assets/images/project/Aurapharm/Aura3.png';
import aura4 from './src/assets/images/project/Aurapharm/Aura4.png';
import aura5 from './src/assets/images/project/Aurapharm/Aura5.png';
import aura6 from './src/assets/images/project/Aurapharm/Aura6.png';
import aura7 from './src/assets/images/project/Aurapharm/Aura7.png';
import aura8 from './src/assets/images/project/Aurapharm/Aura8.png';
import aura9 from './src/assets/images/project/Aurapharm/Aura9.png';
import aura10 from './src/assets/images/project/Aurapharm/Aura10.png';
import aura11 from './src/assets/images/project/Aurapharm/Aura11.png';
import aura12 from './src/assets/images/project/Aurapharm/Aura12.png';
import data1 from './src/assets/images/project/DataAnalystPortfolio/data1.png';
import data2 from './src/assets/images/project/DataAnalystPortfolio/data2.png';
import data3 from './src/assets/images/project/DataAnalystPortfolio/data3.png';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

function App() {
  const [modalData, setModalData] = useState({ isOpen: false, image: '', title: '', description: '' });
  const [projectCategory, setProjectCategory] = useState('all');
  const [projectLanguage, setProjectLanguage] = useState('all');
  const [badgeCategory, setBadgeCategory] = useState('all');
  const [certificateCategory, setCertificateCategory] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll animation refs for each section - optimized thresholds
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.15 });
  const [aboutRef, aboutVisible] = useScrollAnimation({ threshold: 0.2 });
  const [projectsRef, projectsVisible] = useScrollAnimation({ threshold: 0.15 });
  const [badgesRef, badgesVisible] = useScrollAnimation({ threshold: 0.15 });
  const [certificatesRef, certificatesVisible] = useScrollAnimation({ threshold: 0.15 });
  const [contactRef, contactVisible] = useScrollAnimation({ threshold: 0.2 });

  const openModal = (image, title, description = '') => {
    setModalData({ isOpen: true, image, title, description });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, image: '', title: '', description: '' });
  };
  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiJavascript />, title: "JavaScript", href: "https://javascript.com" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiPython />, title: "Python", href: "https://www.python.org" },
    { node: <SiHtml5 />, title: "HTML5", href: "https://html.spec.whatwg.org" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiDjango />, title: "Django", href: "https://www.djangoproject.com" },
    { node: <SiFlutter />, title: "Flutter", href: "https://flutter.dev" },
    { node: <SiLaravel />, title: "Laravel", href: "https://laravel.com" },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>REY O. SOLAMILLO</div>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>About</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>Projects</a></li>
            <li><a href="#badges" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('badges')?.scrollIntoView({ behavior: 'smooth' }); }}>Badges</a></li>
            <li><a href="#certificates" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' }); }}>Certificates</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact</a></li>
          </ul>
        </div>
        <div className="nav-right">
          
          <a href="CV_REY.pdf" download="CV_REY_SOLAMILLO.pdf" style={{ textDecoration: 'none' }}>
            <button className="cv-button">Download CV</button>
          </a>
          <button className="burger-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <div className="App" style={{background: "linear-gradient(135deg, #8B0000 0%, #4a0e1e 30%, #2d0a14 60%, #413939ff 100%)", minHeight: "100vh"}}>
      
      <div ref={heroRef} className={`hero-container scroll-animate ${heroVisible ? 'visible' : ''}`}>
        <div className="left-content">
          <div className="text-type-container">
           <p className= "greetings">Hello, I'am</p>
            <TextType 
              text={["Rey O. Solamillo","Software Engineer", "Full-Stack Developer", "Tech Enthusiast"]}
              typingSpeed={50}
              pauseDuration={3000}
              showCursor={true}
              cursorCharacter="|"
              className="typing-text"
            />
          </div>
          
          <div className="logo-loop-container">
            <p className= "greetings"><b>My Technical Stack</b></p>
            <LogoLoop
              logos={techLogos}
              speed={120}
              direction="left"
              logoHeight={50}
              gap={60}
              hoverSpeed={0}
              scaleOnHover
              fadeOut={false}
              ariaLabel="Technology stack"
            />
            
          </div>
           
        </div>
        
        <div className="profile-card-container">
          <ProfileCard
            name="Rey O. Solamillo"
            title="Software Engineer"
            handle="reysolamillo"
            status="Online"
            contactText="Contact Me"
            avatarUrl={reyImage}
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => console.log('Contact clicked')}
          />
        </div>
      </div>
      
      <section ref={aboutRef} className={`about-section scroll-animate ${aboutVisible ? 'visible' : ''}`} id="about">
        <div className="section-container">
          <h2>About Me</h2>
          <p>
           I'm Rey O. Solamillo, a passionate and detail-oriented Software Engineering student specializing in full-stack development.
           As a third-year BSIT undergraduate, I have a strong foundation in building innovative solutions from concept to deployment using modern frontend and backend technologies.
            My skill set also includes a solid understanding of networking principles and emerging expertise in prompt engineering, allowing me to approach challenges from multiple technical perspectives.
             I am dedicated to writing clean, efficient code and am eager to apply my academic knowledge to real-world projects.
              I am actively seeking opportunities to contribute to a team, grow my skills, and gain valuable industry experience.
          </p>
        </div>
      </section>

      <section ref={projectsRef} className={`projects-section scroll-animate ${projectsVisible ? 'visible' : ''}`} id="projects">
        <div className="section-container">
          <h2>Projects</h2>
          <div className="category-filter">
            <button className={projectCategory === 'all' ? 'active' : ''} onClick={() => setProjectCategory('all')}>All</button>
            <button className={projectCategory === 'beginner' ? 'active' : ''} onClick={() => setProjectCategory('beginner')}>Beginner</button>
            <button className={projectCategory === 'intermediate' ? 'active' : ''} onClick={() => setProjectCategory('intermediate')}>Intermediate</button>
            <button className={projectCategory === 'advanced' ? 'active' : ''} onClick={() => setProjectCategory('advanced')}>Advanced</button>
          </div>
          <div className="language-filter">
            <button className={projectLanguage === 'all' ? 'active' : ''} onClick={() => setProjectLanguage('all')}>All Languages</button>
            <button className={projectLanguage === 'react' ? 'active' : ''} onClick={() => setProjectLanguage('react')}>React</button>
            <button className={projectLanguage === 'flutter' ? 'active' : ''} onClick={() => setProjectLanguage('flutter')}>Flutter</button>
            <button className={projectLanguage === 'django' ? 'active' : ''} onClick={() => setProjectLanguage('django')}>Django</button>
            <button className={projectLanguage === 'laravel' ? 'active' : ''} onClick={() => setProjectLanguage('laravel')}>Laravel</button>
          </div>
          <Carousel itemsPerView={3}>
            {(projectCategory === 'all' || projectCategory === 'beginner') && (projectLanguage === 'all' || projectLanguage === 'react') && (
              <SpotlightCard spotlightColor="rgba(139, 0, 0, 0.3)">
                <div className="project-card" onClick={() => openModal([aura1, aura2, aura3, aura4, aura5, aura6, aura7, aura8, aura9, aura10, aura11, aura12], 'AuraPharm: Pharmacy Management System',
                    'This is a comprehensive pharmacy management system designed to streamline operations and improve patient care.')}>
                  <div className="card-image" style={{ backgroundImage: `url(${aura3})` }}></div>
                  <span className="difficulty-badge beginner">Beginner</span>
                  <div className="card-overlay">
                    <h3>AuraPharm: Pharmacy Management System</h3>
                    <p>This is a comprehensive pharmacy management system designed to streamline operations and improve patient care.</p>
                    <div className="project-tech-icons">
                      <SiHtml5 title="Html5" />
                      <SiJavascript title="JavaScript" />
                      <SiTailwindcss title="Tailwind CSS" />
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            )}
            {(projectCategory === 'all' || projectCategory === 'intermediate') && (projectLanguage === 'all' || projectLanguage === 'flutter') && (
              <SpotlightCard spotlightColor="rgba(139, 0, 0, 0.3)">
                <div className="project-card" onClick={() => openModal(['https://picsum.photos/seed/roomlink1/1200/800', 'https://picsum.photos/seed/roomlink2/1200/800', 'https://picsum.photos/seed/roomlink3/1200/800'], 'RoomLink', 'This is a room booking application built with Flutter, designed to simplify the process of reserving rooms and managing schedules.')}>
                  <div className="card-image"></div>
                  <span className="difficulty-badge intermediate">Intermediate</span>
                  <div className="card-overlay">
                    <h3>RoomLink</h3>
                    <p>This is a room booking application built with Flutter, designed to simplify the process of reserving rooms and managing schedules.</p>
                    <div className="project-tech-icons">
                      <SiFlutter title="Flutter" />
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            )}
            {(projectCategory === 'all' || projectCategory === 'beginner') && (projectLanguage === 'all' || projectLanguage === 'react') && (
              <SpotlightCard spotlightColor="rgba(139, 0, 0, 0.3)">
                <div className="project-card" onClick={() => openModal([data1, data2, data3], 'Data Analyst Portfolio', 'This portfolio showcases my skills and projects as a data analyst, highlighting my ability to analyze and visualize data effectively.')}>
                  <div className="card-image" style={{ backgroundImage:  `url(${data1})` }}></div>
                  <span className="difficulty-badge beginner">Beginner</span>
                  <div className="card-overlay">
                    <h3>Data Analyst Portfolio</h3>
                    <p>This portfolio showcases my skills and projects as a data analyst, highlighting my ability to analyze and visualize data effectively.</p>
                    <div className="project-tech-icons">
                      <SiReact title="React" />
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            )}
          </Carousel>
        </div>
      </section>

      <section ref={badgesRef} className={`badges-section scroll-animate ${badgesVisible ? 'visible' : ''}`} id="badges">
        <div className="section-container">
          <h2>Badges</h2>
          <div className="category-filter">
            <button className={badgeCategory === 'all' ? 'active' : ''} onClick={() => setBadgeCategory('all')}>All</button>
            <button className={badgeCategory === 'beginner' ? 'active' : ''} onClick={() => setBadgeCategory('beginner')}>Beginner</button>
            <button className={badgeCategory === 'intermediate' ? 'active' : ''} onClick={() => setBadgeCategory('intermediate')}>Intermediate</button>
            <button className={badgeCategory === 'advanced' ? 'active' : ''} onClick={() => setBadgeCategory('advanced')}>Advanced</button>
          </div>
          <Carousel itemsPerView={4}>
            {(badgeCategory === 'all' || badgeCategory === 'intermediate') && (
              <SpotlightCard spotlightColor="rgba(139, 0, 0, 0.3)">
                <div className="badge-item" onClick={() => openModal(badge1, 'CCNA:Switching, Routing & Wireless Essentials', 'This is my first Badge Achievement in Cisco Networking Academy')}>
                  <div className="card-image" style={{ backgroundImage: `url(${badge1})` }}></div>
                  <span className="difficulty-badge intermediate">Intermediate</span>
                  <div className="card-overlay">
                    <h3>CCNA:Switching, Routing & Wireless Essentials</h3>
                  </div>
                </div>
              </SpotlightCard>
            )}
            {(badgeCategory === 'all' || badgeCategory === 'beginner') && (
              <SpotlightCard spotlightColor="rgba(139, 0, 0, 0.3)">
                <div className="badge-item" onClick={() => openModal(badge2, 'Introduction to Cybersecurity', 'This badge certifies that I have successfully completed the Introduction to Cybersecurity course')}>
                  <div className="card-image" style={{ backgroundImage: `url(${badge2})` }}></div>
                  <span className="difficulty-badge beginner">Beginner</span>
                  <div className="card-overlay">
                    <h3>Introduction to Cybersecurity</h3>
                  </div>
                </div>
              </SpotlightCard>
            )}
            {(badgeCategory === 'all' || badgeCategory === 'beginner') && (
              <SpotlightCard spotlightColor="rgba(139, 0, 0, 0.3)">
                <div className="badge-item" onClick={() => openModal(badge3, 'Introduction to Modern Ai', 'This badge certifies that I have successfully completed the Introduction to Modern Ai course')}>
                  <div className="card-image" style={{ backgroundImage: `url(${badge3})` }}></div>
                  <span className="difficulty-badge beginner">Beginner</span>
                  <div className="card-overlay">
                    <h3>Introduction to Modern Ai</h3>
                  </div>
                </div>
              </SpotlightCard>
            )}
            {(badgeCategory === 'all' || badgeCategory === 'beginner') && (
              <SpotlightCard spotlightColor="rgba(139, 0, 0, 0.3)">
                <div className="badge-item" onClick={() => openModal(badge4, 'Introduction to Data Science', 'This badge certifies that I have successfully completed the Introduction to Data Science course')}>
                  <div className="card-image" style={{ backgroundImage: `url(${badge4})` }}></div>
                  <span className="difficulty-badge beginner">Beginner</span>
                  <div className="card-overlay">
                    <h3>Introduction to Data Science</h3>
                  </div>
                </div>
              </SpotlightCard>
            )}
          </Carousel>
        </div>
      </section>

      <section ref={certificatesRef} className={`certificates-section scroll-animate ${certificatesVisible ? 'visible' : ''}`} id="certificates">
        <div className="section-container">
          <h2>Certificates</h2>
          <div className="category-filter">
            <button className={certificateCategory === 'all' ? 'active' : ''} onClick={() => setCertificateCategory('all')}>All</button>
            <button className={certificateCategory === 'beginner' ? 'active' : ''} onClick={() => setCertificateCategory('beginner')}>Beginner</button>
            <button className={certificateCategory === 'intermediate' ? 'active' : ''} onClick={() => setCertificateCategory('intermediate')}>Intermediate</button>
            <button className={certificateCategory === 'advanced' ? 'active' : ''} onClick={() => setCertificateCategory('advanced')}>Advanced</button>
          </div>
          <Carousel itemsPerView={3}>
            {(certificateCategory === 'all' || certificateCategory === 'intermediate') && (
              <SpotlightCard spotlightColor="rgba(139, 0, 0, 0.3)">
                <div className="certificate-card" onClick={() => openModal(cert1, 'Certificate Name 1', 'Issuing Organization - 2024')}>
                  <div className="card-image" style={{ backgroundImage: `url(${cert1})` }}></div>
                  <span className="difficulty-badge intermediate">Intermediate</span>
                  <div className="card-overlay">
                    <h3>Certificate Name 1</h3>
                    <p>CISCO</p>
                    <p className="cert-date">2025</p>
                  </div>
                </div>
              </SpotlightCard>
            )}
            {(certificateCategory === 'all' || certificateCategory === 'beginner') && (
              <SpotlightCard spotlightColor="rgba(139, 0, 0, 0.3)">
                  <div className="certificate-card" onClick={() => openModal(cert2, 'Certificate Name 2', 'Issuing Organization - 2024')}>
                  <div className="card-image" style={{ backgroundImage: `url(${cert2})` }}></div>
                  <span className="difficulty-badge beginner">beginner</span>
                  <div className="card-overlay">
                    <h3>Certificate Name 2</h3>
                    <p>CISCO</p>
                    <p className="cert-date">2025</p>
                  </div>
                </div>
              </SpotlightCard>
            )}
            {(certificateCategory === 'all' || certificateCategory === 'beginner') && (
              <SpotlightCard spotlightColor="rgba(139, 0, 0, 0.3)">
                <div className="certificate-card" onClick={() => openModal(cert3, 'Certificate Name 3', 'Issuing Organization - 2024')}>
                  <div className="card-image" style={{ backgroundImage: `url(${cert3})` }}></div>
                  <span className="difficulty-badge beginner">Beginner</span>
                  <div className="card-overlay">
                    <h3>Certificate Name 3</h3>
                    <p>CISCO</p>
                    <p className="cert-date">2025</p>
                  </div>
                </div>
              </SpotlightCard>
            )}
             {(certificateCategory === 'all' || certificateCategory === 'beginner') && (
              <SpotlightCard spotlightColor="rgba(139, 0, 0, 0.3)">
                <div className="certificate-card" onClick={() => openModal(cert4, 'Certificate Name 4', 'Issuing Organization - 2024')}>
                  <div className="card-image" style={{ backgroundImage: `url(${cert4})` }}></div>
                  <span className="difficulty-badge beginner">Beginner</span>
                  <div className="card-overlay">
                    <h3>Certificate Name 4</h3>
                    <p>CISCO</p>
                    <p className="cert-date">2025</p>
                  </div>
                </div>
              </SpotlightCard>
            )}
            {(certificateCategory === 'all' || certificateCategory === 'beginner') && (
              <SpotlightCard spotlightColor="rgba(139, 0, 0, 0.3)">
                <div className="certificate-card" onClick={() => openModal(cert5, 'Certificate Name 5', 'FreeCodeCamp - 2025')}>
                  <div className="card-image" style={{ backgroundImage: `url(${cert5})` }}></div>
                  <span className="difficulty-badge beginner">Beginner</span>
                  <div className="card-overlay">
                    <h3>Certificate Name 5</h3>
                    <p>FreeCodeCamp</p>
                    <p className="cert-date">2025</p>
                  </div>
                </div>
              </SpotlightCard>
            )}
            {(certificateCategory === 'all' || certificateCategory === 'beginner') && (
              <SpotlightCard spotlightColor="rgba(139, 0, 0, 0.3)">
                <div className="certificate-card" onClick={() => openModal(cert6, 'Certificate Name 6', 'FreeCodeCamp - 2025')}>
                  <div className="card-image" style={{ backgroundImage: `url(${cert6})` }}></div>
                  <span className="difficulty-badge beginner">Beginner</span>
                  <div className="card-overlay">
                    <h3>Certificate Name 6</h3>
                    <p>FreeCodeCamp</p>
                    <p className="cert-date">2025</p>
                  </div>
                </div>
              </SpotlightCard>
            )}
          </Carousel>
        </div>
      </section>

      <section ref={contactRef} className={`contact-section scroll-animate ${contactVisible ? 'visible' : ''}`} id="contact">
        <div className="section-container">
          <h2>Let's Work Together</h2>
          <p className="contact-subtitle">Have a project in mind? Let's connect and bring your ideas to life.</p>
          <div className="contact-content">
            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-icon-wrapper">
                  <MdEmail className="contact-icon" />
                </div>
                <h3>Email</h3>
                <a href="mailto:junjunsolamillo123@gmail.com">junjunsolamillo123@gmail.com</a>
              </div>
              <div className="contact-card">
                <div className="contact-icon-wrapper">
                  <MdPhone className="contact-icon" />
                </div>
                <h3>Phone</h3>
                <a href="tel:+12345678900">09853308630</a>
              </div>
              <div className="contact-card">
                <div className="contact-icon-wrapper">
                  <MdLocationOn className="contact-icon" />
                </div>
                <h3>Location</h3>
                <p>Prk 1 Durian, New Visayas, Panabo City, Davao Del Norte, Philippines</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Rey O. Solamillo. All rights reserved.</p>
          <div className="footer-links">
            <a href="https://github.com/B3424231" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://web.facebook.com/rey.solamillo.5" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>
      </footer>
      </div>
      <ImageModal 
        isOpen={modalData.isOpen}
        onClose={closeModal}
        image={modalData.image}
        title={modalData.title}
        description={modalData.description}
      />
    </>
  );
}

export default App;
