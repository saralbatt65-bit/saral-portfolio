import React, { useState, useEffect } from 'react';
import {
  Menu, X, Globe, User, Mail, ArrowRight, ExternalLink,
  Code, Server, Database, Smartphone, Palette, Terminal, Send,
  GitBranch, TrendingUp, Megaphone
} from 'lucide-react';
import './App.css';
import saralPhoto from './assets/saral-photo.jpeg';
// ----------------------------------------------------
// COMPONENTS
// ----------------------------------------------------

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (page, targetId) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo(0, 0);
      }
    }, 100);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('home', '#home'); }} className="logo handwriting-text cursor-blink">
          saral Portfolio.😎
        </a>

        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={(e) => { e.preventDefault(); navigate('home', '#home'); }} className="nav-link">Home</a>
          <a href="#skills" onClick={(e) => { e.preventDefault(); navigate('home', '#skills'); }} className="nav-link">Skills</a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); navigate('projects'); }} className="nav-link">Projects</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); navigate('home', '#contact'); }} className="nav-link">Contact</a>
        </nav>

        <button className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

const TypingText = ({ phrases }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, 50); // Speed of deletion
      } else {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    } else {
      if (displayText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 100); // Speed of typing
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Wait time before deleting
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhraseIndex, phrases]);

  return (
    <span>
      {displayText}
      <span className="cursor-blink" style={{ borderRight: '2px solid #b000ff', marginLeft: '4px' }}></span>
    </span>
  );
};

const Hero = ({ setCurrentPage }) => {
  const specializedIn = [
    "Android App Development",
    "Web Development",
    "Full Stack Development",
    "Flutter Development"
  ];
  return (
    <section id="home" className="hero">
      <div className="container hero-content hero-flex-layout">
        <div className="hero-text-content">
          <span className="hero-subtitle animate-fade-up">Developer, Marketer & Trader</span>
          <h2 className="hero-greeting animate-fade-up delay-1" style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0 0.5rem 0', color: 'white' }}>
            Hy, I'm <span className="gradient-text">Saral Batt</span> 👋
          </h2>
          <h1 className="hero-title animate-fade-up delay-2" style={{ fontSize: '3.5rem' }}>
            Focused on <br />
            <span className="gradient-text" style={{ display: 'inline-block', minHeight: '1.2em', fontSize: '3rem' }}>
              <TypingText phrases={specializedIn} />
            </span>
          </h1>
          <p className="hero-text animate-fade-up delay-3">
            I build scalable web applications with visually stunning interfaces. 
            Beyond code, I have a strong background in Marketing and Stock Market analysis, 
            blending technical expertise with strategic business insights.
          </p>
          <div className="hero-buttons animate-fade-up delay-4">
            <button onClick={() => { setCurrentPage('projects'); window.scrollTo(0, 0); }} className="btn btn-primary" style={{ border: 'none', fontSize: '1rem' }}>
              View My projects <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
            </button>
            <a href="#contact" className="btn btn-outline" onClick={(e) => {
              const el = document.querySelector('#contact');
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              Contact Me
            </a>
          </div>
        </div>
        <div className="hero-image-container animate-fade-up">
          <img src={saralPhoto} alt="Saral" className="hero-profile-img" />
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { name: 'React.js & Next.js', icon: <Code size={24} /> },
    { name: 'JavaScript & TypeScript', icon: <Palette size={24} /> },
    { name: 'Node.js & Express', icon: <Server size={24} /> },
    { name: 'MongoDB, MySQL & PostgreSQL', icon: <Database size={24} /> },
    { name: 'Android Development', icon: <Smartphone size={24} /> },
    { name: 'Stock Market Trading', icon: <TrendingUp size={24} /> },
  ];

  return (
    <section id="skills" className="section container">
      <h2 className="section-title">My <span className="gradient-text">Expertise</span></h2>
      <p className="section-subtitle">A comprehensive toolkit spanning across technical development, market analysis, and business growth strategy.</p>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card glass" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="skill-icon">{skill.icon}</div>
            <div className="skill-name">{skill.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Portfolio = ({ projects }) => {
  return (
    <section id="projects" className="section container" style={{ minHeight: '80vh', paddingTop: '8rem' }}>
      <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
      <p className="section-subtitle">Showcasing dynamic, scalable full-stack applications built from the ground up.</p>

      <div className="projects-grid">
        {projects && projects.length > 0 ? projects.map(project => (
          <div key={project._id} className="project-card glass" style={{ padding: '2rem' }}>
            <div className="project-content" style={{ padding: 0 }}>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              <div className="project-tags">
                {project.skills.map((skill, idx) => (
                  <span key={idx} className="project-tag">{skill}</span>
                ))}
              </div>

              <div className="project-links">
                <a href={project.githubLink} className="project-link">
                  <GitBranch size={18} /> Code
                </a>
                <a href={project.liveLink} className="project-link">
                  <ExternalLink size={18} /> Live Demo
                </a>
              </div>
            </div>
          </div>
        )) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Loading projects from server...</p>
        )}
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="section container">
      <h2 className="section-title"><span className="gradient-text">Contact:</span></h2>
      <p className="section-subtitle"></p>

      <div className="contact-container" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div className="contact-info" style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '2rem' }}>
          <div className="contact-item hover-animate">
            <div className="contact-icon"><Mail size={24} /></div>
            <div className="contact-detail">
              <h4>Email</h4>
              <p><a href="mailto:saralbatt65@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>saralbatt65@gmail.com</a></p>
            </div>
          </div>
          <div className="contact-item hover-animate">
            <div className="contact-icon"><Smartphone size={24} /></div>
            <div className="contact-detail">
              <h4>Phone</h4>
              <p><a href="tel:+917041959596" style={{ color: 'inherit', textDecoration: 'none' }}>+91 7041959596</a></p>
            </div>
          </div>
          <div className="contact-item hover-animate">
            <div className="contact-icon"><Terminal size={24} /></div>
            <div className="contact-detail">
              <h4>Location</h4>
              <p>Amroli, Surat, Gujarat, India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer container">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <h3 className="handwriting-text cursor-blink" style={{ fontSize: '1.5rem', margin: '0' }}>
          saral Portfolio.😎
        </h3>
        <div className="social-links" style={{ margin: '1rem 0' }}>
          <a href="https://github.com/saralbatt65-bit" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="mailto:saralbatt65@gmail.com" className="social-link" title="Email">
            <Mail size={22} />
          </a>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Saral. Goal Ai developer and ai agent.
        </p>
      </div>
    </footer>
  );
};

// ----------------------------------------------------
// MAIN APP
// ----------------------------------------------------

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Static project data
    setProjects([
      {
        _id: '1',
        title: 'Medical Stock Management',
        description: 'A full-stack medical stock management application to efficiently track inventory and supplies.',
        githubLink: 'https://github.com/saralbatt65-bit/medical_stock_management',
        liveLink: '#',
        skills: ['React', 'Node.js', 'MongoDB', 'Redux', 'Tailwind']
      },
      {
        _id: '2',
        title: 'Calculator Application',
        description: 'A functional and robust calculator application built for Android devices.',
        githubLink: 'https://github.com/saralbatt65-bit/calculator-application',
        liveLink: '#',
        skills: ['Java', 'XML']
      },
      {
        _id: '3',
        title: 'Task Management App',
        description: 'Kanban style task manager with drag and drop capabilities for enhanced productivity.',
        githubLink: '#',
        liveLink: '#',
        skills: ['React', 'TypeScript', 'Node.js']
      }
    ]);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' ? (
        <>
          <Hero setCurrentPage={setCurrentPage} />
          <Skills />
          <Contact />
        </>
      ) : (
        <Portfolio projects={projects} />
      )}
      <Footer />
    </>
  );
}

export default App;
