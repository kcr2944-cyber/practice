/* ==========================================================================
   Kim Chaerin Self-Introduction Script
   Pure Vanilla JavaScript (No Framework Dependencies)
   ========================================================================== */

// --- Default Bio Content (Fallback matching 자기소개서.txt) ---
const defaultBioContent = `About Me
안녕하세요. 전북대학교 영어영문학과에 재학중인 3학년 김채린입니다.
저는 영어학과 영문소설과 관련된 전공 수업들을 듣고 있습니다. 최근 영어와디지털리터러시 라는 전공 수업을 통해 생성형 AI를 사용하여 영어와 관련된 앱을 개발하기 위한 기초를 배우고 있습니다. 
이 수업을 통해 앱 개발과 AI 사용에 대해 한걸음 더 다가갈 수 있게 될 것 같아 기대가 매우 큽니다.

Learning Philosophy
저는 무언가를 배울 때 제가 흥미가 있어야 한다고 생각합니다. 
저의 흥미는 새로운 것을 발견하였을 때 어려운 것을 헤쳐나갔을 때에 느껴집니다. 
그렇기 때문에 이 영어와디지털리터러시 수업을 통해 많은 흥미를 느끼고 싶습니다.

Current Focus
최근 저는 영어학습과 여행 앱을 통합한 새로운 앱 개발을 포커스로 맞추어 앱 개발 수업을 듣고 있습니다.
실용영어를 더 실감적이고 쉽게 접해보고 느껴볼 수 있는 신개념 앱을 개발해 낼 예정입니다.`;

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  loadBioText();
  initNavbarScroll();
  initCopyAndDownload();
  initContactForm();
});

// --- Theme Switcher (Dark / Light) ---
function initTheme() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('chaerin_theme') || 'dark';

  setTheme(savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('chaerin_theme', theme);
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-moon';
    } else {
      themeIcon.className = 'fa-solid fa-sun';
    }
  }
}

// --- Dynamic Typing Text Effect ---
function initTypingEffect() {
  const phrases = [
    "전북대학교 영어영문학과 3학년입니다.",
    "생성형 AI 기반 에듀테크 앱을 만들고 있습니다.",
    "여행 & 실용영어 통합 앱 개발에 집중하고 있습니다.",
    "새로운 발견과 문제 극복에서 흥미를 얻습니다."
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById('typingElement');

  if (!typingElement) return;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 35 : 75;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2200; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // Pause before typing new text
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// --- Load 자기소개서.txt dynamically ---
async function loadBioText() {
  const bioContainer = document.getElementById('bioTextContainer');
  if (!bioContainer) return;

  try {
    const response = await fetch('자기소개서.txt');
    if (response.ok) {
      const text = await response.text();
      bioContainer.textContent = text.trim();
    } else {
      bioContainer.textContent = defaultBioContent;
    }
  } catch (error) {
    // If fetching locally via file:// fails, use fallback content
    bioContainer.textContent = defaultBioContent;
  }
}

// --- Copy & Download Actions ---
function initCopyAndDownload() {
  const copyBtn = document.getElementById('copyBioBtn');
  const downloadBtn = document.getElementById('downloadBioBtn');
  const bioContainer = document.getElementById('bioTextContainer');

  if (copyBtn && bioContainer) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = bioContainer.textContent;
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('자기소개서 텍스트가 클립보드에 복사되었습니다!');
      }).catch(() => {
        showToast('텍스트 복사에 실패했습니다.');
      });
    });
  }

  if (downloadBtn && bioContainer) {
    downloadBtn.addEventListener('click', () => {
      const text = bioContainer.textContent;
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '자기소개서.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('자기소개서.txt 파일 다운로드가 시작되었습니다.');
    });
  }
}

// --- Navbar Scroll & Highlight ---
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

// --- Contact Form Submission ---
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value;
    showToast(`감사합니다 ${name}님! 소중한 메시지가 성공적으로 전달되었습니다.`);
    form.reset();
  });
}

// --- Toast Notification Engine ---
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
