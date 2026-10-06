/**
 * Gayathri B (Malavika) & Hareesh — Royal Kerala Bride-Side Wedding Invitation
 * Single Source of Truth: assets/invitation-card.jpg
 * Pure Vanilla JavaScript: Audio Engine, Scratch Card, Petal Physics, Lightbox, Countdown & Share
 */

import { weddingConfig } from './weddingConfig.js';

// Global state
let isOpened = false;
let scratchCleared = false;
let currentLightboxIndex = 0;

/* ==========================================================================
   AUDIO ENGINE
   ========================================================================== */
function getAudioElement() {
  let el = document.getElementById('wedding-audio');
  if (!el) {
    el = document.createElement('audio');
    el.id = 'wedding-audio';
    el.src = weddingConfig.assets.music;
    el.loop = true;
    el.preload = 'auto';
    el.playsInline = true;
    document.body.appendChild(el);
  }
  return el;
}

function updateMusicUI(playing) {
  const musicBtn = document.getElementById('music-toggle-btn');
  if (musicBtn) {
    if (playing) {
      musicBtn.classList.add('music-playing');
      musicBtn.setAttribute('aria-label', 'Pause Wedding Music');
      musicBtn.title = 'Pause Wedding Music';
    } else {
      musicBtn.classList.remove('music-playing');
      musicBtn.setAttribute('aria-label', 'Play Wedding Music');
      musicBtn.title = 'Play Wedding Music';
    }
  }
}

function playAudioDirectly() {
  const audioEl = getAudioElement();
  sessionStorage.removeItem('wedding_music_muted');
  audioEl.volume = 0.85;

  const promise = audioEl.play();
  if (promise !== undefined) {
    promise.then(() => {
      updateMusicUI(true);
      console.log('Wedding song playing successfully.');
    }).catch(err => {
      console.warn('Playback blocked by browser policy:', err);
      updateMusicUI(false);
    });
  }
}

function toggleMusic() {
  const audioEl = getAudioElement();
  if (!audioEl.paused) {
    audioEl.pause();
    sessionStorage.setItem('wedding_music_muted', 'true');
    updateMusicUI(false);
  } else {
    playAudioDirectly();
  }
}

/* ==========================================================================
   OPENING COVER TRANSITION
   ========================================================================== */
function setupOpeningCover() {
  const openingCover = document.getElementById('opening-cover');
  const waxSealBtn = document.getElementById('wax-seal-btn');
  const envelopeInteractive = document.getElementById('envelope-interactive');
  const audioEl = getAudioElement();

  audioEl.addEventListener('play', () => updateMusicUI(true));
  audioEl.addEventListener('playing', () => updateMusicUI(true));
  audioEl.addEventListener('pause', () => updateMusicUI(false));

  if (!openingCover) return;

  function handleOpen(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    if (isOpened) return;
    isOpened = true;

    // Start background music within user gesture
    playAudioDirectly();

    // Trigger celebration petal burst
    triggerCelebrationBurst(75);

    // Update hint text during opening
    const hintText = document.getElementById('hint-text');
    if (hintText) {
      hintText.innerHTML = 'Opening Invitation &bull; വിവാഹക്ഷണപത്രിക';
    }

    // Stage 1: Break wax seal, unfold flap in 3D, and glide invitation card upward
    openingCover.classList.add('is-opening');

    const revealMainPortal = () => {
      openingCover.classList.add('is-opened');
      document.body.classList.remove('invitation-locked');
      setTimeout(() => {
        openingCover.style.display = 'none';
      }, 850);
    };

    // Stage 2: Let guest admire the rising card, then seamlessly transition
    const transitionTimer = setTimeout(revealMainPortal, 2500);

    // If guest taps anywhere again while card is displayed, reveal main page immediately
    const tapToContinue = (evt) => {
      if (evt && evt.stopPropagation) evt.stopPropagation();
      clearTimeout(transitionTimer);
      revealMainPortal();
    };
    setTimeout(() => {
      openingCover.addEventListener('click', tapToContinue, { once: true });
      openingCover.addEventListener('touchend', tapToContinue, { once: true });
    }, 450);
  }

  // Support ?opened=1 query parameter for automated testing & direct preview
  if (window.location.search.includes('opened=1')) {
    isOpened = true;
    document.body.classList.remove('invitation-locked');
    openingCover.style.display = 'none';
    
    const playOnFirstInteraction = () => {
      playAudioDirectly();
      window.removeEventListener('click', playOnFirstInteraction);
      window.removeEventListener('touchstart', playOnFirstInteraction);
    };
    window.addEventListener('click', playOnFirstInteraction, { once: true });
    window.addEventListener('touchstart', playOnFirstInteraction, { once: true });
    return;
  }

  document.body.classList.add('invitation-locked');

  if (waxSealBtn) {
    waxSealBtn.addEventListener('click', handleOpen);
  }

  if (envelopeInteractive) {
    envelopeInteractive.addEventListener('click', handleOpen);
    envelopeInteractive.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleOpen(e);
      }
    });
  }
}

/* ==========================================================================
   FLOATING PETALS CANVAS BACKGROUND (Kerala Jasmine & Soft Rose)
   ========================================================================== */
function setupBackgroundPetals() {
  const canvas = document.getElementById('background-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petalsCount = window.innerWidth < 600 ? 12 : 18;
  const petals = [];

  for (let i = 0; i < petalsCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 9 + Math.random() * 11,
      speedY: 0.5 + Math.random() * 0.8,
      speedX: -0.3 + Math.random() * 0.6,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 1.4,
      type: Math.random() > 0.4 ? 'jasmine' : 'rose',
      opacity: 0.22 + Math.random() * 0.35
    });
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.angle * Math.PI) / 180);
    ctx.globalAlpha = p.opacity;

    if (p.type === 'jasmine') {
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(197, 154, 63, 0.2)';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.45, p.size * 0.85, 0, 0, Math.PI * 2);
      ctx.fill();

      // Golden stamen touch
      ctx.fillStyle = '#C59A3F';
      ctx.beginPath();
      ctx.arc(0, p.size * 0.4, p.size * 0.14, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = '#8B2635';
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.55, p.size * 0.75, p.size * 0.7, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.75, p.size * 0.7, -p.size * 0.85, -p.size * 0.55, 0, -p.size);
      ctx.fill();
    }
    ctx.restore();
  }

  function loop() {
    if (document.hidden) {
      requestAnimationFrame(loop);
      return;
    }
    ctx.clearRect(0, 0, width, height);

    for (let p of petals) {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.01) * 0.5 + p.speedX;
      p.angle += p.spin;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;

      drawPetal(p);
    }
    requestAnimationFrame(loop);
  }

  loop();
}

/* ==========================================================================
   SHORT CELEBRATION PETAL BURST
   ========================================================================== */
function triggerCelebrationBurst(count = 50) {
  const canvas = document.getElementById('celebration-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const startTime = performance.now();
  const maxDuration = 3400;

  for (let i = 0; i < count; i++) {
    const angle = (Math.random() * Math.PI) + Math.PI;
    const speed = 4 + Math.random() * 11;
    particles.push({
      x: width * (0.3 + Math.random() * 0.4),
      y: height * 0.65,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 7 + Math.random() * 13,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      type: Math.random() < 0.45 ? 'jasmine' : (Math.random() < 0.8 ? 'rose' : 'gold'),
      alpha: 1
    });
  }

  function frame(now) {
    const elapsed = now - startTime;
    if (elapsed > maxDuration) {
      ctx.clearRect(0, 0, width, height);
      return;
    }

    ctx.clearRect(0, 0, width, height);
    const progress = elapsed / maxDuration;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2;
      p.vx *= 0.985;
      p.rot += p.rotSpeed;
      p.alpha = Math.max(0, 1 - Math.pow(progress, 1.7));

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = p.alpha;

      if (p.type === 'jasmine') {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.45, p.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#C59A3F';
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.16, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'rose') {
        ctx.fillStyle = '#8B2635';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = '#E7C978';
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.28, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

/* ==========================================================================
   INTERACTIVE SCRATCH-TO-REVEAL WEDDING DATE
   ========================================================================== */
function setupScratchCard() {
  const canvas = document.getElementById('scratch-canvas');
  const container = document.querySelector('.scratch-card-container');
  const manualBtn = document.getElementById('manual-reveal-btn');
  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;

  let isScratching = false;
  let lastCheckTime = 0;

  function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    renderMetallicCoating(rect.width, rect.height);
  }

  function renderMetallicCoating(w, h) {
    if (scratchCleared) return;

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#B88928');
    grad.addColorStop(0.3, '#F5DF95');
    grad.addColorStop(0.5, '#C59A3F');
    grad.addColorStop(0.8, '#FDF3D1');
    grad.addColorStop(1, '#8C6518');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(28, 25, 23, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(12, 12, w - 24, h - 24);
    ctx.strokeRect(16, 16, w - 32, h - 32);

    ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#1C1917';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '0.22em';
    ctx.fillText('✨ SAVE THE AUSPICIOUS DATE ✨', w / 2, h / 2 - 24);

    ctx.font = '600 22px "Cinzel", Georgia, serif';
    ctx.fillStyle = '#141110';
    ctx.fillText('Scratch To Reveal', w / 2, h / 2 + 12);

    ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(28, 25, 23, 0.75)';
    ctx.fillText('Touch or swipe with your finger', w / 2, h / 2 + 42);
  }

  function scratch(e) {
    if (!isScratching || scratchCleared) return;
    if (e.cancelable) e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 32, 0, Math.PI * 2);
    ctx.fill();

    const now = performance.now();
    if (now - lastCheckTime > 180) {
      lastCheckTime = now;
      checkPercentage(rect.width, rect.height);
    }
  }

  function checkPercentage(w, h) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const imgData = ctx.getImageData(0, 0, w * dpr, h * dpr).data;
    let transparent = 0;
    const step = 4 * 16;

    for (let i = 3; i < imgData.length; i += step) {
      if (imgData[i] < 128) transparent++;
    }

    const ratio = transparent / (imgData.length / step);
    if (ratio > 0.5) {
      finishReveal();
    }
  }

  function finishReveal() {
    if (scratchCleared) return;
    scratchCleared = true;
    canvas.style.transition = 'opacity 0.6s ease';
    canvas.style.opacity = '0';
    setTimeout(() => { canvas.style.display = 'none'; }, 650);

    triggerCelebrationBurst(60);

    container.style.boxShadow = '0 0 45px rgba(197, 154, 63, 0.55)';
    setTimeout(() => { container.style.boxShadow = ''; }, 2500);

    if (manualBtn) manualBtn.style.display = 'none';
  }

  canvas.addEventListener('pointerdown', (e) => {
    isScratching = true;
    scratch(e);
  });
  window.addEventListener('pointermove', scratch);
  window.addEventListener('pointerup', () => { isScratching = false; });
  window.addEventListener('pointercancel', () => { isScratching = false; });

  canvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); }, { passive: false });
  window.addEventListener('touchmove', scratch, { passive: false });
  window.addEventListener('touchend', () => { isScratching = false; });

  if (manualBtn) {
    manualBtn.addEventListener('click', finishReveal);
  }

  window.addEventListener('resize', resizeCanvas);
  setTimeout(resizeCanvas, 100);
}

/* ==========================================================================
   WEDDING COUNTDOWN TIMER
   ========================================================================== */
function setupCountdown() {
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minutesEl = document.getElementById('count-minutes');
  const secondsEl = document.getElementById('count-seconds');
  const gridEl = document.getElementById('countdown-grid');
  const completeEl = document.getElementById('countdown-complete-msg');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const targetDate = new Date(weddingConfig.wedding.targetDate).getTime();

  function update() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (gridEl) gridEl.style.display = 'none';
      if (completeEl) {
        completeEl.style.display = 'block';
        completeEl.textContent = weddingConfig.messages.countdownComplete;
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   PHOTO GALLERY & LIGHTBOX MODAL
   ========================================================================== */
function setupGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const captionTitle = document.getElementById('lightbox-caption-title');
  const captionSub = document.getElementById('lightbox-caption-sub');
  const counterEl = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  if (!galleryGrid || !lightbox || !lightboxImg) return;

  const photos = weddingConfig.gallery;

  galleryGrid.innerHTML = photos.map((photo, i) => `
    <div class="gallery-item" data-index="${i}" tabindex="0" role="button" aria-label="View photo ${photo.title}">
      <div class="gallery-img-container">
        <img src="${photo.src}" alt="${photo.title}" class="gallery-img" loading="lazy" />
        <div class="gallery-overlay-badge">
          <div class="gallery-overlay-title">${photo.title}</div>
          <div class="gallery-overlay-caption">${photo.caption}</div>
        </div>
      </div>
    </div>
  `).join('');

  let isCustomImageModal = false;

  function openLightbox(index) {
    isCustomImageModal = false;
    currentLightboxIndex = (index + photos.length) % photos.length;
    const item = photos[currentLightboxIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    if (captionTitle) captionTitle.textContent = item.title;
    if (captionSub) captionSub.textContent = item.caption;
    if (counterEl) counterEl.textContent = `${currentLightboxIndex + 1} / ${photos.length}`;
    if (prevBtn) prevBtn.style.display = '';
    if (nextBtn) nextBtn.style.display = '';
    
    lightbox.classList.add('is-active');
    document.body.classList.add('invitation-locked');
  }

  function openSingleImageModal({ src, title, caption }) {
    isCustomImageModal = true;
    lightboxImg.src = src;
    lightboxImg.alt = title;
    if (captionTitle) captionTitle.textContent = title;
    if (captionSub) captionSub.textContent = caption;
    if (counterEl) counterEl.textContent = 'Official Card';
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';

    lightbox.classList.add('is-active');
    document.body.classList.add('invitation-locked');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-active');
    document.body.classList.remove('invitation-locked');
    if (prevBtn) prevBtn.style.display = '';
    if (nextBtn) nextBtn.style.display = '';
    isCustomImageModal = false;
  }

  function nextPhoto() {
    if (isCustomImageModal) return;
    openLightbox(currentLightboxIndex + 1);
  }

  function prevPhoto() {
    if (isCustomImageModal) return;
    openLightbox(currentLightboxIndex - 1);
  }

  galleryGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (item) {
      const idx = parseInt(item.getAttribute('data-index') || '0', 10);
      openLightbox(idx);
    }
  });

  galleryGrid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const item = e.target.closest('.gallery-item');
      if (item) {
        e.preventDefault();
        const idx = parseInt(item.getAttribute('data-index') || '0', 10);
        openLightbox(idx);
      }
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevPhoto);
  if (nextBtn) nextBtn.addEventListener('click', nextPhoto);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  });

  // Connect view-card-btn to open the invitation card in high resolution lightbox
  const viewCardBtn = document.getElementById('view-card-btn');
  if (viewCardBtn) {
    viewCardBtn.addEventListener('click', () => {
      openSingleImageModal({
        src: weddingConfig.assets.invitationCard || 'assets/invitation-card.jpg',
        title: 'വിവാഹക്ഷണപത്രിക',
        caption: 'Official Wedding Invitation Card • Gayathri B (Malavika) & Hareesh'
      });
    });
  }
}

/* ==========================================================================
   SHARE & VENUE INTERACTIONS
   ========================================================================== */
function setupShareAndRSVP() {
  const shareModal = document.getElementById('share-modal');
  const shareBtnFloating = document.getElementById('floating-share-btn');
  const openShareCardBtn = document.getElementById('open-share-card-btn');
  const copyLinkBtn = document.getElementById('copy-link-btn');
  const copyFeedback = document.getElementById('copy-feedback');
  const whatsappShareLink = document.getElementById('whatsapp-share-link');
  const mapBtn = document.getElementById('open-map-btn');
  const copyAddressBtn = document.getElementById('copy-address-btn');

  // Open Google Maps URL
  if (mapBtn) {
    mapBtn.addEventListener('click', () => {
      window.open(weddingConfig.venue.mapUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Copy temple address
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      navigator.clipboard.writeText("Sreekrishna Temple, Sreekrishnapuram, Palakkad, Kerala").then(() => {
        const orig = copyAddressBtn.textContent;
        copyAddressBtn.textContent = 'Address Copied! ✓';
        setTimeout(() => { copyAddressBtn.textContent = orig; }, 2000);
      });
    });
  }

  // WhatsApp share link prefilled with bride-side text
  const encodedShareText = encodeURIComponent(weddingConfig.messages.shareMessage);
  if (whatsappShareLink) {
    whatsappShareLink.href = `https://api.whatsapp.com/send?text=${encodedShareText}`;
  }

  async function triggerShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Wedding Invitation — ${weddingConfig.couple.bride} & ${weddingConfig.couple.groom}`,
          text: weddingConfig.messages.shareMessage,
          url: window.location.href
        });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') openShareModal();
      }
    } else {
      openShareModal();
    }
  }

  function openShareModal() {
    if (shareModal) {
      shareModal.classList.add('is-active');
      document.body.classList.add('invitation-locked');
    }
  }

  function closeShareModal() {
    if (shareModal) {
      shareModal.classList.remove('is-active');
      document.body.classList.remove('invitation-locked');
    }
  }

  if (shareBtnFloating) shareBtnFloating.addEventListener('click', triggerShare);
  if (openShareCardBtn) openShareCardBtn.addEventListener('click', triggerShare);

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        if (copyFeedback) {
          copyFeedback.style.display = 'block';
          setTimeout(() => { copyFeedback.style.display = 'none'; }, 2200);
        }
      });
    });
  }

  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      closeShareModal();
    });
  });

  if (shareModal) {
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) {
        closeShareModal();
      }
    });
  }
}

/* ==========================================================================
   SCROLL REVEAL OBSERVER
   ========================================================================== */
function setupScrollReveals() {
  const elements = document.querySelectorAll('.reveal-on-scroll');

  if (window.location.search.includes('reveal=all') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => {
      el.classList.add('is-visible');
      el.classList.add('is-revealed');
    });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => {
      el.classList.add('is-visible');
      el.classList.add('is-revealed');
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '100px 0px 100px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   DOM INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const musicBtn = document.getElementById('music-toggle-btn');
  if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
  }

  setupOpeningCover();
  setupBackgroundPetals();
  setupScratchCard();
  setupCountdown();
  setupGallery();
  setupShareAndRSVP();
  setupScrollReveals();
});
