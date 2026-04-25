// ====== CONFIG & SDK ======
const defaultConfig = {
  hero_name: 'Utsav Raj',
  hero_tagline: 'Architecting high-performance web experiences with modern tech stacks and creative engineering.',
  about_text: "I'm a results-driven Full Stack Developer and engineering student dedicated to building scalable digital solutions. With a strong foundation in competitive programming and a deep interest in Web3, I transform complex problems into elegant, user-centric experiences.",
  contact_heading: "Let's Build Something Remarkable",
  github_url: 'https://github.com/UtsavRaj1111',
  linkedin_url: 'https://linkedin.com/in/',
  background_color: '#050510',
  surface_color: 'rgba(255,255,255,0.03)',
  text_color: '#e2e8f0',
  primary_action: '#6366f1',
  secondary_action: '#818cf8',
  font_family: 'Outfit',
  font_size: 16
};

function applyConfig(cfg) {
  const c = { ...defaultConfig, ...cfg };
  const el = (id) => document.getElementById(id);

  if (el('heroName')) el('heroName').textContent = c.hero_name;
  if (el('heroTagline')) el('heroTagline').textContent = c.hero_tagline;
  if (el('aboutText')) el('aboutText').textContent = c.about_text;
  if (el('contactHeading')) el('contactHeading').textContent = c.contact_heading;
  if (el('footerName')) el('footerName').textContent = c.hero_name;
  if (el('navName')) el('navName').textContent = c.hero_name.split(' ').map(w=>w[0]).join('');

  if (el('socialGithub')) el('socialGithub').href = c.github_url;
  if (el('socialLinkedin')) el('socialLinkedin').href = c.linkedin_url;

  // Colors
  document.documentElement.style.setProperty('--bg-deep', c.background_color);
  document.documentElement.style.setProperty('--primary', c.primary_action);
  
  const root = document.querySelector('.app-root');
  if (root) {
    root.style.fontFamily = `${c.font_family}, 'Outfit', sans-serif`;
  }
}

// Check if elementSdk exists before initializing
if (window.elementSdk) {
    window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (cfg) => applyConfig(cfg),
    mapToCapabilities: (cfg) => ({
        recolorables: [
        { get: () => cfg.background_color || defaultConfig.background_color, set: (v) => { cfg.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
        { get: () => cfg.primary_action || defaultConfig.primary_action, set: (v) => { cfg.primary_action = v; window.elementSdk.setConfig({ primary_action: v }); } }
        ],
        borderables: [],
        fontEditable: {
        get: () => cfg.font_family || defaultConfig.font_family,
        set: (v) => { cfg.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
        }
    }),
    mapToEditPanelValues: (cfg) => new Map([
        ['hero_name', cfg.hero_name || defaultConfig.hero_name],
        ['hero_tagline', cfg.hero_tagline || defaultConfig.hero_tagline],
        ['about_text', cfg.about_text || defaultConfig.about_text],
        ['contact_heading', cfg.contact_heading || defaultConfig.contact_heading]
    ])
    });
}

// ====== PARTICLES ======
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [], mouse = { x: -1000, y: -1000 };

  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = Math.min(60, Math.floor(window.innerWidth / 25));
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.2 + 0.5, a: Math.random() * 0.3 + 0.1
    });
  }

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    const glow = document.getElementById('cursorGlow');
    if (glow) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; }
  });

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      // Mouse interaction
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const force = (200 - dist) / 200 * 0.01;
        p.vx += dx * force; p.vy += dy * force;
      }
      p.vx *= 0.98; p.vy *= 0.98;
      p.x += p.vx; p.y += p.vy;
      
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${p.a})`;
      ctx.fill();
    });

    // Connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = dx * dx + dy * dy;
        if (d < 15000) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.05 * (1 - d / 15000)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ====== TYPING ANIMATION ======
(function initTyping() {
  const words = ['AI / Machine Learning', 'Full Stack Development', 'Data Structures & Algorithms', 'Competitive Programming', 'Developer Tools & Automation'];
  let wordIdx = 0, charIdx = 0, deleting = false;
  const el = document.getElementById('typingText');
  if (!el) return;

  function tick() {
    const word = words[wordIdx];
    if (!deleting) {
      el.textContent = word.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === word.length) { setTimeout(() => { deleting = true; tick(); }, 2500); return; }
    } else {
      el.textContent = word.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) { deleting = false; wordIdx = (wordIdx + 1) % words.length; }
    }
    setTimeout(tick, deleting ? 30 : 60);
  }
  tick();
})();

// ====== SKILLS ======
(function initSkills() {
  const skills = [
    { name: 'React', icon: 'react', cat: 'frontend' },
    { name: 'TypeScript', icon: 'ts', cat: 'frontend' },
    { name: 'Tailwind CSS', icon: 'tailwind', cat: 'frontend' },
    { name: 'HTML', icon: 'html', cat: 'frontend' },
    { name: 'JavaScript', icon: 'js', cat: 'frontend' },
    { name: 'Node.js', icon: 'nodejs', cat: 'backend' },
    { name: 'Python', icon: 'python', cat: 'backend' },
    { name: 'Django', icon: 'django', cat: 'backend' },
    { name: 'FastAPI', icon: 'fastapi', cat: 'backend' },
    { name: 'Flask', icon: 'flask', cat: 'backend' },
    { name: 'Streamlit', icon: 'https://cdn.simpleicons.org/streamlit', cat: 'backend', isUrl: true },
    { name: 'SQL', icon: 'mysql', cat: 'database' },
    { name: 'MongoDB', icon: 'mongodb', cat: 'database' },
    { name: 'Git', icon: 'git', cat: 'tools' },
    { name: 'GitHub', icon: 'github', cat: 'tools' },
    { name: 'GitLab', icon: 'gitlab', cat: 'tools' },
  ];

  skills.forEach((s, i) => {
    const grid = document.getElementById(`${s.cat}Grid`);
    if (!grid) return;
    
    const d = document.createElement('div');
    d.className = `skill-item glass p-8 text-center reveal visible group hover:border-indigo-500/50 transition-all duration-500`;
    const iconUrl = s.isUrl ? s.icon : `https://skillicons.dev/icons?i=${s.icon}`;
    d.innerHTML = `
      <div class="w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <img src="${iconUrl}" alt="${s.name}" class="w-full h-full object-contain">
      </div>
      <p class="font-bold text-sm text-white tracking-tight group-hover:text-indigo-400 transition-colors">${s.name}</p>
    `;
    grid.appendChild(d);
  });
})();

// ====== PROJECTS (GitHub fetch) ======
(function initProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  const loading = document.getElementById('projectsLoading');
  const colors = { JavaScript: '#f7df1e', Python: '#3572A5', TypeScript: '#3178c6', HTML: '#e34c26', CSS: '#563d7c', 'C++': '#f34b7d', 'Jupyter Notebook': '#DA5B0B' };
  
  // Specific projects to feature with fallback data
  const featured = [
    { name: 'PrepWise', id: 'prepwise', tag: 'Interview Prep', logo: '/static/images/prepwise-logo.png', desc: 'AI-powered platform for structured interview preparation and data-driven mock coaching.', lang: 'Python', stars: 0, url: 'https://github.com/UtsavRaj1111/prepwise' },
    { name: 'CodeSync', id: 'codesync', tag: 'Collab IDE', logo: '/static/images/codesync-logo.png', desc: 'Real-time collaborative engineering environment with AI-generated progress insights.', lang: 'JavaScript', stars: 0, url: 'https://github.com/UtsavRaj1111/codesync' },
    { name: 'ClauseCraft', id: 'summarizer', tag: 'Legal NLP', logo: '/static/images/clausecraft-logo.png', desc: 'ClauseCraft AI is an NLP-powered legal assistant designed to automatically analyze rental agreements and identify risks.', lang: 'Python', stars: 0, url: 'https://github.com/UtsavRaj1111/nlp-rental-summarizer' },
    { name: 'CodeMate', id: 'codemate', tag: 'AI Assistant', logo: '/static/images/codemate-logo.png', desc: 'Intelligent AI coding assistant that integrates with IDEs for automated debugging.', lang: 'Python', stars: 0, url: 'https://github.com/UtsavRaj1111/codemate' }
  ];

  function renderProjects(projects) {
    if (loading) loading.classList.add('hidden');
    grid.innerHTML = '';
    
    projects.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = `tilt-card glass p-10 glow-border reveal visible flex flex-col group h-full`;
        card.style.transitionDelay = `${i * 100}ms`;
        
        const logoHtml = p.logo 
            ? `<img src="${p.logo}" alt="${p.name} Logo" class="w-12 h-12 rounded-xl object-cover shadow-lg group-hover:scale-110 transition-transform duration-500">`
            : `<div class="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                <i data-lucide="folder" class="w-6 h-6"></i>
               </div>`;

        card.innerHTML = `
          <div class="flex items-start justify-between mb-8">
            ${logoHtml}
            <div class="flex items-center gap-3">
                <span class="text-[9px] font-mono py-1 px-3 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-widest">${p.tag || 'Repo'}</span>
                <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="text-slate-500 hover:text-white transition-colors" aria-label="View Project">
                  <i data-lucide="external-link" class="w-5 h-5"></i>
                </a>
            </div>
          </div>
          <h3 class="font-black text-white mb-4 text-xl tracking-tight group-hover:text-indigo-400 transition-colors">${p.name}</h3>
          <p class="text-sm text-slate-400 flex-1 mb-10 leading-relaxed font-medium">${p.desc}</p>
          <div class="flex items-center justify-between pt-8 border-t border-white/5">
            <div class="flex items-center gap-4 text-[10px] text-slate-500 font-mono uppercase tracking-widest font-bold">
                <span class="flex items-center gap-2"><span class="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.4)]" style="background:${colors[p.lang] || '#6366f1'}"></span>${p.lang}</span>
            </div>
            <div class="text-indigo-500/40 group-hover:text-indigo-400 transition-colors">
                <i data-lucide="chevron-right" class="w-5 h-5"></i>
            </div>
          </div>
        `;

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });

        grid.appendChild(card);
    });

    // Add "See more on GitHub" card
    const moreCard = document.createElement('a');
    moreCard.href = 'https://github.com/UtsavRaj1111';
    moreCard.target = '_blank';
    moreCard.className = 'glass p-8 glow-border reveal visible flex flex-col items-center justify-center gap-4 group border-dashed border-indigo-500/30 hover:border-indigo-500 transition-all';
    moreCard.innerHTML = `
        <div class="w-12 h-12 rounded-full bg-indigo-500/10 flex-center text-indigo-400 group-hover:scale-110 transition-transform">
            <i data-lucide="github" class="w-6 h-6"></i>
        </div>
        <div class="text-center">
            <p class="text-white font-bold text-sm tracking-tight">View All Projects</p>
            <p class="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">30+ Repositories</p>
        </div>
    `;
    grid.appendChild(moreCard);
    if (window.lucide) lucide.createIcons();
  }

  // Attempt live fetch
  fetch('https://api.github.com/users/UtsavRaj1111/repos?per_page=100')
    .then(r => r.json())
    .then(repos => {
      if (!Array.isArray(repos)) throw new Error('Invalid response');
      
      const merged = featured.map(f => {
        const live = repos.find(r => r.name.toLowerCase().includes(f.id));
        if (live) {
            return {
                ...f,
                desc: live.description || f.desc,
                lang: f.id === 'prepwise' ? 'Python' : (live.language || f.lang),
                stars: live.stargazers_count,
                url: live.html_url
            };
        }
        return f;
      });
      renderProjects(merged);
    })
    .catch(() => {
      // Use pure fallbacks if fetch fails
      renderProjects(featured);
    });
})();

// ====== TIMELINE ======
(function initTimeline() {
  const items = [
    { year: '2023', title: 'Getting Started', desc: 'Built core programming skills in C++ and Python, with a focus on problem-solving and algorithms.' },
    { year: '2024', title: 'Expanding into Web', desc: 'Developed full-stack applications and gained experience in modern web technologies and system design.' },
    { year: '2025', title: 'AI Meets Development', desc: 'Created AI-powered tools and integrated machine learning into real-world applications.' },
    { year: '2026', title: 'Scaling Impact', desc: 'Working on scalable systems, advanced AI solutions, and meaningful real-world projects.' },
  ];
  const container = document.getElementById('timelineItems');
  if (!container) return;
  items.forEach((item, i) => {
    const isEven = i % 2 === 0;
    const d = document.createElement('div');
    d.className = `relative md:flex items-center justify-between w-full reveal stagger-${i + 1}`;
    d.innerHTML = `
      <div class="hidden md:block w-[45%] ${isEven ? 'order-1' : 'order-3'}"></div>
      <div class="absolute left-0 md:left-1/2 top-0 bottom-0 flex items-center justify-center md:-translate-x-1/2 z-10 order-2">
        <div class="timeline-node"></div>
      </div>
      <div class="md:w-[45%] ${isEven ? 'order-3 md:pl-12' : 'order-1 md:pr-12 md:text-right'} pb-12 md:pb-0">
        <div class="glass p-8 glow-border group hover:bg-white/[0.04] transition-all">
          <span class="font-mono text-xs text-indigo-400 tracking-[0.3em] uppercase mb-2 block">${item.year}</span>
          <h3 class="font-black text-white mt-1 mb-3 text-lg tracking-tight group-hover:text-indigo-400 transition-colors">${item.title}</h3>
          <p class="text-sm text-slate-400 leading-relaxed">${item.desc}</p>
        </div>
      </div>
    `;
    container.appendChild(d);
  });
})();

// ====== COUNT UP ANIMATION ======
function animateCounters() {
  document.querySelectorAll('.count-up').forEach(el => {
    if (el.dataset.animated) return;
    const target = parseInt(el.dataset.target);
    const duration = 2500;
    const start = performance.now();
    el.dataset.animated = '1';
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // Quartic ease out
      el.textContent = Math.floor(eased * target) + (target > 0 ? '+' : '');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// ====== SCROLL REVEAL ======
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      if (e.target.querySelector('.count-up') || e.target.id === 'projects') {
        animateCounters();
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ====== MOBILE MENU ======
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const menu = document.getElementById('mobileMenu');
        if (menu) menu.classList.toggle('hidden');
    });
}

document.querySelectorAll('#mobileMenu a').forEach(a => {
  a.addEventListener('click', () => {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.add('hidden');
  });
});

// ====== CONTACT FORM (Backend Connected) ======
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = document.getElementById('formMsg');
        const btn = document.getElementById('sendBtnText');
        const originalBtnText = btn.textContent;
        
        const formData = {
            name: document.getElementById('cf-name').value,
            email: document.getElementById('cf-email').value,
            message: document.getElementById('cf-msg').value
        };

        btn.textContent = 'Transmitting...';
        btn.parentElement.disabled = true;

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                msg.className = 'text-center text-xs font-mono py-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-4';
                msg.textContent = 'SYSTEM: Message received. Response expected within 24h.';
                contactForm.reset();
            } else {
                msg.className = 'text-center text-xs font-mono py-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 mt-4';
                msg.textContent = 'ERROR: Transmission failure. Please check inputs.';
            }
        } catch (error) {
            msg.className = 'text-center text-xs font-mono py-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 mt-4';
            msg.textContent = 'ERROR: Network uplink lost.';
        } finally {
            btn.textContent = originalBtnText;
            btn.parentElement.disabled = false;
            msg.classList.remove('hidden');
            setTimeout(() => msg.classList.add('hidden'), 5000);
        }
    });
}

// ====== LOADING SCREEN ======
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.classList.add('hidden'), 500);
    }, 1000);
  }
});

// ====== INIT LUCIDE ======
if (window.lucide) {
    lucide.createIcons();
}
