import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code, GraduationCap, ChevronDown, Terminal, Sparkles, Zap, Rocket, Star } from 'lucide-react';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  const roles = ['Full Stack Engineer', 'Vue.js Expert', 'Node.js Developer', 'Cloud Architect', 'Problem Solver'];
  const [roleIndex, setRoleIndex] = useState(0);

  // Generate starfield (fewer stars on mobile for performance)
  useEffect(() => {
    const generateStars = () => {
      const isMobile = window.innerWidth < 768;
      const starCount = isMobile ? 100 : 200; // Reduce stars on mobile
      const newStars = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.7 + 0.3,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 3
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  // Generate shooting stars periodically
  useEffect(() => {
    const createShootingStar = () => {
      const newStar = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 50,
        angle: Math.random() * 30 + 30 // 30-60 degrees
      };
      setShootingStars(prev => [...prev, newStar]);

      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newStar.id));
      }, 3000);
    };

    const interval = setInterval(createShootingStar, 3000);
    return () => clearInterval(interval);
  }, []);

  // Generate floating icons
  useEffect(() => {
    const icons = [
      { Icon: Code, color: 'text-blue-400', delay: 0 },
      { Icon: Terminal, color: 'text-green-400', delay: 1 },
      { Icon: Zap, color: 'text-yellow-400', delay: 2 },
      { Icon: Rocket, color: 'text-purple-400', delay: 3 },
      { Icon: Star, color: 'text-pink-400', delay: 4 },
      { Icon: Sparkles, color: 'text-cyan-400', delay: 5 }
    ];

    const positioned = icons.map((icon, i) => ({
      ...icon,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5
    }));

    setFloatingIcons(positioned);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Typing animation
  useEffect(() => {
    const text = roles[roleIndex];
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypedText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 1500);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [roleIndex]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);


  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  // Enhanced animated background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;
    const connectionDistance = 120;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.hue = Math.random() * 60 + 200; // Blue to purple range
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Connect nearby particles with gradient lines
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            );
            gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 60%, ${0.15 * (1 - distance / connectionDistance)})`);
            gradient.addColorStop(1, `hsla(${otherParticle.hue}, 80%, 60%, ${0.15 * (1 - distance / connectionDistance)})`);
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const experiences = [
    {
      company: "BITSTRAPPED",
      role: "Full Stack Software Engineer",
      location: "Toronto, ON, Remote",
      period: "March 2022 – Present",
      color: "from-blue-500 to-cyan-500",
      icon: "💼",
      points: [
        "Conduct effective requirements gathering in client meetings",
        "Architect applications with VueJs(Nuxt), NodeJS, and Python",
        "Lead code reviews and GitFlow branching strategies"
      ]
    },
    {
      company: "CEFALO AS",
      role: "Software Engineer",
      location: "Dhaka, Bangladesh",
      period: "Jan 2020 – Feb 2022",
      color: "from-purple-500 to-pink-500",
      icon: "🚀",
      points: [
        "Collaborated with Norwegian team on large-scale product",
        "Led RESTful API development with NodeJS and PostgreSQL",
        "Improved SPA frontend using VueJS and Vuex"
      ]
    },
    {
      company: "SIGMA SOLUTIONS",
      role: "Software Engineer",
      location: "Dhaka, Bangladesh",
      period: "April 2018 – 2020",
      color: "from-orange-500 to-red-500",
      icon: "⚡",
      points: [
        "Developed automation modules for telecom industry",
        "Implemented alarm bots and omnichannel support system",
        "Built ETL system for AWS Redshift"
      ]
    }
  ];

  const projects = [
    {
      name: "VUE3-DRAG-DROP",
      tech: "Vue3, Javascript",
      description: "NPM package with 100+ weekly downloads for drag and drop data transfer.",
      gradient: "from-green-400 to-blue-500",
      icon: "📦"
    },
    {
      name: "MOVIE APP",
      tech: "Vue.js, themoviedb API",
      description: "Discover movies with details, cast, and ratings using themoviedb API.",
      gradient: "from-purple-400 to-pink-500",
      icon: "🎬"
    },
    {
      name: "FOOD DELIVERY APP",
      tech: "Laravel, Vue.js, MySQL",
      description: "Subscription delivery system with Authorize.Net integration.",
      gradient: "from-yellow-400 to-orange-500",
      icon: "🍕"
    },
    {
      name: "DNA VISUALIZATION",
      tech: "D3.js",
      description: "Interactive tool for analyzing DNA sequences and cancer patterns.",
      gradient: "from-cyan-400 to-blue-500",
      icon: "🧬"
    }
  ];

  const skills = {
    "Languages": ["PHP", "Node.js", "JavaScript", "HTML", "CSS", "SQL", "C++", "GoLang"],
    "Frameworks": ["Laravel", "Express.js", "Vue.js", "Nuxt"],
    "Tools": ["Redis", "Docker", "IntelliJ", "Vim", "ClickUp", "Slack"],
    "Cloud": ["AWS", "GCP", "Azure", "Docker"]
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />

      {/* Space Background - Starfield */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950 to-black opacity-90" />

        {/* Nebula clouds */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />

        {/* Stars */}
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
              boxShadow: '0 0 4px rgba(255,255,255,0.8)'
            }}
          />
        ))}

        {/* Shooting Stars */}
        {shootingStars.map(star => (
          <div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animation: 'shooting-star 3s linear forwards'
            }}
          >
            <div className="h-0.5 w-20 bg-gradient-to-r from-white via-blue-200 to-transparent rounded-full"
              style={{
                transform: `rotate(${star.angle}deg)`,
                boxShadow: '0 0 6px 2px rgba(255,255,255,0.5)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Animated Gradient Overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-900/5 via-transparent to-purple-900/5 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      {/* Floating Icons Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((icon, i) => {
          const Icon = icon.Icon;
          return (
            <div
              key={i}
              className={`absolute ${icon.color} opacity-10`}
              style={{
                left: `${icon.x}%`,
                top: `${icon.y}%`,
                animation: `float ${8 + i}s ease-in-out infinite`,
                animationDelay: `${icon.delay}s`,
                transform: `scale(${icon.scale}) rotate(${icon.rotation}deg)`
              }}
            >
              <Icon size={60} />
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }

        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideInUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes rotateIn {
          from { transform: rotate(-180deg) scale(0); opacity: 0; }
          to { transform: rotate(0) scale(1); opacity: 1; }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(96, 165, 250, 0.3); }
          50% { box-shadow: 0 0 40px rgba(96, 165, 250, 0.6); }
        }

        @keyframes particle-burst {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-80px) scale(0);
            opacity: 0;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes shooting-star {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px);
            opacity: 0;
          }
        }

        .animate-visible-left { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-visible-right { animation: slideInRight 0.8s ease-out forwards; }
        .animate-visible-up { animation: slideInUp 0.8s ease-out forwards; }
        .animate-visible-scale { animation: scaleIn 0.8s ease-out forwards; }
        .animate-visible-fade { animation: fadeIn 1s ease-out forwards; }
        .animate-visible-rotate { animation: rotateIn 0.8s ease-out forwards; }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
      `}</style>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6" data-animate>
        <div 
          className="text-center max-w-5xl"
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
          }}
        >
          <div className="mb-8 inline-block animate-visible-rotate">
            <Sparkles className="inline text-yellow-400" size={50} style={{ filter: 'drop-shadow(0 0 20px rgba(250, 204, 21, 0.5))' }} />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-visible-scale px-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-300">
              Tushar Ghosh Joy
            </span>
          </h1>

          <div className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-gray-300 mb-8 min-h-[3rem] md:min-h-[4rem] flex items-center justify-center animate-visible-fade px-4">
            <Terminal className="mr-2 md:mr-3 text-green-400 animate-pulse flex-shrink-0" size={window.innerWidth < 640 ? 24 : 36} />
            <span className="font-mono text-center">
              {typedText}
              <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
            </span>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-visible-up px-6">
            Crafting exceptional digital experiences with clean code and modern architecture.
            Specialized in building scalable full-stack applications.
          </p>
          
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center animate-visible-up stagger-1 px-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-110 hover:rotate-2 active:scale-95"
              style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles size={18} />
                Get In Touch
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              onClick={() => scrollToSection('projects')}
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base border-2 border-blue-500 rounded-full font-semibold hover:bg-blue-500/20 transition-all duration-300 hover:scale-110 hover:border-purple-500 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95"
            >
              View Projects
            </button>
          </div>
          
          <div className="mt-16 animate-bounce">
            <ChevronDown size={32} className="mx-auto text-gray-500" />
          </div>
        </div>

        {/* Animated circles in hero */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-blue-500/20"
              style={{
                width: `${200 + i * 150}px`,
                height: `${200 + i * 150}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animation: `pulse ${3 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6" data-animate>
        <div className="container mx-auto max-w-6xl">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center ${
              visibleElements.has('about') ? 'animate-visible-scale' : 'opacity-0'
            }`}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div 
              className={`relative group ${
                visibleElements.has('about') ? 'animate-visible-left' : 'opacity-0'
              }`}
              style={{
                transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition-all duration-500 animate-pulse" style={{ animationDuration: '3s' }} />
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-gray-800 transform group-hover:scale-105 transition-all duration-500">
                <GraduationCap className="text-blue-400 mb-4 transform group-hover:rotate-12 transition-transform duration-300" size={48} />
                <h3 className="text-2xl font-bold mb-4">Education</h3>
                <p className="text-xl text-gray-300 mb-2">B.Sc in Computer Science</p>
                <p className="text-gray-400 mb-1">Khulna University of Engineering & Technology</p>
                <p className="text-gray-500">CGPA: 3.64 | Feb 2018</p>
              </div>
            </div>
            
            <div className={`space-y-6 text-gray-300 text-lg leading-relaxed ${
              visibleElements.has('about') ? 'animate-visible-right' : 'opacity-0'
            }`}>
              <p className="hover:text-white transition-colors duration-300">
                Hey there! I'm a passionate Full Stack Software Engineer with 6+ years of experience 
                turning complex problems into elegant solutions.
              </p>
              <p className="hover:text-white transition-colors duration-300">
                Currently working remotely with <span className="text-blue-400 font-semibold animate-pulse">BITSTRAPPED</span> in Toronto, 
                I specialize in building scalable web applications using modern JavaScript frameworks, 
                particularly Vue.js and Node.js.
              </p>
              <p className="hover:text-white transition-colors duration-300">
                When I'm not coding, I contribute to open-source projects (like my VUE3-DRAG-DROP package 
                with 100+ weekly downloads!) and explore new technologies to stay ahead of the curve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900" data-animate>
        <div className="container mx-auto max-w-6xl">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center ${
            visibleElements.has('experience') ? 'animate-visible-scale' : 'opacity-0'
          }`}>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative group transition-all duration-500 ${
                  hoveredCard === index ? 'scale-105 z-10' : ''
                } ${
                  visibleElements.has('experience') 
                    ? index % 2 === 0 ? 'animate-visible-left' : 'animate-visible-right'
                    : 'opacity-0'
                } stagger-${index + 1}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} rounded-3xl blur-2xl transition-all duration-500 ${
                  hoveredCard === index ? 'opacity-60' : 'opacity-0'
                }`} />
                
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-gray-800 group-hover:border-gray-600 transition-all duration-500 overflow-hidden">
                  {/* Animated background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="flex items-start gap-6 relative z-10">
                    <div className="text-5xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                      {exp.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                            {exp.company}
                          </h3>
                          <p className="text-xl text-gray-300 mb-2">{exp.role}</p>
                          <p className="text-gray-500">{exp.location}</p>
                        </div>
                        <span className="text-gray-400 mt-2 md:mt-0 font-mono">{exp.period}</span>
                      </div>
                      
                      <ul className="space-y-3">
                        {exp.points.map((point, idx) => (
                          <li key={idx} className="flex gap-3 text-gray-300 hover:text-white transition-colors duration-300 transform hover:translate-x-2">
                            <span className={`text-transparent bg-gradient-to-r ${exp.color} bg-clip-text font-bold mt-1`}>▸</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6" data-animate>
        <div className="container mx-auto max-w-6xl">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center ${
            visibleElements.has('projects') ? 'animate-visible-scale' : 'opacity-0'
          }`}>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const cardId = `project-${index}`;

              return (
              <div
                key={index}
                className={`group relative ${
                  visibleElements.has('projects') ? 'animate-visible-up' : 'opacity-0'
                } stagger-${index + 1}`}
                onMouseEnter={() => setHoveredCard(cardId)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-3xl blur-2xl transition-all duration-500 ${
                  hoveredCard === cardId ? 'opacity-60' : 'opacity-0'
                }`} />

                <div className={`relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-gray-800 h-full transition-all duration-300 overflow-hidden ${hoveredCard === cardId ? 'transform -translate-y-4 scale-105' : ''}`}>
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <div className="text-5xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10">
                    {project.icon}
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent relative z-10`}>
                    {project.name}
                  </h3>
                  
                  <p className="text-sm text-purple-400 mb-4 font-mono relative z-10">{project.tech}</p>
                  <p className="text-gray-300 mb-6 relative z-10 group-hover:text-white transition-colors">{project.description}</p>
                  
                  <a
                    href="https://github.com/TusharJoy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-300 relative z-10 group-hover:gap-4"
                  >
                    View Project <ExternalLink size={16} className="transform group-hover:rotate-45 transition-transform" />
                  </a>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-black" data-animate>
        <div className="container mx-auto max-w-6xl">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center ${
            visibleElements.has('skills') ? 'animate-visible-scale' : 'opacity-0'
          }`}>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items], catIndex) => (
              <div 
                key={category} 
                className={`group ${
                  visibleElements.has('skills') ? 'animate-visible-scale' : 'opacity-0'
                } stagger-${catIndex + 1}`}
              >
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-gray-800 hover:border-gray-600 transition-all duration-500 overflow-hidden transform hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent relative z-10">
                    {category}
                  </h3>
                  
                  <div className="flex flex-wrap gap-3 relative z-10">
                    {items.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-full text-sm hover:border-blue-400 hover:scale-125 hover:bg-blue-500/20 transition-all duration-300 cursor-default hover:shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1"
                        style={{
                          animationDelay: `${index * 0.05}s`
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6" data-animate>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 ${
            visibleElements.has('contact') ? 'animate-visible-scale' : 'opacity-0'
          }`}>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Let's Build Something Amazing
            </span>
          </h2>

          <p className={`text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 px-4 ${
            visibleElements.has('contact') ? 'animate-visible-fade' : 'opacity-0'
          }`}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          <div className={`flex flex-wrap gap-6 justify-center mb-12 ${
            visibleElements.has('contact') ? 'animate-visible-up' : 'opacity-0'
          }`}>
            <a 
              href="mailto:tusharghoshjoy@gmail.com"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-110 hover:rotate-2"
              style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Mail size={20} className="transform group-hover:rotate-12 transition-transform" />
                Email Me
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <a 
              href="https://github.com/TusharJoy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-blue-500 rounded-full font-semibold hover:bg-blue-500/20 transition-all duration-300 flex items-center gap-2 hover:scale-110 hover:border-purple-500 hover:shadow-lg hover:shadow-blue-500/50"
            >
              <Github size={20} className="transform hover:rotate-12 transition-transform" />
              GitHub
            </a>
            
            <a 
              href="https://linkedin.com/in/tusharghoshjoy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-blue-500 rounded-full font-semibold hover:bg-blue-500/20 transition-all duration-300 flex items-center gap-2 hover:scale-110 hover:border-purple-500 hover:shadow-lg hover:shadow-blue-500/50"
            >
              <Linkedin size={20} className="transform hover:rotate-12 transition-transform" />
              LinkedIn
            </a>
          </div>
          
          <div className={`flex flex-col items-center gap-4 text-gray-400 ${
            visibleElements.has('contact') ? 'animate-visible-fade stagger-2' : 'opacity-0'
          }`}>
            <div className="flex items-center gap-2 hover:text-white transition-colors duration-300 hover:scale-110">
              <Phone size={18} className="animate-pulse" />
              <span>+880 1329 521150</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors duration-300 hover:scale-110">
              <Mail size={18} className="animate-pulse" />
              <span>tusharghoshjoy@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Animated circles in contact */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-purple-500/20"
              style={{
                width: `${300 + i * 200}px`,
                height: `${300 + i * 200}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animation: `pulse ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.7}s`
              }}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p className="hover:text-gray-300 transition-colors">
            © 2024 Tushar Ghosh Joy. Crafted with passion and React.
          </p>
        </div>
      </footer>
    </div>
  );
}