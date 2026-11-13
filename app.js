const projects = {
  nbricks: { title: 'NBricks', label: '01 / Brand identity', description: 'A brand identity for a productivity app, built around an abstract mark and a clean visual language. The presentation brings the system into dimensional applications with a restrained green and blue palette.', disciplines: 'Brand identity<br>Logo design<br>Productivity app', images: ['nbricks-01.webp', 'nbricks-02.webp', 'nbricks-03.webp'], alt: 'NBricks brand identity presentation', url: 'https://www.behance.net/gallery/257312467/NBricks-Productivity-App-Brand-Identity' },
  k7: { title: 'K7 Forged', label: '02 / Art direction & AI campaign', description: 'Automotive art direction that brings together racing culture, engineered details and a bold typographic voice. A campaign combining Photoshop craft and AI-assisted visual development.', disciplines: 'Campaign art direction<br>AI-assisted visuals<br>Automotive', images: ['k7-01.webp', 'k7-02.webp', 'k7-03.webp', 'k7-04.webp'], alt: 'K7 Forged automotive campaign presentation', url: 'https://www.behance.net/gallery/257250905/K7-FORGED-Automotive-Art-Direction-AI-Campaign' },
  vida: { title: 'Vida', label: '03 / Brand identity', description: 'Visual identity and storytelling for an influencer marketing agency. The work explores a bold wordmark and expressive campaign imagery, connecting an iceberg-inspired V with a confident visual presence.', disciplines: 'Brand identity<br>Wordmark design<br>Visual storytelling', images: ['vida-01.webp', 'vida-02.webp', 'vida-03.webp'], alt: 'Vida visual identity presentation', url: 'https://www.behance.net/gallery/199338963/Vida-Brand-Identity' },
  moodboard: { title: 'Less, but considered.', label: '04 / Minimal & clean moodboard', description: 'An exploration of a minimal visual direction, bringing together positioning, composition and photography references. A look at the thinking that sets the tone before production begins.', disciplines: 'Moodboard creation<br>Visual development<br>Photography direction', images: ['moodboard-01.webp', 'moodboard-02.webp', 'moodboard-03.webp'], alt: 'Minimal and clean visual direction moodboard', url: 'https://www.behance.net/gallery/258049243/Minimal-Clean-MoodBoard' },
  brutalist: { title: 'New Era', label: '05 / Brutalist hero section — UI/UX concept', description: 'A hero section concept exploring oversized typography, visual contrast and an editorial approach to the screen. A digital study in hierarchy and a strong first impression.', disciplines: 'UI/UX concept<br>Hero section design<br>Figma', images: ['brutalist-cover.webp'], alt: 'Brutalist hero section design concept', url: 'https://www.behance.net/gallery/231607921/Brutalist-Hero-Section-UIUX-Design' },
  logofolio: { title: 'Marks with meaning.', label: '06 / Logo collection 2023–2024', description: 'A collection of logo designs for different businesses and audiences. From abstract symbols to wordmarks and monograms, each identity starts with a different story.', disciplines: 'Logo design<br>Wordmarks & symbols<br>2023–2024', images: ['logofolio-cover.webp'], alt: 'Collection of logos designed by Anas Mahmoud', url: 'https://www.behance.net/gallery/225253433/LOGOFOLIO-LOGO-COLLECTION-2023-2024' }
};

const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filterButtons.forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  let visible = 0;
  projectCards.forEach(card => {
    card.hidden = selected !== 'all' && card.dataset.category !== selected;
    if (!card.hidden) { animateEntrance(card, (visible % 2) * 70, 20, 520); visible++; }
  });
  document.getElementById('filter-status').textContent = `Showing ${visible} ${visible === 1 ? 'project' : 'projects'}`;
}));

const dialog = document.getElementById('project-dialog');
const content = document.getElementById('dialog-content');
let lastProjectButton = null;
const keys = Object.keys(projects);
function showProject(key) {
  const project = projects[key];
  if (!project) return;
  const nextKey = keys[(keys.indexOf(key) + 1) % keys.length];
  content.innerHTML = `<span class="meta">${project.label}</span><h2 id="dialog-title">${project.title}</h2><div class="dialog-intro"><p class="dialog-description">${project.description}</p><div class="dialog-disciplines">${project.disciplines}</div></div>${project.images.map((file,index) => `<img class="dialog-image" src="assets/${file}" alt="${project.alt} — image ${index + 1}" ${index ? 'loading="lazy"' : ''}>`).join('')}<div class="dialog-bottom"><a class="text-link" href="${project.url}" target="_blank" rel="noopener noreferrer">Full project on Behance <span>↗</span></a><button class="project-next" type="button" data-next="${nextKey}">Next project: ${projects[nextKey].title} ↗</button></div>`;
  if (!dialog.open) {
    dialog.showModal(); document.body.classList.add('dialog-open');
    animateEntrance(dialog, 0, 18, 360);
  } else {
    animateEntrance(content, 0, 12, 300);
  }
  dialog.scrollTop = 0;
  content.querySelector('[data-next]').addEventListener('click', event => showProject(event.currentTarget.dataset.next));
}
document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => { lastProjectButton = button; showProject(button.dataset.open); }));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); lastProjectButton?.focus({ preventScroll: true }); });
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// Motion enhances an already-visible page. No hidden-content dependency on JS or observers.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionToggle = document.querySelector('.motion-toggle');
const activeEntrances = new Map();
let motionPaused = false;
const motionAllowed = () => !motionPreference.matches && !motionPaused;

function animateEntrance(element, delay = 0, distance = 24, duration = 700) {
  activeEntrances.get(element)?.cancel();
  activeEntrances.delete(element);
  if (!motionAllowed() || typeof element.animate !== 'function') return;
  const animation = element.animate([
    { opacity: 0, transform: `translateY(${distance}px)` },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration, delay, easing: 'cubic-bezier(.2,.7,.25,1)', fill: 'backwards' });
  activeEntrances.set(element, animation);
  const release = () => { if (activeEntrances.get(element) === animation) activeEntrances.delete(element); };
  animation.addEventListener('finish', release, { once: true });
  animation.addEventListener('cancel', release, { once: true });
}

function updateMotionState() {
  const running = motionAllowed();
  document.documentElement.dataset.motion = running ? 'running' : 'paused';
  motionToggle.hidden = motionPreference.matches;
  motionToggle.setAttribute('aria-pressed', String(!running));
  motionToggle.setAttribute('aria-label', running ? 'Pause animations' : 'Play animations');
  motionToggle.title = running ? 'Pause animations' : 'Play animations';
  if (!running) {
    activeEntrances.forEach(animation => animation.cancel());
    activeEntrances.clear();
  }
}
motionToggle.addEventListener('click', () => { motionPaused = !motionPaused; updateMotionState(); });
motionPreference.addEventListener('change', updateMotionState);
updateMotionState();

document.querySelectorAll('.hero-type span').forEach((line, index) => animateEntrance(line, index * 110, 38, 950));
animateEntrance(document.querySelector('.hero-portrait'), 140, 22, 1100);
animateEntrance(document.querySelector('.hero-note'), 280, 18, 850);
animateEntrance(document.querySelector('.hero-foot'), 400, 10, 700);

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const stagger = element.matches('.project') ? [...projectCards].indexOf(element) % 2 * 90 : 0;
      animateEntrance(element, stagger);
      revealObserver.unobserve(element);
    });
  }, { threshold: 0, rootMargin: '0px 0px -35px 0px' });
  document.querySelectorAll('.intro-statement, .intro-bottom, .section-heading, .work-title-row, .project, .work-bottom, .about-photo, .about-copy, .services, .experience-layout > div:first-child, .timeline details, .education, .contact-top, .contact-big').forEach(element => revealObserver.observe(element));
}

document.querySelectorAll('.service-list details, .timeline details').forEach(details => {
  details.addEventListener('toggle', () => {
    if (details.open) animateEntrance(details.querySelector('.job-description, p'), 0, 8, 280);
  });
});

// Two identical groups meet at the loop boundary; resizing keeps a steady reading speed.
const marqueeTrack = document.querySelector('.marquee-track');
const marqueeGroup = document.querySelector('.marquee-group');
function updateMarqueeSpeed() {
  marqueeTrack.style.setProperty('--marquee-duration', `${marqueeGroup.getBoundingClientRect().width / 44}s`);
}
updateMarqueeSpeed();
if ('ResizeObserver' in window) new ResizeObserver(updateMarqueeSpeed).observe(marqueeGroup);

// Avoid doing continuous animation work while the strip is outside the viewport.
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    marqueeTrack.classList.toggle('is-offscreen', !entry.isIntersecting);
  }).observe(document.querySelector('.discipline-strip'));
}
