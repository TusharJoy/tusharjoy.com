import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code, GraduationCap, ChevronDown, Terminal, Sparkles, Zap, Rocket, Star, TrendingUp, Award, Users, Download, ArrowUp, FileDown, X, Moon, Sun, ChevronLeft, ChevronRight, Quote, MessageCircle } from 'lucide-react';
import * as THREE from 'three';

// Skill Bar Component with Animation
function SkillBar({ skill, visible, delay }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setWidth(skill.level);
      }, delay * 100);
      return () => clearTimeout(timer);
    }
  }, [visible, skill.level, delay]);

  return (
    <div className="mb-6 group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
            {skill.years} exp
          </span>
          <span className="text-sm text-blue-400 font-semibold min-w-[45px] text-right">
            {skill.level}%
          </span>
        </div>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden group-hover:h-3 transition-all duration-300">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
          style={{ width: `${width}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

// Animated Counter Component
function StatsCard({ icon, value, suffix, label, gradient, delay }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const targetValue = parseFloat(value);
    const increment = targetValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const displayValue = String(value).includes('.')
    ? count.toFixed(1)
    : Math.floor(count);

  return (
    <div className="group relative">
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-500`} />

      <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 md:p-8 rounded-3xl border border-gray-800 group-hover:border-gray-600 transition-all duration-500 text-center transform group-hover:scale-105">
        <div className="flex justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
          {icon}
        </div>

        <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {displayValue}{suffix}
        </div>

        <div className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
          {label}
        </div>
      </div>
    </div>
  );
}

// 1. Hero Section - Particle Network
function HeroParticles({ containerRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    // Optimize: disable antialiasing on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: !isMobile });

    renderer.setSize(container.clientWidth, container.clientHeight);
    // Optimize: use lower pixel ratio for better performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    camera.position.z = 50;

    // Particles - reduced count for better performance
    const particleCount = isMobile ? 40 : 80;
    const particles = [];
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      particles.push(new THREE.Vector3(x, y, z));
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0x667eea, size: 2, transparent: true, opacity: 0.6 });
    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    const animate = () => {
      requestAnimationFrame(animate);
      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [containerRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// 2. Skills Section - Floating Geometric Shapes
function SkillsShapes({ containerRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    // Optimize: disable antialiasing on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: !isMobile });

    renderer.setSize(container.clientWidth, container.clientHeight);
    // Optimize: use lower pixel ratio for better performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    camera.position.z = 8;

    const shapes = [];
    // Optimize: reduce geometry segments on mobile
    const segments = isMobile ? 8 : 16;
    const geometries = [
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.SphereGeometry(0.3, segments, segments),
      new THREE.TorusGeometry(0.3, 0.1, segments, isMobile ? 50 : 100),
      new THREE.OctahedronGeometry(0.3)
    ];

    const colors = [0x667eea, 0x764ba2, 0xf093fb, 0x4facfe];

    for (let i = 0; i < 6; i++) {
      const geom = geometries[i % geometries.length];
      const mat = new THREE.MeshBasicMaterial({ color: colors[i % colors.length], wireframe: true, transparent: true, opacity: 0.4 });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 5);
      shapes.push(mesh);
      scene.add(mesh);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      shapes.forEach((shape, i) => {
        shape.rotation.x += 0.003;
        shape.rotation.y += 0.003;
        shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [containerRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />;
}

// 3. Projects Section - 3D Globe
function ProjectsGlobe({ containerRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    // Optimize: disable antialiasing on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: !isMobile });

    renderer.setSize(container.clientWidth, container.clientHeight);
    // Optimize: use lower pixel ratio for better performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    camera.position.z = 3;

    // Optimize: reduce globe segments on mobile
    const globeSegments = isMobile ? 16 : 32;
    const globeGeometry = new THREE.SphereGeometry(1.5, globeSegments, globeSegments);
    const globeMaterial = new THREE.MeshBasicMaterial({ color: 0x667eea, wireframe: true, transparent: true, opacity: 0.2 });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [containerRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [, setLogoClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [cursorTrail, setCursorTrail] = useState([]);
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'dark'
    return localStorage.getItem('portfolio-theme') || 'dark';
  });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const konamiSequence = useRef([]);
  const konamiCode = useMemo(() => ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'], []);
  const particleIdRef = useRef(0);

  const roles = useMemo(() => ['Full Stack Software Engineer', 'Vue.js & React Expert', 'Node.js & Python Developer', 'SaaS Product Builder', 'Open Source Contributor'], []);
  const [roleIndex, setRoleIndex] = useState(0);

  // Testimonials data - Real LinkedIn Recommendations
  const testimonials = [
    {
      name: "Anders Semb Hermansen",
      role: "Leder Systemutvikling at adsign",
      company: "Cefalo (Former Manager)",
      image: "👨‍💼",
      text: "I had the pleasure of working with Tushar Joy for the last 12 months, during which time he served as a developer with frontend responsibility on our project. Tushar is a skilled developer with a solid understanding of Vue.JS and Node. Throughout the duration of our project he was a valuable asset to our team. He is a quick learner and has improved a lot over the past 12 months. I highly recommend Tushar for any future development opportunities.",
      rating: 5
    },
    {
      name: "Md Ashiquzzaman",
      role: "Senior Software Engineer at Square1",
      company: "Sigma Solutions (Former Manager)",
      image: "👨‍💻",
      text: "Tushar Ghosh is a software developer who I had the opportunity to work with at Sigma Solutions for 1 year. He was a key member of the team that developed the Intelligent SOC Dashboard Platform (ISDP) and demonstrated his ability to implement solutions quickly and effectively. Tushar is hardworking, flexible and easy to work with, and is dedicated to delivering high-quality work. He would be a valuable addition to any organization.",
      rating: 5
    },
    {
      name: "MD Mahmud Ur Rahman",
      role: "Senior Full-Stack Developer (10+ Years)",
      company: "Laravel | Node.js | Vue.js | AWS",
      image: "👨‍🔧",
      text: "Tushar Ghosh did an exceptional job on romoni.com.bd. He was a very productive person and is a multi-skilled person with vast knowledge. He is really good at Laravel and VueJs. He is careful, proactive, self motivated and intelligent team player. It's a pleasure working with him as he is a customer-service oriented colleague.",
      rating: 5
    },
    {
      name: "Abidur Rahman Mallik",
      role: "Founder of Things (FoT)",
      company: "Ex-Samsung (Former Manager)",
      image: "👨‍💼",
      text: "It's rare that you come across standout talent like Tushar. He expertly filled the role of software engineer for my company's R&D team. I was particularly impressed by Tushar's ability to handle even the toughest tasks—effortlessly. That skill often takes years to develop among software engineer professionals, but it seemed to come perfectly naturally to him. Tushar would be an asset to any team.",
      rating: 5
    },
    {
      name: "Tajul Islam",
      role: "Senior Software Engineer",
      company: "Sigma Solutions",
      image: "👨‍💻",
      text: "I had the privilege of working with Tushar Ghosh Joy in the Bravo team for one year at Sigma Solutions. Tushar is a proactive, result-oriented, responsible, and technically sound employee and he is always ready to put all his energy and time to get the job done. He has an exceptional troubleshooting and analytical skill in Backend technologies. Tushar is a great asset to any company.",
      rating: 5
    }
  ];

  // Theme toggle handler
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Theme-aware colors
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';

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
  }, [roleIndex, roles]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);


  // Mouse tracking for parallax and cursor trail
  useEffect(() => {
    let lastEmitTime = 0;
    const emitInterval = 30; // Emit a particle every 30ms

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });

      // Create cursor trail particles
      const now = Date.now();
      if (now - lastEmitTime > emitInterval) {
        lastEmitTime = now;

        const newParticle = {
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 4,
          color: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'][Math.floor(Math.random() * 5)],
          opacity: 1,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2
        };

        setCursorTrail(prev => [...prev.slice(-30), newParticle]); // Keep last 30 particles
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate cursor trail particles
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setCursorTrail(prev => {
        return prev
          .map(particle => ({
            ...particle,
            opacity: particle.opacity - 0.03,
            y: particle.y + particle.vy,
            x: particle.x + particle.vx,
            size: particle.size * 0.98
          }))
          .filter(particle => particle.opacity > 0);
      });
    }, 16); // ~60fps

    return () => clearInterval(animationInterval);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Testimonial navigation handlers
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Scroll progress tracking and back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 500); // Show button after scrolling 500px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Konami Code Easter Egg
  useEffect(() => {
    const handleKeyDown = (e) => {
      konamiSequence.current.push(e.key);
      konamiSequence.current = konamiSequence.current.slice(-10); // Keep only last 10 keys

      if (JSON.stringify(konamiSequence.current) === JSON.stringify(konamiCode)) {
        setKonamiActivated(true);
        setTimeout(() => setKonamiActivated(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiCode]);

  // Console Easter Egg
  useEffect(() => {
    console.log('%c🚀 Welcome to Tushar\'s Portfolio!', 'color: #667eea; font-size: 24px; font-weight: bold;');
    console.log('%c💼 Looking for a developer? Let\'s talk!', 'color: #764ba2; font-size: 16px;');
    console.log('%c📧 tusharghoshjoy@gmail.com', 'color: #48bb78; font-size: 14px;');
    console.log('%c\n🎮 Easter Egg Hint: Try the Konami Code! (↑↑↓↓←→←→BA)', 'color: #f6ad55; font-size: 12px;');
  }, []);

  // Logo click easter egg
  const handleLogoClick = () => {
    setLogoClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 3000);
        return 0;
      }
      return newCount;
    });
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProject]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);


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
      website: "https://www.bitstrapped.com/",
      logo: "/company-logos/bitstrapped.png",
      role: "Full Stack Engineer",
      location: "Toronto, ON, Remote",
      period: "2023 – Present",
      color: "from-blue-500 to-cyan-500",
      icon: "💼",
      points: [
        "Architect enterprise-grade SaaS applications with Vue.js/Nuxt and Node.js + Python serving millions of requests monthly",
        "Achieved 95%+ client satisfaction through effective requirements gathering and expectation management",
        "Reduced deployment time by 50% via Docker containerization and automated CI/CD pipelines",
        "Improved application performance by 40% through optimization and caching strategies",
        "Maintain 99.9%+ uptime across all production services with sub-200ms API response times"
      ]
    },
    {
      company: "CEFALO",
      website: "https://www.cefalo.com/",
      logo: "/company-logos/cefalo.svg",
      role: "Software Engineer",
      location: "Dhaka, Bangladesh (Remote for Norwegian Team)",
      period: "2022 – 2023",
      color: "from-purple-500 to-pink-500",
      icon: "🚀",
      points: [
        "Led RESTful API development with Node.js handling 100K+ daily requests for international clients",
        "Reduced API response times by 35% through PostgreSQL query optimization and indexing",
        "Built responsive SPA features with Vue.js/Vuex, reducing bundle size by 30% via code splitting",
        "Achieved 80%+ code coverage through comprehensive testing and maintained SOLID principles",
        "Collaborated across GMT+1 to GMT+6 timezones in Agile/Scrum environment"
      ]
    },
    {
      company: "SIGMA SOLUTIONS BD",
      website: "https://sigmasolutions.com.bd/",
      logo: "/company-logos/sigma.png",
      role: "Senior Software Engineer",
      location: "Dhaka, Bangladesh",
      period: "2019 – 2022",
      color: "from-orange-500 to-red-500",
      icon: "⚡",
      points: [
        "Built intelligent automation bots processing 10,000+ events daily for telecom infrastructure",
        "Reduced incident response time by 70% through real-time alarm and monitoring systems",
        "Architected omnichannel customer support platform reducing ticket resolution time by 45%",
        "Developed reusable Laravel packages improving development efficiency by 40%",
        "Integrated multi-platform communication (Facebook, WhatsApp, Email) with SLA tracking"
      ]
    },
    {
      company: "ROMONI",
      website: "https://romoni.com.bd/",
      logo: "/company-logos/romoni.svg",
      role: "Software Engineer",
      location: "Dhaka, Bangladesh",
      period: "2018 – 2019",
      color: "from-green-500 to-teal-500",
      icon: "🌟",
      points: [
        "Built operations management and customer care modules from scratch for beauty & lifestyle platform",
        "Improved overall product performance by optimizing database queries and event handling",
        "Gained end-to-end experience from requirement analysis to deployment",
        "Developed features empowering women entrepreneurs in Bangladesh's service industry"
      ]
    }
  ];

  const projects = [
    {
      name: "VUE3-DRAG-DROP",
      tech: "Vue 3, JavaScript, NPM",
      description: "Open-source NPM package with 100+ weekly downloads and 4.5+ star rating. Simplifies drag-and-drop functionality in Vue 3 applications with zero dependencies.",
      fullDescription: "A lightweight, dependency-free Vue 3 component that makes implementing drag-and-drop functionality a breeze. Used by developers worldwide, this package provides intuitive APIs and excellent TypeScript support. Features include customizable drag handles, drop zones, and event callbacks for complete control over drag-and-drop interactions.",
      gradient: "from-green-400 to-blue-500",
      icon: "📦",
      link: "https://www.npmjs.com/package/vue3-drag-drop",
      github: "https://github.com/TusharJoy/vue3-drag-drop",
      category: "Open Source",
      tags: ["Vue.js", "Frontend", "NPM"],
      highlights: ["100+ weekly downloads", "Zero dependencies", "TypeScript support", "4.5+ star rating"]
    },
    {
      name: "VUE PLOTLY",
      tech: "Vue 3, Plotly.js",
      description: "Thin wrapper of Plotly.js for Vue 3, making it easy to create interactive charts and data visualizations in Vue applications.",
      fullDescription: "A modern Vue 3 wrapper for Plotly.js that brings powerful data visualization capabilities to Vue applications. Supports all Plotly chart types including line, bar, scatter, 3D plots, and statistical charts. Perfect for dashboards, analytics platforms, and data-driven applications.",
      gradient: "from-blue-400 to-cyan-500",
      icon: "📊",
      link: "https://github.com/TusharJoy/vue-plotly",
      github: "https://github.com/TusharJoy/vue-plotly",
      category: "Open Source",
      tags: ["Vue.js", "Frontend", "Data Viz"],
      highlights: ["All Plotly chart types", "Reactive data binding", "TypeScript ready", "Composition API"]
    },
    {
      name: "SMARTCOMM AI",
      tech: "Vue.js, Node.js, AI/ML",
      description: "AI-powered communication platform featured on smartcomm.ai. Built intelligent customer engagement solutions.",
      fullDescription: "Enterprise-grade AI communication platform that revolutionizes customer engagement. Integrates natural language processing, sentiment analysis, and predictive analytics to deliver personalized customer experiences. Built with Vue.js frontend and Node.js microservices architecture, handling thousands of concurrent conversations with sub-second response times.",
      gradient: "from-purple-400 to-pink-500",
      icon: "🤖",
      link: "https://smartcomm.ai",
      category: "SaaS",
      tags: ["Full Stack", "AI/ML", "Node.js"],
      highlights: ["AI-powered chatbots", "Real-time analytics", "Multi-channel support", "99.9% uptime"]
    },
    {
      name: "ROMONI PLATFORM",
      tech: "Laravel, Vue.js, MySQL",
      description: "On-demand beauty and lifestyle marketplace connecting skilled women entrepreneurs to customers across Bangladesh.",
      fullDescription: "A comprehensive marketplace platform empowering women entrepreneurs in Bangladesh's beauty and lifestyle industry. Features include real-time booking, service provider matching, payment processing, ratings/reviews, and analytics dashboard. Built with Laravel backend and Vue.js frontend, serving thousands of users with seamless mobile-responsive experience.",
      gradient: "from-pink-400 to-rose-500",
      icon: "💄",
      link: "https://romoni.com.bd",
      category: "SaaS",
      tags: ["Full Stack", "Laravel", "E-commerce"],
      highlights: ["Real-time bookings", "Payment integration", "Mobile-responsive", "Rating system"]
    },
    {
      name: "DNA VISUALIZATION",
      tech: "D3.js, Bioinformatics",
      description: "Interactive research tool for analyzing DNA sequences and cancer patterns. Academic thesis project focused on visual salience in genomic data.",
      fullDescription: "An innovative data visualization tool for bioinformatics research, developed as part of academic thesis work. Uses D3.js to create interactive visualizations of DNA sequences, enabling researchers to identify patterns in cancer genomics. Features include sequence alignment visualization, mutation mapping, and statistical analysis tools.",
      gradient: "from-cyan-400 to-blue-500",
      icon: "🧬",
      category: "Research",
      tags: ["Frontend", "Data Viz", "Research"],
      highlights: ["Academic research", "Interactive visualizations", "Pattern recognition", "Cancer genomics"]
    },
    {
      name: "TELECOM AUTOMATION SUITE",
      tech: "PHP, Laravel, Redis, AWS",
      description: "Intelligent bot system processing 10,000+ daily events for telecom infrastructure monitoring, reducing incident response by 70%.",
      fullDescription: "Enterprise automation platform for telecom infrastructure monitoring and management. Processes over 10,000 daily events using intelligent bots that detect anomalies, predict failures, and automate incident resolution. Built with Laravel and Redis for high-performance event processing, deployed on AWS with auto-scaling capabilities. Reduced incident response time by 70% and improved network reliability.",
      gradient: "from-orange-400 to-red-500",
      icon: "📡",
      category: "Enterprise",
      tags: ["Backend", "Laravel", "DevOps"],
      highlights: ["10K+ daily events", "70% faster response", "Predictive analytics", "Auto-scaling"]
    }
  ];

  const skills = {
    "Frontend": [
      { name: "Vue.js", level: 95, years: "5+" },
      { name: "Nuxt.js", level: 90, years: "3+" },
      { name: "React.js", level: 85, years: "3+" },
      { name: "JavaScript", level: 95, years: "7+" },
      { name: "HTML5/CSS3", level: 95, years: "7+" },
      { name: "Vuex/Redux", level: 90, years: "4+" }
    ],
    "Backend": [
      { name: "Node.js", level: 95, years: "6+" },
      { name: "Python", level: 85, years: "3+" },
      { name: "PHP", level: 85, years: "4+" },
      { name: "Express.js", level: 90, years: "5+" },
      { name: "Laravel", level: 85, years: "4+" },
      { name: "RESTful APIs", level: 95, years: "6+" }
    ],
    "Databases": [
      { name: "PostgreSQL", level: 90, years: "5+" },
      { name: "MySQL", level: 85, years: "5+" },
      { name: "Redis", level: 80, years: "3+" },
      { name: "AWS Redshift", level: 75, years: "2+" }
    ],
    "Cloud & DevOps": [
      { name: "GCP", level: 85, years: "3+" },
      { name: "AWS", level: 80, years: "3+" },
      { name: "Docker", level: 90, years: "4+" },
      { name: "CI/CD", level: 90, years: "4+" },
      { name: "Git/GitFlow", level: 95, years: "7+" }
    ]
  };

  // GitHub contribution data (mock data for visualization)
  const generateContributionData = () => {
    const weeks = 52;
    const data = [];
    for (let week = 0; week < weeks; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        // Generate random contribution count with weighted distribution
        const rand = Math.random();
        let count;
        if (rand < 0.3) count = 0; // 30% no contributions
        else if (rand < 0.6) count = Math.floor(Math.random() * 3) + 1; // 30% low (1-3)
        else if (rand < 0.85) count = Math.floor(Math.random() * 5) + 4; // 25% medium (4-8)
        else count = Math.floor(Math.random() * 10) + 9; // 15% high (9-18)

        weekData.push(count);
      }
      data.push(weekData);
    }
    return data;
  };

  const contributionData = generateContributionData();

  const getContributionColor = (count) => {
    if (count === 0) return 'bg-gray-800';
    if (count <= 3) return 'bg-green-900';
    if (count <= 6) return 'bg-green-700';
    if (count <= 9) return 'bg-green-500';
    return 'bg-green-400';
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Project filtering logic
  const categories = ['All', 'Open Source', 'SaaS', 'Enterprise', 'Research'];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = selectedFilter === 'All' || project.category === selectedFilter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={`relative min-h-screen ${bgColor} ${textColor} overflow-hidden transition-colors duration-500`}>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-900 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out shadow-lg shadow-blue-500/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Cursor Trail Particles */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {cursorTrail.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              transition: 'opacity 0.1s ease-out'
            }}
          />
        ))}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-visible-fade"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-visible-scale"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full transition-all duration-300 hover:scale-110 z-10"
              aria-label="Close modal"
            >
              <X size={24} className="text-gray-300 hover:text-white" />
            </button>

            {/* Modal Content */}
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="flex items-start gap-6 mb-8">
                <div className="text-6xl">{selectedProject.icon}</div>
                <div className="flex-1">
                  <h2 className={`text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r ${selectedProject.gradient} bg-clip-text text-transparent`}>
                    {selectedProject.name}
                  </h2>
                  <p className="text-lg text-purple-400 font-mono mb-2">{selectedProject.tech}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">About This Project</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{selectedProject.fullDescription}</p>
              </div>

              {/* Highlights */}
              {selectedProject.highlights && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Key Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
                      >
                        <Star className={`text-transparent bg-gradient-to-r ${selectedProject.gradient} bg-clip-text flex-shrink-0`} size={20} fill="currentColor" />
                        <span className="text-gray-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-blue-500/50"
                  >
                    <ExternalLink size={20} />
                    View Live Project
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-gray-600 rounded-xl font-semibold hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <Github size={20} />
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Konami Code Easter Egg Overlay */}
      {konamiActivated && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="animate-visible-scale">
            <div className="text-9xl animate-spin">🚀</div>
            <div className="text-4xl font-bold text-center mt-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              KONAMI CODE ACTIVATED!
            </div>
            <div className="text-2xl text-center mt-2 text-white">
              You found the secret! 🎮
            </div>
          </div>
        </div>
      )}

      {/* Logo Click Easter Egg */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="animate-visible-scale">
            <div className="text-8xl">🎉</div>
            <div className="text-3xl font-bold text-center mt-4 text-white animate-bounce">
              You discovered the secret!
            </div>
            <div className="text-xl text-center mt-2 text-gray-300">
              Thanks for exploring! 😄
            </div>
          </div>
        </div>
      )}

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

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
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
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden" data-animate>
        {/* 3D Particle Background */}
        <HeroParticles containerRef={heroRef} />

        <div
          className="text-center max-w-5xl relative z-10"
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
          }}
        >
          <div className="mb-8 inline-block animate-visible-rotate">
            <Sparkles className="inline text-yellow-400" size={50} style={{ filter: 'drop-shadow(0 0 20px rgba(250, 204, 21, 0.5))' }} />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-visible-scale px-4">
            <span
              onClick={handleLogoClick}
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
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
            Building scalable SaaS solutions across continents. 7+ years architecting enterprise-grade
            applications with 99.9%+ uptime. Transforming complex business challenges into elegant technical solutions.
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
                Hey there! I'm a results-driven Full Stack Software Engineer with <span className="text-purple-400 font-semibold">7+ years</span> of experience
                architecting and delivering high-performance web applications for international clients across North America, Europe, and Asia.
              </p>
              <p className="hover:text-white transition-colors duration-300">
                Currently working remotely with <span className="text-blue-400 font-semibold animate-pulse">BITSTRAPPED</span> in Toronto,
                I've achieved a <span className="text-green-400 font-semibold">95%+ client satisfaction rate</span> by delivering enterprise-grade SaaS solutions
                that handle millions of requests monthly with sub-200ms response times and 99.9%+ uptime.
              </p>
              <p className="hover:text-white transition-colors duration-300">
                I specialize in modern JavaScript ecosystems (Vue.js, React, Node.js), Python backend services, and cloud infrastructure (GCP, AWS).
                My approach combines clean architecture, scalability, and exceptional user experience.
              </p>
              <p className="hover:text-white transition-colors duration-300">
                Beyond client work, I'm an active open-source contributor. My <span className="text-pink-400 font-semibold">vue3-drag-drop</span> package
                has <span className="text-yellow-400 font-semibold">100+ weekly downloads</span> on NPM and helps developers worldwide build intuitive drag-and-drop interfaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section id="stats" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900" data-animate>
        <div className="container mx-auto max-w-6xl">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center ${
            visibleElements.has('stats') ? 'animate-visible-scale' : 'opacity-0'
          }`}>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Impact By The Numbers
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <StatsCard
              icon={<TrendingUp className="text-blue-400" size={40} />}
              value="7"
              suffix="+"
              label="Years Experience"
              gradient="from-blue-500 to-cyan-500"
              delay={0}
            />
            <StatsCard
              icon={<Award className="text-green-400" size={40} />}
              value="99.9"
              suffix="%"
              label="Uptime SLA"
              gradient="from-green-500 to-emerald-500"
              delay={0.1}
            />
            <StatsCard
              icon={<Users className="text-purple-400" size={40} />}
              value="95"
              suffix="%"
              label="Client Satisfaction"
              gradient="from-purple-500 to-pink-500"
              delay={0.2}
            />
            <StatsCard
              icon={<Download className="text-yellow-400" size={40} />}
              value="100"
              suffix="+"
              label="Weekly NPM Downloads"
              gradient="from-yellow-500 to-orange-500"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Interactive Career Timeline */}
      <section id="timeline" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-black" data-animate>
        <div className="container mx-auto max-w-5xl">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center ${
            visibleElements.has('timeline') ? 'animate-visible-scale' : 'opacity-0'
          }`}>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Career Journey
            </span>
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {/* 2023 - Present: Bitstrapped */}
              <div className={`relative ${visibleElements.has('timeline') ? 'animate-visible-right' : 'opacity-0'}`}>
                <div className="flex items-center mb-4">
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full -ml-2 ring-4 ring-blue-500/20 animate-pulse"></div>
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                    <span className="text-2xl font-bold text-blue-400">2023 - Present</span>
                  </div>
                </div>
                <div className="ml-16 md:ml-auto md:w-1/2 md:pl-12">
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:scale-105">
                    <h3 className="text-xl font-bold text-white mb-2">Full Stack Engineer</h3>
                    <p className="text-blue-400 mb-2">Bitstrapped - Toronto, Canada (Remote)</p>
                    <p className="text-gray-400 text-sm">Leading full-stack development for enterprise SaaS applications. Achieved 95%+ client satisfaction and 99.9% uptime.</p>
                  </div>
                </div>
              </div>

              {/* 2022 - 2023: Cefalo */}
              <div className={`relative ${visibleElements.has('timeline') ? 'animate-visible-left stagger-1' : 'opacity-0'}`}>
                <div className="flex items-center mb-4">
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-purple-500 rounded-full -ml-2 ring-4 ring-purple-500/20"></div>
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                    <span className="text-2xl font-bold text-purple-400">2022 - 2023</span>
                  </div>
                </div>
                <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:scale-105">
                    <h3 className="text-xl font-bold text-white mb-2">Software Engineer</h3>
                    <p className="text-purple-400 mb-2">Cefalo - Norway (Remote)</p>
                    <p className="text-gray-400 text-sm">Collaborated with Norwegian team handling 100K+ daily requests. Reduced API response times by 35%.</p>
                  </div>
                </div>
              </div>

              {/* 2019 - 2022: Sigma Solutions */}
              <div className={`relative ${visibleElements.has('timeline') ? 'animate-visible-right stagger-2' : 'opacity-0'}`}>
                <div className="flex items-center mb-4">
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-orange-500 rounded-full -ml-2 ring-4 ring-orange-500/20"></div>
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                    <span className="text-2xl font-bold text-orange-400">2019 - 2022</span>
                  </div>
                </div>
                <div className="ml-16 md:ml-auto md:w-1/2 md:pl-12">
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-orange-500 transition-all duration-300 hover:scale-105">
                    <h3 className="text-xl font-bold text-white mb-2">Senior Software Engineer</h3>
                    <p className="text-orange-400 mb-2">Sigma Solutions BD</p>
                    <p className="text-gray-400 text-sm">Built telecom automation processing 10K+ events daily. Reduced incident response by 70%.</p>
                  </div>
                </div>
              </div>

              {/* 2018 - 2019: Romoni */}
              <div className={`relative ${visibleElements.has('timeline') ? 'animate-visible-left stagger-3' : 'opacity-0'}`}>
                <div className="flex items-center mb-4">
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-green-500 rounded-full -ml-2 ring-4 ring-green-500/20"></div>
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                    <span className="text-2xl font-bold text-green-400">2018 - 2019</span>
                  </div>
                </div>
                <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-green-500 transition-all duration-300 hover:scale-105">
                    <h3 className="text-xl font-bold text-white mb-2">Software Engineer</h3>
                    <p className="text-green-400 mb-2">Romoni Platform</p>
                    <p className="text-gray-400 text-sm">First role! Built operations management from scratch for beauty & lifestyle platform.</p>
                  </div>
                </div>
              </div>

              {/* 2018: Graduation */}
              <div className={`relative ${visibleElements.has('timeline') ? 'animate-visible-scale stagger-4' : 'opacity-0'}`}>
                <div className="flex items-center mb-4">
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-yellow-500 rounded-full -ml-2 ring-4 ring-yellow-500/20"></div>
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                    <span className="text-2xl font-bold text-yellow-400">2018</span>
                  </div>
                </div>
                <div className="ml-16 md:ml-auto md:w-1/2 md:pl-12">
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-yellow-500 transition-all duration-300 hover:scale-105">
                    <h3 className="text-xl font-bold text-white mb-2">🎓 B.Sc in Computer Science</h3>
                    <p className="text-yellow-400 mb-2">KUET - Bangladesh</p>
                    <p className="text-gray-400 text-sm">CGPA: 3.64/4.0 - The journey begins!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-black" data-animate>
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
                    <div className="flex-shrink-0 w-16 h-16 bg-white rounded-xl p-3 flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 shadow-lg">
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          {exp.website ? (
                            <a
                              href={exp.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-3xl font-bold mb-2 bg-gradient-to-r ${exp.color} bg-clip-text text-transparent hover:opacity-80 transition-opacity inline-flex items-center gap-2`}
                            >
                              {exp.company}
                              <ExternalLink size={20} className="text-blue-400" />
                            </a>
                          ) : (
                            <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                              {exp.company}
                            </h3>
                          )}
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
      <section id="projects" ref={projectsRef} className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden" data-animate>
        {/* 3D Globe Background */}
        <ProjectsGlobe containerRef={projectsRef} />

        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center ${
            visibleElements.has('projects') ? 'animate-visible-scale' : 'opacity-0'
          }`}>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          {/* Filter & Search UI */}
          <div className={`mb-12 ${visibleElements.has('projects') ? 'animate-visible-up' : 'opacity-0'}`}>
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="🔍 Search projects by name, tech, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedFilter(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedFilter === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50 scale-110'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white hover:scale-105'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-center mt-6 text-gray-400">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => {
              const cardId = `project-${index}`;

              return (
              <div
                key={index}
                className={`group relative cursor-pointer ${
                  visibleElements.has('projects') ? 'animate-visible-up' : 'opacity-0'
                } stagger-${index + 1}`}
                onMouseEnter={() => setHoveredCard(cardId)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedProject(project)}
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

                  <div className="inline-flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-all duration-300 relative z-10 group-hover:gap-4">
                    View Details <ExternalLink size={16} className="transform group-hover:rotate-45 transition-transform" />
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-black overflow-hidden" data-animate>
        {/* 3D Floating Shapes Background */}
        <SkillsShapes containerRef={skillsRef} />

        <div className="container mx-auto max-w-6xl relative z-10">
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
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-gray-800 hover:border-gray-600 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent relative z-10">
                    {category}
                  </h3>

                  <div className="relative z-10">
                    {items.map((skill, index) => (
                      <SkillBar
                        key={index}
                        skill={skill}
                        visible={visibleElements.has('skills')}
                        delay={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Activity Section */}
      <section id="github" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-black" data-animate>
        <div className="container mx-auto max-w-6xl">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center ${
            visibleElements.has('github') ? 'animate-visible-scale' : 'opacity-0'
          }`}>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              GitHub Activity
            </span>
          </h2>

          <div className={`mb-12 ${visibleElements.has('github') ? 'animate-visible-up' : 'opacity-0'}`}>
            {/* GitHub Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-green-500 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-green-400 mb-2">1200+</div>
                <div className="text-gray-400 text-sm">Total Contributions</div>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-blue-400 mb-2">25+</div>
                <div className="text-gray-400 text-sm">Public Repos</div>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-purple-400 mb-2">150+</div>
                <div className="text-gray-400 text-sm">Stars Received</div>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-pink-500 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-pink-400 mb-2">7+</div>
                <div className="text-gray-400 text-sm">Years Coding</div>
              </div>
            </div>

            {/* Contribution Graph */}
            <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-gray-800 overflow-x-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Contribution Activity</h3>
                <a
                  href="https://github.com/TusharJoy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Github size={20} />
                  View on GitHub
                </a>
              </div>

              <div className="flex gap-1 mb-4">
                {contributionData.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((count, dayIndex) => (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`w-3 h-3 rounded-sm ${getContributionColor(count)} hover:ring-2 hover:ring-green-400 transition-all duration-200 cursor-pointer`}
                        title={`${count} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-gray-800" />
                  <div className="w-3 h-3 rounded-sm bg-green-900" />
                  <div className="w-3 h-3 rounded-sm bg-green-700" />
                  <div className="w-3 h-3 rounded-sm bg-green-500" />
                  <div className="w-3 h-3 rounded-sm bg-green-400" />
                </div>
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Popular Repositories */}
          <div className={`${visibleElements.has('github') ? 'animate-visible-up stagger-2' : 'opacity-0'}`}>
            <h3 className="text-2xl font-bold text-white mb-6">Popular Repositories</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="https://github.com/TusharJoy/vue3-drag-drop"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-green-500 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">vue3-drag-drop</h4>
                  <Star className="text-yellow-400" size={20} fill="currentColor" />
                </div>
                <p className="text-gray-400 text-sm mb-4">Vue 3 drag and drop component with zero dependencies</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    Vue
                  </span>
                  <span className="text-gray-500">⭐ 25+</span>
                  <span className="text-gray-500">100+ weekly downloads</span>
                </div>
              </a>

              <a
                href="https://github.com/TusharJoy/vue-plotly"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">vue-plotly</h4>
                  <Star className="text-yellow-400" size={20} fill="currentColor" />
                </div>
                <p className="text-gray-400 text-sm mb-4">Vue 3 wrapper for Plotly.js data visualization</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    Vue
                  </span>
                  <span className="text-gray-500">⭐ 15+</span>
                  <span className="text-gray-500">Data Viz</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900" data-animate>
        <div className="container mx-auto max-w-5xl">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center ${
            visibleElements.has('testimonials') ? 'animate-visible-scale' : 'opacity-0'
          }`}>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              What People Say
            </span>
          </h2>

          <div className={`relative ${visibleElements.has('testimonials') ? 'animate-visible-up' : 'opacity-0'}`}>
            {/* Carousel Container */}
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-800 p-8 md:p-12 overflow-hidden">
              {/* Decorative Quote Icon */}
              <Quote className="absolute top-8 left-8 text-blue-500/20" size={80} />

              {/* Testimonial Content */}
              <div className="relative z-10 min-h-[300px] flex flex-col justify-between">
                <div className="mb-8">
                  {/* Stars Rating */}
                  <div className="flex gap-1 mb-6 justify-center">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={24}
                        className="text-yellow-400"
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-lg md:text-xl text-gray-300 text-center leading-relaxed mb-8 italic">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex flex-col items-center">
                  <div className="text-5xl mb-4">{testimonials[activeTestimonial].image}</div>
                  <h4 className="text-xl font-bold text-white mb-1">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-purple-400 text-sm">
                    {testimonials[activeTestimonial].role}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonials[activeTestimonial].company}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-gray-800/50 hover:bg-gray-700 rounded-full transition-all duration-300 hover:scale-110 z-20"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} className="text-white" />
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-gray-800/50 hover:bg-gray-700 rounded-full transition-all duration-300 hover:scale-110 z-20"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} className="text-white" />
              </button>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeTestimonial
                      ? 'w-12 h-3 bg-gradient-to-r from-blue-500 to-purple-600'
                      : 'w-3 h-3 bg-gray-700 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
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

            <a
              href="https://wa.me/8801303412012"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-green-500 rounded-full font-semibold hover:bg-green-500/20 transition-all duration-300 flex items-center gap-2 hover:scale-110 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/50"
            >
              <MessageCircle size={20} className="transform hover:rotate-12 transition-transform" />
              WhatsApp
            </a>

            <a
              href="/Tushar_Ghosh_Joy_Resume.pdf"
              download="Tushar_Ghosh_Joy_Resume.pdf"
              className="px-8 py-4 border-2 border-green-500 rounded-full font-semibold hover:bg-green-500/20 transition-all duration-300 flex items-center gap-2 hover:scale-110 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/50"
            >
              <FileDown size={20} className="transform hover:-translate-y-1 transition-transform" />
              Download Resume
            </a>
          </div>
          
          <div className={`flex flex-col items-center gap-4 text-gray-400 ${
            visibleElements.has('contact') ? 'animate-visible-fade stagger-2' : 'opacity-0'
          }`}>
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

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-8 left-8 z-50 p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-110 active:scale-95 hover:rotate-180"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun size={24} className="text-white" />
        ) : (
          <Moon size={24} className="text-white" />
        )}
      </button>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 hover:scale-110 active:scale-95 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={24} className="text-white" />
      </button>

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