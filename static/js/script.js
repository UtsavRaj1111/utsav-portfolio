// ====== COUNT UP ======
function animateCounters() {
  document.querySelectorAll('.count-up').forEach(el => {
    if (el.dataset.animated) return;
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();
    el.dataset.animated = '1';
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// ====== OBSERVERS ======
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      if (e.target.querySelector('.count-up')) animateCounters();
    }
  });
}, { threshold: 0.2 });

// ====== CONFIG & SDK ======
const defaultConfig = {
  hero_name: 'Utsav Raj',
  hero_tagline: 'Architecting high-performance web experiences with modern tech stacks and creative engineering.',
  about_text: "I'm a results-driven Full Stack Developer and engineering student dedicated to building scalable digital solutions. With a strong foundation in competitive programming and a deep interest in Web3, I transform complex problems into elegant, user-centric experiences.",
  contact_heading: "Let's Build Something Remarkable",
  github_url: 'https://github.com/UtsavRaj1111',
  linkedin_url: 'https://www.linkedin.com/in/utsav-raj-pratik-77120a34a/',
  background_color: '#020205',
  surface_color: 'rgba(255,255,255,0.02)',
  text_color: '#f8fafc',
  primary_action: '#6366f1',
  secondary_action: '#a855f7',
  font_family: 'Outfit',
  font_size: 16
};

// ====== NAV SCROLL EFFECT ======
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled', 'glass-strong');
    } else {
        nav.classList.remove('scrolled', 'glass-strong');
    }
});

// ====== PARTICLES ======
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [], mouse = { x: -1000, y: -1000 };

  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = Math.min(40, Math.floor(window.innerWidth / 40));
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.5 + 0.5, 
      a: Math.random() * 0.2 + 0.05
    });
  }

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    const glow = document.getElementById('cursorGlow');
    if (glow) {
        glow.style.left = e.clientX + 'px'; 
        glow.style.top = e.clientY + 'px'; 
    }
  });

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      // Subtle mouse interaction
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const force = (150 - dist) / 150 * 0.005;
        p.vx += dx * force; p.vy += dy * force;
      }
      p.vx *= 0.99; p.vy *= 0.99;
      p.x += p.vx; p.y += p.vy;
      
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${p.a})`;
      ctx.fill();
    });

    // Subtler connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = dx * dx + dy * dy;
        if (d < 20000) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.03 * (1 - d / 20000)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ====== SKILLS ======
(function initSkills() {
  const skills = [
    { name: 'React', icon: 'react', cat: 'frontend' },
    { name: 'JavaScript', icon: 'js', cat: 'frontend' },
    { name: 'HTML', icon: 'html', cat: 'frontend' },
    { name: 'Tailwind', icon: 'tailwind', cat: 'frontend' },
    { name: 'Node.js', icon: 'nodejs', cat: 'backend' },
    { name: 'Python', icon: 'python', cat: 'backend' },
    { name: 'Flask', icon: 'flask', cat: 'backend' },
    { name: 'Streamlit', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg', isUrl: true, cat: 'backend' },
    { name: 'Java', icon: 'java', cat: 'backend' },
    { name: 'Django', icon: 'django', cat: 'backend' },
    { name: 'FastAPI', icon: 'fastapi', cat: 'backend' },
    { name: 'TensorFlow', icon: 'tensorflow', cat: 'ai' },
    { name: 'Scikit-Learn', icon: 'sklearn', cat: 'ai' },
    { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', isUrl: true, cat: 'ai' },
    { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', isUrl: true, cat: 'ai' },
    { name: 'NLP / LLM', icon: 'bot', isLucide: true, cat: 'ai' },
    { name: 'PostgreSQL', icon: 'postgres', cat: 'database' },
    { name: 'SQL', icon: 'mysql', cat: 'database' },
    { name: 'MongoDB', icon: 'mongodb', cat: 'database' },
    { name: 'Power BI', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Power_bi_logo_black.svg', isUrl: true, cat: 'viz' },
    { name: 'Tableau', icon: 'https://cdn.worldvectorlogo.com/logos/tableau-software.svg', isUrl: true, cat: 'viz' },
    { name: 'Docker', icon: 'docker', cat: 'tools' },
    { name: 'AWS', icon: 'aws', cat: 'tools' },
    { name: 'GitHub', icon: 'github', cat: 'tools' },
    { name: 'Git', icon: 'git', cat: 'tools' },
  ];

  const categories = {
    frontend: 'Frontend Systems',
    backend: 'Backend & Logic',
    ai: 'AI & Machine Learning',
    database: 'Data Architecture',
    viz: 'Data Visualization',
    tools: 'DevOps & Workflow'
  };

  Object.keys(categories).forEach(cat => {
    const grid = document.getElementById(`${cat}Grid`);
    if (!grid) return;
    
    // Add category title
    const title = document.createElement('div');
    title.className = 'col-span-full skills-category-title flex items-center gap-4';
    title.innerHTML = `
        <span class="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.4em] font-bold">${categories[cat]}</span>
        <div class="h-[1px] flex-1 bg-white/5"></div>
    `;
    grid.before(title);

    // Update grid classes for centering and spacing
    grid.className = `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 reveal justify-center items-center mx-auto max-w-4xl`;

    skills.filter(s => s.cat === cat).forEach((s, i) => {
      const d = document.createElement('div');
      d.className = `skill-badge glass group reveal stagger-${(i % 4) + 1}`;
      
      let iconHtml = '';
      if (s.isLucide) {
        iconHtml = `<i data-lucide="${s.icon}" class="w-8 h-8 text-indigo-400 group-hover:text-white transition-colors"></i>`;
      } else {
        const iconUrl = s.isUrl ? s.icon : `https://skillicons.dev/icons?i=${s.icon}`;
        iconHtml = `<img src="${iconUrl}" alt="${s.name}" class="w-full h-full object-contain transition-all duration-500">`;
      }

      d.innerHTML = `
        <div class="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          ${iconHtml}
        </div>
        <p class="font-bold text-[10px] text-slate-400 tracking-widest uppercase group-hover:text-white transition-colors">${s.name}</p>
      `;
      grid.appendChild(d);
      if (observer) observer.observe(d);
    });
  });
})();

// ====== PROJECTS ======
(function initProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  const loading = document.getElementById('projectsLoading');
  const colors = { JavaScript: '#f7df1e', Python: '#3572A5', TypeScript: '#3178c6', HTML: '#e34c26', CSS: '#563d7c', 'C++': '#f34b7d', 'Jupyter Notebook': '#DA5B0B' };
  
  const featured = [
    { name: 'PrepWise AI', id: 'prepwise', logo: '/static/images/prepwise-logo.png', tag: 'Interview Prep', desc: 'AI platform for interview preparation and mock coaching.', lang: 'Python', url: 'https://github.com/UtsavRaj1111/prepwise' },
    { name: 'CodeSync IDE', id: 'codesync', logo: '/static/images/codesync-logo.png', tag: 'Collab IDE', desc: 'Real-time collaborative code editor with AI insights.', lang: 'JavaScript', url: 'https://github.com/UtsavRaj1111/codesync' },
    { name: 'ClauseCraft', id: 'summarizer', logo: '/static/images/clausecraft-logo.png', tag: 'Legal NLP', desc: 'NLP assistant for analyzing rental agreements automatically.', lang: 'Python', url: 'https://github.com/UtsavRaj1111/nlp-rental-summarizer' },
    { name: 'CodeMate', id: 'codemate', logo: '/static/images/codemate-logo.png', tag: 'AI Coding', desc: 'AI-powered coding assistant for developers.', lang: 'Python', url: 'https://github.com/UtsavRaj1111/codemate' },
    { name: 'View All Projects', id: 'view-all', url: 'https://github.com/UtsavRaj1111?tab=repositories' }
  ];

  function renderProjects(projects) {
    if (loading) loading.classList.add('hidden');
    grid.innerHTML = '';
    
    projects.forEach((p, i) => {
        const card = document.createElement('div');
        const isCTA = p.id === 'view-all';
        card.className = `project-card glass group reveal stagger-${(i % 3) + 1} ${isCTA ? 'project-cta' : ''}`;
        
        if (isCTA) {
          card.innerHTML = `
            <div class="cta-icon">
              <i data-lucide="github" class="w-8 h-8"></i>
            </div>
            <h3 class="font-black text-white mb-2 text-2xl tracking-tighter">View All Projects</h3>
            <p class="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">30+ Repositories</p>
            <a href="${p.url}" target="_blank" class="absolute inset-0 z-10"></a>
          `;
        } else {
          const logoHtml = p.logo 
            ? `<img src="${p.logo}" alt="${p.name}" class="w-12 h-12 rounded-2xl object-cover group-hover:scale-110 transition-all duration-500">`
            : `<div class="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                  <i data-lucide="layout" class="w-6 h-6"></i>
               </div>`;
          
          card.innerHTML = `
            <div class="flex items-start justify-between mb-10">
              ${logoHtml}
              <span class="text-[8px] font-mono py-1 px-3 rounded-full bg-white/5 text-slate-500 border border-white/5 uppercase tracking-widest group-hover:text-indigo-300 group-hover:border-indigo-500/20 transition-all">${p.tag || 'Repository'}</span>
            </div>
            <h3 class="font-black text-white mb-4 text-2xl tracking-tighter group-hover:text-indigo-400 transition-colors">${p.name}</h3>
            <p class="text-sm text-slate-500 flex-1 mb-12 leading-relaxed font-medium">${p.desc}</p>
            <div class="flex items-center justify-between pt-8 border-t border-white/5">
              <div class="flex items-center gap-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  <span class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full" style="background:${colors[p.lang] || '#6366f1'}"></span>${p.lang}</span>
              </div>
              <a href="${p.url}" target="_blank" class="text-slate-600 hover:text-white transition-colors">
                  <i data-lucide="github" class="w-5 h-5"></i>
              </a>
            </div>
          `;
        }

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });

        grid.appendChild(card);
        if (observer) observer.observe(card);
    });
    if (window.lucide) lucide.createIcons();
  }

  // Attempt live fetch
  fetch('https://api.github.com/users/UtsavRaj1111/repos?per_page=100&sort=updated')
    .then(r => r.json())
    .then(repos => {
      if (!Array.isArray(repos)) throw new Error();
      const merged = featured.map(f => {
        const live = repos.find(r => r.name.toLowerCase().includes(f.id));
        return live ? { ...f, desc: live.description || f.desc, lang: live.language || f.lang, url: live.html_url } : f;
      });
      renderProjects(merged);
    })
    .catch(() => renderProjects(featured));
})();

// Growth section is now static in HTML

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ====== CONTACT FORM ======
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = document.getElementById('formMsg');
        const btn = document.getElementById('sendBtnText');
        
        btn.textContent = 'Transmitting...';
        btn.parentElement.disabled = true;

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: document.getElementById('cf-name').value,
                    email: document.getElementById('cf-email').value,
                    message: document.getElementById('cf-msg').value
                })
            });

            if (response.ok) {
                msg.className = 'text-center text-[10px] font-mono py-4 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-6 block';
                msg.textContent = 'SYSTEM: Transmission successful. Link established.';
                contactForm.reset();
            } else {
                throw new Error();
            }
        } catch (error) {
            msg.className = 'text-center text-[10px] font-mono py-4 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 mt-6 block';
            msg.textContent = 'ERROR: Uplink failure. Please retry.';
        } finally {
            btn.textContent = 'Dispatch Transmission';
            btn.parentElement.disabled = false;
            setTimeout(() => msg.classList.add('hidden'), 5000);
        }
    });
}

// ====== LOADING ======
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 800);
    }, 1500);
  }
});

// ====== MOBILE MENU ======
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// ====== INIT ICONS ======
if (window.lucide) lucide.createIcons();
