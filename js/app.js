/**
 * Hareesh & Gayathri — Luxury Cinematic Digital Wedding Invitation
 * Pure Vanilla JavaScript: Audio Engine, Scratch Card, Petal Physics, Lightbox, Countdown, RSVP & Share
 */

import { weddingConfig } from './weddingConfig.js';

// Global state
let isOpened = false;
let isMusicPlaying = false;
let audioContext = null;
let synthOscillators = [];
let scratchCleared = false;
let currentLightboxIndex = 0;

/* ==========================================================================
   AUDIO ENGINE (HTML5 Native Audio)
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

// Synchronous ground-truth audio playback
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

function startMusic(force = false) {
  const audioEl = getAudioElement();

  if (!force && sessionStorage.getItem('wedding_music_muted') === 'true') {
    updateMusicUI(false);
    return;
  }

  playAudioDirectly();
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
  const tapOpenBtn = document.getElementById('tap-to-open-btn');
  const audioEl = getAudioElement();

  // Attach native media listeners
  audioEl.addEventListener('play', () => updateMusicUI(true));
  audioEl.addEventListener('playing', () => updateMusicUI(true));
  audioEl.addEventListener('pause', () => updateMusicUI(false));

  if (!openingCover) return;

  function handleOpen(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    if (isOpened) return;
    isOpened = true;

    // Start background music IMMEDIATELY and SYNCHRONOUSLY within user gesture
    playAudioDirectly();

    // Trigger celebration petal burst
    triggerCelebrationBurst(45);

    // Animate opening curtain & card
    openingCover.classList.add('is-opened');

    // Unlock body scroll after animation
    setTimeout(() => {
      document.body.classList.remove('invitation-locked');
      openingCover.style.display = 'none';
    }, 1200);
  }

  // Support ?opened=1 query parameter for automated testing & direct preview
  if (window.location.search.includes('opened=1')) {
    isOpened = true;
    document.body.classList.remove('invitation-locked');
    openingCover.style.display = 'none';
    
    // Play on first user touch anywhere if opened via parameter
    const playOnFirstInteraction = () => {
      playAudioDirectly();
      window.removeEventListener('click', playOnFirstInteraction);
      window.removeEventListener('touchstart', playOnFirstInteraction);
    };
    window.addEventListener('click', playOnFirstInteraction, { once: true });
    window.addEventListener('touchstart', playOnFirstInteraction, { once: true });
    return;
  }

  // Lock scroll initially
  document.body.classList.add('invitation-locked');

  if (tapOpenBtn) {
    tapOpenBtn.addEventListener('click', handleOpen);
    tapOpenBtn.addEventListener('touchend', handleOpen);
  }

  // Tapping anywhere on the opening card also triggers opening & music
  const card = document.querySelector('.opening-card');
  if (card) {
    card.addEventListener('click', handleOpen);
  }
}

/* ==========================================================================
   FLOATING PETALS CANVAS BACKGROUND
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

  const petalsCount = window.innerWidth < 600 ? 12 : 20;
  const petals = [];

  for (let i = 0; i < petalsCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 10 + Math.random() * 12,
      speedY: 0.6 + Math.random() * 0.9,
      speedX: -0.4 + Math.random() * 0.8,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 1.5,
      type: Math.random() > 0.4 ? 'rose' : 'jasmine',
      opacity: 0.25 + Math.random() * 0.45
    });
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.angle * Math.PI) / 180);
    ctx.globalAlpha = p.opacity;

    if (p.type === 'rose') {
      // Crimson / Burgundy Rose Petal
      ctx.fillStyle = '#6e1d2e';
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.6, p.size * 0.8, p.size * 0.7, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.7, -p.size * 0.9, -p.size * 0.6, 0, -p.size);
      ctx.fill();
    } else {
      // Jasmine Petal: Soft Ivory with Gold Tint
      ctx.fillStyle = '#fefaf0';
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.5, p.size * 0.85, 0, 0, Math.PI * 2);
      ctx.fill();
      // Golden center touch
      ctx.fillStyle = '#d4af37';
      ctx.beginPath();
      ctx.arc(0, p.size * 0.4, p.size * 0.15, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  let animationId;
  function loop() {
    if (document.hidden) {
      animationId = requestAnimationFrame(loop);
      return;
    }
    ctx.clearRect(0, 0, width, height);

    for (let p of petals) {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.01) * 0.6 + p.speedX;
      p.angle += p.spin;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;

      drawPetal(p);
    }
    animationId = requestAnimationFrame(loop);
  }

  loop();
}

/* ==========================================================================
   SHORT CELEBRATION PETAL BURST (2-4 Seconds)
   ========================================================================== */
function triggerCelebrationBurst(count = 55) {
  const canvas = document.getElementById('celebration-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const startTime = performance.now();
  const maxDuration = 3600; // 3.6 seconds

  for (let i = 0; i < count; i++) {
    const angle = (Math.random() * Math.PI) + Math.PI; // upward burst
    const speed = 4 + Math.random() * 12;
    particles.push({
      x: width * (0.3 + Math.random() * 0.4),
      y: height * 0.65,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 8 + Math.random() * 14,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      type: Math.random() < 0.45 ? 'rose' : (Math.random() < 0.8 ? 'jasmine' : 'gold'),
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
      p.vy += 0.22; // gravity
      p.vx *= 0.985; // drag
      p.rot += p.rotSpeed;
      p.alpha = Math.max(0, 1 - Math.pow(progress, 1.8));

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = p.alpha;

      if (p.type === 'rose') {
        ctx.fillStyle = '#872136';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'jasmine') {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.45, p.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#d4af37';
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.18, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Gold glitter star
        ctx.fillStyle = '#f3e5ab';
        ctx.shadowColor = '#d4af37';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.25, 0, Math.PI * 2);
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
  let scratchedPixels = 0;
  let totalPixels = 0;
  let lastCheckTime = 0;

  function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    renderMetallicCoating(rect.width, rect.height);
  }

  // Draw royal gold metallic foil coating
  function renderMetallicCoating(w, h) {
    if (scratchCleared) return;

    // Metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#c79d38');
    grad.addColorStop(0.3, '#f2e2a0');
    grad.addColorStop(0.5, '#deb653');
    grad.addColorStop(0.8, '#f7ebba');
    grad.addColorStop(1, '#ab8226');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle ornate double border
    ctx.strokeStyle = 'rgba(74, 18, 26, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(12, 12, w - 24, h - 24);
    ctx.strokeRect(16, 16, w - 32, h - 32);

    // Engraved hint text in gold
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#3d0f19';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '0.2em';
    ctx.fillText('✨ A SPECIAL DATE AWAITS ✨', w / 2, h / 2 - 20);

    ctx.font = 'italic 500 24px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#20060d';
    ctx.fillText('Scratch to Reveal', w / 2, h / 2 + 18);

    ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(61, 15, 25, 0.75)';
    ctx.fillText('Touch & scratch with your finger', w / 2, h / 2 + 50);

    totalPixels = (w / 10) * (h / 10);
  }

  // Handle scratch movement
  function scratch(e) {
    if (!isScratching || scratchCleared) return;
    
    // Prevent default scroll on touch
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

    // Check completion periodically (every 180ms)
    const now = performance.now();
    if (now - lastCheckTime > 180) {
      lastCheckTime = now;
      checkPercentage(rect.width, rect.height);
    }
  }

  // Sample transparency to calculate scratch percentage
  function checkPercentage(w, h) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const imgData = ctx.getImageData(0, 0, w * dpr, h * dpr).data;
    let transparent = 0;
    const step = 4 * 16; // sample every 16th pixel

    for (let i = 3; i < imgData.length; i += step) {
      if (imgData[i] < 128) transparent++;
    }

    const ratio = transparent / (imgData.length / step);
    if (ratio > 0.52) {
      finishReveal();
    }
  }

  function finishReveal() {
    if (scratchCleared) return;
    scratchCleared = true;
    canvas.classList.add('is-revealed');
    
    // Trigger celebratory flower burst
    triggerCelebrationBurst(60);

    // Subtle golden glow animation on the date card
    container.style.boxShadow = '0 0 60px rgba(212, 175, 55, 0.6)';
    setTimeout(() => {
      container.style.boxShadow = '';
    }, 2500);

    if (manualBtn) manualBtn.style.display = 'none';
  }

  // Pointer & Touch event listeners
  canvas.addEventListener('pointerdown', (e) => {
    isScratching = true;
    scratch(e);
  });
  window.addEventListener('pointermove', scratch);
  window.addEventListener('pointerup', () => { isScratching = false; });
  window.addEventListener('pointercancel', () => { isScratching = false; });

  // Touch fallback
  canvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); }, { passive: false });
  window.addEventListener('touchmove', scratch, { passive: false });
  window.addEventListener('touchend', () => { isScratching = false; });

  if (manualBtn) {
    manualBtn.addEventListener('click', finishReveal);
  }

  window.addEventListener('resize', resizeCanvas);
  // Delay initial setup to ensure correct layout dimensions
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

  // Render gallery cards dynamically
  galleryGrid.innerHTML = photos.map((photo, i) => `
    <div class="gallery-item" data-index="${i}" tabindex="0" role="button" aria-label="View photo ${photo.title}">
      <img src="${photo.src}" alt="${photo.title}" loading="lazy" />
      <div class="gallery-item-overlay">
        <h4>${photo.title}</h4>
        <p>${photo.caption}</p>
      </div>
    </div>
  `).join('');

  function openLightbox(index) {
    currentLightboxIndex = (index + photos.length) % photos.length;
    const item = photos[currentLightboxIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    if (captionTitle) captionTitle.textContent = item.title;
    if (captionSub) captionSub.textContent = item.caption;
    if (counterEl) counterEl.textContent = `${currentLightboxIndex + 1} / ${photos.length}`;
    
    lightbox.classList.add('is-active');
    document.body.classList.add('invitation-locked');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-active');
    document.body.classList.remove('invitation-locked');
  }

  function nextPhoto() {
    openLightbox(currentLightboxIndex + 1);
  }

  function prevPhoto() {
    openLightbox(currentLightboxIndex - 1);
  }

  // Delegated click on gallery items
  galleryGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (item) {
      const idx = parseInt(item.getAttribute('data-index') || '0', 10);
      openLightbox(idx);
    }
  });

  // Keyboard navigation on gallery items
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

  // Lightbox controls
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevPhoto);
  if (nextBtn) nextBtn.addEventListener('click', nextPhoto);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  });

  // Mobile Touch Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) nextPhoto();
      else prevPhoto();
    }
  }, { passive: true });

  // Connect view-card-btn to open the invitation card in lightbox
  const viewCardBtn = document.getElementById('view-card-btn');
  if (viewCardBtn) {
    viewCardBtn.addEventListener('click', () => {
      const cardIdx = photos.findIndex(p => p.src.includes('invitation-card'));
      if (cardIdx !== -1) {
        openLightbox(cardIdx);
      }
    });
  }
}

/* ==========================================================================
   SHARE & RSVP INTERACTIONS
   ========================================================================== */
function setupShareAndRSVP() {
  const shareModal = document.getElementById('share-modal');
  const rsvpModal = document.getElementById('rsvp-modal');
  const shareBtnFloating = document.getElementById('floating-share-btn');
  const rsvpBtnFloating = document.getElementById('floating-rsvp-btn');
  const openShareCardBtn = document.getElementById('open-share-card-btn');
  const copyLinkBtn = document.getElementById('copy-link-btn');
  const copyFeedback = document.getElementById('copy-feedback');
  const whatsappShareLink = document.getElementById('whatsapp-share-link');
  const rsvpForm = document.getElementById('rsvp-form');
  const mapBtn = document.getElementById('open-map-btn');
  const copyAddressBtn = document.getElementById('copy-address-btn');

  // Open Google Maps URL
  if (mapBtn) {
    mapBtn.addEventListener('click', () => {
      window.open(weddingConfig.venue.mapUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Copy address
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(weddingConfig.venue.fullAddress).then(() => {
        const orig = copyAddressBtn.textContent;
        copyAddressBtn.textContent = 'Address Copied! ✓';
        setTimeout(() => { copyAddressBtn.textContent = orig; }, 2000);
      });
    });
  }

  // WhatsApp share link prefilled
  const encodedShareText = encodeURIComponent(weddingConfig.messages.shareMessage);
  if (whatsappShareLink) {
    whatsappShareLink.href = `https://api.whatsapp.com/send?text=${encodedShareText}`;
  }

  // Native Web Share or Modal
  async function triggerShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Wedding Invitation — ${weddingConfig.couple.groom} & ${weddingConfig.couple.bride}`,
          text: weddingConfig.messages.shareMessage,
          url: window.location.href
        });
        return;
      } catch (err) {
        // Fallback to modal if cancelled or denied
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

  function openRSVPModal() {
    if (rsvpModal) {
      rsvpModal.classList.add('is-active');
      document.body.classList.add('invitation-locked');
    }
  }

  function closeRSVPModal() {
    if (rsvpModal) {
      rsvpModal.classList.remove('is-active');
      document.body.classList.remove('invitation-locked');
    }
  }

  if (shareBtnFloating) shareBtnFloating.addEventListener('click', triggerShare);
  if (openShareCardBtn) openShareCardBtn.addEventListener('click', triggerShare);
  if (rsvpBtnFloating) rsvpBtnFloating.addEventListener('click', openRSVPModal);

  // Copy link
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

  // Close modals on clicking overlay or close buttons
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      closeShareModal();
      closeRSVPModal();
    });
  });

  [shareModal, rsvpModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeShareModal();
          closeRSVPModal();
        }
      });
    }
  });

  // Handle RSVP Form submission
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guestName = (document.getElementById('rsvp-guest-name')?.value || '').trim();
      const attendance = document.querySelector('input[name="attendance"]:checked')?.value || 'Attending';
      const guestCount = document.getElementById('rsvp-guest-count')?.value || '1';
      const wishes = (document.getElementById('rsvp-wishes')?.value || '').trim();

      const rsvpText = `*Wedding RSVP for ${weddingConfig.couple.groom} & ${weddingConfig.couple.bride}*\n\n` +
        `👤 *Guest Name:* ${guestName}\n` +
        `✨ *Status:* ${attendance}\n` +
        `👥 *Number of Guests:* ${guestCount}\n` +
        (wishes ? `💌 *Warm Wishes:* "${wishes}"\n` : '') +
        `\nThank you for inviting us! ❤️`;

      // Open WhatsApp with prefilled RSVP directly to the family's contact number
      const phoneParam = weddingConfig.couple.contactPhone ? `&phone=91${weddingConfig.couple.contactPhone}` : '';
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(rsvpText)}${phoneParam}`;
      window.open(whatsappUrl, '_blank');
      closeRSVPModal();
    });
  }
}

/* ==========================================================================
   SCROLL REVEAL OBSERVER
   ========================================================================== */
function setupScrollReveals() {
  const elements = document.querySelectorAll('.reveal-on-scroll');

  // Support ?reveal=all for immediate rendering or test captures
  if (window.location.search.includes('reveal=all') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '120px 0px 120px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   DOM INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Bind music toggle button
  const musicBtn = document.getElementById('music-toggle-btn');
  if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
  }

  // Setup all components
  setupOpeningCover();
  setupBackgroundPetals();
  setupScratchCard();
  setupCountdown();
  setupGallery();
  setupShareAndRSVP();
  setupScrollReveals();
});
