import React, { useState, useEffect } from 'react';
import {
  Menu, X, Globe, User, Mail, ArrowRight, ExternalLink,
  Code, Server, Database, Smartphone, Palette, Terminal, Send,
  GitBranch, TrendingUp, Megaphone
} from 'lucide-react';
import './App.css';
import saralPhoto from './assets/saral-photo.jpeg';
import GalaxyBackground from './GalaxyBackground';
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
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('home', '#home'); }} className="header-logo-link" style={{ textDecoration: 'none' }}>
          <div className="header-logo-anim">
            <span className="header-logo-text">saral Portfolio.😎</span>
          </div>
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
          <h2 className="hero-greeting animate-fade-up delay-1" style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0 0.5rem 0', color: 'white' }}>
            Hy, I'm <span className="gradient-text">Saral Batt</span> 👋
          </h2>
          <h1 className="hero-title animate-fade-up delay-2" style={{ fontSize: '2.5rem' }}>
            Focused on <br />
            <span className="gradient-text" style={{ display: 'inline-block', minHeight: '1.2em', fontSize: '2rem' }}>
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
          <div key={project._id} className="project-card neo-card">
            <div className="project-header">
              <span className="project-category">{project.category}</span>
              <div className="project-actions">
                {project.liveLink && (
                  <a href={project.liveLink} className="action-icon" target="_blank" rel="noopener noreferrer"><ExternalLink size={20} /></a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} className="action-icon" target="_blank" rel="noopener noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                  </a>
                )}
              </div>
            </div>

            <h3 className="project-title">{project.title}</h3>
            <p className="project-desc">{project.description}</p>

            <div className="project-footer">
              <div className="project-tags">
                {project.skills.map((skill, idx) => (
                  <span key={idx} className="project-tag">{skill}</span>
                ))}
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
        <div className="contact-info" style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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
          <a href="https://www.linkedin.com/in/saral-batt-5470893a0/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="mailto:saralbatt65@gmail.com" className="social-link" title="Email">
            <Mail size={22} />
          </a>
        </div>
        <div className="neo-pill">
          <div className="pill-logo" style={{ minWidth: '45px', display: 'flex', justifyContent: 'center' }}>
            <div className="footer-logo-anim">
              <span className="footer-logo-text">S.</span>
            </div>
          </div>
          <div className="pill-divider"></div>
          <div className="pill-text">
            MADE WITH <span className="heart">❤️</span> BY <span className="author">SARAL</span>
          </div>
        </div>
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
    const initialProjects = [
      {
        _id: '1',
        title: 'Medical Stock Management',
        description: 'A full-stack medical stock management application to efficiently track inventory and supplies.',
        category: 'FULL STACK',
        githubLink: 'https://github.com/saralbatt65-bit/medical_stock_management',
        skills: ['React', 'Node.js', 'MongoDB']
      },
      {
        _id: '2',
        title: 'Calculator Application',
        description: 'A functional and robust calculator application built for Android devices.',
        category: 'MOBILE UTILITY',
        githubLink: 'https://github.com/saralbatt65-bit/calculator-application',
        skills: ['Java', 'XML']
      },
      {
        _id: '3',
        title: 'SB Complaint Management App',
        description: 'Complaint Management App built with Java using a modern tech stack: Firebase (Firestore, Auth, Storage), Google AI (Gemini API) for Sahayak assistant, ViewBinding, and Material Components. with drag and drop capabilities for enhanced productivity.',
        category: 'Mobile Application',
        githubLink: 'https://github.com/saralbatt65-bit/SB-complaint-Management',
        skills: ['java', 'XML', 'HTML']
      },
      {
        _id: '4',
        title: 'Portfolio Website',
        description: 'A professional portfolio website for showcasing projects, skills, and contact information.',
        category: 'Full Stack',
        githubLink: 'https://github.com/saralbatt65-bit/saral-portfolio',
        skills: ['HTML', 'CSS', 'React', 'Tailwind']
      },
      {
        _id: '5',
        title: 'Food Ordering',
        description: 'A comprehensive Food Ordering & Restaurant Management Android System. Features 3 dedicated modules: User (Ordering & Billing), Chef (Kitchen Management), and Admin (Staff & Inventory Control). Built with Java and Material Design.',
        category: 'Mobile Application',
        githubLink: 'https://github.com/saralbatt65-bit/Food-application',
        skills: ['java', 'XML']
      },
      {
        _id: '6',
        title: 'Vegist',
        description: 'food shopping',
        category: 'Full stack',
        githubLink: 'https://github.com/saralbatt65-bit/vegist',
        skills: ['HTML', 'CSS', 'javascript', 'MySql', 'php']
      }
    ];

    setProjects(initialProjects);

    // Automate fetching Live Links from GitHub 'About' section (homepage)
    const fetchLiveLinks = async () => {
      const updatedProjects = await Promise.all(initialProjects.map(async (project) => {
        if (project.githubLink && project.githubLink.includes('github.com')) {
          try {
            const urlParts = project.githubLink.split('github.com/')[1].split('/');
            const owner = urlParts[0];
            const repo = urlParts[1];

            if (owner && repo) {
              const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
              if (response.ok) {
                const data = await response.json();
                if (data.homepage && data.homepage.trim() !== '') {
                  let liveUrl = data.homepage.trim();
                  if (!liveUrl.startsWith('http')) {
                    liveUrl = 'https://' + liveUrl;
                  }
                  return { ...project, liveLink: liveUrl };
                }
              }
            }
          } catch (err) {
            console.error('Failed to fetch github data for', project.title, err);
          }
        }
        return project;
      }));
      setProjects(updatedProjects);
    };

    fetchLiveLinks();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <GalaxyBackground />
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
