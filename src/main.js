import './styles.css';

const APK_URL = 'https://drive.google.com/file/d/13MgFiGGuIcEOzO0XF4SViWpOkPuCLFUW/view?usp=drive_link';

const syllabus = {
  9: {
    board: 'CLASS 9 · CBSE (NCERT) & ICSE',
    title: 'Build your base: complete notes, PYQs & chapter quizzes',
    subjects: [
      ['Core', 'Mathematics', '15'], ['Core', 'Science', '15'], ['Core', 'Social Science', '20'],
      ['Core', 'English', '21'], ['Core', 'Hindi', '17'], ['Skill', 'Artificial Intelligence', '7']
    ],
    detail: 'Mathematics — 15 complete chapters. Includes 35 structured board-exam study points per chapter, learning objectives, 5-minute revision cards, and PYQ practice.'
  },
  10: {
    board: 'CLASS 10 · CBSE (NCERT) & ICSE',
    title: 'Board exam ready: complete chapter notes, PYQs & board quizzes',
    subjects: [
      ['Core', 'Mathematics (Standard & Basic)', '15'], ['Core', 'Science (Physics, Chem, Bio)', '16'], ['Core', 'Social Science (History, Geo, Civics, Economics)', '21'],
      ['Core', 'English (First Flight & Footprints)', '19'], ['Core', 'Hindi (Course A & B)', '17'], ['Skill', 'Artificial Intelligence (Code 417)', '7']
    ],
    detail: 'Mathematics (Standard & Basic) — 15 complete chapters. Includes 35 structured board-exam study points per chapter, learning objectives, 5-minute revision cards, and PYQ practice.'
  },
  11: {
    board: 'CLASS 11 · CBSE (NCERT) & ISC',
    title: 'Build subject depth: structured notes, PYQs & practice',
    subjects: [
      ['Core', 'Physics', '15'], ['Core', 'Chemistry', '14'], ['Core', 'Mathematics', '16'],
      ['Core', 'Biology', '22'], ['Core', 'English', '16'], ['Skill', 'Computer Science (Python & SQL)', '13']
    ],
    detail: 'Physics — 15 complete chapters. Every topic is mapped to board outcomes, revision cards, memory tricks, and timed question practice.'
  },
  12: {
    board: 'CLASS 12 · CBSE (NCERT) & ISC',
    title: 'Finish strong: board mapped revision for every subject',
    subjects: [
      ['Core', 'Physics', '14'], ['Core', 'Chemistry', '16'], ['Core', 'Mathematics', '13'],
      ['Core', 'Biology', '13'], ['Core', 'Accountancy', '11'], ['Skill', 'Computer Science (Python & SQL)', '13']
    ],
    detail: 'Physics — 14 complete chapters. Revise with learning objectives, 5-minute cards, mnemonics, and PYQ practice before every board test.'
  }
};

const downloadLinks = document.querySelectorAll('[data-download]');
downloadLinks.forEach((link) => {
  link.setAttribute('href', APK_URL);
  link.addEventListener('click', () => {
    link.classList.add('is-pressed');
    window.setTimeout(() => link.classList.remove('is-pressed'), 220);
  });
});

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
menuButton?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
}));

const grid = document.querySelector('#subject-grid');
const board = document.querySelector('#syllabus-board');
const title = document.querySelector('#syllabus-title');
const detail = document.querySelector('#syllabus-detail-text');
const tabs = document.querySelectorAll('[data-class]');

function renderSyllabus(classNumber) {
  const data = syllabus[classNumber];
  if (!data || !grid) return;
  board.textContent = data.board;
  title.textContent = data.title;
  detail.textContent = data.detail;
  grid.innerHTML = data.subjects.map(([type, subject, count]) => `
    <button class="subject-card" type="button" aria-label="View ${subject} syllabus">
      <span class="subject-type">${type}</span>
      <div><b>${subject}</b><small>Complete board coverage</small></div>
      <span class="chapter-count">${count}<small>chapters</small></span>
    </button>
  `).join('');
  tabs.forEach((tab) => tab.setAttribute('aria-selected', String(tab.dataset.class === String(classNumber))));
}

tabs.forEach((tab) => tab.addEventListener('click', () => renderSyllabus(tab.dataset.class)));
renderSyllabus('10');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const header = document.querySelector('.site-header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 80) header?.classList.add('is-scrolled');
  else header?.classList.remove('is-scrolled');
  lastScroll = current;
}, { passive: true });
