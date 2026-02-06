import React, { useState, useEffect } from 'react';
import {
  Code,
  Sparkles,
  TrendingUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Menu,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun
} from 'lucide-react';

function Portfolio() {
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeFAQ, setActiveFAQ] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogFilter, setBlogFilter] = useState('All');

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Your actual data
  const userData = {
    name: "Tushar Ghosh Joy",
    title: "Full Stack Software Engineer",
    tagline: "I Engineer Digital Experiences That Drive Results",
    description: "Full-stack developer and UI/UX strategist specializing in building high-performance web applications that convert users into customers.",
    stats: {
      projectsDelivered: "50+",
      yearsExperience: "8+",
      clientGrowth: "3X",
      activePartners: "12"
    },
    email: "tusharghoshjoy@gmail.com",
    github: "https://github.com/TusharJoy",
    linkedin: "https://linkedin.com/in/tusharghoshjoy",
    resume: "/Tushar_Ghosh_Joy_Resume.pdf",
    calendarBooking: "https://calendar.app.google/DvsZw4vBCzBg4Py69"
  };

  const expertise = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web Development",
      description: "Custom web applications built with Vue.js, React, Next.js, and Node.js. Scalable, performant, and secure by default."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "User-centric interface design that doesn't just look beautiful but solves complex usability challenges."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Product Strategy",
      description: "Bridging the gap between business goals and technical execution through data-driven planning and auditing."
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Audit",
      description: "We start by understanding your business goals, target audience, and current pain points to create a tailored roadmap."
    },
    {
      number: "02",
      title: "Architecture & Design",
      description: "I design scalable system architectures and create intuitive user interfaces that align with your brand and goals."
    },
    {
      number: "03",
      title: "Agile Development",
      description: "Iterative development with regular check-ins, ensuring the product evolves based on your feedback and requirements."
    },
    {
      number: "04",
      title: "Launch & Optimization",
      description: "Smooth deployment with monitoring, performance optimization, and ongoing support to ensure long-term success."
    }
  ];

  const experiences = [
    {
      id: 1,
      company: "BITSTRAPPED",
      logo: "/company-logos/bitstrapped.png",
      position: "Full Stack Software Engineer",
      location: "Toronto, ON (Remote)",
      period: "March 2022 – Present",
      duration: "3+ years",
      website: "https://www.bitstrapped.com/",
      achievements: [
        "Architect enterprise-grade SaaS applications using Vue.js (Nuxt) for frontend and Node.js + Python for backend services",
        "Achieved 95%+ client satisfaction through effective requirements gathering and clear communication in client meetings",
        "Reduced deployment time by 50% through Docker containerization and implementing robust CI/CD pipelines",
        "Improved application performance by 40% through optimization, caching strategies, and code refactoring",
        "Maintained 99.9%+ uptime with sub-200ms API response times while handling millions of requests monthly",
        "Led code reviews and mentored team members on best practices, GitFlow strategies, and architectural decisions"
      ],
      technologies: ["Vue.js", "Nuxt", "Node.js", "Python", "Docker", "GCP", "PostgreSQL", "Redis"]
    },
    {
      id: 2,
      company: "CEFALO AS",
      logo: "/company-logos/cefalo.svg",
      position: "Software Engineer",
      location: "Dhaka, Bangladesh (Remote for Norwegian Team)",
      period: "January 2022 – February 2023",
      duration: "1+ year",
      website: "https://www.cefalo.com/",
      achievements: [
        "Successfully collaborated with dynamic Norwegian team across GMT+1 to GMT+6 timezones on large-scale product development",
        "Developed RESTful APIs handling 100K+ daily requests using Node.js, Express, and PostgreSQL",
        "Reduced API response times by 35% through database query optimization and efficient indexing strategies",
        "Built responsive Single Page Application (SPA) frontend using Vue.js and Vuex with 30% bundle size reduction",
        "Achieved 80%+ code coverage through comprehensive testing and adherence to SOLID principles",
        "Implemented real-time features using WebSockets for live data synchronization"
      ],
      technologies: ["Vue.js", "Vuex", "Node.js", "Express", "PostgreSQL", "WebSockets", "AWS"]
    },
    {
      id: 3,
      company: "SIGMA SOLUTIONS",
      logo: "/company-logos/sigma.png",
      position: "Senior Software Engineer",
      location: "Dhaka, Bangladesh",
      period: "April 2019 – December 2021",
      duration: "2+ years",
      website: "https://sigmasolutions.com.bd/",
      achievements: [
        "Spearheaded automation module development for telecom operations, processing 10,000+ daily events",
        "Reduced incident response time by 70% through intelligent automation bots (Alarm, Site down, Link down bots)",
        "Built omnichannel customer support system with real-time ticketing, improving resolution time by 45%",
        "Integrated multiple platforms (Facebook, WhatsApp, Email) with SLA tracking and automated routing",
        "Developed ETL system for data accumulation into AWS Redshift, processing millions of records daily",
        "Created and maintained internal Laravel packages, improving team efficiency by 40%"
      ],
      technologies: ["Laravel", "Vue.js", "PHP", "MySQL", "Redis", "AWS Redshift", "Python"]
    },
    {
      id: 4,
      company: "ROMONI",
      logo: "/company-logos/romoni.svg",
      position: "Software Engineer",
      location: "Dhaka, Bangladesh",
      period: "February 2018 – March 2019",
      duration: "1+ year",
      website: "https://romoni.com.bd/",
      achievements: [
        "Built operations and customer care modules from scratch for Bangladesh's leading beauty marketplace",
        "Optimized database queries and event handling, improving application response time by 50%",
        "Implemented real-time booking system with payment integration (Authorize.Net, bKash)",
        "Developed features empowering women entrepreneurs and service providers across Bangladesh",
        "Gained full-stack experience from requirement gathering to deployment and maintenance"
      ],
      technologies: ["Laravel", "Vue.js", "MySQL", "JavaScript", "jQuery", "Bootstrap"]
    }
  ];

  const projects = [
    {
      id: 1,
      company: "SMARTCOMM AI",
      companyInitial: "S",
      title: "AI-Powered Communication Platform for Enterprise",
      stats: [
        { label: "Uptime Rate", value: "99.9%" },
        { label: "Daily Requests", value: "100K+" }
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      category: "SaaS",
      tech: ["Vue.js", "Node.js", "AI/ML"],
      link: "https://smartcomm.ai"
    },
    {
      id: 2,
      company: "ROMONI PLATFORM",
      companyInitial: "R",
      title: "E-commerce Platform for Luxury Fashion & Beauty",
      stats: [
        { label: "Active Users", value: "10K+" },
        { label: "Conversion Rate", value: "4.2%" }
      ],
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop",
      category: "E-commerce",
      tech: ["Laravel", "Vue.js", "MySQL"],
      link: "https://romoni.com.bd"
    }
  ];

  const testimonials = [
    {
      name: "Anders Semb Hermansen",
      role: "Leder Systemutvikling",
      company: "adsign (Former Manager at Cefalo)",
      text: "Tushar's ability to translate complex business requirements into elegant technical solutions is unparalleled. His expertise in Vue.js and Node.js has been invaluable to our team.",
      rating: 5
    },
    {
      name: "Abidur Rahman Mallik",
      role: "Founder of Things - FoT",
      company: "Ex-Samsung",
      text: "Reliable, strategic, and an absolute expert in full-stack development. Working with Tushar was the best investment we made for our startup's digital presence this year.",
      rating: 5
    }
  ];

  const blogs = [
    {
      id: 1,
      title: "Building Scalable REST APIs with Node.js and PostgreSQL",
      excerpt: "Learn how to architect production-ready RESTful APIs that handle 100K+ daily requests with optimal performance and security best practices.",
      category: "Backend Development",
      readTime: "8 min read",
      date: "2024",
      tags: ["Node.js", "PostgreSQL", "REST API", "Scalability"],
      content: "At BITSTRAPPED and Cefalo, I've built APIs serving over 100K daily requests. The key is proper database indexing, connection pooling, Redis caching, and implementing rate limiting. Use Express middleware for validation, JWT for auth, and always sanitize inputs to prevent SQL injection."
    },
    {
      id: 2,
      title: "Vue.js Performance Optimization: From Good to Great",
      excerpt: "Advanced techniques to reduce bundle size, improve render performance, and achieve lightning-fast Vue.js applications in production.",
      category: "Frontend Development",
      readTime: "10 min read",
      date: "2024",
      tags: ["Vue.js", "Nuxt", "Performance", "Optimization"],
      content: "Through my work on large-scale SPAs, I've reduced bundle sizes by 30% using lazy loading, code splitting, and tree shaking. Implement virtual scrolling for long lists, use computed properties wisely, and leverage Vuex modules for state management. The vue3-drag-drop package I created has 100+ weekly downloads because it's dependency-free and optimized."
    },
    {
      id: 3,
      title: "Building Omnichannel Customer Support Systems",
      excerpt: "A comprehensive guide to integrating multiple communication channels (WhatsApp, Facebook, Email) into a unified ticketing system.",
      category: "System Design",
      readTime: "12 min read",
      date: "2024",
      tags: ["System Design", "Real-time", "Integration", "Microservices"],
      content: "At Sigma Solutions, I built an omnichannel support platform integrating social platforms with real-time ticketing. The architecture uses WebSockets for live updates, Redis pub/sub for message queuing, and PostgreSQL for persistent storage. Implemented SLA tracking and automated routing to improve ticket resolution by 45%."
    },
    {
      id: 4,
      title: "AWS Redshift ETL Pipelines: Data Warehousing at Scale",
      excerpt: "How to build robust ETL systems for accumulating and processing large datasets in AWS Redshift for analytics and reporting.",
      category: "Data Engineering",
      readTime: "15 min read",
      date: "2024",
      tags: ["AWS", "ETL", "Data Engineering", "Redshift"],
      content: "Developed an ETL system at Sigma Solutions for telecom data accumulation into AWS Redshift. Used Python for data extraction, transformation with pandas, and bulk loading with COPY commands. Implemented incremental loads, data validation, and error handling to ensure data integrity. The system processes millions of records daily."
    },
    {
      id: 5,
      title: "Microservices Architecture: Lessons from Production",
      excerpt: "Real-world insights on designing, deploying, and maintaining microservices with Docker, Redis, and cloud platforms.",
      category: "DevOps & Architecture",
      readTime: "11 min read",
      date: "2024",
      tags: ["Microservices", "Docker", "DevOps", "Cloud"],
      content: "Working across GCP, AWS, and Azure, I've learned that successful microservices require proper service boundaries, API gateways, and centralized logging. Docker containers ensure consistency across environments. Use Redis for caching and session management, implement circuit breakers for fault tolerance, and always monitor with tools like Prometheus."
    },
    {
      id: 6,
      title: "GitFlow in Practice: Code Reviews & Team Collaboration",
      excerpt: "Best practices for implementing GitFlow branching strategies and conducting effective code reviews in distributed teams.",
      category: "Engineering Practices",
      readTime: "7 min read",
      date: "2024",
      tags: ["Git", "Code Review", "Best Practices", "Team Collaboration"],
      content: "Leading code reviews at BITSTRAPPED taught me that effective collaboration requires clear branching strategies. Use feature branches, protect main/develop branches, enforce PR reviews, write meaningful commit messages, and automate testing with CI/CD. Code reviews should focus on logic, security, performance, and maintainability—not just syntax."
    }
  ];

  const faqs = [
    {
      question: "What is your typical project timeline?",
      answer: "Most projects range from 4 to 12 weeks depending on complexity. Small MVP builds usually take 4-6 weeks, while enterprise platforms might take 3+ months. I provide detailed timelines after the discovery phase."
    },
    {
      question: "Do you work with startups?",
      answer: "Absolutely. I love helping startups build their first MVP or scale their existing product. I offer flexible engagement models for high-growth ventures and have experience working with seed to Series B companies."
    },
    {
      question: "What tech stack do you specialize in?",
      answer: "My core stack is Vue.js, React/Next.js, Node.js, Python, PostgreSQL, and cloud platforms like GCP and AWS. I also work with modern tools like Docker, Redis, and CI/CD pipelines for enterprise-grade deployments."
    }
  ];

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const blogCategories = ['All', 'Backend Development', 'Frontend Development', 'System Design', 'Data Engineering', 'DevOps & Architecture', 'Engineering Practices'];

  const filteredBlogs = blogFilter === 'All'
    ? blogs
    : blogs.filter(blog => blog.category === blogFilter);

  return (
    <div className="bg-white dark:bg-[#09090b] text-black dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md border-b border-gray-200 dark:border-[#27272a]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#18181b] dark:bg-white rounded flex items-center justify-center">
              <span className="text-white dark:text-[#18181b] font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold tracking-tight">{userData.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a className="hover:text-gray-500 transition-colors" href="#services">Services</a>
            <a className="hover:text-gray-500 transition-colors" href="#experience">Experience</a>
            <a className="hover:text-gray-500 transition-colors" href="#work">Portfolio</a>
            <a className="hover:text-gray-500 transition-colors" href="#blog">Blog</a>
            <a
              className="px-5 py-2.5 bg-[#18181b] dark:bg-white text-white dark:text-[#18181b] rounded-full hover:opacity-90 transition-opacity"
              href={userData.calendarBooking}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Call
            </a>
          </div>
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="space-y-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 dark:bg-[#27272a] text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400">
              Available for New Projects
            </span>
            <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              I Engineer Digital <span className="text-gray-400">Experiences</span> That Drive Results
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
              {userData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                className="px-8 py-4 bg-[#18181b] dark:bg-white text-white dark:text-[#18181b] font-semibold rounded-lg flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-transform"
                href="#work"
              >
                View Selected Works
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                className="px-8 py-4 border border-gray-200 dark:border-[#27272a] font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-[#18181b] transition-colors"
                href="#process"
              >
                My Approach
              </a>
            </div>
            <div className="pt-8 flex items-center gap-4 text-sm text-gray-500">
              <p>Trusted by world-class teams:</p>
              <div className="flex gap-6 grayscale opacity-60">
                <span className="font-bold">BITSTRAPPED</span>
                <span className="font-bold">CEFALO</span>
                <span className="font-bold">SIGMA</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gray-100 dark:bg-[#18181b] rounded-3xl p-4 aspect-square flex items-center justify-center">
              <img
                alt="Code interface on dark background"
                className="rounded-2xl shadow-2xl object-cover h-full w-full"
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-[#27272a] p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-[#3f3f46] hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Uptime Rate</p>
                  <p className="text-xl font-bold">99.9%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Expertise */}
      <section className="py-24 bg-gray-50 dark:bg-[#18181b]/50" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4">Core Expertise</h2>
            <p className="text-gray-600 dark:text-gray-400">Specialized solutions for modern digital problems.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#18181b] p-10 rounded-3xl border border-gray-100 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#52525b] transition-colors group"
              >
                <div className="w-14 h-14 bg-gray-100 dark:bg-[#27272a] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#18181b] dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-[#18181b] transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 border-t border-gray-100 dark:border-[#27272a]" id="process">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8 leading-tight">
              A Proven Process For<br/>Repeatable Success
            </h2>
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <div key={index} className="border-b border-gray-100 dark:border-[#27272a] pb-4">
                  <button
                    className="flex items-center justify-between w-full py-4 text-left font-bold text-xl group"
                    onClick={() => setActiveProcess(activeProcess === index ? -1 : index)}
                  >
                    <span>{step.number}. {step.title}</span>
                    <ChevronDown
                      className={`w-6 h-6 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-transform ${activeProcess === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {activeProcess === index && (
                    <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-10">
              <a
                href="#contact"
                className="bg-[#18181b] dark:bg-white text-white dark:text-[#18181b] px-8 py-3 rounded-lg font-semibold hover:opacity-90 inline-block"
              >
                Start Your Audit
              </a>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-[#18181b] rounded-[2rem] p-12 relative overflow-hidden">
            <div className="bg-white dark:bg-[#27272a] rounded-2xl shadow-2xl p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#3f3f46]"></div>
                <div className="flex-1 h-3 bg-gray-100 dark:bg-[#3f3f46] rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="h-10 bg-gray-50 dark:bg-[#3f3f46]/50 rounded-lg w-full"></div>
                <div className="h-10 bg-gray-50 dark:bg-[#3f3f46]/50 rounded-lg w-[80%]"></div>
                <div className="h-10 bg-gray-50 dark:bg-[#3f3f46]/50 rounded-lg w-[90%]"></div>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-[#3f3f46] flex justify-end">
                <div className="w-24 h-8 bg-[#18181b] dark:bg-white rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-24 bg-[#18181b] dark:bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <p className="text-5xl font-extrabold mb-2">{userData.stats.projectsDelivered}</p>
            <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">Projects Delivered</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold mb-2">{userData.stats.yearsExperience}</p>
            <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">Years Experience</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold mb-2">{userData.stats.clientGrowth}</p>
            <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">Client Growth</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold mb-2">{userData.stats.activePartners}</p>
            <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">Active Partners</p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-white dark:bg-[#09090b]" id="experience">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">Professional Experience</h2>
            <p className="text-gray-600 dark:text-gray-400">8+ years of building scalable systems for leading companies</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-[#27272a]"></div>

            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative mb-16 last:mb-0">
                <div className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 0 ? '' : 'lg:grid-flow-dense'}`}>
                  {/* Content Side */}
                  <div className={`${index % 2 === 0 ? 'lg:text-right' : 'lg:col-start-2'}`}>
                    <div className="bg-gray-50 dark:bg-[#18181b] p-8 rounded-2xl border border-gray-100 dark:border-[#27272a] hover:border-gray-300 dark:hover:border-[#52525b] transition-all">
                      {/* Company Logo & Info */}
                      <div className={`flex items-center gap-4 mb-6 ${index % 2 === 0 ? 'lg:flex-row-reverse lg:justify-end' : ''}`}>
                        <div className="w-16 h-16 bg-white dark:bg-[#27272a] rounded-xl p-2 flex items-center justify-center border border-gray-200 dark:border-[#3f3f46]">
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className={index % 2 === 0 ? 'lg:text-right' : ''}>
                          <h3 className="text-2xl font-bold">{exp.company}</h3>
                          <p className="text-gray-600 dark:text-gray-400 font-semibold">{exp.position}</p>
                        </div>
                      </div>

                      {/* Period & Location */}
                      <div className={`flex flex-wrap gap-4 mb-6 text-sm ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                        <span className="px-3 py-1 bg-gray-200 dark:bg-[#27272a] rounded-full text-gray-700 dark:text-gray-300 font-medium">
                          {exp.period}
                        </span>
                        <span className="px-3 py-1 bg-gray-200 dark:bg-[#27272a] rounded-full text-gray-700 dark:text-gray-300">
                          {exp.location}
                        </span>
                      </div>

                      {/* Achievements */}
                      <ul className={`space-y-3 mb-6 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                        {exp.achievements.slice(0, 3).map((achievement, i) => (
                          <li key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed flex items-start gap-2">
                            <span className={`text-[#18181b] dark:text-white font-bold ${index % 2 === 0 ? 'order-2' : ''}`}>•</span>
                            <span className="flex-1">{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs bg-white dark:bg-[#27272a] border border-gray-200 dark:border-[#3f3f46] rounded-full text-gray-700 dark:text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Website Link */}
                      <div className={`mt-6 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#18181b] dark:text-white font-semibold hover:gap-3 transition-all"
                        >
                          Visit Website <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className={`hidden lg:block absolute left-1/2 transform -translate-x-1/2 ${index % 2 === 0 ? '' : ''}`}>
                    <div className="w-4 h-4 bg-[#18181b] dark:bg-white rounded-full border-4 border-white dark:border-[#09090b]"></div>
                  </div>

                  {/* Duration Badge - Other Side */}
                  <div className={`hidden lg:flex items-center ${index % 2 === 0 ? 'lg:col-start-2' : ''} ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className="bg-gray-100 dark:bg-[#27272a] px-6 py-3 rounded-full border border-gray-200 dark:border-[#3f3f46]">
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{exp.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-24 bg-gray-50 dark:bg-[#18181b]/50" id="work">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Work</h2>
              <p className="text-gray-600 dark:text-gray-400">A collection of projects that define digital excellence.</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={prevProject}
                className="w-12 h-12 rounded-full border border-gray-200 dark:border-[#27272a] flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#18181b] transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextProject}
                className="w-12 h-12 rounded-full border border-gray-200 dark:border-[#27272a] flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#18181b] transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="space-y-12">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group bg-gray-50 dark:bg-[#18181b] rounded-[2.5rem] overflow-hidden grid lg:grid-cols-2 ${
                  index === currentProjectIndex ? 'block' : 'hidden lg:grid'
                }`}
              >
                <div className={`p-12 lg:p-20 space-y-8 flex flex-col justify-center ${index % 2 === 1 ? 'order-1 lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-gray-200 dark:bg-[#27272a] rounded flex items-center justify-center text-xs font-bold">
                      {project.companyInitial}
                    </span>
                    <span className="font-bold tracking-tight">{project.company}</span>
                  </div>
                  <h3 className="text-4xl font-bold leading-tight">{project.title}</h3>
                  <div className="flex gap-12">
                    {project.stats.map((stat, statIndex) => (
                      <div key={statIndex}>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit px-6 py-2 border-b-2 border-[#18181b] dark:border-white font-bold flex items-center gap-2 group-hover:gap-4 transition-all"
                  >
                    View Project <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
                <div className={`bg-gray-200 dark:bg-[#27272a] p-12 lg:p-0 flex items-center justify-center overflow-hidden ${index % 2 === 1 ? 'order-2 lg:order-1' : ''}`}>
                  <img
                    alt={project.title}
                    className="rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105 object-cover w-full h-full"
                    src={project.image}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-gray-50 dark:bg-[#18181b]/50" id="blog">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">Technical Insights & Articles</h2>
            <p className="text-gray-600 dark:text-gray-400">Sharing knowledge from 8+ years of building scalable systems</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setBlogFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  blogFilter === category
                    ? 'bg-[#18181b] dark:bg-white text-white dark:text-[#18181b]'
                    : 'bg-white dark:bg-[#27272a] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3f3f46] border border-gray-200 dark:border-[#3f3f46]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white dark:bg-[#18181b] rounded-2xl border border-gray-100 dark:border-[#27272a] overflow-hidden group hover:border-gray-300 dark:hover:border-[#52525b] transition-all cursor-pointer"
                onClick={() => setSelectedBlog(blog)}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-[#27272a] rounded-full text-gray-700 dark:text-gray-300 text-xs font-medium">
                      {blog.category}
                    </span>
                    <span className="text-gray-500 text-xs">{blog.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-50 dark:bg-[#27272a]/50 text-gray-600 dark:text-gray-400 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-[#18181b] dark:text-white font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Modal */}
      {selectedBlog && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedBlog(null)}
        >
          <div
            className="bg-white dark:bg-[#18181b] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-[#27272a]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-[#18181b] border-b border-gray-200 dark:border-[#27272a] p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-gray-100 dark:bg-[#27272a] rounded-full text-xs font-medium">
                  {selectedBlog.category}
                </span>
                <span className="text-gray-500 text-sm">{selectedBlog.readTime}</span>
              </div>
              <button
                onClick={() => setSelectedBlog(null)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-[#27272a] flex items-center justify-center transition-colors"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="p-8 space-y-6">
              <h2 className="text-3xl font-bold">{selectedBlog.title}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {selectedBlog.excerpt}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedBlog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm px-3 py-1 bg-gray-100 dark:bg-[#27272a] text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="pt-6 border-t border-gray-200 dark:border-[#27272a]">
                <h3 className="text-xl font-bold mb-4">Key Insights</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {selectedBlog.content}
                </p>
              </div>
              <div className="pt-6 border-t border-gray-200 dark:border-[#27272a] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-[#3f3f46] flex items-center justify-center">
                    <span className="font-bold text-lg">T</span>
                  </div>
                  <div>
                    <p className="font-bold">{userData.name}</p>
                    <p className="text-sm text-gray-500">Full Stack Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-[#09090b]" id="testimonials">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center">Words From Partners</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#18181b] p-10 rounded-3xl border border-gray-100 dark:border-[#27272a]"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-black dark:text-white" />
                  ))}
                </div>
                <p className="text-xl italic text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-[#3f3f46] flex items-center justify-center">
                    <span className="font-bold text-lg">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 dark:border-[#27272a] pb-4">
                <button
                  className="flex items-center justify-between w-full py-4 text-left font-bold text-lg group"
                  onClick={() => setActiveFAQ(activeFAQ === index ? -1 : index)}
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-6 h-6 transition-transform ${activeFAQ === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {activeFAQ === index && (
                  <p className="text-gray-600 dark:text-gray-400 pb-4 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6" id="contact">
        <div className="max-w-7xl mx-auto bg-[#18181b] dark:bg-black rounded-[3rem] p-12 lg:p-24 relative overflow-hidden text-center text-white">
          <div className="relative z-10 space-y-8">
            <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tight">
              Ready to build something<br/>extraordinary?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Let's discuss your project and see how we can work together to achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={userData.calendarBooking}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#18181b] px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Book a Strategy Session
              </a>
              <a
                href={`mailto:${userData.email}`}
                className="border border-[#52525b] bg-[#27272a]/50 backdrop-blur-md px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#27272a] transition-colors"
              >
                Send a Message
              </a>
            </div>
          </div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#27272a] rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#27272a] rounded-full blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white dark:bg-[#09090b] border-t border-gray-100 dark:border-[#27272a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#18181b] dark:bg-white rounded flex items-center justify-center">
                  <span className="text-white dark:text-[#18181b] font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold tracking-tight">{userData.name}</span>
              </div>
              <p className="text-gray-500 max-w-xs leading-relaxed">
                A multidisciplinary developer and designer focusing on high-impact digital products. Built with passion in Bangladesh.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Navigation</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a className="hover:text-black dark:hover:text-white transition-colors" href="#services">Services</a></li>
                <li><a className="hover:text-black dark:hover:text-white transition-colors" href="#experience">Experience</a></li>
                <li><a className="hover:text-black dark:hover:text-white transition-colors" href="#work">Portfolio</a></li>
                <li><a className="hover:text-black dark:hover:text-white transition-colors" href="#blog">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Socials</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li>
                  <a
                    className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
                    href={userData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
                    href={userData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
                    href={`mailto:${userData.email}`}
                  >
                    <Mail className="w-4 h-4" /> Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-gray-100 dark:border-[#27272a] flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
            <p>© 2024 {userData.name}. All rights reserved.</p>
            <div className="flex gap-8 text-gray-500">
              <span>Built with React & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-8 right-8 w-12 h-12 bg-white dark:bg-[#27272a] border border-gray-200 dark:border-[#3f3f46] rounded-full shadow-lg flex items-center justify-center z-50 hover:scale-110 transition-transform"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </button>
    </div>
  );
}

export default Portfolio;
