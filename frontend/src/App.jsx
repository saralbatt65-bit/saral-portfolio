import React, { useState, useEffect } from 'react';
import {
  Menu, X, Globe, User, Mail, ArrowRight, ExternalLink,
  Code, Server, Database, Smartphone, Palette, Terminal, Send,
  GitBranch
} from 'lucide-react';
import axios from 'axios';
import './App.css';

// ----------------------------------------------------
// COMPONENTS
// ----------------------------------------------------

const Header = ({ isScrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="logo gradient-text">saral Portfolio.😎</a>

        <nav>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li><a href="#home" className="nav-link" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#skills" className="nav-link" onClick={() => setMenuOpen(false)}>Skills</a></li>
            <li><a href="#projects" className="nav-link" onClick={() => setMenuOpen(false)}>Projects</a></li>
            <li><a href="#contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-content">
        <span className="hero-subtitle animate-fade-up">Full Stack Developer</span>
        <h1 className="hero-title animate-fade-up delay-1">
          Designing Digital <br />
          <span className="gradient-text">Experiences.</span>
        </h1>
        <p className="hero-text animate-fade-up delay-2">
          I build scalable web applications with visually stunning, dynamic interfaces.
          Specializing in React, Node.js, and advanced user experiences.
        </p>
        <div className="hero-buttons animate-fade-up delay-3">
          <a href="#projects" className="btn btn-primary">
            View My Work <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
          </a>
          <a href="#contact" className="btn btn-outline">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { name: 'Frontend React', icon: <Code size={24} /> },
    { name: 'Backend Node.js', icon: <Server size={24} /> },
    { name: 'Database Architecture', icon: <Database size={24} /> },
    { name: 'Responsive UI', icon: <Smartphone size={24} /> },
    { name: 'Modern Design', icon: <Palette size={24} /> },
    { name: 'DevOps & Git', icon: <Terminal size={24} /> }
  ];

  return (
    <section id="skills" className="section container">
      <h2 className="section-title">My <span className="gradient-text">Expertise</span></h2>
      <p className="section-subtitle">A comprehensive toolkit spanning across frontend aesthetics to robust backend architecture.</p>

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
    <section id="projects" className="section container">
      <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
      <p className="section-subtitle">Showcasing dynamic, scalable full-stack applications built from the ground up.</p>

      <div className="projects-grid">
        {projects && projects.length > 0 ? projects.map(project => (
          <div key={project._id} className="project-card glass">
            <div style={{ overflow: 'hidden' }}>
              <img src={project.imageUrl} alt={project.title} className="project-image" />
            </div>
            <div className="project-content">
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
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const { data } = await axios.post('/api/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section container">
      <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
      <p className="section-subtitle">Reach out for collaborations, opportunities, or just to say hello.</p>

      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon"><Mail size={24} /></div>
            <div className="contact-detail">
              <h4>Email</h4>
              <p><a href="mailto:saralbatt65@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>saralbatt65@gmail.com</a></p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon"><Terminal size={24} /></div>
            <div className="contact-detail">
              <h4>Location</h4>
              <p>Amroli, Surat, Gujarat, India</p>
            </div>
          </div>
        </div>

        <form className="contact-form glass" style={{ padding: '2rem' }} onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Your Message"
              rows="5"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : <><Send size={20} style={{ marginRight: '0.5rem' }} /> Send Message</>}
          </button>
          {status === 'success' && <p style={{ color: '#10b981', marginTop: '1rem' }}>Message sent successfully!</p>}
          {status === 'error' && <p style={{ color: '#ef4444', marginTop: '1rem' }}>Failed to send message. Please try again.</p>}
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer container">
      <div className="social-links">
        <a href="https://github.com/repos?q=owner%3A%40me" className="social-link"><GitBranch size={20} /></a>
        <a href="" className="social-link"><Globe size={20} /></a>
        <a href="#" className="social-link"><Mail size={20} /></a>
      </div>
      <p style={{ color: 'var(--text-secondary)' }}>&copy; {new Date().getFullYear()} Advanced Portfolio. All rights reserved.</p>
    </footer>
  );
};

// ----------------------------------------------------
// MAIN APP
// ----------------------------------------------------

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Fetch projects from backend
    axios.get('/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => {
        console.error("Failed to fetch projects", err);
        // Fallback data if backend is not available
        setProjects([
          {
            _id: '1',
            title: 'medical stock management',
            description: 'A full-stack medical stock management application with React and Node.js',
            imageUrl: 'https://media.sortly.com/wp-content/uploads/2018/07/12130452/Flat-lay-of-various-medical-supplies-on-gray-background-624567292_2125x1416.jpeg',
            githubLink: 'https://github.com/saralbatt65-bit/medical_stock_management',
            liveLink: '#',
            skills: ['React', 'Node.js', 'MongoDB', 'Redux', 'Tailwind']
          },
          {
            _id: '2',
            title: 'calculator-application',
            description: 'A modern chat interface built with React and advanced AI integrations.',
            imageUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            githubLink: 'https://github.com/saralbatt65-bit/calculator-application',
            liveLink: '#',
            skills: ['java', 'Xml',]
          },
          {
            _id: '3',
            title: 'Task Management App',
            description: 'Kanban style task manager with drag and drop capabilities.',
            imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            githubLink: '#',
            liveLink: '#',
            skills: ['React', 'TypeScript', 'Node.js']
          }

        ]);
      });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header isScrolled={isScrolled} />
      <Hero />
      <Skills />
      <Portfolio projects={projects} />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
