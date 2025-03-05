import React, { useState, useEffect } from 'react';

// Componente para animação de digitação
const TypewriterText = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
};

// Componente para card de projeto
const ProjectCard = ({ title, description, tags, image, link }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-blue-600 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Ver Projeto
          </a>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente para seção de habilidades
const SkillBar = ({ skill, percentage }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-gray-700 dark:text-gray-300">{skill}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Componente para card de experiência
const ExperienceCard = ({ period, company, position, description }) => {
  return (
    <div className="relative pl-8 pb-12">
      <div className="absolute left-0 top-0 mt-1 h-full w-0.5 bg-blue-200 dark:bg-blue-900"></div>
      <div className="absolute left-0 top-0 mt-1 -ml-2.5 h-5 w-5 rounded-full border-2 border-blue-600 bg-white dark:bg-gray-900"></div>
      <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">{period}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{position}</h3>
      <div className="text-base font-medium text-gray-600 dark:text-gray-400 mb-2">{company}</div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

// Componente para card de serviço
const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
        <span className="text-blue-600 dark:text-blue-400 text-2xl">{icon}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

// Componente para card de depoimento
const TestimonialCard = ({ text, author, position, avatar }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
          <img src={avatar} alt={author} className="h-full w-full object-cover" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white">{author}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{position}</p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 italic">"{text}"</p>
    </div>
  );
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Efeito para detectar preferência de tema escuro
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
    
    // Observador de scroll para destacar seção ativa no menu
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'services', 'testimonials', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Projetos de exemplo
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Plataforma completa de e-commerce com painel administrativo, pagamentos e análises em tempo real.",
      tags: ["React", "Node.js", "MongoDB", "AWS"],
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      link: "#"
    },
    {
      title: "Banking Dashboard",
      description: "Dashboard financeiro com visualização de dados complexos e sistema de autenticação avançado.",
      tags: ["Vue.js", "TypeScript", "GraphQL", "Docker"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "#"
    },
    {
      title: "Healthcare App",
      description: "Aplicativo móvel para monitoramento de saúde com integração a dispositivos IoT e alertas em tempo real.",
      tags: ["React Native", "Firebase", "Redux", "Jest"],
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "#"
    },
    {
      title: "AI Content Generator",
      description: "Ferramenta de geração de conteúdo baseada em IA com processamento de linguagem natural avançado.",
      tags: ["Python", "TensorFlow", "FastAPI", "Next.js"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      link: "#"
    },
  ];

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Header/Navigation */}
        <header className="fixed w-full bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800 z-50 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Dev<span className="text-gray-900 dark:text-white">Portfolio</span>
                </span>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                {['home', 'about', 'skills', 'projects', 'experience', 'services', 'testimonials', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className={`${
                      activeSection === item 
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    } px-1 py-2 text-sm font-medium capitalize transition-colors duration-200`}
                  >
                    {item}
                  </a>
                ))}
              </nav>
              
              <div className="flex items-center space-x-4">
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
                
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['home', 'about', 'skills', 'projects', 'experience', 'services', 'testimonials', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`${
                      activeSection === item 
                        ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    } block px-3 py-2 rounded-md text-base font-medium capitalize transition-colors`}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-1/2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
                  <span className="block text-gray-900 dark:text-white">Olá, eu sou</span>
                  <span className="block text-blue-600 dark:text-blue-400 mt-2">
                    <TypewriterText text="Desenvolvedor Full Stack Senior" speed={80} />
                  </span>
                </h1>
                <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                  Especialista em criar soluções web e mobile de alta performance, 
                  com mais de 10 anos de experiência em desenvolvimento de software.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a 
                    href="#contact" 
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Entre em Contato
                  </a>
                  <a 
                    href="#projects" 
                    className="px-8 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium rounded-lg shadow-md hover:shadow-lg border border-blue-600 dark:border-blue-400 transition-all duration-300"
                  >
                    Ver Projetos
                  </a>
                </div>
                <div className="mt-10 flex items-center space-x-6">
                  <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                    <span className="sr-only">GitHub</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-blue-600 dark:bg-blue-700 bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                      alt="Developer" 
                      className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-full border-4 border-white dark:border-gray-800"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg">
                    <div className="bg-blue-600 text-white h-16 w-16 rounded-full flex items-center justify-center text-xl font-bold">
                      10+
                      <span className="text-xs ml-1">anos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Sobre Mim</h2>
              <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
            </div>
            
            <div className="lg:flex lg:items-center lg:space-x-12">
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80" 
                  alt="Working on laptop" 
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
              </div>
              
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Desenvolvedor Full Stack com foco em soluções escaláveis
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Com mais de uma década de experiência no desenvolvimento de software, 
                  tenho trabalhado com diversas tecnologias e frameworks para criar 
                  aplicações web e mobile de alta performance. Minha especialidade está 
                  em arquitetar soluções escaláveis e resilientes que atendam às 
                  necessidades de negócios em constante evolução.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Ao longo da minha carreira, tive a oportunidade de liderar equipes 
                  técnicas e colaborar em projetos desafiadores para empresas de 
                  diversos segmentos, desde startups até grandes corporações.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Nome:</h4>
                    <p className="text-gray-600 dark:text-gray-300">João Silva</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Email:</h4>
                    <p className="text-gray-600 dark:text-gray-300">contato@joaosilva.dev</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Localização:</h4>
                    <p className="text-gray-600 dark:text-gray-300">São Paulo, Brasil</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Disponibilidade:</h4>
                    <p className="text-gray-600 dark:text-gray-300">Freelance / Contrato</p>
                  </div>
                </div>
                
                <a 
                  href="#" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Download CV
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Minhas Habilidades</h2>
              <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
                Tecnologias e ferramentas que domino após anos de experiência em projetos diversos.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Desenvolvimento Frontend</h3>
                <SkillBar skill="React / React Native" percentage={95} />
                <SkillBar skill="Vue.js" percentage={90} />
                <SkillBar skill="JavaScript / TypeScript" percentage={98} />
                <SkillBar skill="HTML5 / CSS3" percentage={95} />
                <SkillBar skill="Tailwind CSS / SASS" percentage={92} />
                <SkillBar skill="Redux / Zustand" percentage={88} />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Desenvolvimento Backend</h3>
                <SkillBar skill="Node.js / Express" percentage={96} />
                <SkillBar skill="Python / Django / FastAPI" percentage={85} />
                <SkillBar skill="PHP / Laravel" percentage={80} />
                <SkillBar skill="MongoDB / PostgreSQL" percentage={92} />
                <SkillBar skill="GraphQL / REST API" percentage={94} />
                <SkillBar skill="AWS / Docker / CI/CD" percentage={88} />
              </div>
            </div>
            
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
              {['React', 'Vue', 'Node', 'Python', 'AWS', 'Docker', 'TypeScript', 'MongoDB', 'GraphQL', 'Laravel', 'Tailwind', 'Git'].map((tech) => (
                <div key={tech} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-2xl font-bold">{tech.charAt(0)}</span>
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Projetos em Destaque</h2>
              <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
                Conheça alguns dos projetos mais relevantes que desenvolvi ao longo da minha carreira.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <a 
                href="#" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Ver Todos os Projetos
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Experiência Profissional</h2>
              <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
                Minha trajetória profissional em empresas de tecnologia e projetos relevantes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <ExperienceCard 
                period="2020 - Presente"
                company="TechInnovate Solutions"
                position="Tech Lead / Arquiteto de Software"
                description="Lidero uma equipe de 8 desenvolvedores em projetos de grande escala para clientes internacionais. Responsável pela arquitetura de sistemas, definição de padrões técnicos e mentoria da equipe. Implementei práticas de CI/CD que reduziram o tempo de deploy em 70%."
              />
              
              <ExperienceCard 
                period="2017 - 2020"
                company="Global Software Inc."
                position="Desenvolvedor Full Stack Senior"
                description="Desenvolvi e mantive aplicações web e mobile para o setor financeiro, utilizando React, Node.js e AWS. Implementei uma arquitetura de microserviços que melhorou a escalabilidade e reduziu custos de infraestrutura em 40%."
              />
              
              <ExperienceCard 
                period="2014 - 2017"
                company="Digital Solutions"
                position="Desenvolvedor Frontend"
                description="Trabalhei no desenvolvimento de interfaces para aplicações web utilizando Angular e Vue.js. Colaborei com designers e stakeholders para criar experiências de usuário intuitivas e responsivas."
              />
              
              <ExperienceCard 
                period="2012 - 2014"
                company="StartupX"
                position="Desenvolvedor Web"
                description="Participei do desenvolvimento de uma plataforma SaaS para gestão de projetos, utilizando PHP/Laravel e jQuery. Implementei funcionalidades que ajudaram a empresa a crescer sua base de usuários em 200% em 18 meses."
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Serviços Oferecidos</h2>
              <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
                Soluções personalizadas para atender às necessidades específicas do seu negócio.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                icon="💻"
                title="Desenvolvimento Web"
                description="Criação de sites e aplicações web responsivas, modernas e de alta performance utilizando as tecnologias mais recentes do mercado."
              />
              
              <ServiceCard 
                icon="📱"
                title="Desenvolvimento Mobile"
                description="Desenvolvimento de aplicativos nativos e híbridos para iOS e Android, com foco em experiência do usuário e performance."
              />
              
              <ServiceCard 
                icon="🔧"
                title="Arquitetura de Software"
                description="Planejamento e implementação de arquiteturas escaláveis, seguras e de fácil manutenção para sistemas complexos."
              />
              
              <ServiceCard 
                icon="☁️"
                title="DevOps & Cloud"
                description="Configuração e otimização de infraestrutura em nuvem, pipelines de CI/CD e automação de processos de desenvolvimento."
              />
              
              <ServiceCard 
                icon="🔍"
                title="Consultoria Técnica"
                description="Análise e otimização de sistemas existentes, recomendações de tecnologias e estratégias para melhorar a eficiência e reduzir custos."
              />
              
              <ServiceCard 
                icon="🛠️"
                title="Manutenção & Suporte"
                description="Serviços contínuos de manutenção, atualizações de segurança e suporte técnico para garantir o funcionamento ideal das aplicações."
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Depoimentos</h2>
              <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
                O que meus clientes e colegas dizem sobre meu trabalho e colaboração.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard 
                text="João transformou completamente nossa plataforma digital. Sua expertise técnica e capacidade de entender nosso negócio foram fundamentais para o sucesso do projeto."
                author="Ana Martins"
                position="CEO, TechStart"
                avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
              />
              
              <TestimonialCard 
                text="Trabalhei com João em vários projetos e sempre fiquei impressionado com sua capacidade técnica e profissionalismo. Ele entrega consistentemente soluções de alta qualidade dentro do prazo."
                author="Carlos Mendes"
                position="CTO, FinTech Solutions"
                avatar="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
              />
              
              <TestimonialCard 
                text="A capacidade do João de transformar requisitos complexos em soluções elegantes é impressionante. Ele não apenas resolveu nossos problemas técnicos, mas também trouxe ideias inovadoras que melhoraram nosso produto."
                author="Mariana Costa"
                position="Product Manager, E-commerce Global"
                avatar="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=922&q=80"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Entre em Contato</h2>
              <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
                Vamos conversar sobre como posso ajudar no seu próximo projeto.
              </p>
            </div>
            
            <div className="lg:flex lg:items-center lg:space-x-12">
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Envie uma mensagem</h3>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assunto</label>
                      <input 
                        type="text" 
                        id="subject" 
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Assunto da mensagem"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mensagem</label>
                      <textarea 
                        id="message" 
                        rows={5} 
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Sua mensagem aqui..."
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Enviar Mensagem
                    </button>
                  </form>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Informações de Contato</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900 dark:text-white">Telefone</p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">+55 (11) 98765-4321</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900 dark:text-white">Email</p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">contato@joaosilva.dev</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900 dark:text-white">Localização</p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">São Paulo, SP - Brasil</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Me siga nas redes sociais</h4>
                  <div className="flex space-x-5">
                    <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                      <span className="sr-only">GitHub</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1
.505-.207-1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858-.182-.466-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.043-.048-1.363-.058-3.96-.058h-.08c-2.67 0-2.987.01-4.04.058-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041v.08c0 2.597.01 2.917.058 3.96.045.976.207 1.505.344 1.858.182.466.398.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858-.182-.466-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.043-.048-1.363-.058-3.96-.058h-.08c-2.67 0-2.987.01-4.04.058-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041v.08c0 2.597.01 2.917.058 3.96.045.976.207 1.505.344 1.858.182.466.398.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858-.182-.466-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.043-.048-1.363-.058-3.96-.058zM12 7.378a4.622 4.622 0 100 9.244 4.622 4.622 0 000-9.244zM12 15a3 3 0 110-6 3 3 0 010 6z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <span className="text-2xl font-bold text-blue-400">
                  Dev<span className="text-white">Portfolio</span>
                </span>
                <p className="mt-4 text-gray-400">
                  Desenvolvedor Full Stack Senior especializado em criar soluções web e mobile de alta performance.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#home" className="text-gray-400 hover:text-blue-400 transition-colors">Home</a>
                  </li>
                  <li>
                    <a href="#about" className="text-gray-400 hover:text-blue-400 transition-colors">Sobre</a>
                  </li>
                  <li>
                    <a href="#projects" className="text-gray-400 hover:text-blue-400 transition-colors">Projetos</a>
                  </li>
                  <li>
                    <a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contato</a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-gray-400 mb-4">
                  Inscreva-se para receber atualizações sobre novos projetos e artigos técnicos.
                </p>
                <form className="flex">
                  <input 
                    type="email" 
                    placeholder="Seu email" 
                    className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition-colors"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} João Silva. Todos os direitos reservados.
              </p>
              <div className="mt-4 md:mt-0 flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
        
        {/* Scroll to top button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none transition-colors"
          aria-label="Scroll to top"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

